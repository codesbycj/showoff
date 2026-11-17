import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * stridehome's icon set — interface, so vectors (I4). The only photograph on
 * the app is the athlete's own face.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  'flame' | 'up' | 'down' | 'shuffle' | 'runner' | 'home' | 'train' | 'compete' | 'you';

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
      {/* The streak badge's flame. */}
      {name === 'flame' && (
        <Path
          d="M12 3.2c3.4 3.4 5.8 6 5.8 9.2a5.8 5.8 0 0 1-11.6 0c0-1.6.7-3 1.9-4.4.3 1.2 1 2 2 2.2-.6-2.4-.3-4.6 1.9-7Z"
          fill={color}
        />
      )}

      {name === 'up' && <Path d="M12 6.6 17.4 15H6.6Z" fill={color} />}
      {name === 'down' && <Path d="M12 17.4 6.6 9h10.8Z" fill={color} />}

      {name === 'shuffle' && (
        <Path
          d="M4.6 7.4h3.2l8.4 9.2h3.2M16.2 4.6l3.2 2.8-3.2 2.8M4.6 16.6h3.2l2.6-2.8M16.2 19.4l3.2-2.8-3.2-2.8"
          {...s}
        />
      )}

      {/* A runner, drawn as the idea of one: head, torso, two strides. */}
      {name === 'runner' && (
        <>
          <Circle cx={14.4} cy={5} r={2} fill={color} stroke="none" />
          <Path d="M7.2 20.4 10 15.6l-2-3.4 3.6-3.4 3.2 1.8 2.8-.4" {...s} />
          <Path d="m11.6 15.2 3 1.4.8 3.8M8.6 9.6 5.4 11" {...s} />
        </>
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {name === 'train' && <Path d="M13.4 2.8 6.6 13.4h4.4l-.6 7.8 7.2-11h-4.4Z" {...s} />}

      {name === 'compete' && (
        <>
          <Path d="M7.6 4.2h8.8v4.4a4.4 4.4 0 0 1-8.8 0Z" {...s} />
          <Path
            d="M7.6 5.4H5.2v1.4a2.6 2.6 0 0 0 2.4 2.6M16.4 5.4h2.4v1.4a2.6 2.6 0 0 1-2.4 2.6M9.6 19.8h4.8M12 13v6.8"
            {...s}
          />
        </>
      )}

      {name === 'you' && (
        <>
          <Circle cx={12} cy={8.6} r={3.4} {...s} />
          <Path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" {...s} />
        </>
      )}
    </Svg>
  );
}
