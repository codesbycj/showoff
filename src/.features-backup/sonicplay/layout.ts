import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for sonicplay, derived from the live window (I2).
 *
 * **The sleeve is the remainder.** A player's artwork is the one block that
 * genuinely wants the slack — a bigger sleeve is a better player — so
 * everything below it is sized and the cover takes what is left, capped at the
 * page width so it stays square. That is why the foot cannot open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const barH = 48;
  const gapBar = 18;

  const gapCover = 24;
  const titleH = 50;
  const gapTitle = 14;
  const scrubH = 40;
  const gapScrub = 18;
  const transportH = 64;
  const gapTransport = 18;
  const lyricsH = 36;
  const footer = Math.max(insets.bottom, 14);

  const below =
    gapCover + titleH + gapTitle + scrubH + gapScrub + transportH + gapTransport + lyricsH + footer;
  const space = H - insets.top - barH - gapBar - below;
  const cover = Math.max(200, Math.min(space, W - margin * 2));

  /**
   * A square sleeve cannot be wider than the page, so on a tall screen there
   * is slack left over. **It is shared across the five gaps, not dumped into
   * one** — putting all of it above the title opened a 105dp hole, which
   * `audit.js` reports as `GAP` and R1 fails at 72.
   */
  const slack = Math.max(space - cover, 0);
  const share = Math.round(slack / 5);

  return {
    W,
    H,
    insets,
    margin,
    barH,
    gapBar: gapBar + share,
    control: 38,
    cover: { size: cover, radius: 16 },
    gapCover: gapCover + share,
    titleH,
    gapTitle: gapTitle + share,
    scrubH,
    gapScrub: gapScrub + share,
    transport: { h: transportH, play: 64, item: 44 },
    gapTransport: gapTransport + (slack - share * 4),
    lyricsH,
    footer,
  };
}
