import Svg, { Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * lumistart's icon set — interface, so vectors (I4).
 *
 * `wave` replaces the board's Mastercard mark. Shipping a real payment
 * network's logo on a fictional card is impersonation, and a contactless wave
 * is the one mark on a card that belongs to nobody.
 */
export type GlyphName = 'logo' | 'chip' | 'wave';

type Props = { name: GlyphName; size?: number; color?: string };

export function Glyph({ name, size = 20, color = ct.deep }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'logo' && (
        // Two offset squares — the board's own mark, which is abstract enough
        // to be an idea rather than someone's property.
        <>
          <Rect x={2.5} y={2.5} width={9} height={9} rx={1.2} fill={color} />
          <Rect x={12.5} y={12.5} width={9} height={9} rx={1.2} fill={color} />
        </>
      )}

      {name === 'chip' && (
        // The contact plate: a rounded rectangle with its tracks.
        <>
          <Rect x={3} y={6} width={18} height={12} rx={2.6} fill={color} opacity={0.9} />
          <Path
            d="M9 6v12M15 6v12M3 10h6M15 10h6M3 14h6M15 14h6"
            stroke={ct.card}
            strokeWidth={1.1}
            strokeLinecap="round"
          />
        </>
      )}

      {name === 'wave' && (
        // Contactless. Four arcs, growing.
        <Path
          d="M7.5 8.4a5 5 0 0 1 0 7.2M11 6.2a8.2 8.2 0 0 1 0 11.6M14.5 4a11.4 11.4 0 0 1 0 16M4 10.4a2 2 0 0 1 0 3.2"
          stroke={color}
          strokeWidth={1.9}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </Svg>
  );
}
