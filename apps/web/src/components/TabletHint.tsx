"use client";

import { BookOpen, TabletSmartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { guideHref } from "@/lib/guideLinks";
import { t } from "@/lib/i18n";
import { useLanguage } from "@/lib/useLanguage";

const DISMISSED_KEY = "layerling.tabletHintDismissed";

/** A device whose main way in is a finger: a touch screen without a mouse or trackpad that can hover. */
function usesTouchFirst() {
  return window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(hover: none)").matches;
}

/**
 * A strip on the start page for a tablet or phone: there is a chapter of the guide for fingers and
 * styluses. Shown once where touch is the main input, never on a computer with a mouse, and gone for
 * good once it is closed - it must not nag (#467).
 */
export function TabletHint() {
  const language = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!usesTouchFirst()) return;
    try {
      if (window.localStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {
      // Storage blocked: show the hint, it just cannot remember being closed.
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // nothing to remember it in
    }
  };

  return (
    <aside className="install-app-hint tablet-hint" aria-label={t("tabletHint.title")}>
      <span className="install-app-hint-icon" aria-hidden="true">
        <TabletSmartphone size={20} strokeWidth={2.4} />
      </span>
      <div className="install-app-hint-text">
        <strong>{t("tabletHint.title")}</strong>
        <span>{t("tabletHint.body")}</span>
      </div>
      <a className="install-app-hint-button" href={guideHref(language, "tablet")} target="_blank" rel="noreferrer" onClick={dismiss}>
        <BookOpen size={16} strokeWidth={2.6} />
        <span>{t("tabletHint.open")}</span>
      </a>
      <button className="install-app-hint-close" type="button" aria-label={t("tabletHint.dismiss")} title={t("tabletHint.dismiss")} onClick={dismiss}>
        <X size={16} />
      </button>
    </aside>
  );
}
