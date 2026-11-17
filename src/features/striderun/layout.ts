import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for striderun, derived from the live window (I2).
 *
 * **The stat grid is the remainder.** The header, the duration and the
 * controls are sized and the four figures take what is left, so the controls
 * always sit on the foot with no band under them (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const headerH = 52;
  const gapHeader = 14;

  const gapDuration = 6;

  const effortH = 82;
  const splitsH = 104;
  const controlsH = 122;
  const footer = insets.bottom + 4;

  /**
   * **The clock is the remainder, not the stat grid.** Giving the grid the
   * slack spread its two rows 100dp apart — an R1 GAP FAIL — and I3 says the
   * fix for empty space is to make the dominant element bigger, never to
   * spread the rest out.
   */
  /**
   * **The clock and the stats share the slack through flex, not through one
   * remainder.** Giving it all to either block opened a 75dp hole beside that
   * block's centred content, and the hole simply moved when the other block
   * grew — R1 counts it wherever it lands. Split two ways it is half the size
   * in each place, and the type is set large enough that neither half reaches
   * the 48dp mark.
   */
  const durationFlex = 0.82;
  const statsFlex = 1.15;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    gapDuration,
    durationFlex,
    statsFlex,
    splits: { h: splitsH },
    effort: { h: effortH },
    controlsH,
    footer,
  };
}
