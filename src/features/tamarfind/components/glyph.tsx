import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * tamarfind's icon set — interface, so vectors (I4). The only photograph on
 * the screen is the venue's own.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4).
 */
export type GlyphName =
  | 'runner'
  | 'bell'
  | 'search'
  | 'sliders'
  | 'layers'
  | 'strength'
  | 'swim'
  | 'cardio'
  | 'yoga'
  | 'star'
  | 'pin'
  | 'classes'
  | 'clock'
  | 'explore'
  | 'saved'
  | 'me';

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
      {name === 'runner' && (
        <>
          <Circle cx={14.6} cy={4.6} r={2.5} fill={color} />
          <Path d="M16.4 9.1 12 10.9l-2.4 3.4 2.9 1.9 1.1 5.4" {...s} strokeWidth={2.4} />
          <Path d="m12 10.9-5 1.3M12.5 16.2 7.9 20.6" {...s} strokeWidth={2.4} />
        </>
      )}

      {name === 'bell' && (
        <>
          <Path
            d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z"
            {...s}
          />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
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
          <Path d="M4.4 8h15.2M4.4 16h15.2" {...s} />
          <Circle cx={9.2} cy={8} r={2.4} {...s} fill={ct.white} />
          <Circle cx={15.2} cy={16} r={2.4} {...s} fill={ct.white} />
        </>
      )}

      {name === 'layers' && (
        <>
          <Path d="m12 3.6 8.4 4.2L12 12 3.6 7.8Z" {...s} />
          <Path d="m3.6 12.6 8.4 4.2 8.4-4.2" {...s} />
        </>
      )}

      {/* --- categories ---------------------------------------------------- */}
      {name === 'strength' && (
        // A dumbbell: a bar with two plate pairs.
        <>
          <Path d="M8.4 12h7.2" {...s} strokeWidth={2.2} />
          <Rect x={4.6} y={8.6} width={3} height={6.8} rx={1} {...s} strokeWidth={1.9} />
          <Rect x={16.4} y={8.6} width={3} height={6.8} rx={1} {...s} strokeWidth={1.9} />
          <Path d="M2.8 10.4v3.2M21.2 10.4v3.2" {...s} strokeWidth={1.9} />
        </>
      )}

      {name === 'swim' && (
        <Path
          d="M2.6 16.6c1.8 0 1.8-1.5 3.6-1.5s1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5M2.6 11.4c1.8 0 1.8-1.5 3.6-1.5s1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5"
          {...s}
          strokeWidth={1.9}
        />
      )}

      {name === 'cardio' && (
        <Path d="M2.8 12.4h3.6l2-4.4 3 9.2 2.4-6.2 1.6 3.2h5.8" {...s} strokeWidth={2} />
      )}

      {name === 'yoga' && (
        <>
          <Circle cx={12} cy={5} r={2.3} fill={color} />
          <Path
            d="M12 8.4v5M12 13.4 7.4 18.6M12 13.4l4.6 5.2M5.6 11.2h12.8"
            {...s}
            strokeWidth={2}
          />
        </>
      )}

      {/* --- card and map -------------------------------------------------- */}
      {name === 'star' && (
        <Path
          d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z"
          fill={color}
        />
      )}

      {name === 'pin' && (
        <>
          <Path
            d="M12 21.4s6.6-6 6.6-10.4a6.6 6.6 0 0 0-13.2 0C5.4 15.4 12 21.4 12 21.4Z"
            fill={color}
          />
          <Circle cx={12} cy={10.6} r={2.4} fill={ct.white} />
        </>
      )}

      {name === 'classes' && (
        <>
          <Rect x={3.6} y={5} width={16.8} height={15} rx={2.6} {...s} />
          <Path d="M3.6 9.4h16.8M8 3.4v3.2M16 3.4v3.2" {...s} strokeWidth={1.7} />
        </>
      )}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3 1.8" {...s} strokeWidth={1.7} />
        </>
      )}

      {/* --- tabs ---------------------------------------------------------- */}
      {name === 'explore' && (
        <>
          <Circle cx={12} cy={12} r={8.4} {...s} />
          <Path d="m15 9-1.8 4.2L9 15l1.8-4.2Z" fill={color} />
        </>
      )}
      {name === 'saved' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          {...s}
        />
      )}
      {name === 'me' && (
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}
    </Svg>
  );
}
