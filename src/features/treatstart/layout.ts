/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 24;

/** The stack of product cards. */
export const CARD_W = 224;
export const CARD_PAD = 10;
export const PHOTO_H = 168;
/** How far the second card is thrown past the first. */
export const CARD_DROP = 248;
/**
 * The throw's own height.
 *
 * The stack is centred in whatever the copy leaves rather than hung from the
 * top: on a tall phone that splits the slack above and below the cards, which
 * is air around the artwork — not the band of dead canvas at the foot that a
 * top-hung stack leaves (AGENTS.md, "The screen has to fill the screen").
 */
export const STACK_H = CARD_DROP + CARD_PAD * 2 + PHOTO_H + 56;
/** The two cards are thrown, not stacked: each is turned about its centre. */
export const TILT_TOP = -7;
export const TILT_BOTTOM = -5;

/** The floating heart and cart discs. */
export const CHIP = 44;

/** The copy under the stack. */
export const COPY_TOP = 10;
export const BODY_TOP = 8;

/** The button. */
export const BUTTON_TOP = 20;
export const BUTTON_HEIGHT = 56;
export const BUTTON_BOTTOM = 8;
