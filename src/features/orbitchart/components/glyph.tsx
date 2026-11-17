import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * orbitchart's icon set — interface, so vectors (I4). The faces are
 * photographs, because a face is a picture of someone.
 *
 * **The board's referral card carries a 3D gift emoji.** Emoji differ across
 * Windows / Android / iOS and the web render cannot show that (I8), so the
 * gift is drawn here instead.
 */
export type GlyphName = 'bars' | 'line' | 'stats';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bars' && <Path d="M6 18.4V11M12 18.4V5.6M18 18.4v-4.8" {...s} />}

      {name === 'line' && (
        <Path d="M4 16.4 9.6 10.8l3.2 3.2L20 6.8M20 6.8h-4.6M20 6.8v4.6" {...s} />
      )}

      {name === 'stats' && <Path d="M6 18.4V11M12 18.4V5.6M18 18.4v-4.8" {...s} />}
    </Svg>
  );
}
