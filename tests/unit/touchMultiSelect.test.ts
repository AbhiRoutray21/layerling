// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TouchMultiSelectButton } from "@/components/workplane/TouchMultiSelectButton";
import { showsTouchMultiSelect } from "@/lib/touchMultiSelect";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  // jsdom has no pointer capture; the button only asks the browser for it on a hold.
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.releasePointerCapture ??= () => {};
});

describe("the Select multiple button of a touch screen (#337)", () => {
  it("is for a finger on a body, not for empty space or a mouse", () => {
    expect(showsTouchMultiSelect("touch", "body-1")).toBe(true);
    expect(showsTouchMultiSelect("touch", null)).toBe(false);
    expect(showsTouchMultiSelect("mouse", "body-1")).toBe(false);
    expect(showsTouchMultiSelect("pen", "body-1")).toBe(false);
  });

  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  afterEach(() => {
    if (root) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  const mount = (held = false) => {
    const onHeldChange = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    const render = (nextHeld: boolean) => act(() => {
      root!.render(createElement(TouchMultiSelectButton, { held: nextHeld, onHeldChange }));
    });
    render(held);
    return { button: container.querySelector("button")!, onHeldChange, render };
  };

  const pointer = (type: string, pointerId = 1, pointerType = "touch") => new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    pointerId,
    pointerType,
  });

  it("holds the selection open while the finger is on it", () => {
    const { button, onHeldChange } = mount();
    act(() => button.dispatchEvent(pointer("pointerdown")));
    expect(onHeldChange).toHaveBeenLastCalledWith(true);
    act(() => button.dispatchEvent(pointer("pointerup")));
    expect(onHeldChange).toHaveBeenLastCalledWith(false);
  });

  it("lets go when the touch is cancelled, and does not hold a second finger on the button", () => {
    const { button, onHeldChange } = mount();
    act(() => button.dispatchEvent(pointer("pointerdown", 1)));
    act(() => button.dispatchEvent(pointer("pointerdown", 2)));
    expect(onHeldChange).toHaveBeenCalledTimes(1);
    act(() => button.dispatchEvent(pointer("pointercancel", 2)));
    expect(onHeldChange).toHaveBeenLastCalledWith(true);
    act(() => button.dispatchEvent(pointer("pointercancel", 1)));
    expect(onHeldChange).toHaveBeenLastCalledWith(false);
  });

  it("shows that it is held", () => {
    const { button, render } = mount();
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.classList.contains("held")).toBe(false);
    render(true);
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.classList.contains("held")).toBe(true);
  });
});
