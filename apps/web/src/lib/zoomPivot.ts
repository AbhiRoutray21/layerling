import * as THREE from "three";

/**
 * How far ahead of the camera the pivot is kept while zooming in at a point that has nothing to
 * zoom towards: the sky above the plate, or a spot past the plate's edge. The wheel moves the camera a
 * share of its distance to the pivot, so a pivot left where it was ended up closer with every notch,
 * the steps shrank and the camera stopped at its closest distance although the way ahead was free.
 */
export const ZOOM_PIVOT_REACH_MM = 50;

/**
 * The pivot to use when the pointer finds no surface: where the old one was if it is still far enough
 * ahead, otherwise on the line of sight, `reach` ahead of the camera, so the camera can go on. Kept
 * inside the box the pivot may be in. Null: leave the pivot alone.
 */
export function pivotKeptAhead(
  camera: THREE.Vector3,
  target: THREE.Vector3,
  forward: THREE.Vector3,
  reach: number,
  limits: { halfWidth: number; halfDepth: number; minY: number; maxY: number } | null,
): THREE.Vector3 | null {
  if (camera.distanceTo(target) >= reach) return null;
  const next = camera.clone().addScaledVector(forward, reach);
  if (limits) {
    next.x = Math.min(limits.halfWidth, Math.max(-limits.halfWidth, next.x));
    next.z = Math.min(limits.halfDepth, Math.max(-limits.halfDepth, next.z));
    next.y = Math.min(limits.maxY, Math.max(limits.minY, next.y));
  }
  // The box may leave the pivot closer than before: then nothing is gained, and the old one stays.
  return camera.distanceTo(next) > camera.distanceTo(target) ? next : null;
}
