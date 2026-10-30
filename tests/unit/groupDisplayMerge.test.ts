import manifoldModule, { type ManifoldToplevel } from "manifold-3d";
import { beforeAll, describe, expect, it } from "vitest";
import { buildGroupDisplayMesh, buildGroupedShapeFromSelection } from "@/lib/editorBooleans";
import { rememberManifoldRuntime } from "@/lib/manifoldHandle";
import type { WorkplaneShape } from "@/types/layerling";

let runtime: ManifoldToplevel;

beforeAll(async () => {
  runtime = await manifoldModule();
  runtime.setup();
  rememberManifoldRuntime(runtime);
});

function solid(id: string, x: number, z: number, kind: string = "box", color = "#ff0000"): WorkplaneShape {
  return {
    id, name: id, kind, color, x, z, elevation: 0, size: 10, width: 10, depth: 10, height: 10, rotation: 0,
  } as unknown as WorkplaneShape;
}

function bounds(mesh: NonNullable<WorkplaneShape["importedMesh"]>) {
  const min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
  const max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
  for (let offset = 0; offset < mesh.positions.length; offset += 3) {
    for (let axis = 0; axis < 3; axis += 1) {
      min[axis] = Math.min(min[axis], mesh.positions[offset + axis]);
      max[axis] = Math.max(max[axis], mesh.positions[offset + axis]);
    }
  }
  return { min, max };
}

describe("display-only group merge", () => {
  it("keeps saved groups as original parts and builds derived geometry only for display", async () => {
    const result = await buildGroupedShapeFromSelection([solid("a", 0, 0), solid("b", 5, 5, "box", "#0000ff")], 100_000);
    expect(result.group).toBeTruthy();
    expect(result.group?.importedMesh).toBeUndefined();
    expect(result.group?.groupedShapes).toHaveLength(2);
    expect(result.group?.multicolor).toBeUndefined();

    const mesh = buildGroupDisplayMesh(result.group!);
    expect(mesh).toBeTruthy();
    expect(mesh?.triangleCount).toBeGreaterThan(0);
  });

  it("keeps the same merged geometry when selection order is reversed", async () => {
    const cylinderFirst = await buildGroupedShapeFromSelection([
      solid("cylinder", 0, 0, "cylinder", "#ff8800"),
      solid("cube", 4, 0, "box", "#ff0000"),
    ], 100_000);
    const firstMesh = buildGroupDisplayMesh(cylinderFirst.group!);
    expect(firstMesh).toBeTruthy();

    const cubeFirst = await buildGroupedShapeFromSelection([
      solid("cube", 4, 0, "box", "#ff0000"),
      solid("cylinder", 0, 0, "cylinder", "#ff8800"),
    ], 100_000);
    const reverseMesh = buildGroupDisplayMesh(cubeFirst.group!);
    expect(reverseMesh).toBeTruthy();

    const firstBounds = bounds(firstMesh!);
    const reverseBounds = bounds(reverseMesh!);
    for (let axis = 0; axis < 3; axis += 1) {
      expect(reverseBounds.min[axis]).toBeCloseTo(firstBounds.min[axis], 3);
      expect(reverseBounds.max[axis]).toBeCloseTo(firstBounds.max[axis], 3);
    }
    // Equal bounds alone can hide different triangle splits at shared/coplanar faces. The canonical
    // operand order must produce the same triangle positions as well.
    expect(reverseMesh!.positions).toEqual(firstMesh!.positions);
  });
});
