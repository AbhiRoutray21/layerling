import type { OcctKernel, ShapeHandle } from "occt-wasm";
import type { CadModifierGridfinityPart } from "@/lib/cadModifierTypes";
import {
  GRIDFINITY_BASEPLATE_HEIGHT,
  GRIDFINITY_BASEPLATE_RADIUS,
  GRIDFINITY_BIN_RADIUS,
  GRIDFINITY_CLEARANCE,
  GRIDFINITY_FOOT,
  GRIDFINITY_FOOT_HEIGHT,
  GRIDFINITY_GRID,
  GRIDFINITY_MAGNET_DEPTH,
  GRIDFINITY_MAGNET_DIAMETER,
  GRIDFINITY_SOCKET,
  type GridfinityPlan,
  type GridfinityStep,
  gridfinityPlan,
  gridfinityWallProfile,
} from "@/lib/gridfinityGeometry";

/*
 * The exact body of a Gridfinity bin or baseplate, from the same plan as its
 * display mesh (`gridfinityTriangles`), with true arcs where the mesh has
 * polygons. Each foot and each socket is a ruled loft through its steps; the
 * bin is the feet joined to the block above them, the inside cut out by a
 * loft through the wall's inner steps (the lip, its support, the floor), and
 * the magnet holes drilled into the feet. The baseplate is a slab with the
 * sockets cut through it.
 *
 * Built with z up (the kernel's loft frame) and stood up on y at the end.
 */

/** z up to y up: (x, y, z) -> (x, z, -y). */
const Z_TO_Y_UP = [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0];
/** How far a cutting loft reaches past the face it opens, so the faces do not coincide. */
const PAST = 0.01;

function oneSolid(cad: OcctKernel, shape: ShapeHandle, what: string) {
  const solids = cad.isSolid(shape) ? [shape] : cad.getSubShapes(shape, "solid");
  if (solids.length !== 1) throw new Error(`The Gridfinity ${what} came out as ${solids.length} solids`);
  return solids[0];
}

/**
 * A rounded rectangle at height z, centred on (cx, cz) of the shape's frame,
 * as a closed wire. The shape's depth (z) is the kernel's -y, so the turn up
 * at the end puts it back.
 */
function roundedWire(cad: OcctKernel, cx: number, cz: number, hx: number, hz: number, radius: number, z: number) {
  const at = (x: number, depth: number) => ({ x: cx + x, y: -(cz + depth), z });
  const ax = hx - radius;
  const az = hz - radius;
  const k = radius * Math.SQRT1_2;
  return cad.makeWire([
    cad.makeLineEdge(at(-ax, -hz), at(ax, -hz)),
    cad.makeArcEdge(at(ax, -hz), at(ax + k, -az - k), at(hx, -az)),
    cad.makeLineEdge(at(hx, -az), at(hx, az)),
    cad.makeArcEdge(at(hx, az), at(ax + k, az + k), at(ax, hz)),
    cad.makeLineEdge(at(ax, hz), at(-ax, hz)),
    cad.makeArcEdge(at(-ax, hz), at(-ax - k, az + k), at(-hx, az)),
    cad.makeLineEdge(at(-hx, az), at(-hx, -az)),
    cad.makeArcEdge(at(-hx, -az), at(-ax - k, -az - k), at(-ax, -hz)),
  ]);
}

/** A ruled loft through steps of one rounded rectangle, each set in by its inset with the corner centres kept. */
function steppedSolid(cad: OcctKernel, cx: number, cz: number, hx: number, hz: number, radius: number, steps: GridfinityStep[]) {
  return cad.loft(steps.map(([inset, y]) => roundedWire(cad, cx, cz, hx - inset, hz - inset, radius - inset, y)), true, true);
}

function prism(cad: OcctKernel, hx: number, hz: number, radius: number, from: number, to: number) {
  return cad.extrude(cad.makeFace(roundedWire(cad, 0, 0, hx, hz, radius, from)), 0, 0, to - from);
}

function binSolid(cad: OcctKernel, plan: GridfinityPlan) {
  const hx = plan.size.width / 2;
  const hz = plan.size.depth / 2;
  const cellHalf = GRIDFINITY_GRID / 2 - GRIDFINITY_CLEARANCE;
  const wall = gridfinityWallProfile(plan);
  const wallTop = wall[1][1];
  const feet = plan.cells.map((cell) => steppedSolid(cad, cell.x, cell.z, cellHalf, cellHalf, GRIDFINITY_BIN_RADIUS, GRIDFINITY_FOOT));
  let body = oneSolid(cad, cad.fuseAll([...feet, prism(cad, hx, hz, GRIDFINITY_BIN_RADIUS, GRIDFINITY_FOOT_HEIGHT, wallTop)]), "bin");
  // The inside, from the floor up: the wall's inner steps in rising order, then out past the top.
  const inside: GridfinityStep[] = wall.slice(2).reverse();
  if (plan.lip) inside.push([0, wallTop], [0, wallTop + PAST]);
  else inside.push([inside[inside.length - 1][0], wallTop + PAST]);
  body = oneSolid(cad, cad.cut(body, steppedSolid(cad, 0, 0, hx, hz, GRIDFINITY_BIN_RADIUS, inside)), "bin");
  if (plan.magnetHoles.length > 0) {
    const holes = plan.magnetHoles.map((hole) => cad.translate(cad.makeCylinder(GRIDFINITY_MAGNET_DIAMETER / 2, GRIDFINITY_MAGNET_DEPTH + PAST), hole.x, -hole.z, -PAST));
    body = oneSolid(cad, cad.cutAll(body, holes), "bin");
  }
  return body;
}

function baseplateSolid(cad: OcctKernel, plan: GridfinityPlan) {
  const half = GRIDFINITY_GRID / 2;
  const slab = prism(cad, plan.size.width / 2, plan.size.depth / 2, GRIDFINITY_BASEPLATE_RADIUS, 0, GRIDFINITY_BASEPLATE_HEIGHT);
  const last = GRIDFINITY_SOCKET[GRIDFINITY_SOCKET.length - 1];
  const steps: GridfinityStep[] = [[GRIDFINITY_SOCKET[0][0], -PAST], ...GRIDFINITY_SOCKET, [last[0], last[1] + PAST]];
  const sockets = plan.cells.map((cell) => steppedSolid(cad, cell.x, cell.z, half, half, GRIDFINITY_BASEPLATE_RADIUS, steps));
  return oneSolid(cad, cad.cutAll(slab, sockets), "baseplate");
}

/** The Gridfinity part's exact solid in the shape's own frame, y up. Throws when the kernel cannot build it. */
export function gridfinityPartSolid(cad: OcctKernel, part: CadModifierGridfinityPart): ShapeHandle {
  const plan = gridfinityPlan(part);
  const solid = plan.type === "bin" ? binSolid(cad, plan) : baseplateSolid(cad, plan);
  if (!cad.isValid(solid) || !(cad.getVolume(solid) > 0)) throw new Error("The Gridfinity body is not a valid solid");
  return cad.transform(solid, Z_TO_Y_UP);
}
