import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for twirlfeed, derived from the live window (I2).
 *
 * **The collage is the remainder.** A feed's photograph is the one block that
 * genuinely wants the slack, so everything below it is sized and the collage
 * takes what is left — which means the foot cannot open a band (I3) and no
 * spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const barH = 44;
  const gapBar = 10;
  const storyH = 86;
  const gapStory = 10;
  const authorH = 48;
  const gapAuthor = 6;
  const titleH = 24;
  const bodyH = 18 * 2;
  const gapCopy = 10;

  const gapCollage = 10;
  const statsH = 24;
  const actionsH = 44;
  const nextH = 60;
  const tabsH = 60;
  const footer = Math.max(insets.bottom, 10);

  const above =
    insets.top + barH + gapBar + storyH + gapStory + authorH + gapAuthor + titleH + bodyH + gapCopy;
  const below = gapCollage + statsH + actionsH + nextH + tabsH + footer;
  const collageH = Math.max(180, H - above - below);

  return {
    W,
    H,
    insets,
    margin,
    barH,
    gapBar,
    control: 36,
    story: { h: storyH, avatar: 50 },
    gapStory,
    authorH,
    gapAuthor,
    titleH,
    bodyH,
    gapCopy,
    collage: { h: collageH, gap: 6, radius: 12 },
    gapCollage,
    statsH,
    actionsH,
    next: { h: nextH, avatar: 38 },
    avatar: 38,
    tabs: { h: tabsH },
    footer,
  };
}
