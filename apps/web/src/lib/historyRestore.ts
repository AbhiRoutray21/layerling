import { restoreGroupedChildren } from "@/lib/editorBooleans";
import { cloneWorkplaneShapeTreeWithFreshIds } from "@/lib/workplaneShapes";
import type { WorkplaneShape } from "@/types/layerling";

/**
 * Bringing objects back from an earlier state of the history: a copy of each,
 * exactly as it was then and where it was then, with ids of its own so it can
 * sit beside the version of itself the design has now.
 */

/**
 * An object of a state, wherever it is in the tree, at its place on the plate.
 * A part inside groups comes out level by level the way Edit group lays it
 * out, so a turned, scaled or mirrored group puts it where it showed.
 */
export function findShapeInHistoryState(shapes: readonly WorkplaneShape[], id: string): WorkplaneShape | null {
  for (const shape of shapes) {
    if (shape.id === id) return shape;
  }
  for (const shape of shapes) {
    const parts = shape.groupedShapes;
    if (!parts?.length || !containsShape(parts, id)) continue;
    // Opening a group gives its parts new ids, in the order of the group's own list.
    const placed = restoreGroupedChildren(shape);
    const index = parts.findIndex((part) => part.id === id || containsShape(part.groupedShapes ?? [], id));
    const part = placed[index];
    if (!part) return null;
    if (parts[index].id === id) return { ...part, id };
    return findShapeInHistoryState([{ ...part, groupedShapes: parts[index].groupedShapes }], id);
  }
  return null;
}

function containsShape(shapes: readonly WorkplaneShape[], id: string): boolean {
  return shapes.some((shape) => shape.id === id || containsShape(shape.groupedShapes ?? [], id));
}

/**
 * The copies to add to the design for the picked objects of a state, in the
 * order they were picked. Ids that the state does not hold are skipped, and
 * so is an object inside another one that is picked too - it comes along
 * with it.
 */
export function broughtBackShapes(shapes: readonly WorkplaneShape[], ids: readonly string[]): WorkplaneShape[] {
  const wanted = [...new Set(ids)];
  return wanted.flatMap((id) => {
    const insidePicked = wanted.some((other) => other !== id && containsShape(findShapeInHistoryState(shapes, other)?.groupedShapes ?? [], id));
    if (insidePicked) return [];
    const shape = findShapeInHistoryState(shapes, id);
    return shape ? [cloneWorkplaneShapeTreeWithFreshIds(shape, "restore")] : [];
  });
}

type HistoryStatePart = { id: string; name: string; kind: string; parts?: HistoryStatePart[] };

/**
 * The parts inside a group, at every depth, for AI tools: the ids they pass to
 * bring back one part without its group. Nothing for an object that is no group.
 */
export function historyStatePartsTree(shape: WorkplaneShape): { parts?: HistoryStatePart[] } {
  if (!shape.groupedShapes?.length) return {};
  return {
    parts: shape.groupedShapes.map((part) => ({ id: part.id, name: part.name, kind: part.kind, ...historyStatePartsTree(part) })),
  };
}

/**
 * When a state was recorded, as short as it can be told apart: the time for a
 * state of today, the date with it for an older one. Null for a state from
 * before layerling recorded times.
 */
export function historyStateClockLabel(at: number | undefined, language: string, now: number = Date.now()): string | null {
  if (typeof at !== "number" || !Number.isFinite(at)) return null;
  const when = new Date(at);
  const today = new Date(now);
  const sameDay = when.getFullYear() === today.getFullYear() && when.getMonth() === today.getMonth() && when.getDate() === today.getDate();
  try {
    return new Intl.DateTimeFormat(language, sameDay ? { timeStyle: "short" } : { dateStyle: "short", timeStyle: "short" }).format(when);
  } catch {
    return sameDay ? when.toLocaleTimeString() : when.toLocaleString();
  }
}
