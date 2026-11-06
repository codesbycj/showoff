/**
 * Sizes for a 393dp phone.
 *
 * The card takes the space left above the text block, so the hero fills the
 * top of the screen at any height rather than floating in a band of ground.
 */
import { useWindowDimensions } from 'react-native';

import { type } from './theme';

export const MARGIN = 24;
export const PAD_TOP = 8;
export const CTA_H = 58;
export const DOTS_H = 10;

export const GAP_CARD_HEAD = 28;
export const GAP_HEAD_BODY = 12;
export const GAP_BODY_DOTS = 22;
export const GAP_DOTS_CTA = 22;

const HEAD_BLOCK = 2 * type.display.line + GAP_HEAD_BODY + 2 * type.body.line;

export function useFernStartLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();
  const fixed =
    insets.top +
    PAD_TOP +
    GAP_CARD_HEAD +
    HEAD_BLOCK +
    GAP_BODY_DOTS +
    DOTS_H +
    GAP_DOTS_CTA +
    CTA_H +
    insets.bottom +
    14;
  return { width, heroH: Math.max(260, height - fixed) };
}
