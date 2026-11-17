import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nebuhome's icon set — interface, so vectors (I4). The only photograph on the
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
  | 'search'
  | 'bell'
  | 'receive'
  | 'send'
  | 'buy'
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
      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'bell' && (
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'receive' && <Path d="M12 5.2v12.4M12 17.6l-4-4M12 17.6l4-4" {...s} />}
      {name === 'send' && <Path d="M7.4 16.6 16.6 7.4M9.4 7.4h7.2v7.2" {...s} />}
      {name === 'buy' && (
        <Path
          d="M9 6.4h4.2a2.8 2.8 0 0 1 0 5.6H9Zm0 5.6h4.8a2.8 2.8 0 0 1 0 5.6H9Zm0-5.6V4.6m0 13v-1.8m3.4-11.2V4m0 16v-1.6"
          {...s}
        />
      )}

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
