import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { GridfinityType, WorkplaneShape } from "@/types/layerling";

/*
 * Gridfinity (#381), the open storage system by Zack Freedman: bins on a 42 mm grid
 * that drop into a baseplate and stack on one another. Everything here is
 * built from the published measurements (the Gridfinity design reference
 * linked from gridfinity.xyz/specification), so a bin fits baseplates printed
 * from other designs and the other way round:
 *
 * - a grid unit is 42 x 42 mm, a bin 0.5 mm smaller (41.5 per unit), a height
 *   unit 7 mm; the stacking lip adds 4.4 mm on top;
 * - under each grid unit a bin has a foot: from the bottom 0.8 mm at 45
 *   degrees, 1.8 mm straight, 2.15 mm at 45 degrees, 4.75 mm in all;
 * - the lip on the top of the wall is the foot's counterpart: from the
 *   bottom 0.7 mm at 45 degrees, 1.8 mm straight, 1.9 mm at 45 degrees up to
 *   the outer wall;
 * - the baseplate has the same three steps as a socket in each grid unit
 *   (0.7, 1.8, 2.15), on a 0.35 mm band, 5 mm tall: a bin of more than one
 *   unit rests on the ridges between the sockets, 0.25 mm above the plate's
 *   underside, with 0.25 mm all round its feet; a bin of one unit has no
 *   ridge under it and sits down on the slopes;
 * - magnet holes for 6 x 2 mm magnets, 6.5 mm wide, 13 mm from the middle of
 *   each unit in both directions.
 *
 * The wall (0.95 mm), the floor (1.2 mm) and the depth of the magnet holes
 * (2.4 mm) are not in the specification and are fixed here. The top of the
 * lip is sharp as drawn; the edge tool rounds it. A baseplate has no magnet
 * holes: the specification's plate is an open frame with nothing to hold one.
 *
 * Every outline of the body is an inset of one rounded rectangle whose corner
 * centres stay where they are - the outer wall, the inside, each step of the
 * lip; and likewise each foot and each socket inside its grid cell. So all of
 * them share the same points: the walls are strips between neighbouring
 * outlines, point to point, and where a foot meets the bin above it the two
 * outlines have the very same edge. That keeps the mesh closed with no
 * T-junctions. The exact body (gridfinitySolid) is built from the same plan.
 */

export const GRIDFINITY_GRID = 42;
export const GRIDFINITY_HEIGHT_UNIT = 7;
export const GRIDFINITY_LIP_HEIGHT = 4.4;
export const GRIDFINITY_BASEPLATE_HEIGHT = 5;
export const GRIDFINITY_FOOT_HEIGHT = 4.75;
export const GRIDFINITY_CLEARANCE = 0.25;
export const GRIDFINITY_BIN_RADIUS = 3.75;
export const GRIDFINITY_BASEPLATE_RADIUS = 4;
export const GRIDFINITY_WALL = 0.95;
export const GRIDFINITY_FLOOR = 1.2;
export const GRIDFINITY_MAGNET_DIAMETER = 6.5;
export const GRIDFINITY_MAGNET_DEPTH = 2.4;
export const GRIDFINITY_MAGNET_OFFSET = 13;
export const MIN_GRIDFINITY_UNITS = 1;
export const MAX_GRIDFINITY_UNITS = 6;
export const MAX_GRIDFINITY_HEIGHT_UNITS = 20;
export const DEFAULT_GRIDFINITY_TYPE: GridfinityType = "bin";
export const DEFAULT_GRIDFINITY_UNITS = { x: 2, z: 1, y: 3 };
export const DEFAULT_GRIDFINITY_LIP = true;
export const DEFAULT_GRIDFINITY_MAGNETS = false;

/** Section of a foot, a socket or the wall: inset from the outline, at a height. */
export type GridfinityStep = [inset: number, y: number];

