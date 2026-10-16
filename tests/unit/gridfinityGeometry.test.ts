import { describe, expect, it } from "vitest";
import {
  GRIDFINITY_LIP_HEIGHT,
  gridfinityFootprintPatch,
  gridfinityPlan,
  gridfinityShapePatch,
  gridfinityTriangles,
  gridfinityUnits,
} from "@/lib/gridfinityGeometry";

type V = [number, number, number];

function weld(triangles: V[][]) {
  const ids = new Map<string, number>();
  const id = (v: V) => {
    const key = v.map((n) => Math.round(n * 1e5)).join(",");
    if (!ids.has(key)) ids.set(key, ids.size);
    return ids.get(key)!;
  };
  return triangles.map((t) => t.map(id) as [number, number, number]);
}

/** Every directed edge appears once and its reverse once: closed, consistently wound, two-manifold. */
function edgeProblems(triangles: V[][]) {
  const faces = weld(triangles);
  const directed = new Map<string, number>();
  faces.forEach(([a, b, c]) => {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      if (p === q) continue;
      const key = `${p}>${q}`;
      directed.set(key, (directed.get(key) ?? 0) + 1);
    }
  });
  let problems = 0;
  directed.forEach((count, key) => {
    const [p, q] = key.split(">");
    if (count !== 1 || directed.get(`${q}>${p}`) !== 1) problems += 1;
  });
  return problems;
}

function signedVolume(triangles: V[][]) {
  return triangles.reduce((sum, [a, b, c]) => sum + (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6, 0);
}

function components(triangles: V[][]) {
  const faces = weld(triangles);
  const parent = new Map<number, number>();
  const find = (x: number): number => { const p = parent.get(x) ?? x; if (p === x) return x; const r = find(p); parent.set(x, r); return r; };
  faces.forEach(([a, b, c]) => { parent.set(find(b), find(a)); parent.set(find(c), find(a)); });
  return new Set(faces.map(([a]) => find(a))).size;
}

function bounds(triangles: V[][]) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  triangles.flat().forEach((v) => v.forEach((n, i) => { min[i] = Math.min(min[i], n); max[i] = Math.max(max[i], n); }));
  return { min, max };
}

/** Where the solid is along x at height y, on the line z = 0.5 (clear of the mesh's own vertices): the x of every wall the line crosses. */
function crossings(triangles: V[][], y: number, z = 0.5) {
  const xs: number[] = [];
  triangles.forEach((t) => {
    const points: Array<[number, number]> = [];
    for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) {
      if ((a[2] - z) * (b[2] - z) < 0) {
        const s = (z - a[2]) / (b[2] - a[2]);
        points.push([a[0] + s * (b[0] - a[0]), a[1] + s * (b[1] - a[1])]);
      }
    }
    if (points.length === 2) {
      const [[x1, y1], [x2, y2]] = points;
      if ((y1 - y) * (y2 - y) < 0) xs.push(x1 + ((y - y1) / (y2 - y1)) * (x2 - x1));
    }
  });
  return xs.sort((a, b) => a - b);
}

const bin = (fields: Record<string, unknown> = {}) => ({ width: 83.5, depth: 41.5, height: 21 + GRIDFINITY_LIP_HEIGHT, gridfinityType: "bin" as const, gridfinityLip: true, ...fields });
const plate = (fields: Record<string, unknown> = {}) => ({ width: 84, depth: 42, height: 5, gridfinityType: "baseplate" as const, ...fields });

