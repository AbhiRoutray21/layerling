import * as THREE from "three";
import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { WorkplaneShape } from "@/types/layerling";
import type { ThreeState } from "@/components/workplane/ViewportOverlays";

/**
 * Finding what is under the pointer in the 3D view: the ray from the camera
 * through the pointer, the body it hits first, and the pick-only clicks of the
 * History view.
 */

export const RENDER_LAYER_SHAPES = 1;
/** How far beside a body a press may land and still mean it, in screen pixels: a fingertip covers more than a mouse pointer. */
const PICK_TOLERANCE_PIXELS = 6;
const PICK_TOLERANCE_PIXELS_TOUCH = 16;
const PICK_TOLERANCE_RAYS = 8;
/** Two surfaces this far apart along the ray (mm) are the same spot: bodies lying exactly on one another, a copy on its original. */
const PICK_TIE_DISTANCE = 0.01;
/** How far a press may travel and still be a click rather than a turn of the view, in screen pixels. */
const PICK_ONLY_CLICK_PIXELS = 5;

type PickRayState = Pick<ThreeState, "renderer" | "pointer" | "raycaster" | "camera">;

/**
 * Points the raycaster from the camera through a spot on the screen and, when
 * a layer is given, makes it see only that layer. Returns the canvas rectangle
 * for callers that aim more rays around the same spot.
 */
export function aimPickRay(state: PickRayState, clientX: number, clientY: number, layer?: number) {
  const rect = state.renderer.domElement.getBoundingClientRect();
  state.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  state.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  state.raycaster.setFromCamera(state.pointer, state.camera);
  if (layer !== undefined) state.raycaster.layers.set(layer);
  return rect;
}

/** The ray from the camera through a spot on the screen. */
export function pointerRayFor(state: PickRayState, clientX: number, clientY: number) {
  aimPickRay(state, clientX, clientY);
  return state.raycaster.ray;
}

/**
 * The body under the pointer, as a click means it: only surfaces count, a body
 * cut away by the section view does not, and neither do image plates or
 * previews. A press that just misses still finds the body next to it.
 */
export function pickShapeAt(
  state: ThreeState,
  shapes: readonly WorkplaneShape[],
  clientX: number,
  clientY: number,
  pointerType = "mouse",
  /** The selected bodies: where several lie at the same spot, the press means the one already selected (#484). */
  preferIds: readonly string[] = [],
) {
  const tolerance = pointerType === "touch" ? PICK_TOLERANCE_PIXELS_TOUCH : PICK_TOLERANCE_PIXELS;
  const rect = aimPickRay(state, clientX, clientY, RENDER_LAYER_SHAPES);

  const pickable = (entry: THREE.Intersection) => {
    // Only surfaces pick a body. Its edge lines count as hit within 1.15 mm of the ray, so
    // through a slot narrower than about 3 mm the rim always won over the body behind it (#193).
    if (!(entry.object instanceof THREE.Mesh)) return false;
    if (state.sectionPlane && state.sectionPlane.distanceToPoint(entry.point) < -0.001) return false;
    const shapeId = entry.object.userData.shapeId;
    if (typeof shapeId !== "string") return false;
    const shape = shapes.find((candidate) => candidate.id === shapeId);
    return shape ? !shape.imagePlate && !shape.previewOnly : false;
  };
  const pickableHits = state.raycaster.intersectObjects(state.shapeLayer.children, true).filter(pickable);
  const hit = pickableHits[0];
  if (hit) {
    // A copy lies exactly on its original, so the ray meets both at the same distance and the one
    // that comes first in the list wins - the original, though the copy is the body that is selected.
    // Pressing on it then selected the original and moved that, and the copy chain was gone (#484).
    const tied = preferIds.length > 0
      ? pickableHits.find((entry) => entry.distance - hit.distance <= PICK_TIE_DISTANCE && preferIds.includes(entry.object.userData.shapeId as string))
      : undefined;
    return (tied ?? hit).object.userData.shapeId as string;
  }

  // A press that just misses still means the body next to it: a thin wall or
  // a small part is hard to hit exactly. So the same test runs once more on
  // a small ring around the pointer - but no further. The middle of a bore
  // or the gap between two parts of a group is empty space and stays so.
  let nearestId: string | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (let step = 0; step < PICK_TOLERANCE_RAYS; step += 1) {
    const angle = (step / PICK_TOLERANCE_RAYS) * Math.PI * 2;
    state.pointer.x = ((clientX + Math.cos(angle) * tolerance - rect.left) / rect.width) * 2 - 1;
    state.pointer.y = -((clientY + Math.sin(angle) * tolerance - rect.top) / rect.height) * 2 + 1;
    state.raycaster.setFromCamera(state.pointer, state.camera);
    const near = state.raycaster.intersectObjects(state.shapeLayer.children, true).find(pickable);
    if (near && near.distance < nearestDistance) {
      nearestId = near.object.userData.shapeId as string;
      nearestDistance = near.distance;
    }
  }

  return nearestId;
}

/** The first body the ray meets, whatever it is, without the near-miss ring. */
export function pickShapeIdAt(state: ThreeState, clientX: number, clientY: number): string | null {
  aimPickRay(state, clientX, clientY, RENDER_LAYER_SHAPES);
  const hit = state.raycaster
    .intersectObjects(state.shapeLayer.children, true)
    .find((entry) => {
      if (state.sectionPlane && state.sectionPlane.distanceToPoint(entry.point) < -0.001) return false;
      return entry.object instanceof THREE.Mesh && typeof entry.object.userData.shapeId === "string";
    });
  return hit ? (hit.object.userData.shapeId as string) : null;
}

/**
 * Selecting without editing, for the History view: the objects of an earlier
 * state can be picked to bring them back, but nothing in the view moves.
 */
export type PickOnlySelection = {
  /** The picked objects, drawn with the selection outline. */
  ids: string[];
  /** A click on an object (or on nothing, with null). `toggle` is Shift: add or remove it. */
  onPick: (id: string | null, toggle: boolean) => void;
};

/**
 * Pointer handlers for pick-only mode. They stand in for the 3D view's own
 * handlers, so no tool, handle or drag can start. A press that is let go
 * where it started picks; a press that travels turns the view, which the
 * camera controls handle on their own.
 */
export function usePickOnlyPointer(
  selection: PickOnlySelection | null | undefined,
  pick: (clientX: number, clientY: number, pointerType: string) => string | null,
) {
  const pressRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const selectionRef = useRef(selection);
  selectionRef.current = selection;

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    pressRef.current = event.button === 0 && event.isPrimary
      ? { pointerId: event.pointerId, x: event.clientX, y: event.clientY }
      : null;
  }, []);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const press = pressRef.current;
    pressRef.current = null;
    const current = selectionRef.current;
    if (!current || !press || press.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) >= PICK_ONLY_CLICK_PIXELS) return;
    current.onPick(pick(event.clientX, event.clientY, event.pointerType), event.shiftKey);
  }, [pick]);

  const onPointerCancel = useCallback(() => {
    pressRef.current = null;
  }, []);

  return { onPointerDown, onPointerUp, onPointerCancel };
}
