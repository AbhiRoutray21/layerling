import { describe, expect, it } from "vitest";
import { bottomCadModifierEdgeIds, topCadModifierEdgeIds, verticalCadModifierEdgeIds } from "@/lib/topEdges";
import type { CadModifierEdge } from "@/lib/cadModifierTypes";

const edge = (id: number, points: number[]): CadModifierEdge => ({ id, points, display: true, selectable: true, angle: 90, boundary: false, manifold: true });

describe("top edges (#154)", () => {
  // A 10 mm high frame: rim at y = 10, foot at y = 0, one upright edge between them.
  const edges = [
    edge(1, [0, 10, 0, 20, 10, 0]),
    edge(2, [20, 10, 0, 20, 10, 20]),
    edge(3, [0, 0, 0, 20, 0, 0]),
    edge(4, [0, 0, 0, 0, 10, 0]),
  ];

  it("picks the edges whose every point lies at the highest level", () => {
    expect(topCadModifierEdgeIds(edges, [1, 2, 3, 4])).toEqual([1, 2]);
  });

  it("only offers edges the tool can treat", () => {
    expect(topCadModifierEdgeIds(edges, [2, 3])).toEqual([2]);
    expect(topCadModifierEdgeIds([], [])).toEqual([]);
  });
});

describe("vertical edges (#427)", () => {
  // The four corners of a box 20 x 20 x 10 mm, the rim above and the foot below, a slanted edge and a curve
  const edges = [
    edge(1, [0, 0, 0, 0, 10, 0]),
    edge(2, [20, 0, 0, 20, 10, 0]),
    edge(3, [20, 0, 20, 20, 10, 20]),
    edge(4, [0, 0, 20, 0, 10, 20]),
    edge(5, [0, 10, 0, 20, 10, 0]),
    edge(6, [0, 0, 0, 20, 0, 0]),
    edge(7, [0, 0, 0, 5, 10, 0]),
    // a quarter circle standing upright in the x-y plane: not a straight line up
    edge(8, [0, 0, 0, 3, 3, 0, 5, 7, 0, 5, 10, 0]),
    // a short piece standing up, nearly vertical within the tolerance
    edge(9, [1, 0, 1, 1.0002, 5, 1.0001]),
    // too short to stand anywhere
    edge(10, [0, 0, 0, 0, 0.001, 0]),
  ];

  it("picks the edges that stand straight up and nothing else", () => {
    expect(verticalCadModifierEdgeIds(edges, edges.map((entry) => entry.id))).toEqual([1, 2, 3, 4, 9]);
  });

  it("only offers edges the tool can treat", () => {
    expect(verticalCadModifierEdgeIds(edges, [1, 5, 9])).toEqual([1, 9]);
    expect(verticalCadModifierEdgeIds([], [])).toEqual([]);
  });

  it("finds none on a body without upright edges", () => {
    expect(verticalCadModifierEdgeIds([edges[4], edges[5], edges[6]], [5, 6, 7])).toEqual([]);
  });
});

describe("bottom edges (#473)", () => {
  // The same 10 mm high frame: rim at y = 10, foot at y = 0, one upright edge between them.
  const edges = [
    edge(1, [0, 10, 0, 20, 10, 0]),
    edge(2, [20, 10, 0, 20, 10, 20]),
    edge(3, [0, 0, 0, 20, 0, 0]),
    edge(4, [0, 0, 0, 0, 10, 0]),
    edge(5, [20, 0, 0, 20, 0, 20]),
  ];

  it("picks the edges whose every point lies at the lowest level", () => {
    expect(bottomCadModifierEdgeIds(edges, [1, 2, 3, 4, 5])).toEqual([3, 5]);
  });

  it("is the mirror of the top edges", () => {
    const mirrored = edges.map((e) => ({ ...e, points: e.points.map((v, i) => (i % 3 === 1 ? 10 - v : v)) }));
    expect(bottomCadModifierEdgeIds(mirrored, [1, 2, 3, 4, 5])).toEqual(topCadModifierEdgeIds(edges, [1, 2, 3, 4, 5]));
  });

  it("only offers edges the tool can treat, and finds nothing in an empty body", () => {
    expect(bottomCadModifierEdgeIds(edges, [3, 1])).toEqual([3]);
    expect(bottomCadModifierEdgeIds([], [])).toEqual([]);
  });
});