describe("gridfinity sizes", () => {
  it("takes the grid units from the size: 42 mm a unit, a bin 0.5 mm smaller, 7 mm a height unit", () => {
    expect(gridfinityUnits(bin())).toEqual({ x: 2, z: 1, y: 3 });
    expect(gridfinityUnits(plate())).toEqual({ x: 2, z: 1, y: 1 });
    expect(gridfinityUnits(bin({ width: 125.5, depth: 125.5, height: 42, gridfinityLip: false }))).toEqual({ x: 3, z: 3, y: 6 });
  });

  it("snaps a dragged size to whole units and keeps them between 1 and 6 across", () => {
    expect(gridfinityFootprintPatch(bin({ width: 100, depth: 30, height: 30 }))).toEqual({ width: 83.5, depth: 41.5, height: 28 + GRIDFINITY_LIP_HEIGHT });
    expect(gridfinityFootprintPatch(bin({ width: 1000, depth: 1, height: 1 }))).toEqual({ width: 251.5, depth: 41.5, height: 7 + GRIDFINITY_LIP_HEIGHT });
    expect(gridfinityFootprintPatch(plate({ width: 130, depth: 40, height: 20 }))).toEqual({ width: 126, depth: 42, height: 5 });
  });

  it("is 7 mm a unit tall, and the stacking lip adds 4.4 mm: a 3 unit bin is 25.4 mm", () => {
    expect(gridfinityFootprintPatch(bin({ gridfinityLip: false, height: 21 })).height).toBe(21);
    expect(gridfinityFootprintPatch(bin()).height).toBeCloseTo(25.4, 9);
  });

  it("writes the box of whole units for a change of type, units or lip", () => {
    expect(gridfinityShapePatch(bin(), { x: 3 })).toEqual({ gridfinityType: "bin", gridfinityLip: true, width: 125.5, depth: 41.5, height: 21 + GRIDFINITY_LIP_HEIGHT });
    expect(gridfinityShapePatch(bin(), { lip: false })).toMatchObject({ gridfinityLip: false, height: 21 });
    expect(gridfinityShapePatch(bin(), { type: "baseplate" })).toMatchObject({ gridfinityType: "baseplate", width: 84, depth: 42, height: 5 });
    // A baseplate has no height units; turned into a bin it gets the default three.
    expect(gridfinityShapePatch(plate(), { type: "bin" })).toMatchObject({ gridfinityType: "bin", width: 83.5, depth: 41.5, height: 21 + GRIDFINITY_LIP_HEIGHT });
    expect(gridfinityShapePatch(bin(), { x: 9, y: 0 })).toMatchObject({ width: 251.5, height: 7 + GRIDFINITY_LIP_HEIGHT });
  });

  it("keeps the height units when only the lip is switched", () => {
    expect(gridfinityFootprintPatch(bin({ gridfinityLip: false })).height).toBe(21);
    expect(gridfinityFootprintPatch(bin({ gridfinityLip: true, height: 21 })).height).toBeCloseTo(25.4, 9);
    for (let y = 1; y <= 20; y += 1) {
      expect(gridfinityUnits(bin({ height: 7 * y, gridfinityLip: true })).y).toBe(y);
      expect(gridfinityUnits(bin({ height: 7 * y + GRIDFINITY_LIP_HEIGHT, gridfinityLip: false })).y).toBe(y);
    }
  });
});

