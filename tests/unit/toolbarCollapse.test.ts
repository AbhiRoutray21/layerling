import { describe, expect, it } from "vitest";
import { COLLAPSED_GROUP_WIDTH, groupsToCollapse } from "@/lib/toolbarCollapse";

describe("groups of the ribbon that fold up when the window is narrow", () => {
  const groups = [
    { key: "clipboard", width: 150, priority: 2 },
    { key: "shapes", width: 60, priority: null },
    { key: "modify", width: 520, priority: 7 },
    { key: "manage", width: 200, priority: 1 },
  ];

  it("folds nothing while the bar fits open", () => {
    expect(groupsToCollapse(groups, 930)).toEqual([]);
  });

  it("folds the groups used least first, only as many as needed", () => {
    // 930 wide open; folding manage saves 200 - 64 (794 left), clipboard 150 - 64 more (708 left).
    expect(groupsToCollapse(groups, 800)).toEqual(["manage"]);
    expect(groupsToCollapse(groups, 710)).toEqual(["manage", "clipboard"]);
  });

  it("never folds a group without a priority, and folds all others when even that is not enough", () => {
    expect(groupsToCollapse(groups, 100)).toEqual(["manage", "clipboard", "modify"]);
  });

  it("leaves a group alone that is no wider folded than open", () => {
    expect(groupsToCollapse([{ key: "small", width: COLLAPSED_GROUP_WIDTH, priority: 1 }, { key: "big", width: 300, priority: 2 }], 200)).toEqual(["big"]);
  });
});
