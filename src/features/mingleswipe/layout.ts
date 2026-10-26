/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * The portrait is full-bleed and everything else is laid over it, so the
 * layout is a column with one `flex: 1` spacer: the header sits on the top
 * inset and the profile block runs to the bottom inset. There is no dead
 * canvas to measure because there is no canvas.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEAD_TOP = 4;
export const HEAD_AVATAR = 42;
export const HEAD_DISC = 44;

export const PLACE_TOP = 10;
export const CHIPS_TOP = 12;
export const CHIP_HEIGHT = 34;
export const BIO_TOP = 14;

export const ACTIONS_TOP = 16;
export const ACTION_HEIGHT = 62;
