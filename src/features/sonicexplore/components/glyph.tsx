import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * sonicexplore's icon set — interface, so vectors (I4). The sleeves are
 * photographs, because a cover is a picture *of* something.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4) — which matters here because the board sets a
 * sparkle emoji beside its greeting.
 */
export type GlyphName =
  | 'bell'
  | 'mail'
  | 'sparkle'
  | 'chevronRight'
  | 'arrowRight'
  | 'play'
  | 'home'
  | 'search'
  | 'add'
  | 'library'
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
      {name === 'bell' && (
        <>
          <Path
            d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z"
            {...s}
          />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'mail' && (
        <>
          <Rect x={2.8} y={5.4} width={18.4} height={13.2} rx={2.6} {...s} />
          <Path d="m3.6 7.4 8.4 5.8 8.4-5.8" {...s} />
        </>
      )}

      {/* The board sets an emoji here. Drawn instead — see the note above. */}
      {name === 'sparkle' && (
        <Path
          d="M12 3.2c.8 4.6 2 5.8 6.6 6.6-4.6.8-5.8 2-6.6 6.6-.8-4.6-2-5.8-6.6-6.6 4.6-.8 5.8-2 6.6-6.6Z"
          fill={color}
        />
      )}

      {name === 'chevronRight' && <Path d="m9.6 6 6 6-6 6" {...s} strokeWidth={2} />}
      {name === 'arrowRight' && (
        <Path d="M4.6 12h14m0 0-4.8-4.8M18.6 12l-4.8 4.8" {...s} strokeWidth={2} />
      )}

      {name === 'play' && <Path d="M8.4 5.6 18.4 12l-10 6.4Z" fill={color} />}

      {name === 'home' && (
        <Path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19Z" {...s} />
      )}
      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.2} {...s} />
          <Path d="m15.6 15.6 3.8 3.8" {...s} strokeWidth={2} />
        </>
      )}
      {name === 'add' && (
        <>
          <Circle cx={12} cy={12} r={8.4} {...s} />
          <Path d="M12 8.2v7.6M8.2 12h7.6" {...s} strokeWidth={2} />
        </>
      )}
      {name === 'library' && (
        <>
          <Path d="M4.6 5.4h3.2v13.2H4.6ZM10.2 5.4h3.2v13.2h-3.2Z" {...s} />
          <Path d="m16.2 6.2 3 .8-3 11.6-2.2-.6Z" {...s} />
        </>
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
