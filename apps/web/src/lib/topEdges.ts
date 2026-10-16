import type { CadModifierEdge } from "@/lib/cadModifierTypes";

/**
 * The edges along the very top of a body (#154): every point of the edge at the body's highest
 * level, such as the rim of a cookie cutter built from a stroked sketch. Picked from `candidateIds`
 * (the edges the tool offers at its threshold); the points are in the world, y up.
 */
/**
 * The edges that stand straight up: every point of the edge over the same place, only the height changes -
 * the corners of a box, the walls' meeting lines of an extruded outline (#427). Picked from `candidateIds`
 * (the edges the tool offers at its threshold); the points are in the world, y up.
 */
export function verticalCadModifierEdgeIds(edges: readonly CadModifierEdge[], candidateIds: readonly number[]): number[] {
  const candidates = new Set(candidateIds);
  return edges
    .filter((edge) => candidates.has(edge.id) && edge.points.length >= 6)
    .filter((edge) => {
      let minY = Number.POSITIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;
      for (let index = 1; index < edge.points.length; index += 3) {
        minY = Math.min(minY, edge.points[index]);
        maxY = Math.max(maxY, edge.points[index]);
      }
      const height = maxY - minY;
      if (!(height > 0.01)) return false;
      const tolerance = Math.max(0.001, height * 1e-3);
      for (let index = 3; index + 2 < edge.points.length; index += 3) {
        if (Math.abs(edge.points[index] - edge.points[0]) > tolerance || Math.abs(edge.points[index + 2] - edge.points[2]) > tolerance) return false;
      }
      return true;
    })
    .map((edge) => edge.id);
}

export function topCadModifierEdgeIds(edges: readonly CadModifierEdge[], candidateIds: readonly number[]): number[] {
  const candidates = new Set(candidateIds);
  let top = Number.NEGATIVE_INFINITY;
  let bottom = Number.POSITIVE_INFINITY;
  edges.forEach((edge) => {
    for (let index = 1; index < edge.points.length; index += 3) {
      top = Math.max(top, edge.points[index]);
      bottom = Math.min(bottom, edge.points[index]);
    }
  });
  if (!Number.isFinite(top)) return [];
  const tolerance = Math.max(0.001, (top - bottom) * 1e-4);
  return edges
    .filter((edge) => candidates.has(edge.id) && edge.points.length >= 6)
    .filter((edge) => {
      for (let index = 1; index < edge.points.length; index += 3) {
        if (edge.points[index] < top - tolerance) return false;
      }
      return true;
    })
    .map((edge) => edge.id);
}
