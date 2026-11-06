/**
 * Sizes for a real phone, not for the board's artboard.
 *
 * The reference is a posed design shot, so there is no px grid in it worth
 * reconstructing. These are the numbers that are right at 393dp: a 24dp page
 * margin, a 56dp primary control, a display headline in the high thirties.
 * Everything that has to hold at another width is a fraction of the window
 * rather than a constant.
 */
import { useWindowDimensions } from 'react-native';

import { type } from './theme';

export const MARGIN = 24;
export const BUTTON_H = 56;
export const MARK = 42;
export const PAD_TOP = 10;
export const PAD_BOTTOM = 6;

/** Gaps, named for what they separate rather than for their size. */
export const GAP_HERO_HEAD = 34;
export const GAP_HEAD_BODY = 16;
export const GAP_BODY_BUTTON = 30;
export const GAP_BUTTON_FOOT = 18;

/** The headline is three lines and the sentence under it is two. */
const HEAD_BLOCK = 3 * type.display.line + GAP_HEAD_BODY + 2 * type.body.line;
const FOOT_LINE = type.foot.line + 26; // the login row's own padded box

export function useCloveLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();

  /**
   * What is left for the hero once everything with a fixed height is spoken
   * for. Computed rather than measured: `onLayout` reported zero in the
   * harness more than once, and a hero sized from zero is a hole.
   */
  const fixed =
    insets.top +
    PAD_TOP +
    MARK +
    GAP_HERO_HEAD +
    HEAD_BLOCK +
    GAP_BODY_BUTTON +
    BUTTON_H +
    GAP_BUTTON_FOOT +
    FOOT_LINE +
    insets.bottom +
    PAD_BOTTOM;
  const heroH = Math.max(200, height - fixed);

  /** A credit card is 1.586:1, and the fan is three of them stepped down. */
  const cardW = Math.min(width - MARGIN * 2 - 22, 312);
  const cardH = Math.round(cardW / 1.586);
  const step = Math.min(96, Math.max(40, Math.round((heroH - cardH) / 2)));

  return { width, heroH, cardW, cardH, step };
}
