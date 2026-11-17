import { useWindowDimensions } from 'react-native';

import { txns } from './data/wallet';
import { useInsets } from './use-insets';

/**
 * Every size for lumihome, derived from the live window (I2).
 *
 * **The transaction list is the remainder.** The board crops its list at the
 * screen edge, so it genuinely continues; I3's lever for that space is the row
 * the board cut, never a taller block above it. The list is sized in whole
 * rows so nothing is clipped through its own text (R2) and no band is left at
 * the foot (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 46;
  const gapHeader = 18;
  const balanceLabelH = 18;
  const balanceH = 42;
  const gapBalance = 16;
  const actionsH = 52;
  const gapActions = 22;
  const quickTitleH = 21;
  const gapQuickTitle = 12;
  const tileH = 86;
  const gapQuick = 20;
  const recentH = 22;
  const gapRecent = 8;

  const listTop =
    insets.top +
    headerH +
    gapHeader +
    balanceLabelH +
    balanceH +
    gapBalance +
    actionsH +
    gapActions +
    quickTitleH +
    gapQuickTitle +
    tileH +
    gapQuick +
    recentH +
    gapRecent;

  const footer = Math.max(insets.bottom, 12);
  const listH = Math.max(180, H - listTop - footer);
  const rows = Math.min(txns.length, Math.max(3, Math.round(listH / 64)));
  const rowH = listH / rows;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 38,
    avatar: 36,
    balanceLabelH,
    balanceH,
    gapBalance,
    actions: { h: actionsH, radius: 26, disc: 24 },
    gapActions,
    quickTitleH,
    gapQuickTitle,
    quick: { h: tileH, w: 108, radius: 16, disc: 38 },
    gapQuick,
    recentH,
    gapRecent,
    list: { h: listH, rowH, rows, disc: 38 },
    footer,
  };
}
