import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * skyplan's icon set — interface, so vectors (I4). The only photographs on the
 * app are faces.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  'swap' | 'calendar' | 'chevron' | 'plane' | 'home' | 'flights' | 'trips' | 'me';

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
      {name === 'swap' && (
        <Path
          d="M8.4 4.6v14.8M8.4 4.6 5.2 7.8M8.4 4.6l3.2 3.2M15.6 19.4V4.6M15.6 19.4l3.2-3.2M15.6 19.4l-3.2-3.2"
          {...s}
        />
      )}

      {name === 'calendar' && (
        <>
          <Rect x={3.6} y={5.2} width={16.8} height={15.2} rx={3.2} {...s} />
          <Path d="M3.6 10h16.8M8.4 3.6v3M15.6 3.6v3" {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m6.6 9.4 5.4 5.2 5.4-5.2" {...s} />}

      {/* The aircraft on the route arc, filled so it reads at 14dp. */}
      {name === 'plane' && (
        <Path
          d="M21 12.6 14.2 14l-3 5.6-1.7.1 1.5-5.2-4 .8-1.3 2-1.3.1.6-2.3-1.4-1.8 1.3.1 1.6 1.5 4-.7-3-4.6 1.6-.4 4.6 4.3 6.8-1.3a1 1 0 0 1 0 2.4Z"
          fill={color}
        />
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {name === 'flights' && (
        <Path
          d="M20.6 13.2 14 11.4 12 20h-1.6l.9-8.9-4.3-1.1-1.5 2-1.1-.2.8-3.2-.8-3.2 1.1-.2 1.5 2 4.3-1.1-.9-8.9H12l2 8.6 6.6-1.8a1.1 1.1 0 0 1 0 2.2Z"
          {...s}
        />
      )}

      {name === 'trips' && (
        <Path
          d="M9 5.2 3.8 7.4v11.4L9 16.6l6 2.2 5.2-2.2V5.2L15 7.4ZM9 5.2v11.4M15 7.4v11.4"
          {...s}
        />
      )}

      {name === 'me' && (
        <>
          <Circle cx={12} cy={8.6} r={3.6} {...s} />
          <Path d="M5.2 20a6.8 6.8 0 0 1 13.6 0" {...s} />
        </>
      )}
    </Svg>
  );
}
