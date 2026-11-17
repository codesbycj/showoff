import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * lumistock's icon set — interface, so vectors (I4).
 *
 * `brand` is a drawn mark for a **fictional** company. The board poses
 * McDonald's golden arches here; a rebuild that ships a real company's logo is
 * impersonation, so this is a wheat-and-bowl mark belonging to nobody.
 */
export type GlyphName = 'back' | 'chevronDown' | 'trendUp' | 'trendDown' | 'brand' | 'flag';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && <Path d="m14.4 6-6 6 6 6" {...s} strokeWidth={2.1} />}
      {name === 'chevronDown' && <Path d="m7.6 10 4.4 4.4 4.4-4.4" {...s} strokeWidth={2} />}

      {name === 'trendUp' && (
        <Path d="M5 15.2 10 10.2l3 3L19 7.2" {...s} strokeWidth={2.2} />
      )}
      {name === 'trendDown' && (
        <Path d="M5 8.8 10 13.8l3-3L19 16.8" {...s} strokeWidth={2.2} />
      )}

      {name === 'brand' && (
        // A bowl under three grains — a food company, drawn, owned by nobody.
        <>
          <Path d="M4 13.2h16a8 8 0 0 1-8 7 8 8 0 0 1-8-7Z" fill={ct.brandB} />
          <Path d="M12 3.2c1.6 1.6 1.6 4.4 0 6-1.6-1.6-1.6-4.4 0-6Z" fill={ct.brandA} />
          <Path d="M7 5.4c1.9 1 2.6 3.5 1.6 5.4C6.7 9.8 6 7.3 7 5.4Z" fill={ct.brandA} />
          <Path d="M17 5.4c1 1.9.3 4.4-1.6 5.4-1-1.9-.3-4.4 1.6-5.4Z" fill={ct.brandA} />
        </>
      )}

      {name === 'flag' && (
        // A flag disc, simplified: a canton and stripes. An idea, not a trace.
        <>
          <Circle cx={12} cy={12} r={11} fill="#F2F2F2" />
          <Path d="M1.6 6.6h20.8M1.6 9h20.8M1.6 12h20.8M1.6 15h20.8M3.4 18h17.2" stroke="#C8303A" strokeWidth={2.2} />
          <Rect x={2} y={3} width={10} height={7} fill="#2B3C8C" />
        </>
      )}
    </Svg>
  );
}
