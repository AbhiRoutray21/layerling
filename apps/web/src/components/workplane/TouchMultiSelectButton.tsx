"use client";

import { Boxes } from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { t } from "@/lib/i18n";

/**
 * Tinkercad's round button in the lower left (#337): held with one finger, a tap of another finger
 * on a body adds it to the selection or takes it out - what Shift does with a keyboard, for a
 * tablet that has none. The button is shown when a finger picks a body and gone again when the
 * finger lands on empty space; a mouse never needs it.
 */
export function TouchMultiSelectButton({
  held,
  onHeldChange,
}: {
  held: boolean;
  onHeldChange: (held: boolean) => void;
}) {
  const pointerRef = useRef<number | null>(null);
  const label = t("contextMenu.selectMultiple");

  const release = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerId = pointerRef.current;
    if (pointerId === null || event.pointerId !== pointerId) return;
    pointerRef.current = null;
    if (event.currentTarget.hasPointerCapture(pointerId)) event.currentTarget.releasePointerCapture(pointerId);
    onHeldChange(false);
  };

  return (
    <button
      type="button"
      className={`touch-multi-select${held ? " held" : ""}`}
      aria-label={label}
      aria-pressed={held}
      title={label}
      onPointerDown={(event) => {
        // One finger holds it; another one that lands here is not a second hold.
        if (pointerRef.current !== null) return;
        event.preventDefault();
        event.stopPropagation();
        pointerRef.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        onHeldChange(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Boxes size={26} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
