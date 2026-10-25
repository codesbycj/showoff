/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The task list takes `flex: 1` between the project row and the tab bar and
 * its rows share that space, so the screen fills at any height; checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;
export const PANEL_PAD = 20;
export const PANEL_HEIGHT = 168;

export const AVATAR = 52;

/** The search field straddles the panel's bottom edge. */
export const FIELD_HEIGHT = 58;
export const FIELD_OVERLAP = 29;

export const SECTION_TOP = 22;
export const PROJECT_TOP = 14;
export const PROJECT_HEIGHT = 196;
export const PROJECT_WIDTH = 214;
export const PROJECT_GAP = 14;

export const TASKS_TOP = 22;
export const TASK_HEIGHT = 62;
export const TASK_GAP = 10;

export const TABBAR_HEIGHT = 64;
export const FAB = 52;
