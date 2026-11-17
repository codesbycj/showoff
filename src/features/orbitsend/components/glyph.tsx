import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * orbitsend's icon set — interface, so vectors (I4). The faces are
 * photographs, because a face is a picture of someone.
 *
 * **The board's referral card carries a 3D gift emoji.** Emoji differ across
 * Windows / Android / iOS and the web render cannot show that (I8), so the
 * gift is drawn here instead.
 */
export type GlyphName = 'back' | 'scan' | 'chevron' | 'delete' | 'arrow';

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
      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'scan' && (
        <Path
          d="M4.6 8.6V6.2a1.6 1.6 0 0 1 1.6-1.6h2.4M15.4 4.6h2.4a1.6 1.6 0 0 1 1.6 1.6v2.4M19.4 15.4v2.4a1.6 1.6 0 0 1-1.6 1.6h-2.4M8.6 19.4H6.2a1.6 1.6 0 0 1-1.6-1.6v-2.4"
          {...s}
        />
      )}

      {name === 'chevron' && <Path d="m6.6 9.4 5.4 5.2 5.4-5.2" {...s} />}

      {name === 'delete' && (
        <>
          <Path
            d="M20 5.6H9.6L3.6 12l6 6.4H20a1.6 1.6 0 0 0 1.6-1.6V7.2A1.6 1.6 0 0 0 20 5.6Z"
            {...s}
          />
          <Path d="m12.4 9.6 4.8 4.8M17.2 9.6l-4.8 4.8" {...s} />
        </>
      )}

      {name === 'arrow' && <Path d="M5.6 12h12.8M13.4 7l5 5-5 5" {...s} />}
    </Svg>
  );
}
