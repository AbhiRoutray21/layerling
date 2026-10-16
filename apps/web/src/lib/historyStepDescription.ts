import type { MessageKey } from "@/lib/messages.en";
import type { EditorHistoryEntry } from "@/lib/editorHistory";
import type { WorkplaneShape } from "@/types/layerling";

/**
 * What one step of the history did, as a sentence key and its values, so the
 * history view can say what the arrows would undo and redo. The entries carry
 * no name for the action that made them, so the step is read from the
 * difference between the state before and the state after - which also works
 * for the history of a project saved before this existed.
 */
export type HistoryStepDescription = {
  key: MessageKey;
  values?: Record<string, string | number>;
};

type ChangeKind = "moved" | "rotated" | "resized" | "color" | "hole" | "solid" | "renamed" | "mirrored" | "edges" | "hidden" | "shown" | "locked" | "unlocked" | "edited";

const POSITION_FIELDS = new Set(["x", "z", "elevation"]);
const ROTATION_FIELDS = new Set(["rotation", "rotationX", "rotationZ", "rotationPivot"]);
const SIZE_FIELDS = new Set(["size", "width", "depth", "height", "groupedBaseWidth", "groupedBaseDepth", "groupedBaseHeight"]);
const MIRROR_FIELDS = new Set(["mirrorX", "mirrorY", "mirrorZ"]);
const EDGE_FIELDS = new Set(["edgeTreatments", "edgeTreatmentHistory", "cadDisplayEdges", "cadDisplayEdgesVersion", "cadBrep", "cadBrepFrame", "cadMeshDeflection"]);
/** Fields that follow from another change and say nothing of their own. */
const DERIVED_FIELDS = new Set(["formulas"]);