describe("gridfinity bin", () => {
  it("is closed, wound outwards and one piece, with and without lip and magnet holes", () => {
    for (const fields of [{}, { gridfinityLip: false }, { gridfinityMagnets: true }, { width: 41.5, depth: 41.5, height: 7 + GRIDFINITY_LIP_HEIGHT }, { width: 125.5, depth: 83.5, height: 42, gridfinityLip: false, gridfinityMagnets: true }]) {
      const triangles = gridfinityTriangles(bin(fields));
      expect(edgeProblems(triangles)).toBe(0);
      expect(signedVolume(triangles)).toBeGreaterThan(0);
      expect(components(triangles)).toBe(1);
    }
  });

  it("stands on y = 0 and fills its box exactly", () => {
    const { min, max } = bounds(gridfinityTriangles(bin()));
    expect(min[0]).toBeCloseTo(-41.75, 6);
    expect(max[0]).toBeCloseTo(41.75, 6);
    expect(min[2]).toBeCloseTo(-20.75, 6);
    expect(max[2]).toBeCloseTo(20.75, 6);
    expect(min[1]).toBeCloseTo(0, 6);
    expect(max[1]).toBeCloseTo(21 + GRIDFINITY_LIP_HEIGHT, 3);
  });

  it("has the specification's foot: 0.8 at 45 degrees, 1.8 straight, 2.15 at 45 degrees", () => {
    const triangles = gridfinityTriangles(bin({ width: 41.5, depth: 41.5 }));
    // The outer wall on the line z = 0, measured in from the bin's side at x = -20.75.
    const inset = (y: number) => crossings(triangles, y)[0] + 20.75;
    expect(inset(0.4)).toBeCloseTo(2.55, 6);
    expect(inset(1.7)).toBeCloseTo(2.15, 6);
    expect(inset(3.675)).toBeCloseTo(1.075, 6);
    expect(inset(6)).toBeCloseTo(0, 6);
  });

  it("has the specification's lip: in 0.7 at 45 degrees, 1.8 straight, then 45 degrees up to a sharp top on the outer wall", () => {
    const triangles = gridfinityTriangles(bin({ width: 41.5, depth: 41.5 }));
    const innerWall = (y: number) => crossings(triangles, y)[1] + 20.75;
    expect(innerWall(21.35)).toBeCloseTo(2.25, 6);
    expect(innerWall(22.6)).toBeCloseTo(1.9, 6);
    expect(innerWall(24.4)).toBeCloseTo(1, 6);
    expect(innerWall(25.3)).toBeCloseTo(0.1, 6);
  });

  it("runs the lip's support down to the floor in a bin of one height unit, which has no straight wall inside", () => {
    // Floor at 4.75 + 1.2 = 5.95; the support slopes in 45 degrees from 2.6 at the top (7) down to 1.55 at the floor.
    const triangles = gridfinityTriangles(bin({ width: 41.5, depth: 41.5, height: 7 + GRIDFINITY_LIP_HEIGHT }));
    const innerWall = (y: number) => crossings(triangles, y)[1] + 20.75;
    expect(innerWall(6.3)).toBeCloseTo(1.9, 6);
    expect(innerWall(6.8)).toBeCloseTo(2.4, 6);
    // Under the floor the bin is solid: only its two outer walls, no wall folded back below the floor.
    expect(crossings(triangles, 5.6)).toHaveLength(2);
  });

  it("puts a magnet hole 6.5 mm wide 13 mm from each unit's middle, both ways", () => {
    const plan = gridfinityPlan(bin({ gridfinityMagnets: true }));
    expect(plan.magnetHoles).toHaveLength(8);
    expect(plan.magnetHoles).toContainEqual({ x: -21 - 13, z: -13 });
    expect(plan.magnetHoles).toContainEqual({ x: 21 + 13, z: 13 });
    const triangles = gridfinityTriangles(bin({ width: 41.5, depth: 41.5, gridfinityMagnets: true }));
    // On the line z = 13.5 at y = 1 the hole is open for its chord there: 13 -+ sqrt(3.25^2 - 0.5^2).
    const xs = crossings(triangles, 1, 13.5).filter((x) => x > 5 && x < 18);
    expect(xs[0]).toBeCloseTo(13 - Math.sqrt(3.25 ** 2 - 0.25), 1);
    expect(xs[1]).toBeCloseTo(13 + Math.sqrt(3.25 ** 2 - 0.25), 1);
  });
});

describe("gridfinity baseplate", () => {
  it("is closed, wound outwards and one piece", () => {
    for (const fields of [{}, { width: 42, depth: 42 }, { width: 252, depth: 126 }]) {
      const triangles = gridfinityTriangles(plate(fields));
      expect(edgeProblems(triangles)).toBe(0);
      expect(signedVolume(triangles)).toBeGreaterThan(0);
      expect(components(triangles)).toBe(1);
    }
  });

  it("is 5 mm tall: the specification's 0.7, 1.8 and 2.15 on a 0.35 mm band", () => {
    const triangles = gridfinityTriangles(plate());
    const { min, max } = bounds(triangles);
    expect(max[0] - min[0]).toBeCloseTo(84, 6);
    expect(max[1]).toBeCloseTo(5, 6);
    // The ridge between the two sockets at x = 0: its right face, measured from the grid line.
    const ridge = (y: number) => crossings(triangles, y).filter((x) => x > 0 && x < 5)[0];
    expect(ridge(0.2)).toBeCloseTo(2.85, 6);
    expect(ridge(0.7)).toBeCloseTo(2.5, 6);
    expect(ridge(2)).toBeCloseTo(2.15, 6);
    expect(ridge(4)).toBeCloseTo(1, 6);
  });

  it("leaves 0.25 mm all round the feet of a bin resting 0.25 mm up on the ridges between the sockets", () => {
    const binWall = (y: number) => crossings(gridfinityTriangles(bin({ width: 41.5, depth: 41.5 })), y)[0] + 21;
    const plateWall = (y: number) => crossings(gridfinityTriangles(plate({ width: 42, depth: 42 })), y)[1] + 21;
    // At the plate's height y the seated bin is at its own height y - 0.25: on both slopes and the straight part.
    for (const y of [0.75, 2, 4]) expect(binWall(y - 0.25) - plateWall(y)).toBeCloseTo(0.25, 6);
  });
});
