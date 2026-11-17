import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * ferntrip's icon set — interface, so vectors (I4). The summit, the party and
 * the stay are photographs, because each is a picture *of* something.
 *
 * The board sets its sun and its flag as **emoji**, which differ across
 * Windows / Android / iOS and are missing outright on Windows (I8, §4.4), so
 * both are drawn here.
 */
export type GlyphName = 'back' | 'sun' | 'summit' | 'days' | 'distance' | 'party' | 'pin' | 'star';

type Props = {
  name: GlyphName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
};

export function Glyph({
  name,
  size = 20,
  color = ct.ink,
  strokeWidth = 1.7,
  filled = false,
}: Props) {
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

      {name === 'summit' && (
        <Path
          d="M1.8 18.6 8.4 7.8l3.4 5.6 1.8-2.8 6.6 8H1.8Zm4.6-8.4 2-3.2"
          fill={color}
          stroke="none"
        />
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

      {name === 'pin' && (
        <>
          <Path
            d="M12 21.2c4.2-4.6 6.3-8 6.3-10.5a6.3 6.3 0 1 0-12.6 0c0 2.5 2.1 5.9 6.3 10.5Z"
            {...s}
          />
          <Circle cx={12} cy={10.4} r={2.3} {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}
    </Svg>
  );
}
