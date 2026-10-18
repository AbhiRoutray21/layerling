import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createServerCustomShapeFolder,
  deleteServerCustomShapeFolder,
  listServerCustomShapes,
  moveServerCustomShape,
  readServerCustomShape,
  renameServerCustomShapeFolder,
  serverCustomShapeId,
} from "@/lib/customShapesServer";
import { sortMyShapeFolders } from "@/lib/myShapes";

type Call = { url: URL; method: string; headers: Record<string, string> };

/** Answers the store's requests from a table of folders, and records them. */
function stubStore(folders: Record<string, { projects?: Array<Record<string, unknown>>; folders?: string[] }>, status = 200) {
  const calls: Call[] = [];
  vi.stubGlobal("fetch", vi.fn(async (input: string, init?: RequestInit) => {
    const url = new URL(input, "http://localhost");
    calls.push({ url, method: init?.method ?? "GET", headers: (init?.headers ?? {}) as Record<string, string> });
    if ((init?.method ?? "GET") !== "GET") return new Response("{}", { status });
    const path = url.searchParams.get("path") ?? "";
    const entry = folders[path] ?? { projects: [], folders: [] };
    return new Response(JSON.stringify({ enabled: true, projects: entry.projects ?? [], folders: (entry.folders ?? []).map((name) => ({ name })) }));
  }));
  return calls;
}

const shape = (fileName: string, updatedAt: number) => ({ fileName, name: fileName.replace(/\.lyl$/, ""), updatedAt, size: 1, revision: `r-${fileName}` });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("custom shape folders", () => {
  it("sorts folders by name", () => {
    const folders = [{ id: "b", name: "Brackets", createdAt: 2 }, { id: "a", name: "Adapters", createdAt: 3 }, { id: "c", name: "Clips", createdAt: 1 }];
    expect(sortMyShapeFolders(folders).map((folder) => folder.id)).toEqual(["a", "b", "c"]);
  });

  it("keeps the old id for a server shape at the top and puts the folder into the others", () => {
    expect(serverCustomShapeId({ fileName: "Halter.lyl", folder: null })).toBe("server:Halter.lyl");
    expect(serverCustomShapeId({ fileName: "Halter.lyl", folder: "Brackets" })).toBe("server:Brackets/Halter.lyl");
  });

  it("lists the shapes at the top and in each folder, oldest first", async () => {
    stubStore({
      "": { folders: ["Custom shapes"] },
      "Custom shapes": { projects: [shape("Top.lyl", 3)], folders: ["Clips", "Brackets"] },
      "Custom shapes/Brackets": { projects: [shape("Halter.lyl", 1)] },
      "Custom shapes/Clips": { projects: [shape("Clip.lyl", 2)] },
    });
    const listed = await listServerCustomShapes();
    expect(listed?.folders).toEqual(["Brackets", "Clips"]);
    expect(listed?.shapes.map((entry) => [entry.fileName, entry.folder])).toEqual([["Halter.lyl", "Brackets"], ["Clip.lyl", "Clips"], ["Top.lyl", null]]);
  });

  it("has neither shapes nor folders while the custom shapes folder is missing", async () => {
    stubStore({ "": { folders: ["Designs"] } });
    expect(await listServerCustomShapes()).toEqual({ shapes: [], folders: [] });
  });

  it("reads a shape from its folder", async () => {
    const calls = stubStore({});
    await readServerCustomShape({ fileName: "Halter.lyl", folder: "Brackets" });
    expect(calls[0].url.searchParams.get("path")).toBe("Custom shapes/Brackets");
    expect(calls[0].url.searchParams.get("fileName")).toBe("Halter.lyl");
  });

  it("moves a shape with the revision it was listed with, and out of a folder to the top", async () => {
    const calls = stubStore({});
    await moveServerCustomShape({ fileName: "Halter.lyl", folder: null, revision: "r1" }, "Brackets", "taken");
    await moveServerCustomShape({ fileName: "Halter.lyl", folder: "Brackets", revision: "r2" }, null, "taken");
    // Already there: nothing is sent.
    await moveServerCustomShape({ fileName: "Halter.lyl", folder: "Brackets", revision: "r2" }, "Brackets", "taken");
    expect(calls.map((call) => [call.method, call.url.searchParams.get("path"), call.url.searchParams.get("moveTo"), call.headers["If-Match"]])).toEqual([
      ["POST", "Custom shapes", "Custom shapes/Brackets", "\"r1\""],
      ["POST", "Custom shapes/Brackets", "Custom shapes", "\"r2\""],
    ]);
  });

  it("says a name is taken in the folder a shape moves into", async () => {
    stubStore({}, 409);
    await expect(moveServerCustomShape({ fileName: "Halter.lyl", folder: null, revision: "r1" }, "Brackets", "taken there")).rejects.toThrow("taken there");
  });

  it("creates, renames and deletes folders inside the custom shapes folder", async () => {
    const calls = stubStore({});
    await createServerCustomShapeFolder(" Brackets ", "taken");
    await renameServerCustomShapeFolder("Brackets", "Holders", "taken");
    await deleteServerCustomShapeFolder("Holders");
    const writes = calls.filter((call) => call.method !== "GET").map((call) => [call.method, Object.fromEntries(call.url.searchParams)]);
    expect(writes).toEqual([
      // The custom shapes folder first, in case it is not there yet.
      ["POST", { folder: "Custom shapes" }],
      ["POST", { path: "Custom shapes", folder: "Brackets" }],
      ["POST", { path: "Custom shapes/Brackets", renameTo: "Holders" }],
      ["DELETE", { path: "Custom shapes/Holders", deleteFolder: "1", recursive: "1" }],
    ]);
  });
});
