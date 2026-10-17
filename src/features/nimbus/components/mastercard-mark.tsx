import { View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { T } from './text';

/**
 * Mastercard's mark: two discs and the wordmark under them.
 *
 * Drawn rather than lifted from Wikimedia, because the whole logo is two
 * circles in the brand's own two colours plus an overlap, and a drawing of it
 * is exact where a traced path would only be close. The proportions are the
 * reference's: the discs measure 20.7dp tall and 32.1dp across, so their
 * centres sit 0.55 of a diameter apart — a little tighter than the official
 * mark's 0.682, which is what the lens between them is drawn from.
 *
 * The overlap is painted as its own path — the intersection of the two circles
 * — rather than relying on blend modes, which react-native-svg does not carry
 * across to Android reliably.
 *
 * The wordmark is set in Inter rather than Mastercard's own face. At 5.3dp it
 * is under four points tall: the letterforms are a texture there, and the one
 * thing that reads is its 28dp width against the discs' 32.
 */
const RED = '#eb001b';
const YELLOW = '#f79e1b';
const OVERLAP = '#ff5f00';

export function MastercardMark({ size = 20.7 }: { size?: number }) {
  // Centres 0.55d apart, so the pair is 1.55d wide — the reference's own.
  const r = size / 2;
  const gap = size * 0.55;
  const w = size + gap;
  const cx1 = r;
  const cx2 = r + gap;

  // The lens: the two arcs that bound the intersection, both of radius r.
  const half = gap / 2;
  const dy = Math.sqrt(Math.max(r * r - half * half, 0));
  const mid = (cx1 + cx2) / 2;
  const lens = `M ${mid} ${r - dy} A ${r} ${r} 0 0 1 ${mid} ${r + dy} A ${r} ${r} 0 0 1 ${mid} ${r - dy} Z`;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={w} height={size} viewBox={`0 0 ${w} ${size}`}>
        <G>
          <Circle cx={cx1} cy={r} r={r} fill={RED} />
          <Circle cx={cx2} cy={r} r={r} fill={YELLOW} />
          <Path d={lens} fill={OVERLAP} />
        </G>
      </Svg>
      <T variant="markWord" color="#ffffff" style={{ marginTop: 1.5 }}>
        mastercard
      </T>
    </View>
  );
}
