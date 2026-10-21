import { describe, expect, it } from "vitest";
import {
  placementOf,
  readSecondViewPlacement,
  SECOND_VIEW_PLACEMENT_KEY,
  secondViewSupported,
  secondViewWindowFeatures,
  writeSecondViewPlacement,
} from "@/lib/secondViewPlacement";

function memoryStorage() {
  const items = new Map<string, string>();
  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => void items.set(key, value),
    items,
  };
}

describe("the second view's window placement", () => {
  it("opens at the default size where the browser puts it, the first time", () => {
    expect(readSecondViewPlacement(memoryStorage())).toBeNull();
    expect(secondViewWindowFeatures(null)).toBe("popup,width=960,height=720");
  });

  it("opens where it was left, at the size it had", () => {
    const storage = memoryStorage();
    writeSecondViewPlacement(storage, placementOf({ screenX: 1930, screenY: 40, innerWidth: 1200, innerHeight: 800 }));
    const placement = readSecondViewPlacement(storage);
    expect(placement).toEqual({ left: 1930, top: 40, width: 1200, height: 800 });
    expect(secondViewWindowFeatures(placement)).toBe("popup,left=1930,top=40,width=1200,height=800");
  });

  it("keeps no size too small to use, and ignores a broken entry", () => {
    const storage = memoryStorage();
    writeSecondViewPlacement(storage, { left: 0, top: 0, width: 0, height: 0 });
    expect(storage.items.has(SECOND_VIEW_PLACEMENT_KEY)).toBe(false);
    storage.setItem(SECOND_VIEW_PLACEMENT_KEY, "{not json");
    expect(readSecondViewPlacement(storage)).toBeNull();
    storage.setItem(SECOND_VIEW_PLACEMENT_KEY, JSON.stringify({ left: 0, top: 0, width: "wide", height: 600 }));
    expect(readSecondViewPlacement(storage)).toBeNull();
  });

  it("does not fail without storage", () => {
    expect(readSecondViewPlacement(null)).toBeNull();
    expect(() => writeSecondViewPlacement(null, { left: 0, top: 0, width: 800, height: 600 })).not.toThrow();
  });
});

describe("where the second view is offered", () => {
  it("is offered with a mouse or a trackpad, a touch screen laptop included", () => {
    expect(secondViewSupported({ coarsePointer: false, platform: "Win32", maxTouchPoints: 0 })).toBe(true);
    expect(secondViewSupported({ coarsePointer: false, platform: "Win32", maxTouchPoints: 10 })).toBe(true);
    expect(secondViewSupported({ coarsePointer: false, platform: "MacIntel", maxTouchPoints: 0 })).toBe(true);
  });

  it("is not offered on a phone or a tablet, an iPad that calls itself a Mac included", () => {
    expect(secondViewSupported({ coarsePointer: true, platform: "Linux armv8l", maxTouchPoints: 5 })).toBe(false);
    expect(secondViewSupported({ coarsePointer: true, platform: "iPhone", maxTouchPoints: 5 })).toBe(false);
    expect(secondViewSupported({ coarsePointer: false, platform: "MacIntel", maxTouchPoints: 5 })).toBe(false);
  });
});
