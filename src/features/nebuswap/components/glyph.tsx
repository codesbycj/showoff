import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nebuswap's icon set — interface, so vectors (I4). The only photograph on the
 * screen is the account holder's face.
 *
 * The coin marks are drawn as the *idea* of each asset — a diamond, a crossed
 * B, a ring — because every asset here is invented. No real exchange's or
 * token's mark is reproduced (I1).
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'chevron'
  | 'reverse'
  | 'exchange'
  | 'filter'
  | 'trend'
  | 'spark'
  | 'home'
  | 'swap'
  | 'services'
  | 'support'
  | 'nova'
  | 'orbit'
  | 'solis'
  | 'link';

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
      {name === 'chevron' && <Path d="m6.6 9.4 5.4 5.2 5.4-5.2" {...s} />}

      {name === 'reverse' && (
        <Path
          d="M8.6 4.8v14.4M8.6 19.2 5.4 16M8.6 4.8 11.8 8M15.4 19.2V4.8M15.4 4.8 12.2 8M15.4 4.8l3.2 3.2"
          {...s}
        />
      )}

      {name === 'exchange' && (
        <Path d="M4.6 9.4h12.8M14.4 6.6l3 2.8-3 2.8M19.4 14.6H6.6M9.6 11.8l-3 2.8 3 2.8" {...s} />
      )}

      {name === 'filter' && <Path d="M4.6 7.4h14.8M7 12h10M9.6 16.6h4.8" {...s} />}

      {name === 'trend' && (
        <Path d="M4 16.4 9.6 10.8l3.2 3.2L20 6.8M20 6.8h-4.6M20 6.8v4.6" {...s} />
      )}

      {/* The assistant mark on the insight card: a speech bubble with a spark. */}
      {name === 'spark' && (
        <>
          <Path
            d="M4.6 11.4a6.8 6.8 0 0 1 13.6 0c0 3.6-3 6.4-7 6.4a8 8 0 0 1-2.2-.3l-3.4 1.2.9-2.9a6.4 6.4 0 0 1-1.9-4.4Z"
            {...s}
          />
          <Path
            d="m18.6 3.4.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8Z"
            fill={color}
            stroke="none"
          />
        </>
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}
      {name === 'swap' && (
        <Path d="M5 8.6h11.4M13.4 5.6l3 3-3 3M19 15.4H7.6M10.6 12.4l-3 3 3 3" {...s} />
      )}
      {name === 'services' && (
        <>
          <Rect x={4.2} y={4.2} width={6.4} height={6.4} rx={2} {...s} />
          <Rect x={13.4} y={4.2} width={6.4} height={6.4} rx={2} {...s} />
          <Rect x={4.2} y={13.4} width={6.4} height={6.4} rx={2} {...s} />
          <Rect x={13.4} y={13.4} width={6.4} height={6.4} rx={2} {...s} />
        </>
      )}
      {name === 'support' && (
        <Path
          d="M4.6 11.4a7.4 7.4 0 0 1 14.8 0c0 3.8-3.4 6.8-7.4 6.8a8.6 8.6 0 0 1-2.4-.3L5.8 19.4l1-3.2a7 7 0 0 1-2.2-4.8Z"
          {...s}
        />
      )}

      {/* Four invented asset marks. */}
      {name === 'nova' && <Path d="M12 3.6 18.4 12 12 20.4 5.6 12Z" fill={color} />}
      {name === 'orbit' && (
        <>
          <Circle cx={12} cy={12} r={6.6} {...s} />
          <Path d="M12 3.6v16.8" {...s} />
        </>
      )}
      {name === 'solis' && (
        <>
          <Circle cx={12} cy={12} r={3.4} fill={color} stroke="none" />
          <Path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20" {...s} />
        </>
      )}
      {name === 'link' && (
        <Path
          d="M10.2 13.8a3.6 3.6 0 0 1 0-5.1l2.3-2.3a3.6 3.6 0 0 1 5.1 5.1l-1.1 1.1M13.8 10.2a3.6 3.6 0 0 1 0 5.1l-2.3 2.3a3.6 3.6 0 0 1-5.1-5.1l1.1-1.1"
          {...s}
        />
      )}
    </Svg>
  );
}