function sameValue(a: unknown, b: unknown) {
  if (a === b) return true;
  if (a === undefined || b === undefined || a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

function changedFields(before: WorkplaneShape, after: WorkplaneShape) {
  const fields = new Set<string>();
  const record = (shape: WorkplaneShape) => shape as unknown as Record<string, unknown>;
  for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const a = record(before)[key];
    const b = record(after)[key];
    // A flag that went from missing to false (or back) is no change.
    if ((a === undefined && b === false) || (a === false && b === undefined)) continue;
    if (!sameValue(a, b)) fields.add(key);
  }
  return fields;
}

function changeKind(after: WorkplaneShape, fields: Set<string>): ChangeKind | null {
  const meaningful = [...fields].filter((field) => !DERIVED_FIELDS.has(field));
  if (meaningful.length === 0) return null;
  const only = (group: Set<string>) => meaningful.every((field) => group.has(field));
  if (only(new Set(["name"]))) return "renamed";
  if (only(new Set(["color"]))) return "color";
  if (only(new Set(["hole"]))) return after.hole ? "hole" : "solid";
  if (only(new Set(["hidden"]))) return after.hidden ? "hidden" : "shown";
  if (only(new Set(["locked"]))) return after.locked ? "locked" : "unlocked";
  if (only(POSITION_FIELDS)) return "moved";
  if (only(new Set([...ROTATION_FIELDS, ...POSITION_FIELDS]))) return meaningful.some((field) => ROTATION_FIELDS.has(field)) ? "rotated" : "moved";
  // A resize from a handle keeps the opposite side in place, so it moves the centre too.
  if (only(new Set([...SIZE_FIELDS, ...POSITION_FIELDS])) && meaningful.some((field) => SIZE_FIELDS.has(field))) return "resized";
  if (only(new Set([...MIRROR_FIELDS, ...POSITION_FIELDS])) && meaningful.some((field) => MIRROR_FIELDS.has(field))) return "mirrored";
  if (meaningful.some((field) => field === "edgeTreatments") && only(new Set([...EDGE_FIELDS, ...SIZE_FIELDS, ...POSITION_FIELDS]))) return "edges";
  return "edited";
}

const ONE_KEYS: Record<ChangeKind, MessageKey> = {
  moved: "historyStep.movedOne",
  rotated: "historyStep.rotatedOne",
  resized: "historyStep.resizedOne",
  color: "historyStep.colorOne",
  hole: "historyStep.holeOne",
  solid: "historyStep.solidOne",
  renamed: "historyStep.renamedOne",
  mirrored: "historyStep.mirroredOne",
  edges: "historyStep.edgesOne",
  hidden: "historyStep.hiddenOne",
  shown: "historyStep.shownOne",
  locked: "historyStep.lockedOne",
  unlocked: "historyStep.unlockedOne",
  edited: "historyStep.editedOne",
};

const MANY_KEYS: Record<ChangeKind, MessageKey> = {
  moved: "historyStep.movedMany",
  rotated: "historyStep.rotatedMany",
  resized: "historyStep.resizedMany",
  color: "historyStep.colorMany",
  hole: "historyStep.holeMany",
  solid: "historyStep.solidMany",
  renamed: "historyStep.editedMany",
  mirrored: "historyStep.mirroredMany",
  edges: "historyStep.edgesMany",
  hidden: "historyStep.hiddenMany",
  shown: "historyStep.shownMany",
  locked: "historyStep.lockedMany",
  unlocked: "historyStep.unlockedMany",
  edited: "historyStep.editedMany",
};

function groupedIds(shape: WorkplaneShape) {
  return new Set((shape.groupedShapes ?? []).map((part) => part.id));
}

function describeShapes(before: WorkplaneShape[], after: WorkplaneShape[]): HistoryStepDescription | null {
  const beforeById = new Map(before.map((shape) => [shape.id, shape]));
  const afterById = new Map(after.map((shape) => [shape.id, shape]));
  const added = after.filter((shape) => !beforeById.has(shape.id));
  const removed = before.filter((shape) => !afterById.has(shape.id));

  if (added.length > 0 || removed.length > 0) {
    // Grouping takes the parts off the plate and puts one group in their place.
    if (added.length === 1 && removed.length > 0 && added[0].groupedShapes?.length) {
      const parts = groupedIds(added[0]);
      if (removed.every((shape) => parts.has(shape.id))) {
        return { key: "historyStep.grouped", values: { count: removed.length, name: added[0].name } };
      }
    }
    // Ungrouping takes a group away and puts its parts back.
    if (removed.length === 1 && added.length > 0 && removed[0].groupedShapes?.length) {
      const parts = groupedIds(removed[0]);
      if (added.every((shape) => parts.has(shape.id))) {
        return { key: "historyStep.ungrouped", values: { name: removed[0].name } };
      }
    }
    if (removed.length === 0) {
      return added.length === 1
        ? { key: "historyStep.addedOne", values: { name: added[0].name } }
        : { key: "historyStep.addedMany", values: { count: added.length } };
    }
    if (added.length === 0) {
      return removed.length === 1
        ? { key: "historyStep.deletedOne", values: { name: removed[0].name } }
        : { key: "historyStep.deletedMany", values: { count: removed.length } };
    }
    if (removed.length === 1 && added.length > 1) {
      return { key: "historyStep.splitOne", values: { name: removed[0].name, count: added.length } };
    }
    return { key: "historyStep.replaced", values: { removed: removed.length, added: added.length } };
  }

  const changes: { before: WorkplaneShape; after: WorkplaneShape; kind: ChangeKind }[] = [];
  for (const shape of after) {
    const previous = beforeById.get(shape.id);
    if (!previous) continue;
    const kind = changeKind(shape, changedFields(previous, shape));
    if (kind) changes.push({ before: previous, after: shape, kind });
  }
  if (changes.length === 0) {
    const reordered = before.some((shape, index) => after[index]?.id !== shape.id);
    return reordered ? { key: "historyStep.reordered" } : null;
  }
  if (changes.length === 1) {
    const [change] = changes;
    if (change.kind === "renamed") {
      return { key: "historyStep.renamedOne", values: { name: change.before.name, newName: change.after.name } };
    }
    return { key: ONE_KEYS[change.kind], values: { name: change.after.name } };
  }
  const kind = changes.every((change) => change.kind === changes[0].kind) ? changes[0].kind : "edited";
  return { key: MANY_KEYS[kind], values: { count: changes.length } };
}

function describeNotes(before: EditorHistoryEntry, after: EditorHistoryEntry): HistoryStepDescription | null {
  const beforeNotes = before.notes ?? [];
  const afterNotes = after.notes ?? [];
  if (sameValue(beforeNotes, afterNotes)) return null;
  const beforeIds = new Set(beforeNotes.map((note) => note.id));
  const afterIds = new Set(afterNotes.map((note) => note.id));
  const added = afterNotes.filter((note) => !beforeIds.has(note.id));
  const removed = beforeNotes.filter((note) => !afterIds.has(note.id));
  const isPoint = (note: { kind?: string }) => note.kind === "point";
  if (added.length > 0 && removed.length === 0) {
    return { key: added.every(isPoint) ? "historyStep.pointAdded" : "historyStep.noteAdded" };
  }
  if (removed.length > 0 && added.length === 0) {
    return { key: removed.every(isPoint) ? "historyStep.pointRemoved" : "historyStep.noteRemoved" };
  }
  const changed = afterNotes.filter((note) => beforeIds.has(note.id));
  return { key: changed.length > 0 && changed.every(isPoint) && added.length === 0 ? "historyStep.pointChanged" : "historyStep.noteChanged" };
}

/**
 * What the step from `before` to `after` did. Without a state before it, the
 * entry is where the history begins.
 */
export function describeHistoryStep(before: EditorHistoryEntry | undefined, after: EditorHistoryEntry): HistoryStepDescription {
  if (!before) return { key: "historyStep.start" };
  const shapes = describeShapes(before.shapes, after.shapes);
  if (shapes) return shapes;
  const notes = describeNotes(before, after);
  if (notes) return notes;
  if (!sameValue(before.placementWorkplane, after.placementWorkplane)) return { key: "historyStep.workplane" };
  return { key: "historyStep.changed" };
}
