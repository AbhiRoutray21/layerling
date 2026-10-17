"use client";

import { Pin, PinOff } from "lucide-react";
import type { ReactNode } from "react";
import { GuideHelpLink } from "@/components/GuideHelpLink";
import { t } from "@/lib/i18n";
import { useLanguage } from "@/lib/useLanguage";
import type { GuideSection } from "@/lib/guideLinks";
import { useMovablePanel } from "@/lib/useMovablePanel";

/**
 * The panel the Shapes button opens (#433, #447). It hangs under its button as always, closes after
 * a shape is picked and when anything else is clicked, and nothing about that changed. Two things
 * were added: its title bar moves it - over the Properties panel, say, where it does not cover the
 * spot a shape is going to be put - and a pin keeps it open, to put several shapes one after the
 * other. Where it stands is kept in this browser; a double-click on the title bar puts it back under
 * its button. The same panel serves the sketch's shapes.
 */
export function ShapeMenuPanel({
  className = "",
  role,
  ariaLabel,
  title,
  helpSection,
  pinned,
  onTogglePinned,
  children,
}: {
  className?: string;
  role?: "menu";
  ariaLabel?: string;
  /** The words in the title bar. */
  title: string;
  /** The part of the guide the question mark in the title bar opens. */
  helpSection: GuideSection;
  pinned: boolean;
  onTogglePinned: () => void;
  children: ReactNode;
}) {
  useLanguage();
  // The panel is placed within the whole editor, so it can leave the toolbar it hangs from.
  const movable = useMovablePanel<HTMLDivElement>("layerling.editor.shapeMenuPosition", {
    area: (panel) => panel.closest<HTMLElement>(".layerling-editor"),
  });
  const PinIcon = pinned ? PinOff : Pin;
  return (
    <div
      ref={movable.panelRef}
      className={`shape-menu-dropdown ${className} ${movable.dragging ? "moving" : ""}`.replace(/\s+/g, " ").trim()}
      style={movable.style}
      role={role}
      aria-label={ariaLabel}
    >
      <div className="shape-menu-title" title={t("shapeMenu.moveHint")} {...movable.handleProps}>
        <span className="shape-menu-title-text">
          {title}
          <GuideHelpLink section={helpSection} />
        </span>
        <button
          className={`shape-menu-pin ${pinned ? "active" : ""}`}
          type="button"
          aria-pressed={pinned}
          aria-label={t("shapeMenu.keepOpen")}
          title={t(pinned ? "shapeMenu.keepOpenOn" : "shapeMenu.keepOpen")}
          onClick={onTogglePinned}
        >
          <PinIcon size={16} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </div>
      {children}
    </div>
  );
}
