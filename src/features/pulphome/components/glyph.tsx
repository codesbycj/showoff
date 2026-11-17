import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * pulphome's icon set - interface, so vectors (I4).
 *
 * The board sets its category chips with **emoji**, which differ across
 * Windows, Android and iOS and are missing outright on some of them (I8).
 * These are the same ideas, drawn.
 */
export type GlyphName =
  | 'search'
  | 'heart'
  | 'leaf'
  | 'sprout'
  | 'bottle'
  | 'spark'
  | 'home'
  | 'cart'
  | 'receipt'
  | 'gear';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.7 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'search' && (
        <>
          <Circle cx={10.8} cy={10.8} r={6.4} {...s} />
          <Path d="m15.6 15.6 4 4" {...s} />
        </>
      )}

      {name === 'heart' && (
        <Path
          d="M12 19.6 4.9 12.8a4.3 4.3 0 0 1 0-6.2 4.5 4.5 0 0 1 6.3 0l.8.8.8-.8a4.5 4.5 0 0 1 6.3 0 4.3 4.3 0 0 1 0 6.2Z"
          {...s}
        />
      )}

      {name === 'leaf' && (
        <>
          <Path
            d="M20 4.6c0 8.4-4.4 12.6-10 12.6a5.2 5.2 0 0 1 0-10.4c3.6 0 5.6-1.4 10-2.2Z"
            {...s}
          />
          <Path d="M12.4 12.2 5.4 19.4" {...s} />
        </>
      )}

      {name === 'sprout' && (
        <>
          <Path d="M12 20v-7.6" {...s} />
          <Path d="M12 12.4C12 9 9.6 6.6 6.2 6.6c0 3.4 2.4 5.8 5.8 5.8Z" {...s} />
          <Path d="M12 12.4c0-3.4 2.4-5.8 5.8-5.8 0 3.4-2.4 5.8-5.8 5.8Z" {...s} />
        </>
      )}

      {name === 'bottle' && (
        <>
          <Rect x={9.4} y={2.8} width={5.2} height={3} rx={1} {...s} />
          <Path
            d="M10 5.8v2.4L7.8 11v8.2a1.8 1.8 0 0 0 1.8 1.8h4.8a1.8 1.8 0 0 0 1.8-1.8V11L14 8.2V5.8"
            {...s}
          />
          <Path d="M7.8 14.2h8.4" {...s} />
        </>
      )}

      {name === 'spark' && (
        <>
          <Path d="M12 3.4 13.7 9l5.6 1.7-5.6 1.7L12 18l-1.7-5.6L4.7 10.7 10.3 9Z" {...s} />
          <Path d="M18.4 16.2v3.6M16.6 18h3.6" {...s} />
        </>
      )}

      {name === 'home' && (
        <>
          <Path
            d="M4.4 10.6 12 4.4l7.6 6.2v8.2a1.4 1.4 0 0 1-1.4 1.4H5.8a1.4 1.4 0 0 1-1.4-1.4Z"
            {...s}
          />
          <Path d="M9.8 20.2v-5.6h4.4v5.6" {...s} />
        </>
      )}

      {name === 'cart' && (
        <>
          <Path d="M3 4.4h2.4l2.2 10.4h9.6l2-7.2H6.2" {...s} />
          <Circle cx={9} cy={19} r={1.6} {...s} />
          <Circle cx={17} cy={19} r={1.6} {...s} />
        </>
      )}

      {name === 'receipt' && (
        <>
          <Path d="M5.6 3.6h12.8v16.8l-2.6-1.6-2.6 1.6-2.6-1.6-2.4 1.6Z" {...s} />
          <Path d="M9 8.4h6M9 12.2h6" {...s} />
        </>
      )}

      {name === 'gear' && (
        <>
          <Circle cx={12} cy={12} r={3} {...s} />
          <Path
            d="M12 3.4v2.2M12 18.4v2.2M20.6 12h-2.2M5.6 12H3.4M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9"
            {...s}
          />
        </>
      )}
    </Svg>
  );
}
