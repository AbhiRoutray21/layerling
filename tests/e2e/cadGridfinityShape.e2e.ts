import { beforeAll, describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { OcctKernel, type ShapeHandle } from "occt-wasm";
import type { CadModifierGridfinityPart } from "@/lib/cadModifierTypes";
import { GRIDFINITY_LIP_HEIGHT, gridfinityTriangles } from "@/lib/gridfinityGeometry";
import { gridfinityPartSolid } from "@/lib/gridfinitySolid";

/*
 * Gridfinity bins and baseplates as exact bodies, held to the mesh the editor
 * draws, and to each other: a bin stands in the baseplate and on another bin
 * without the two overlapping, and moved a little sideways it would.
 */

let cad: OcctKernel;

beforeAll(async () => {
  const wasm = join(dirname(fileURLToPath(import.meta.resolve("occt-wasm"))), "occt-wasm.wasm");
  cad = await OcctKernel.init({ wasm });
});

function bin(extra: Partial<CadModifierGridfinityPart> = {}): CadModifierGridfinityPart {
  return { width: 83.5, depth: 41.5, height: 21 + GRIDFINITY_LIP_HEIGHT, gridfinityType: "bin", gridfinityLip: true, gridfinityMagnets: false, ...extra };
}

function plate(extra: Partial<CadModifierGridfinityPart> = {}): CadModifierGridfinityPart {
  return { width: 84, depth: 42, height: 5, gridfinityType: "baseplate", gridfinityLip: false, gridfinityMagnets: false, ...extra };
}

function meshVolume(part: CadModifierGridfinityPart) {
  return gridfinityTriangles(part).reduce((sum, [a, b, c]) => sum + (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6, 0);
}

function meshBounds(part: CadModifierGridfinityPart) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  gridfinityTriangles(part).flat().forEach((v) => v.forEach((n, i) => { min[i] = Math.min(min[i], n); max[i] = Math.max(max[i], n); }));
  return { min, max };
}

function overlap(a: ShapeHandle, b: ShapeHandle) {
  return Math.abs(cad.getVolume(cad.common(a, b)));
}

describe("exact Gridfinity bodies", () => {
  it("builds bins and baseplates as one valid solid with the mesh's volume and box", () => {
    for (const part of [bin(), bin({ gridfinityLip: false }), bin({ gridfinityMagnets: true }), bin({ width: 41.5, depth: 41.5, height: 7 + GRIDFINITY_LIP_HEIGHT }), bin({ width: 125.5, depth: 125.5, height: 42 + GRIDFINITY_LIP_HEIGHT, gridfinityMagnets: true }), plate(), plate({ width: 126, depth: 126 })]) {
      const solid = gridfinityPartSolid(cad, part);
      expect(cad.isValid(solid)).toBe(true);
      const exact = Math.abs(cad.getVolume(solid));
      // The mesh draws the arcs as polygons inside them, so it is a little smaller.
      expect(Math.abs(exact - meshVolume(part)) / exact).toBeLessThan(0.002);
      const box = cad.getBoundingBox(solid);
      const { min, max } = meshBounds(part);
      [box.xmin - min[0], box.ymin - min[1], box.zmin - min[2], box.xmax - max[0], box.ymax - max[1], box.zmax - max[2]].forEach((d) => expect(Math.abs(d)).toBeLessThan(0.01));
    }
  });

  it("fits bins in baseplates 0.25 mm up, where a bigger bin rests on the ridges, and 0.3 mm sideways they overlap", () => {
    for (const [binSize, plateSize] of [[41.5, 42], [83.5, 84]]) {
      const b = gridfinityPartSolid(cad, bin({ width: binSize, depth: binSize }));
      const p = gridfinityPartSolid(cad, plate({ width: plateSize, depth: plateSize }));
      const seated = cad.translate(b, 0, 0.25, 0);
      expect(overlap(seated, p)).toBeLessThan(0.01);
      expect(overlap(cad.translate(seated, 0.3, 0, 0), p)).toBeGreaterThan(1);
    }
    // On the plate's floor a bin of 2 x 2 units would stand in the ridges between its feet.
    expect(overlap(gridfinityPartSolid(cad, bin({ width: 83.5, depth: 83.5 })), gridfinityPartSolid(cad, plate({ width: 84, depth: 84 })))).toBeGreaterThan(1);
  });

  it("stacks a bin on another: it sinks 0.35 mm into the lip until the slopes meet", () => {
    const lower = gridfinityPartSolid(cad, bin({ width: 41.5, depth: 41.5 }));
    const upper = gridfinityPartSolid(cad, bin({ width: 41.5, depth: 41.5 }));
    expect(overlap(lower, cad.translate(upper, 0, 21, 0))).toBeLessThan(0.01);
    expect(overlap(lower, cad.translate(upper, 0, 21 - 0.34, 0))).toBeLessThan(0.01);
    expect(overlap(lower, cad.translate(upper, 0, 21 - 0.5, 0))).toBeGreaterThan(1);
  });

  it("takes a fillet and a chamfer on the sharp top of the lip", () => {
    const solid = gridfinityPartSolid(cad, bin());
    const top = cad.getBoundingBox(solid).ymax;
    const edges = cad.getSubShapes(solid, "edge").filter((edge) => {
      const box = cad.getBoundingBox(edge);
      return box.ymin > top - 1e-6;
    });
    expect(edges.length).toBeGreaterThan(0);
    const filleted = cad.fillet(solid, edges, 0.5);
    expect(cad.isValid(filleted)).toBe(true);
    expect(Math.abs(cad.getVolume(filleted))).toBeLessThan(Math.abs(cad.getVolume(solid)));
    expect(cad.isValid(cad.chamfer(solid, edges, 0.5))).toBe(true);
  });
});
