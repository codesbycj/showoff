import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * crypinswap's icon set — interface, so vectors (I4).
 *
 * The two asset marks are wordmark-scale brand marks drawn as vectors in every
 * real wallet, so they are in drawing range by the §2.5 test. They are
 * simplified rather than traced: at 20dp the Bitcoin B and Tether's T carry the
 * recognition on their own.
 */
export type GlyphName =
  | 'back'
  | 'help'
  | 'chevronDown'
  | 'flip'
  | 'backspace'
  | 'btc'
  | 'usdt';

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

      {name === 'help' && (
        <>
          <Path d="M9.3 9.1a2.8 2.8 0 1 1 3.5 2.9c-.6.2-.8.7-.8 1.3v.6" {...s} strokeWidth={2} />
          <Circle cx={12} cy={17.4} r={1.25} fill={color} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m7.6 10 4.4 4.4 4.4-4.4" {...s} strokeWidth={2.2} />}

      {name === 'flip' && (
        // Two arrows passing each other — the pay/receive switch.
        <>
          <Path d="M8.6 4.4v15.2M8.6 19.6 5.2 16.2M8.6 19.6l3.4-3.4" {...s} strokeWidth={2} />
          <Path d="M15.4 19.6V4.4M15.4 4.4 12 7.8M15.4 4.4l3.4 3.4" {...s} strokeWidth={2} />
        </>
      )}

      {name === 'backspace' && (
        <>
          <Path d="M8.4 5.6h10.2a1.8 1.8 0 0 1 1.8 1.8v9.2a1.8 1.8 0 0 1-1.8 1.8H8.4L3.2 12Z" {...s} />
          <Path d="m11.4 9.6 4.8 4.8M16.2 9.6l-4.8 4.8" {...s} strokeWidth={1.8} />
        </>
      )}

      {name === 'btc' && (
        // The Bitcoin B, stroked. Filling the two bowls as one path closes the
        // counters at this size and the mark comes out a solid blob.
        <>
          <Path d="M8.6 5.6v12.8" {...s} strokeWidth={2.1} />
          <Path d="M8.6 5.6h4.6a3.2 3.2 0 0 1 0 6.4H8.6" {...s} strokeWidth={2.1} />
          <Path d="M8.6 12h5.2a3.2 3.2 0 0 1 0 6.4H8.6" {...s} strokeWidth={2.1} />
          <Path d="M10.8 3.3v2.3M13.7 3.3v2.3M10.8 18.4v2.3M13.7 18.4v2.3" {...s} strokeWidth={1.8} />
        </>
      )}

      {name === 'usdt' && (
        // Tether's T on its bar.
        <>
          <Path d="M5.4 5.4h13.2v3.2h-4.8v2.1h-3.6V8.6H5.4Z" fill={color} />
          <Path d="M10.2 10.1v8.5h3.6v-8.5Z" fill={color} />
          <Path
            d="M12 13.4c3.9 0 7-.9 7-2.1s-3.1-2.1-7-2.1-7 .9-7 2.1 3.1 2.1 7 2.1Z"
            stroke={color}
            strokeWidth={1.5}
            fill="none"
          />
        </>
      )}
    </Svg>
  );
}
