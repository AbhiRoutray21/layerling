"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CustomShapeEntry, CustomShapeFolder, CustomShapeLocation } from "@/components/workplane/MyShapesSection";
import {
  createServerCustomShapeFolder,
  deleteServerCustomShape,
  deleteServerCustomShapeFolder,
  listServerCustomShapes,
  moveServerCustomShape,
  readServerCustomShape,
  renameServerCustomShape,
  renameServerCustomShapeFolder,
  saveServerCustomShape,
  serverCustomShapeId,
  type ServerCustomShapes,
} from "@/lib/customShapesServer";
import { customShapeFingerprint, packCustomShape, placeCustomShape, type PackedCustomShape } from "@/lib/customShapePackage";
import { t } from "@/lib/i18n";
import { createLocalId } from "@/lib/localIds";
import { importLylProject, type exportLylProject } from "@/lib/lylProject";
import {
  createMyShapeFolder,
  customShapesBackupEntries,
  deleteMyShape,
  deleteMyShapeFolder,
  listMyShapeFolders,
  listMyShapes,
  moveMyShape,
  myShapeNameFromFile,
  myShapesBackupFileName,
  onMyShapesChanged,
  readMyShapePackage,
  renameMyShape,
  renameMyShapeFolder,
  restoreCustomShapesFromBackup,
  saveMyShape,
  type MyShapeFolder,
  type MyShapeMeta,
} from "@/lib/myShapes";
import type { PlacementPoint, PlacementWorkplane } from "@/lib/placementWorkplane";
import { dedupeProjectAssets } from "@/lib/projectAssets";
import { packBackup, unpackBackup } from "@/lib/projectBackup";
import { storeFolderNameProblem } from "@/lib/storeFolderName";
import { NOTE_COUNT_LIMIT } from "@/lib/workplaneNotes";
import type { ProjectAsset, WorkplaneNote, WorkplaneShape } from "@/types/layerling";

type LylExport = Parameters<typeof exportLylProject>[0];

/** Server folders go by "server-folder:<name>"; their names are unique there, like a browser folder's id. */
const SERVER_FOLDER_PREFIX = "server-folder:";
const serverFolderId = (name: string) => `${SERVER_FOLDER_PREFIX}${name}`;

export interface CustomShapesOptions {
  sharedProjectsEnabled: boolean;
  setNotice: (message: string) => void;
  commitShapes: (next: WorkplaneShape[], nextSelection?: string | string[] | null, message?: string) => void;
  setProjectAssets: (assets: ProjectAsset[]) => void;
  downloadBlob: (fileName: string, blob: Blob) => Promise<void>;
  shapesRef: { current: WorkplaneShape[] };
  selectedIdsRef: { current: string[] };
  notesRef: { current: WorkplaneNote[] };
  /** Set while the history view is open; then inserted notes are not added. */
  historyViewStateRef: { current: unknown };
  projectAssetsRef: { current: ProjectAsset[] };
  workspaceSettingsRef: { current: LylExport["workspace"] };
  snapGridRef: { current: LylExport["snapGrid"] };
  projectInfoRef: { current: { projectId: string | null } };
  placementWorkplaneRef: { current: PlacementWorkplane };
}

/**
 * Custom shapes (#109): kept in this browser (IndexedDB) and, where the
 * shared store is on, in its "Custom shapes" folder - each side with folders
 * of its own, one level deep. Shown on top of the shape library; server
 * entries carry the id "server:<folder>/<file name>" ("server:<file name>"
 * at the top).
 */
