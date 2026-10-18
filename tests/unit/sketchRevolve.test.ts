import { beforeAll, describe, expect, it } from "vitest";
import manifoldModule, { type ManifoldToplevel } from "manifold-3d";
import {
  buildSketchRevolveMesh,
  normalizeSketchRevolveSettings,
  sketchProfileToRevolvePolygons,
} from "@/lib/sketchRevolve";
import type { SketchProfile } from "@/types/layerling";

function rectangleProfile(innerRadius = 5, outerRadius = 10, height = 20): SketchProfile {
  return {
    points: [
      { id: "a", x: -innerRadius, z: 0 },
      { id: "b", x: -outerRadius, z: 0 },
      { id: "c", x: -outerRadius, z: height },
      { id: "d", x: -innerRadius, z: height },
    ],
    segments: [
      { id: "ab", startId: "a", endId: "b", kind: "line" },
      { id: "bc", startId: "b", endId: "c", kind: "line" },
      { id: "cd", startId: "c", endId: "d", kind: "line" },
      { id: "da", startId: "d", endId: "a", kind: "line" },
    ],
  };
}

function signedVolume(positions: number[]) {
  let volume = 0;
  for (let index = 0; index + 8 < positions.length; index += 9) {
    const [ax, ay, az, bx, by, bz, cx, cy, cz] = positions.slice(index, index + 9);
    volume += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
  }
  return volume;
}

describe("sketch revolve", () => {
  let runtime: ManifoldToplevel;

  beforeAll(async () => {
    runtime = await manifoldModule();
    runtime.setup();
  });

  it("revolves a closed left-side profile around the center axis", () => {
    const mesh = buildSketchRevolveMesh(runtime, rectangleProfile(), { sides: 32 });
    expect(mesh.triangleCount).toBeGreaterThan(100);
    expect(mesh.width).toBeCloseTo(20, 4);
    expect(mesh.depth).toBeCloseTo(20, 4);
    expect(mesh.height).toBeCloseTo(20, 4);
    expect(Math.min(...mesh.positions.filter((_value, index) => index % 3 === 1))).toBeCloseTo(0, 6);
  });

  it("requires a closed profile", () => {
    const profile: SketchProfile = {
      points: [{ id: "a", x: -8, z: 0 }, { id: "b", x: -8, z: 20 }],
      segments: [{ id: "ab", startId: "a", endId: "b", kind: "line" }],
    };
    expect(sketchProfileToRevolvePolygons(profile)).toEqual([]);
    expect(() => buildSketchRevolveMesh(runtime, profile, { sides: 24 })).toThrow("Draw at least one closed profile");
  });

  it("clips a closed profile at the revolve axis", () => {
    const profile: SketchProfile = {
      points: [
        { id: "top-right", x: 10, z: 0 },
        { id: "top-left", x: -10, z: 0 },
        { id: "bottom-left", x: -10, z: 20 },
        { id: "bottom-right", x: 10, z: 20 },
      ],
      segments: [
        { id: "top", startId: "top-right", endId: "top-left", kind: "line" },
        { id: "left", startId: "top-left", endId: "bottom-left", kind: "line" },
        { id: "bottom", startId: "bottom-left", endId: "bottom-right", kind: "line" },
        { id: "right", startId: "bottom-right", endId: "top-right", kind: "line" },
      ],
    };
    const polygons = sketchProfileToRevolvePolygons(profile);
    expect(polygons).toHaveLength(1);
    expect(Math.min(...polygons[0].map((point) => point[0]))).toBeCloseTo(0, 6);
    expect(Math.max(...polygons[0].map((point) => point[0]))).toBeCloseTo(10, 6);

    const mesh = buildSketchRevolveMesh(runtime, profile, { sides: 24 });
    expect(mesh.triangleCount).toBeGreaterThan(0);
    expect(mesh.height).toBeCloseTo(20, 4);
  });

  it("supports partial and reverse sweeps", () => {
    const quarter = buildSketchRevolveMesh(runtime, rectangleProfile(), { startAngle: 30, sweepAngle: 90, sides: 48 });
    const reverse = buildSketchRevolveMesh(runtime, rectangleProfile(), { startAngle: 120, sweepAngle: -90, sides: 48 });
    expect(quarter.triangleCount).toBeGreaterThan(0);
    expect(reverse.triangleCount).toBeGreaterThan(0);
    expect(quarter.width).toBeLessThanOrEqual(20.001);
    expect(quarter.depth).toBeLessThanOrEqual(20.001);
  });

  it("winds a profile up as one helical strand when it has a pitch", () => {
    // A 2 mm square wire on a 10 mm radius, three turns, 2.5 mm a turn.
    const wire = rectangleProfile(9, 11, 2);
    const rings = buildSketchRevolveMesh(runtime, wire, { sides: 48 });
    const right = buildSketchRevolveMesh(runtime, wire, { sides: 48, sweepAngle: 3 * 360, pitch: 2.5 });
    const left = buildSketchRevolveMesh(runtime, wire, { sides: 48, sweepAngle: -3 * 360, pitch: 2.5 });
    expect(rings.height).toBeCloseTo(2, 4);
    [right, left].forEach((helix) => {
      expect(helix.height).toBeCloseTo(2 + 3 * 2.5, 4);
      expect(helix.width).toBeCloseTo(22, 1);
      // Outward faces: the signed volume is positive, the wire's section times its length along the helix.
      expect(signedVolume(helix.positions)).toBeCloseTo(4 * 3 * Math.hypot(2 * Math.PI * 10, 2.5) * Math.cos(Math.atan2(2.5, 2 * Math.PI * 10)), -1);
    });
    // Three turns take more slices than one ring.
    expect(right.triangleCount).toBeGreaterThan(rings.triangleCount);
  });

  it("normalizes unsafe revolve settings", () => {
    expect(normalizeSketchRevolveSettings({ startAngle: -30, sweepAngle: 0, sides: 900, quality: 0 })).toEqual({
      startAngle: 330,
      sweepAngle: 1,
      sides: 512,
      quality: 1,
    });
  });
});
