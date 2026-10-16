import { describe, expect, it } from "vitest";
import { editorHistoryEntry } from "@/lib/editorHistory";
import { describeHistoryStep } from "@/lib/historyStepDescription";
import type { WorkplaneNote, WorkplaneShape } from "@/types/layerling";

function box(overrides: Partial<WorkplaneShape> = {}): WorkplaneShape {
  return {
    id: "box-1",
    name: "Box",
    kind: "box",
    color: "#d41721",
    x: 0,
    z: 0,
    elevation: 0,
    size: 20,
    width: 20,
    depth: 20,
    height: 20,
    rotation: 0,
    locked: false,
    hidden: false,
    ...overrides,
  };
}

const entry = (shapes: WorkplaneShape[], notes: WorkplaneNote[] = []) => editorHistoryEntry(shapes, [], notes);
const step = (before: WorkplaneShape[], after: WorkplaneShape[]) => describeHistoryStep(entry(before), entry(after));

describe("history step descriptions", () => {
  it("names the start of the history when there is no state before it", () => {
    expect(describeHistoryStep(undefined, entry([box()]))).toEqual({ key: "historyStep.start" });
  });

  it("names added and deleted objects", () => {
    const other = box({ id: "cyl", name: "Cylinder", kind: "cylinder" });
    expect(step([box()], [box(), other])).toEqual({ key: "historyStep.addedOne", values: { name: "Cylinder" } });
    expect(step([], [box(), other])).toEqual({ key: "historyStep.addedMany", values: { count: 2 } });
    expect(step([box(), other], [box()])).toEqual({ key: "historyStep.deletedOne", values: { name: "Cylinder" } });
  });

  it("tells moving, rotating, resizing and colouring apart", () => {
    expect(step([box()], [box({ x: 12, z: -3 })]).key).toBe("historyStep.movedOne");
    expect(step([box()], [box({ rotation: 45 })]).key).toBe("historyStep.rotatedOne");
    // A handle keeps the opposite side in place, so the centre moves with the size.
    expect(step([box()], [box({ width: 30, x: 5 })]).key).toBe("historyStep.resizedOne");
    expect(step([box()], [box({ color: "#00ff00" })]).key).toBe("historyStep.colorOne");
    expect(step([box()], [box({ hole: true })]).key).toBe("historyStep.holeOne");
    expect(step([box({ hole: true })], [box({ hole: false })]).key).toBe("historyStep.solidOne");
    expect(step([box()], [box({ hidden: true })]).key).toBe("historyStep.hiddenOne");
    expect(step([box()], [box({ name: "Lid" })])).toEqual({ key: "historyStep.renamedOne", values: { name: "Box", newName: "Lid" } });
  });

  it("counts several objects with the same change and falls back when they differ", () => {
    const a = box({ id: "a" });
    const b = box({ id: "b" });
    expect(step([a, b], [{ ...a, x: 4 }, { ...b, x: 4 }])).toEqual({ key: "historyStep.movedMany", values: { count: 2 } });
    expect(step([a, b], [{ ...a, x: 4 }, { ...b, color: "#000000" }])).toEqual({ key: "historyStep.editedMany", values: { count: 2 } });
  });

  it("recognises grouping and ungrouping", () => {
    const a = box({ id: "a", name: "A" });
    const b = box({ id: "b", name: "B" });
    const group = box({ id: "g", name: "Group", kind: "group" as WorkplaneShape["kind"], groupedShapes: [a, b] });
    expect(step([a, b], [group])).toEqual({ key: "historyStep.grouped", values: { count: 2, name: "Group" } });
    expect(step([group], [a, b])).toEqual({ key: "historyStep.ungrouped", values: { name: "Group" } });
  });

  it("names a change to the notes or reference points when no object changed", () => {
    const note: WorkplaneNote = { id: "n1", text: "Check this", x: 0, y: 0, z: 0 };
    const point: WorkplaneNote = { id: "p1", text: "", x: 1, y: 2, z: 3, kind: "point" };
    expect(describeHistoryStep(entry([box()]), entry([box()], [note])).key).toBe("historyStep.noteAdded");
    expect(describeHistoryStep(entry([box()]), entry([box()], [point])).key).toBe("historyStep.pointAdded");
    expect(describeHistoryStep(entry([box()], [point]), entry([box()], [{ ...point, x: 9 }])).key).toBe("historyStep.pointChanged");
  });
});