/** From the bottom: 0.8 at 45 degrees, 1.8 straight, 2.15 at 45 degrees, inset from the bin's 41.5 mm outline. */
export const GRIDFINITY_FOOT: GridfinityStep[] = [[2.95, 0], [2.15, 0.8], [2.15, 2.6], [0, 4.75]];
/** The baseplate's socket, inset from the 42 mm cell: a 0.35 band, then 0.7 at 45 degrees, 1.8 straight, 2.15 at 45 degrees. */
export const GRIDFINITY_SOCKET: GridfinityStep[] = [[2.85, 0], [2.85, 0.35], [2.15, 1.05], [2.15, 2.85], [0, 5]];
/** The lip's inner face, from where it leaves the support to the sharp top on the outer wall. */
const LIP: GridfinityStep[] = [[2.6, 0], [1.9, 0.7], [1.9, 2.5], [0, 4.4]];

const CORNER_STEPS = 8;
const MAGNET_SIDES = 32;

export type GridfinityShapeFields = Pick<WorkplaneShape, "width" | "height"> & {
  depth?: number;
  gridfinityType?: GridfinityType;
  gridfinityLip?: boolean;
  gridfinityMagnets?: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeGridfinityType(value?: string): GridfinityType {
  return value === "baseplate" ? "baseplate" : "bin";
}

function units(value: number | undefined, fallback: number, max: number) {
  return Number.isFinite(value) ? clamp(Math.round(value as number), MIN_GRIDFINITY_UNITS, max) : fallback;
}

/**
 * The grid units the size stands for: across (x), deep (z) and, for a bin,
 * high (y). The height is counted from half the lip: a bin of so many units
 * reads the same with the lip and without it, so switching the lip alone
 * keeps the units and only adds or takes off the 4.4 mm.
 */
export function gridfinityUnits(shape: GridfinityShapeFields) {
  const type = normalizeGridfinityType(shape.gridfinityType);
  const margin = type === "bin" ? 2 * GRIDFINITY_CLEARANCE : 0;
  return {
    x: units((shape.width + margin) / GRIDFINITY_GRID, DEFAULT_GRIDFINITY_UNITS.x, MAX_GRIDFINITY_UNITS),
    z: units(((shape.depth ?? shape.width) + margin) / GRIDFINITY_GRID, DEFAULT_GRIDFINITY_UNITS.z, MAX_GRIDFINITY_UNITS),
    y: type === "bin" ? units((shape.height - GRIDFINITY_LIP_HEIGHT / 2) / GRIDFINITY_HEIGHT_UNIT, DEFAULT_GRIDFINITY_UNITS.y, MAX_GRIDFINITY_HEIGHT_UNITS) : 1,
  };
}

/** The size of a bin or baseplate of so many units. */
export function gridfinitySize(type: GridfinityType, count: { x: number; z: number; y: number }, lip = true) {
  if (type === "baseplate") return { width: count.x * GRIDFINITY_GRID, depth: count.z * GRIDFINITY_GRID, height: GRIDFINITY_BASEPLATE_HEIGHT };
  return {
    width: count.x * GRIDFINITY_GRID - 2 * GRIDFINITY_CLEARANCE,
    depth: count.z * GRIDFINITY_GRID - 2 * GRIDFINITY_CLEARANCE,
    height: count.y * GRIDFINITY_HEIGHT_UNIT + (lip ? GRIDFINITY_LIP_HEIGHT : 0),
  };
}

/**
 * The size belongs to the grid: a drag on a handle writes width, depth and
 * height directly, so they are turned back into whole units here and the box
 * sits exactly on the body again.
 */
export function gridfinityFootprintPatch(shape: GridfinityShapeFields) {
  return gridfinitySize(normalizeGridfinityType(shape.gridfinityType), gridfinityUnits(shape), shape.gridfinityLip !== false);
}

/**
 * What a change of type, units or lip writes to the shape: the settings and
 * the box their whole units make. A baseplate keeps no height units, so a
 * baseplate turned into a bin gets the default 3.
 */
export function gridfinityShapePatch(shape: GridfinityShapeFields, next: { type?: GridfinityType; x?: number; z?: number; y?: number; lip?: boolean }) {
  const current = gridfinityUnits(shape);
  const currentType = normalizeGridfinityType(shape.gridfinityType);
  const type = next.type ?? currentType;
  const lip = next.lip ?? shape.gridfinityLip !== false;
  const count = {
    x: units(next.x ?? current.x, DEFAULT_GRIDFINITY_UNITS.x, MAX_GRIDFINITY_UNITS),
    z: units(next.z ?? current.z, DEFAULT_GRIDFINITY_UNITS.z, MAX_GRIDFINITY_UNITS),
    y: units(next.y ?? (currentType === "bin" ? current.y : DEFAULT_GRIDFINITY_UNITS.y), DEFAULT_GRIDFINITY_UNITS.y, MAX_GRIDFINITY_HEIGHT_UNITS),
  };
  const size = gridfinitySize(type, count, lip);
  return { gridfinityType: type, gridfinityLip: lip, ...size };
}

/** Everything the body is built from, in the shape's own frame: x across, z deep, y up from 0, centred on x and z. */
export function gridfinityPlan(shape: GridfinityShapeFields) {
  const type = normalizeGridfinityType(shape.gridfinityType);
  const count = gridfinityUnits(shape);
  const lip = type === "bin" && shape.gridfinityLip !== false;
  const magnets = type === "bin" && Boolean(shape.gridfinityMagnets);
  const size = gridfinitySize(type, count, lip);
  const cells: Array<{ x: number; z: number; i: number; j: number }> = [];
  for (let i = 0; i < count.x; i += 1) {
    for (let j = 0; j < count.z; j += 1) {
      cells.push({ i, j, x: (i - (count.x - 1) / 2) * GRIDFINITY_GRID, z: (j - (count.z - 1) / 2) * GRIDFINITY_GRID });
    }
  }
  const magnetHoles = magnets
    ? cells.flatMap((cell) => [-1, 1].flatMap((sx) => [-1, 1].map((sz) => ({ x: cell.x + sx * GRIDFINITY_MAGNET_OFFSET, z: cell.z + sz * GRIDFINITY_MAGNET_OFFSET }))))
    : [];
  const top = count.y * GRIDFINITY_HEIGHT_UNIT;
  return { type, count, lip, magnets, size, cells, magnetHoles, top };
}

export type GridfinityPlan = ReturnType<typeof gridfinityPlan>;

/**
 * The bin's wall from the outside over the top to the floor inside, as insets
 * from the outline: up the outer wall, over the lip (or the flat top of a bin
 * without one), down the inside to the floor. The lip rests on a 45 degree
 * support that grows out of the wall below it.
 */
export function gridfinityWallProfile(plan: GridfinityPlan): GridfinityStep[] {
  const floor = GRIDFINITY_FOOT_HEIGHT + GRIDFINITY_FLOOR;
  const top = plan.top;
  if (!plan.lip) return [[0, GRIDFINITY_FOOT_HEIGHT], [0, top], [GRIDFINITY_WALL, top], [GRIDFINITY_WALL, floor]];
  const profile: GridfinityStep[] = [[0, GRIDFINITY_FOOT_HEIGHT]];
  [...LIP].reverse().forEach(([inset, y]) => profile.push([inset, top + y]));
  const support = LIP[0][0] - GRIDFINITY_WALL;
  // A low bin has no straight wall inside: the support runs down to the floor.
  if (top - support > floor) profile.push([GRIDFINITY_WALL, top - support], [GRIDFINITY_WALL, floor]);
  else profile.push([LIP[0][0] - (top - floor), floor]);
  return profile;
}

type LoopPoint = { x: number; z: number; nx: number; nz: number };

/**
 * A rounded rectangle centred on (cx, cz), half sizes hx and hz, corner
 * radius `radius`, set in by `inset` with its corner centres kept. The points
 * on the straight sides are the corner ends plus `breaksX` (on the two sides
 * along x) and `breaksZ`, so that outlines of one family match point for
 * point.
 */
function roundedLoop(cx: number, cz: number, hx: number, hz: number, radius: number, inset: number, breaksX: number[] = [], breaksZ: number[] = []): LoopPoint[] {
  const ax = hx - radius;
  const az = hz - radius;
  const r = radius - inset;
  const points: LoopPoint[] = [];
  const side = (fromX: number, fromZ: number, toX: number, toZ: number, nx: number, nz: number, breaks: number[]) => {
    points.push({ x: fromX, z: fromZ, nx, nz });
    const along = fromX !== toX;
    const ordered = breaks.filter((b) => (along ? b > Math.min(fromX, toX) + 1e-9 && b < Math.max(fromX, toX) - 1e-9 : b > Math.min(fromZ, toZ) + 1e-9 && b < Math.max(fromZ, toZ) - 1e-9));
    ordered.sort((a, b) => (along ? (toX > fromX ? a - b : b - a) : toZ > fromZ ? a - b : b - a));
    ordered.forEach((b) => points.push(along ? { x: b, z: fromZ, nx, nz } : { x: fromX, z: b, nx, nz }));
    points.push({ x: toX, z: toZ, nx, nz });
  };
  const corner = (ox: number, oz: number, from: number) => {
    for (let k = 1; k < CORNER_STEPS; k += 1) {
      const angle = from + (k / CORNER_STEPS) * (Math.PI / 2);
      points.push({ x: ox + r * Math.cos(angle), z: oz + r * Math.sin(angle), nx: Math.cos(angle), nz: Math.sin(angle) });
    }
  };
  side(cx - ax, cz - az - r, cx + ax, cz - az - r, 0, -1, breaksX);
  corner(cx + ax, cz - az, -Math.PI / 2);
  side(cx + ax + r, cz - az, cx + ax + r, cz + az, 1, 0, breaksZ);
  corner(cx + ax, cz + az, 0);
  side(cx + ax, cz + az + r, cx - ax, cz + az + r, 0, 1, breaksX);
  corner(cx - ax, cz + az, Math.PI / 2);
  side(cx - ax - r, cz + az, cx - ax - r, cz - az, -1, 0, breaksZ);
  corner(cx - ax, cz - az, Math.PI);
  return points;
}

type Vec3 = [number, number, number];
type Box = { x0: number; x1: number; z0: number; z1: number; edge: (sign: number, axis: "x" | "z") => boolean };

/**
 * The display body as closed, watertight triangles. Walls are strips between
 * outlines of one family; the flat parts (the bin's underside between its
 * feet, the baseplate's top and bottom) are the ring between each grid cell
 * and the foot or socket in it - a strip along each side and a fan from each
 * corner of the cell, both left out where they have no width.
 */
export function gridfinityTriangles(shape: GridfinityShapeFields) {
  const plan = gridfinityPlan(shape);
  const triangles: Vec3[][] = [];
  const push = (a: Vec3, b: Vec3, c: Vec3, want: Vec3) => {
    const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
    if (Math.hypot(n[0], n[1], n[2]) < 1e-12) return;
    triangles.push(n[0] * want[0] + n[1] * want[1] + n[2] * want[2] >= 0 ? [a, b, c] : [a, c, b]);
  };
  const at = (p: { x: number; z: number }, y: number): Vec3 => [p.x, y, p.z];

  /** Strips between the outlines of a profile; `outside` is +1 where the material is inside the outline, -1 where it is outside (a socket). */
  const sweep = (loop: (inset: number) => LoopPoint[], profile: GridfinityStep[], outside: 1 | -1) => {
    for (let s = 0; s + 1 < profile.length; s += 1) {
      const [i0, y0] = profile[s];
      const [i1, y1] = profile[s + 1];
      if (Math.abs(i0 - i1) < 1e-12 && Math.abs(y0 - y1) < 1e-12) continue;
      const a = loop(i0);
      const b = loop(i1);
      // Walking the profile with the material on the left: the face points to the right of the walk.
      const dOut = -(i1 - i0);
      const dy = y1 - y0;
      const nOut = dy * outside;
      const nY = -dOut * outside;
      a.forEach((p, k) => {
        const q = a[(k + 1) % a.length];
        const pb = b[k];
        const qb = b[(k + 1) % b.length];
        const want: Vec3 = [p.nx * nOut, nY, p.nz * nOut];
        push(at(p, y0), at(q, y0), at(qb, y1), want);
        push(at(p, y0), at(qb, y1), at(pb, y1), want);
      });
    }
  };
  /** A flat face inside an outline, with holes. */
  const cap = (outline: Array<{ x: number; z: number }>, holes: Array<Array<{ x: number; z: number }>>, y: number, up: 1 | -1) => {
    const contour = outline.map((p) => new THREE.Vector2(p.x, p.z));
    const holeVectors = holes.map((hole) => hole.map((p) => new THREE.Vector2(p.x, p.z)));
    const all = [...outline, ...holes.flat()];
    THREE.ShapeUtils.triangulateShape(contour, holeVectors).forEach(([a, b, c]) => push(at(all[a], y), at(all[b], y), at(all[c], y), [0, up, 0]));
  };
  /**
   * The ring between a grid cell and the rounded square in it, at height y:
   * a strip along each side where the square stays clear of the cell's edge,
   * a fan from each corner of the cell to the arc in front of it. Where the
   * cell's corner is the body's own rounded corner there is no point to fan
   * from: with `outer` (the body's outline in that cell) the strip between the
   * two arcs fills it, without it the arcs are the same and nothing is left.
   */
  const ring = (inner: LoopPoint[], box: Box, y: number, up: 1 | -1, outer?: LoopPoint[]) => {
    const per = inner.length / 4;
    const want: Vec3 = [0, up, 0];
    const project = (p: LoopPoint) => ({ x: p.nx > 0.5 ? box.x1 : p.nx < -0.5 ? box.x0 : p.x, z: p.nz > 0.5 ? box.z1 : p.nz < -0.5 ? box.z0 : p.z });
    const touches = (p: LoopPoint) => {
      const q = project(p);
      return Math.abs(q.x - p.x) < 1e-9 && Math.abs(q.z - p.z) < 1e-9;
    };
    for (let s = 0; s < 4; s += 1) {
      const a = inner[s * per];
      const b = inner[s * per + 1];
      if (!touches(a)) {
        push(at(a, y), at(b, y), at(project(b), y), want);
        push(at(a, y), at(project(b), y), at(project(a), y), want);
      }
      // The corner after this side: from its end round the arc to the next side's start.
      const end = inner[s * per + 1];
      const next = inner[((s + 1) % 4) * per];
      const arc = [end, ...inner.slice(s * per + 2, (s + 1) * per), next];
      const sx = end.nx + next.nx > 0 ? 1 : -1;
      const sz = end.nz + next.nz > 0 ? 1 : -1;
      if (box.edge(sx, "x") && box.edge(sz, "z")) {
        if (!outer) continue;
        const outerArc = [outer[s * per + 1], ...outer.slice(s * per + 2, (s + 1) * per), outer[((s + 1) % 4) * per]];
        for (let k = 0; k + 1 < arc.length; k += 1) {
          push(at(arc[k], y), at(outerArc[k], y), at(outerArc[k + 1], y), want);
          push(at(arc[k], y), at(outerArc[k + 1], y), at(arc[k + 1], y), want);
        }
        continue;
      }
      const cornerPoint = { x: sx > 0 ? box.x1 : box.x0, z: sz > 0 ? box.z1 : box.z0 };
      const fan: Array<{ x: number; z: number }> = [];
      if (!touches(end)) fan.push(project(end));
      fan.push(...arc);
      if (!touches(next)) fan.push(project(next));
      for (let k = 0; k + 1 < fan.length; k += 1) push(at(cornerPoint, y), at(fan[k], y), at(fan[k + 1], y), want);
    }
  };
  const circle = (c: { x: number; z: number }) => Array.from({ length: MAGNET_SIDES }, (_, k) => {
    const angle = (2 * Math.PI * k) / MAGNET_SIDES;
    return { x: c.x + (GRIDFINITY_MAGNET_DIAMETER / 2) * Math.cos(angle), z: c.z + (GRIDFINITY_MAGNET_DIAMETER / 2) * Math.sin(angle) };
  });

  const { size, cells, count } = plan;
  const half = (n: number) => (n * GRIDFINITY_GRID) / 2;
  const cellHalf = plan.type === "bin" ? GRIDFINITY_GRID / 2 - GRIDFINITY_CLEARANCE : GRIDFINITY_GRID / 2;
  const radius = plan.type === "bin" ? GRIDFINITY_BIN_RADIUS : GRIDFINITY_BASEPLATE_RADIUS;
  // Points on the long sides: every grid line inside, and where each foot or socket's corner begins.
  const breaks = (n: number) => {
    const values: number[] = [];
    for (let i = 0; i < n; i += 1) {
      const c = (i - (n - 1) / 2) * GRIDFINITY_GRID;
      values.push(c - cellHalf + radius, c + cellHalf - radius);
      if (i < n - 1) values.push(c + GRIDFINITY_GRID / 2);
    }
    return values;
  };
  const breaksX = breaks(count.x);
  const breaksZ = breaks(count.z);
  const outline = (inset: number) => roundedLoop(0, 0, size.width / 2, size.depth / 2, radius, inset, breaksX, breaksZ);
  const cellOf = (cell: (typeof cells)[number], inset: number) => roundedLoop(cell.x, cell.z, cellHalf, cellHalf, radius, inset);
  // A cell's box, cut back to the body's outline at the edge; edge() says whether a side is the body's own.
  const cellBox = (cell: (typeof cells)[number]): Box => ({
    x0: cell.i === 0 ? -size.width / 2 : cell.x - GRIDFINITY_GRID / 2,
    x1: cell.i === count.x - 1 ? size.width / 2 : cell.x + GRIDFINITY_GRID / 2,
    z0: cell.j === 0 ? -size.depth / 2 : cell.z - GRIDFINITY_GRID / 2,
    z1: cell.j === count.z - 1 ? size.depth / 2 : cell.z + GRIDFINITY_GRID / 2,
    edge: (sign, axis) => (axis === "x" ? (sign > 0 ? cell.i === count.x - 1 : cell.i === 0) : sign > 0 ? cell.j === count.z - 1 : cell.j === 0),
  });

  if (plan.type === "bin") {
    const wall = gridfinityWallProfile(plan);
    sweep(outline, wall, 1);
    const [floorInset, floorY] = wall[wall.length - 1];
    cap(outline(floorInset), [], floorY, 1);
    cells.forEach((cell) => {
      sweep((inset) => cellOf(cell, inset), GRIDFINITY_FOOT, 1);
      ring(cellOf(cell, 0), cellBox(cell), GRIDFINITY_FOOT_HEIGHT, -1);
      const holes = plan.magnetHoles.filter((hole) => Math.abs(hole.x - cell.x) < half(1) && Math.abs(hole.z - cell.z) < half(1)).map(circle);
      cap(cellOf(cell, GRIDFINITY_FOOT[0][0]), holes, 0, -1);
      holes.forEach((hole) => {
        hole.forEach((p, k) => {
          const q = hole[(k + 1) % hole.length];
          const centre = { x: hole.reduce((sum, h) => sum + h.x, 0) / hole.length, z: hole.reduce((sum, h) => sum + h.z, 0) / hole.length };
          const want: Vec3 = [centre.x - p.x, 0, centre.z - p.z];
          push(at(p, 0), at(q, 0), at(q, GRIDFINITY_MAGNET_DEPTH), want);
          push(at(p, 0), at(q, GRIDFINITY_MAGNET_DEPTH), at(p, GRIDFINITY_MAGNET_DEPTH), want);
        });
        cap(hole, [], GRIDFINITY_MAGNET_DEPTH, -1);
      });
    });
  } else {
    sweep(outline, [[0, 0], [0, GRIDFINITY_BASEPLATE_HEIGHT]], 1);
    cells.forEach((cell) => {
      sweep((inset) => cellOf(cell, inset), GRIDFINITY_SOCKET, -1);
      ring(cellOf(cell, 0), cellBox(cell), GRIDFINITY_BASEPLATE_HEIGHT, 1);
      ring(cellOf(cell, GRIDFINITY_SOCKET[0][0]), cellBox(cell), 0, -1, cellOf(cell, 0));
    });
  }

  return triangles;
}

/** A closed, watertight bin or baseplate from y = 0 up, centred on x and z. */
export function createGridfinityGeometry(shape: GridfinityShapeFields): THREE.BufferGeometry {
  const positions: number[] = [];
  gridfinityTriangles(shape).forEach((triangle) => triangle.forEach((vertex) => positions.push(...vertex)));
  const raw = new THREE.BufferGeometry();
  raw.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const geometry = toCreasedNormals(raw, THREE.MathUtils.degToRad(30));
  raw.dispose();
  geometry.computeBoundingBox();
  return geometry;
}
