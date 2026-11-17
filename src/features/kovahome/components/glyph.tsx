import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * kovahome's icon set - interface, so vectors (I4). The clients and their
 * work are photographs, because both are pictures of someone.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  'bell' | 'chevron' | 'plus' | 'reel' | 'calendar' | 'home' | 'inbox' | 'stacks' | 'profile';

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
      {name === 'bell' && (
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'chevron' && <Path d="m9.4 6.6 5.2 5.4-5.2 5.4" {...s} />}
      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'reel' && (
        <>
          <Rect x={3.6} y={5.6} width={16.8} height={12.8} rx={3} {...s} />
          <Path d="m10.4 9.6 4.8 2.8-4.8 2.8Z" fill={color} stroke="none" />
        </>
      )}

      {name === 'calendar' && (
        <>
          <Rect x={3.6} y={5.2} width={16.8} height={15.2} rx={3.2} {...s} />
          <Path d="M3.6 10h16.8M8.4 3.6v3M15.6 3.6v3" {...s} />
        </>
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {name === 'inbox' && (
        <>
          <Rect x={3.4} y={5.6} width={17.2} height={12.8} rx={3} {...s} />
          <Path d="M3.4 13.4h4l1.4 2.2h6.4l1.4-2.2h4" {...s} />
        </>
      )}

      {name === 'stacks' && <Path d="m12 4.4 8 4-8 4-8-4ZM4 12.4l8 4 8-4M4 16.4l8 4 8-4" {...s} />}

      {name === 'profile' && (
        <>
          <Circle cx={12} cy={8.6} r={3.4} {...s} />
          <Path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" {...s} />
        </>
      )}
    </Svg>
  );
}
