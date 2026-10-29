/**
 * Which groups of the ribbon fold up into one button when the window is too narrow for all of them (Stefan, 29.10.2026).
 * Before, the groups wrapped onto a second row below a width set by hand in the stylesheet, and every new button pushed
 * that width up: at 1920 px the last group already stood half outside the window, and at 1366 px the bar took two rows.
 * Now the bar measures itself and folds the groups used least first, so it stays one row as long as that is possible.
 */

/** A group of the bar as it stands open: its key, its width in px, and how early it folds (lower first; null: never). */
export type ToolbarGroupWidth = { key: string; width: number; priority: number | null };

/** How wide a folded group is: one button under its name. */
export const COLLAPSED_GROUP_WIDTH = 64;

/**
 * The groups to fold so the bar fits into `available` px: none when it fits open, else the foldable ones in their order until
 * it does. When even all of them folded do not fit, all foldable ones fold and the bar wraps as before.
 */
export function groupsToCollapse(groups: readonly ToolbarGroupWidth[], available: number): string[] {
  let needed = groups.reduce((sum, group) => sum + group.width, 0);
  const folded: string[] = [];
  const foldable = groups
    .filter((group) => group.priority !== null && group.width > COLLAPSED_GROUP_WIDTH)
    .sort((one, other) => (one.priority ?? 0) - (other.priority ?? 0));
  for (const group of foldable) {
    if (needed <= available) break;
    needed -= group.width - COLLAPSED_GROUP_WIDTH;
    folded.push(group.key);
  }
  return folded;
}
