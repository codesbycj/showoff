import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * fernhome's icon set — interface, so vectors (I4).
 *
 * The board sets the greeting's hand and the weather's sun as **emoji**, which
 * differ across Windows / Android / iOS and are missing outright on Windows
 * (I8, §4.4). Both are in drawing range — they express an idea rather than
 * reproduce an arrangement — so both are drawn here.
 */
export type GlyphName =
  | 'wave'
  | 'sun'
  | 'search'
  | 'hike'
  | 'kayak'
  | 'bike'
  | 'climb'
  | 'days'
  | 'distance'
  | 'party'
  | 'home'
  | 'grid';

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
      {name === 'wave' && (
        <>
          <Path d="M9.1 11.4V5.6a1.55 1.55 0 0 1 3.1 0v4.6" {...s} />
          <Path d="M12.2 10.2V4.4a1.55 1.55 0 0 1 3.1 0v5.8" {...s} />
          <Path
            d="M15.3 10.6V6.8a1.55 1.55 0 0 1 3.1 0v7.9a6.1 6.1 0 0 1-12.2 0v-3.3a1.55 1.55 0 0 1 3.1 0"
            {...s}
          />
        </>
      )}

      {name === 'sun' && (
        <>
          <Circle cx={12} cy={12} r={4.6} fill={color} stroke="none" />
          <Path
            d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {name === 'search' && (
        <>
          <Circle cx={10.8} cy={10.8} r={6.4} {...s} />
          <Path d="m15.6 15.6 4 4" {...s} />
        </>
      )}

      {name === 'hike' && (
        <>
          <Circle cx={13.4} cy={4.6} r={1.9} fill={color} stroke="none" />
          <Path
            d="M9.4 20.4 11 14l-2.2-2.6 2.8-3.4 3 2 2.6.6M13 14l2 2 1 4.4M18.8 4.6v15.8"
            {...s}
          />
        </>
      )}

      {name === 'kayak' && (
        <>
          <Path d="M3.6 16.4c3 2 5.6 2.6 8.4 2.6s5.4-.6 8.4-2.6" {...s} />
          <Path d="M7 6.6 17 16.6M17 6.6 7 16.6" {...s} />
        </>
      )}

      {name === 'bike' && (
        <>
          <Circle cx={5.6} cy={17} r={3.4} {...s} />
          <Circle cx={18.4} cy={17} r={3.4} {...s} />
          <Path d="m5.6 17 4.6-5.4 3.4 2.6 4.8 2.8M10.2 11.6 12.6 8l3 2.4h2.6" {...s} />
        </>
      )}

      {name === 'climb' && (
        <>
          <Path d="M2.6 19.4 9.4 7.6l4.1 7.1" {...s} />
          <Path d="m11 15.4 3.6-5.6 6.8 9.6H2.6" {...s} />
        </>
      )}

      {name === 'days' && (
        <>
          <Rect x={3.4} y={5.2} width={17.2} height={15.4} rx={3.4} {...s} />
          <Path d="M3.4 9.8h17.2M8.4 3.4v3.6M15.6 3.4v3.6" {...s} />
        </>
      )}

      {name === 'distance' && (
        <>
          <Circle cx={5.6} cy={6.4} r={2.6} {...s} />
          <Circle cx={18.4} cy={17.6} r={2.6} {...s} />
          <Path
            d="M8.4 7.6c3.4.6 4.6 2.2 4.2 4.2-.4 2 1 3.8 3.4 4.6"
            {...s}
            strokeDasharray="1 3"
          />
        </>
      )}

      {name === 'party' && (
        <>
          <Circle cx={9.2} cy={8.4} r={3.2} {...s} />
          <Path d="M3.6 19.6c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2" {...s} />
          <Path d="M15.4 5.8a3.2 3.2 0 0 1 0 5.6M16.8 14.8c2.2.5 3.6 2.3 3.6 4.8" {...s} />
        </>
      )}

      {name === 'home' && (
        <Path
          d="M3.8 10.4 12 3.8l8.2 6.6v8.2a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8Z"
          {...s}
        />
      )}

      {name === 'grid' && (
        <>
          <Rect x={3.6} y={3.6} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={13.2} y={3.6} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={3.6} y={13.2} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={13.2} y={13.2} width={7.2} height={7.2} rx={2.2} {...s} />
        </>
      )}
    </Svg>
  );
}
