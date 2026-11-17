import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * crypinconfirm's icon set — interface, so vectors (I4).
 *
 * The two asset marks are wordmark-scale brand marks drawn as vectors in every
 * real wallet, so they are in drawing range by the §2.5 test.
 */
export type GlyphName = 'back' | 'help' | 'chevronRight' | 'check' | 'btc' | 'usdt';

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

      {name === 'chevronRight' && (
        // Doubled, as the slide knob draws it.
        <>
          <Path d="m7.4 6.6 5.4 5.4-5.4 5.4" {...s} strokeWidth={2.2} />
          <Path d="m13.6 6.6 5.4 5.4-5.4 5.4" {...s} strokeWidth={2.2} />
        </>
      )}

      {name === 'check' && <Path d="m5.6 12.4 4.2 4.2 8.6-9.2" {...s} strokeWidth={2.4} />}

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