export function useCustomShapes(options: CustomShapesOptions) {
  const { sharedProjectsEnabled, setNotice, commitShapes, setProjectAssets, downloadBlob } = options;
  const { shapesRef, selectedIdsRef, notesRef, historyViewStateRef, projectAssetsRef, workspaceSettingsRef, snapGridRef, projectInfoRef, placementWorkplaneRef } = options;
  const [myShapes, setMyShapes] = useState<MyShapeMeta[]>([]);
  const myShapesRef = useRef<MyShapeMeta[]>([]);
  const [myFolders, setMyFolders] = useState<MyShapeFolder[]>([]);
  const myFoldersRef = useRef<MyShapeFolder[]>([]);
  const [serverShapes, setServerShapes] = useState<ServerCustomShapes | null>(null);
  const serverShapesRef = useRef<ServerCustomShapes | null>(null);
  const myShapesFileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshMyShapes = useCallback(async () => {
    try {
      const [list, folders] = await Promise.all([listMyShapes(), listMyShapeFolders()]);
      myShapesRef.current = list;
      myFoldersRef.current = folders;
      setMyShapes(list);
      setMyFolders(folders);
      return list;
    } catch {
      return myShapesRef.current;
    }
  }, []);
  const refreshServerShapes = useCallback(async () => {
    if (!sharedProjectsEnabled) {
      serverShapesRef.current = null;
      setServerShapes(null);
      return null;
    }
    try {
      const list = await listServerCustomShapes();
      serverShapesRef.current = list;
      setServerShapes(list);
      return list;
    } catch {
      return serverShapesRef.current;
    }
  }, [sharedProjectsEnabled]);
  useEffect(() => {
    void refreshMyShapes();
    return onMyShapesChanged(() => void refreshMyShapes());
  }, [refreshMyShapes]);
  useEffect(() => {
    void refreshServerShapes();
  }, [refreshServerShapes]);

  const customShapeEntries = useMemo<CustomShapeEntry[]>(() => [
    ...myShapes.map((shape) => ({ id: shape.id, name: shape.name, thumbnail: shape.thumbnail, location: "browser" as const, folderId: shape.folderId && myFolders.some((folder) => folder.id === shape.folderId) ? shape.folderId : null })),
    ...(serverShapes?.shapes ?? []).map((shape) => ({ id: serverCustomShapeId(shape), name: shape.name, thumbnail: shape.thumbnailUrl ?? "", location: "server" as const, folderId: shape.folder ? serverFolderId(shape.folder) : null })),
  ], [myShapes, myFolders, serverShapes]);
  const customShapeFolders = useMemo<CustomShapeFolder[]>(() => [
    ...myFolders.map((folder) => ({ id: folder.id, name: folder.name, location: "browser" as const })),
    ...(serverShapes?.folders ?? []).map((name) => ({ id: serverFolderId(name), name, location: "server" as const })),
  ], [myFolders, serverShapes]);

  const serverShapeFor = (id: string) => (id.startsWith("server:")
    ? serverShapesRef.current?.shapes.find((shape) => serverCustomShapeId(shape) === id) ?? null
    : null);
  const customShapeName = (id: string) => serverShapeFor(id)?.name ?? myShapesRef.current.find((shape) => shape.id === id)?.name ?? id;
  /** The server folder's name behind an id, null for none. */
  const serverFolderName = (folderId: string | null) => (folderId?.startsWith(SERVER_FOLDER_PREFIX) ? folderId.slice(SERVER_FOLDER_PREFIX.length) : null);
  const folderName = (folderId: string | null) => serverFolderName(folderId) ?? myFoldersRef.current.find((folder) => folder.id === folderId)?.name ?? "";

  const packCurrentCustomShape = (parts: WorkplaneShape[], name: string, assets: ProjectAsset[], notes: WorkplaneNote[]) => packCustomShape(
    parts, name, assets, notes, { workspace: workspaceSettingsRef.current, snapGrid: snapGridRef.current },
  );

  const keepInBrowser = useCallback(async (packed: PackedCustomShape, name: string, folderId: string | null = null) => {
    const meta: MyShapeMeta = {
      id: createLocalId("my-shape"),
      name,
      createdAt: packed.createdAt,
      thumbnail: packed.thumbnail,
      bodyCount: packed.bodyCount,
      byteLength: packed.bytes.byteLength,
      fingerprint: packed.fingerprint,
      ...(folderId ? { folderId } : {}),
    };
    await saveMyShape(meta, packed.bytes);
    return meta;
  }, []);

  /** Where a new custom shape goes when nobody says: the server, when there is one. */
  const defaultCustomShapeLocation = (): CustomShapeLocation => (serverShapesRef.current ? "server" : "browser");

  const saveSelectionAsMyShape = useCallback(async (name: string, ids?: string[], location: CustomShapeLocation = defaultCustomShapeLocation(), folderId: string | null = null) => {
    const wanted = new Set(ids ?? selectedIdsRef.current);
    const parts = shapesRef.current.filter((shape) => wanted.has(shape.id));
    if (parts.length === 0) throw new Error(t("myShapes.selectFirst"));
    const packed = await packCurrentCustomShape(parts, name, projectAssetsRef.current, notesRef.current);
    let entry: { id: string; name: string; location: CustomShapeLocation; folder: string | null; bodyCount: number; byteLength: number };
    if (location === "server") {
      const folder = serverFolderName(folderId);
      const saved = await saveServerCustomShape(name, packed.bytes, packed.thumbnail, t("status.myShapeNameTaken", { name }), folder);
      await refreshServerShapes();
      entry = { id: serverCustomShapeId(saved), name: saved.name, location, folder, bodyCount: packed.bodyCount, byteLength: packed.bytes.byteLength };
    } else {
      const meta = await keepInBrowser(packed, name, folderId);
      await refreshMyShapes();
      entry = { id: meta.id, name, location, folder: folderId ? folderName(folderId) : null, bodyCount: meta.bodyCount, byteLength: meta.byteLength };
    }
    setNotice(t(location === "server" ? "status.myShapeSavedServer" : "status.myShapeSaved", { name: entry.name }));
    return entry;
  }, [keepInBrowser, refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  const readCustomShapePackage = (id: string) => {
    const server = serverShapeFor(id);
    if (id.startsWith("server:")) {
      if (!server) throw new Error(t("status.myShapeGone"));
      return readServerCustomShape(server);
    }
    return readMyShapePackage(id);
  };

  const insertMyShape = useCallback(async (id: string, point?: PlacementPoint) => {
    const sourceProjectId = projectInfoRef.current.projectId;
    const name = customShapeName(id);
    const restored = await importLylProject(await readCustomShapePackage(id));
    if (projectInfoRef.current.projectId !== sourceProjectId) throw new Error(t("status.pasteCancelled"));
    if (restored.shapes.length === 0) throw new Error(t("status.insertDesignEmpty", { name }));
    const { shapes: inserted, notes: insertedNotes, dropped } = placeCustomShape(restored, point ?? placementWorkplaneRef.current.origin, notesRef.current);
    if (restored.assets.length > 0) {
      const nextAssets = dedupeProjectAssets([...projectAssetsRef.current, ...restored.assets]);
      projectAssetsRef.current = nextAssets;
      setProjectAssets(nextAssets);
    }
    // Its notes go in with the bodies, in the same undo step.
    if (insertedNotes.length > 0 && !historyViewStateRef.current) notesRef.current = [...notesRef.current, ...insertedNotes];
    commitShapes([...shapesRef.current, ...inserted], inserted.map((shape) => shape.id), t("status.myShapeInserted", { name }));
    if (dropped > 0 && !historyViewStateRef.current) setNotice(t("status.noteLimitReached", { count: NOTE_COUNT_LIMIT }));
    return inserted;
  }, [commitShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  const renameMyShapeEntry = useCallback(async (id: string, name: string) => {
    const server = serverShapeFor(id);
    if (server) {
      await renameServerCustomShape(server, name, t("status.myShapeNameTaken", { name }));
      await refreshServerShapes();
      return;
    }
    await renameMyShape(id, name);
    await refreshMyShapes();
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteMyShapeEntry = useCallback(async (id: string) => {
    const name = customShapeName(id);
    const server = serverShapeFor(id);
    if (server) {
      await deleteServerCustomShape(server);
      await refreshServerShapes();
    } else {
      await deleteMyShape(id);
      await refreshMyShapes();
    }
    setNotice(t("status.myShapeDeleted", { name }));
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  /** A shape from this browser onto the server, at the top of its list. A move, as on the start page: it is not kept twice. */
  const moveMyShapeToServer = useCallback(async (id: string) => {
    const meta = myShapesRef.current.find((shape) => shape.id === id);
    if (!meta) throw new Error(t("status.myShapeGone"));
    const bytes = await readMyShapePackage(id);
    await saveServerCustomShape(meta.name, bytes, meta.thumbnail, t("status.myShapeNameTaken", { name: meta.name }));
    await deleteMyShape(id);
    await Promise.all([refreshMyShapes(), refreshServerShapes()]);
    setNotice(t("status.myShapeMovedToServer", { name: meta.name }));
  }, [refreshMyShapes, refreshServerShapes]);

  /** Into one of the folders on its own side, or with `null` back to the top of the list. */
  const moveMyShapeToFolder = useCallback(async (id: string, folderId: string | null) => {
    const name = customShapeName(id);
    const server = serverShapeFor(id);
    const target = folderId ? folderName(folderId) : null;
    if (server) {
      await moveServerCustomShape(server, serverFolderName(folderId), t("status.myShapeNameTakenInFolder", { name, folder: target ?? t("myShapes.title") }));
      await refreshServerShapes();
    } else {
      await moveMyShape(id, folderId);
      await refreshMyShapes();
    }
    setNotice(target ? t("status.myShapeMovedToFolder", { name, folder: target }) : t("status.myShapeMovedOutOfFolder", { name }));
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  /** A new folder; returns its id. The caller has checked the name against the folders on that side. */
  const createShapeFolder = useCallback(async (name: string, location: CustomShapeLocation) => {
    const taken = t("shared.folderNameTaken");
    let id: string;
    if (location === "server") {
      await createServerCustomShapeFolder(name, taken);
      await refreshServerShapes();
      id = serverFolderId(name.trim());
    } else {
      id = (await createMyShapeFolder(name)).id;
      await refreshMyShapes();
    }
    setNotice(t("status.myShapeFolderCreated", { name: name.trim() }));
    return id;
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Returns the folder's id afterwards: on the server it is its name, so it changes. */
  const renameShapeFolder = useCallback(async (folderId: string, name: string) => {
    const server = serverFolderName(folderId);
    if (server !== null) {
      await renameServerCustomShapeFolder(server, name, t("shared.folderNameTaken"));
      await refreshServerShapes();
      return serverFolderId(name.trim());
    }
    await renameMyShapeFolder(folderId, name);
    await refreshMyShapes();
    return folderId;
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  /** The folder and every shape in it. */
  const deleteShapeFolder = useCallback(async (folderId: string) => {
    const name = folderName(folderId);
    const server = serverFolderName(folderId);
    if (server !== null) {
      await deleteServerCustomShapeFolder(server);
      await refreshServerShapes();
    } else {
      await deleteMyShapeFolder(folderId);
      await refreshMyShapes();
    }
    setNotice(t("status.myShapeFolderDeleted", { name }));
  }, [refreshMyShapes, refreshServerShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  const backUpMyShapes = useCallback(async () => {
    const entries = await customShapesBackupEntries();
    const count = entries.length - 1;
    if (count <= 0) {
      setNotice(t("status.myShapesNoneToBackUp"));
      return;
    }
    const zipped = packBackup(entries);
    const buffer = zipped.buffer.slice(zipped.byteOffset, zipped.byteOffset + zipped.byteLength) as ArrayBuffer;
    await downloadBlob(myShapesBackupFileName(new Date()), new Blob([buffer], { type: "application/zip" }));
    setNotice(t("status.myShapesBackedUp", { count }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Adds shapes to this browser: the custom shapes of a backup ZIP (from here
   * or from "Back up all" on the start page), the designs of a ZIP without
   * any, or single .lyl designs. One already kept is skipped.
   */
  const loadMyShapeFiles = useCallback(async (files: File[]) => {
    let added = 0;
    let skipped = 0;
    const failures: string[] = [];
    const packEntry = async (entry: { name: string; bytes: Uint8Array }) => {
      const restored = await importLylProject(entry.bytes);
      if (restored.shapes.length === 0) {
        failures.push(entry.name);
        return;
      }
      const name = myShapeNameFromFile(entry.name, t("myShapes.defaultName"));
      const fingerprint = customShapeFingerprint(restored.shapes);
      if (myShapesRef.current.some((shape) => shape.name === name && shape.fingerprint === fingerprint)) {
        skipped += 1;
        return;
      }
      const meta = await keepInBrowser(await packCurrentCustomShape(restored.shapes, name, restored.assets, restored.notes ?? []), name);
      myShapesRef.current = [...myShapesRef.current, meta];
      added += 1;
    };
    for (const file of files) {
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (!/\.zip$/i.test(file.name)) {
          await packEntry({ name: file.name, bytes });
          continue;
        }
        const fromBackup = await restoreCustomShapesFromBackup(bytes);
        added += fromBackup.added;
        skipped += fromBackup.skipped;
        await refreshMyShapes();
        const loose = fromBackup.added + fromBackup.skipped + fromBackup.unlisted.length > 0 ? fromBackup.unlisted : unpackBackup(bytes);
        if (loose.length === 0 && fromBackup.added + fromBackup.skipped === 0) failures.push(file.name);
        for (const entry of loose) {
          try {
            await packEntry(entry);
          } catch {
            failures.push(entry.name);
          }
        }
      } catch {
        failures.push(file.name);
      }
    }
    await refreshMyShapes();
    setNotice(failures.length
      ? t("status.myShapesLoadFailed", { count: added, names: failures.join(", ") })
      : skipped
        ? t("status.myShapesLoadedSkipped", { count: added, skipped })
        : t("status.myShapesLoaded", { count: added }));
  }, [keepInBrowser, refreshMyShapes]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Every custom shape as the MCP tools report it, after asking both sides again. */
  const listCustomShapesForMcp = useCallback(async () => {
    const [browser, server] = await Promise.all([refreshMyShapes(), refreshServerShapes()]);
    const browserFolder = (id?: string) => myFoldersRef.current.find((folder) => folder.id === id)?.name ?? null;
    return {
      serverAvailable: server !== null,
      folders: [
        ...(server?.folders ?? []).map((name) => ({ name, location: "server" })),
        ...myFoldersRef.current.map((folder) => ({ name: folder.name, location: "browser" })),
      ],
      customShapes: [
        ...(server?.shapes ?? []).map((shape) => ({ id: serverCustomShapeId(shape), name: shape.name, location: "server", folder: shape.folder, byteLength: shape.size, savedAt: new Date(shape.updatedAt).toISOString() })),
        ...browser.map((shape) => ({ id: shape.id, name: shape.name, location: "browser", folder: browserFolder(shape.folderId), bodyCount: shape.bodyCount, byteLength: shape.byteLength, savedAt: new Date(shape.createdAt).toISOString() })),
      ],
    };
  }, [refreshMyShapes, refreshServerShapes]);

  /**
   * The folder id for an MCP save: the folder of that name on that side,
   * made when it is missing. No name, no folder.
   */
  const folderIdForMcp = useCallback(async (name: string | undefined, location: CustomShapeLocation) => {
    const wanted = name?.trim();
    if (!wanted) return null;
    const existing = location === "server"
      ? (serverShapesRef.current?.folders ?? []).find((folder) => folder.toLowerCase() === wanted.toLowerCase())
      : myFoldersRef.current.find((folder) => folder.name.toLowerCase() === wanted.toLowerCase())?.id;
    if (existing) return location === "server" ? serverFolderId(existing) : existing;
    if (storeFolderNameProblem(wanted, []) !== null) throw new Error(`"${wanted}" cannot be a folder name: no leading dot, no slashes, quotation marks or < > : | ? *, at most 80 characters`);
    return createShapeFolder(wanted, location);
  }, [createShapeFolder]);

  return {
    customShapeEntries,
    customShapeFolders,
    serverAvailable: serverShapes !== null,
    myShapesFileInputRef,
    refreshMyShapes,
    refreshServerShapes,
    saveSelectionAsMyShape,
    insertMyShape,
    renameMyShapeEntry,
    deleteMyShapeEntry,
    moveMyShapeToServer,
    moveMyShapeToFolder,
    createShapeFolder,
    renameShapeFolder,
    deleteShapeFolder,
    backUpMyShapes,
    loadMyShapeFiles,
    listCustomShapesForMcp,
    folderIdForMcp,
  };
}
