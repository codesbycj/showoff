/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The dock floats at the foot and the ticket stack is sized so the heading
 * under it clears the bar. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 40;

export const DISPLAY_TOP = 22;
export const BLURB_TOP = 8;

export const TIMER_TOP = 14;
export const TIMER_HEIGHT = 34;

/** The stack of tickets. The front one is whole; the others are their top edge. */
export const TICKETS_TOP = 16;
export const TICKET_HEIGHT = 190;
export const TICKET_PEEK = 78;
export const CARD_PAD = 16;

export const FOOT_TOP = 22;

export const DOCK_HEIGHT = 64;
