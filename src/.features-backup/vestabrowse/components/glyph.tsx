import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * vestabrowse's icon set — interface, so vectors (I4). The photographs on this
 * screen are the clothes and the people; everything drawn here is chrome.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4).
 */
export type GlyphName =
  | 'chevronDown'
  | 'bag'
  | 'search'
  | 'sliders'
  | 'spark'
  | 'heart'
  | 'heartFill'
  | 'home'
  | 'user';

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
      {name === 'chevronDown' && <Path d="m7.6 10 4.4 4.4 4.4-4.4" {...s} strokeWidth={2} />}

      {name === 'bag' && (
        <>
          <Path d="M5.4 8h13.2l-1 11.2a1.8 1.8 0 0 1-1.8 1.6H8.2a1.8 1.8 0 0 1-1.8-1.6Z" {...s} />
          <Path d="M9 9.2V7a3 3 0 0 1 6 0v2.2" {...s} />
        </>
      )}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.2} {...s} />
          <Path d="m15.6 15.6 3.8 3.8" {...s} strokeWidth={2} />
        </>
      )}

      {name === 'sliders' && (
        <>
          <Path d="M8.6 4.6v5.2M8.6 14v5.4M15.4 4.6v4M15.4 12.6v6.8" {...s} strokeWidth={2} />
          <Circle cx={8.6} cy={11.9} r={2.1} {...s} strokeWidth={2} />
          <Circle cx={15.4} cy={10.3} r={2.1} {...s} strokeWidth={2} />
        </>
      )}

      {name === 'spark' && (
        // The four-point sparkle the board puts on its active chip.
        <Path
          d="M12 4.2c.5 3.6 1.6 4.8 5.3 5.4-3.7.6-4.8 1.8-5.3 5.4-.5-3.6-1.6-4.8-5.3-5.4 3.7-.6 4.8-1.8 5.3-5.4Z"
          fill={color}
        />
      )}

      {name === 'heart' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          {...s}
        />
      )}
      {name === 'heartFill' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          fill={color}
        />
      )}

      {name === 'home' && (
        <Path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19Z" {...s} />
      )}

      {name === 'user' && (
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}
    </Svg>
  );
}
