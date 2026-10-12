"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchVersionInfo,
  isNewBuild,
  looksLikeMissingProgramFile,
  VERSION_CHECK_INTERVAL_MS,
  VERSION_LATER_MS,
  type VersionInfo,
} from "@/lib/newVersionWatch";

/** The editor listens for this and writes the design to the browser at once. */
export const SAVE_NOW_EVENT = "layerling:save-now";

/**
 * The version the server holds when it is not the one this page started with, or null. Only in the
 * published program (the static export); the first answer of the server is what the page started
 * with, every later one is compared to it - while the page is visible, when it comes back to the
 * front or the connection returns, and at once when a program file it asks for is gone.
 */
export function useNewVersionNotice() {
  const [latest, setLatest] = useState<VersionInfo | null>(null);
  const [hiddenUntil, setHiddenUntil] = useState(0);
  const started = useRef<VersionInfo | null>(null);
  const announced = useRef(false);

  const check = useCallback(async () => {
    if (announced.current) return;
    const info = await fetchVersionInfo();
    if (!info) return;
    if (!started.current) {
      started.current = info;
      return;
    }
    if (isNewBuild(started.current, info)) {
      announced.current = true;
      setLatest(info);
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true") return;
    void check();
    // A test can ask more often; nobody else needs to.
    const override = (window as unknown as { __layerlingVersionCheckMs?: number }).__layerlingVersionCheckMs;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void check();
    }, override ?? VERSION_CHECK_INTERVAL_MS);
    const whenBack = () => {
      if (document.visibilityState === "visible") void check();
    };
    const onError = (event: ErrorEvent) => {
      if (looksLikeMissingProgramFile(`${event.message} ${event.error?.name ?? ""}`)) void check();
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { name?: string; message?: string } | string | undefined;
      const text = typeof reason === "string" ? reason : `${reason?.name ?? ""} ${reason?.message ?? ""}`;
      if (looksLikeMissingProgramFile(text)) void check();
    };
    document.addEventListener("visibilitychange", whenBack);
    window.addEventListener("online", whenBack);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", whenBack);
      window.removeEventListener("online", whenBack);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [check]);

  // "Later" holds the offer back for a while; it comes again, as staying on the old version is the risk.
  const [, tick] = useState(0);
  useEffect(() => {
    if (!hiddenUntil) return;
    const timer = window.setTimeout(() => {
      setHiddenUntil(0);
      tick((value) => value + 1);
    }, Math.max(0, hiddenUntil - Date.now()));
    return () => window.clearTimeout(timer);
  }, [hiddenUntil]);

  const later = useCallback(() => setHiddenUntil(Date.now() + VERSION_LATER_MS), []);

  /** Saves what is open, then loads the page again; the address still names the open design. */
  const reload = useCallback(() => {
    window.dispatchEvent(new Event(SAVE_NOW_EVENT));
    window.setTimeout(() => window.location.reload(), 800);
  }, []);

  return { latest: hiddenUntil > Date.now() ? null : latest, later, reload };
}
