/**
 * Sizes for a 393dp phone.
 *
 * The fan takes whatever is left between the status bar and the text block,
 * so the hero grows on a tall phone instead of leaving a band of ground
 * under it.
 */
import { useWindowDimensions } from 'react-native';

import { type } from './theme';

export const MARGIN = 26;
export const PAD_TOP = 8;
export const CTA_H = 64;

export const GAP_FAN_HEAD = 30;
export const GAP_HEAD_BODY = 14;
export const GAP_BODY_CTA = 30;
export const GAP_CTA_FOOT = 18;

const HEAD_BLOCK = 2 * type.display.line + GAP_HEAD_BODY + 2 * type.body.line;
const FOOT_H = type.foot.line + 26;

export function useStartLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();
  const fixed =
    insets.top +
    PAD_TOP +
    GAP_FAN_HEAD +
    HEAD_BLOCK +
    GAP_BODY_CTA +
    CTA_H +
    GAP_CTA_FOOT +
    FOOT_H +
    insets.bottom +
    10;
  return { width, fanH: Math.max(240, height - fixed) };
}
