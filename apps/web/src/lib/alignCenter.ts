import { transformMesh } from "@/lib/editorMeshCore";
import { pyramidAngleOffset } from "@/lib/pyramidGeometry";
import { regularPolygonFootprintScale } from "@/lib/regularPolygonFootprint";
import type { WorkplaneShape } from "@/types/layerling";

export type AlignPoint = { x: number; y: number; z: number };

/**
 * Where the middle of a shape's own outline lies, in the shape's own frame, or null when it is the middle of
 * its box. A triangle, a pentagon or a five-pointed star stands inside its box with its middle off the box's:
 * the polygons are fitted into the box, the star is drawn round its own middle (#268).
 */
function ownMiddle(shape: WorkplaneShape): { x: number; z: number } | null {
  if (shape.groupedShapes?.length) return null;
  if (shape.kind === "star") return { x: 0, z: 0 };
  if (shape.kind === "polygon") {
    const fit = regularPolygonFootprintScale(shape.width, shape.depth, Math.max(3, Math.round(shape.sides ?? 6)));
    return { x: fit.offsetX, z: fit.offsetZ };
  }
  if (shape.kind === "pyramid") {
    const sides = Math.max(3, Math.round(shape.sides ?? 4));
    const fit = regularPolygonFootprintScale(shape.width, shape.depth, sides, pyramidAngleOffset(sides));
    return { x: fit.offsetX, z: fit.offsetZ };
  }
  return null;
}

/**
 * The point "Centre" in the align tool means for a shape, in the world, or null where it is simply the middle of
 * the box round it. A hole put in the middle of a pentagon then sits in the middle of the pentagon, not 1.9 mm
 * beside it (#268). Edges - left, right, front, back, top, bottom - stay measured on the box.
 */
export function alignNaturalCenter(shape: WorkplaneShape): AlignPoint | null {
  const middle = ownMiddle(shape);
  if (!middle) return null;
  // A polygon whose middle is its box's needs no special treatment; a star's middle is its own point whatever its box does.
  if (shape.kind !== "star" && Math.abs(middle.x) < 1e-9 && Math.abs(middle.z) < 1e-9) return null;
  const placed = transformMesh({ name: "centre", vertices: [[middle.x, shape.height / 2, middle.z]], faces: [] }, shape).vertices[0];
  return placed ? { x: placed[0], y: placed[1], z: placed[2] } : null;
}
