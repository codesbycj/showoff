import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * romeobook's icon set — interface, so vectors (INSPO-RULES I4).
 *
 * Drawn, not traced: the source is a design shot whose icons are ~10px across
 * on a 1200px board, and tracing that returns mush. Standard UI iconography
 * drawn cleanly is what the real app ships.
 *
 * Its own copy rather than an import from romeospot: RULES rule 4 duplicates
 * per showcase on purpose, because `lock` and `preflight` track per-slug folders
 * and a shared one makes each showcase report the other's blanked files as
 * DRIFT.
 */
export type GlyphName =
  'back' | 'pin' | 'calendar' | 'chevronDown' | 'chevronUp' | 'clock' | 'users' | 'minus' | 'plus';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = '#111619', strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && (
        <>
          <Path d="M9.5 6.5 4.5 11.5l5 5" {...s} />
          <Path d="M4.5 11.5h8.2a6.3 6.3 0 0 1 6.3 6.3v.7" {...s} />
        </>
      )}

      {name === 'pin' && (
        <>
          <Path
            d="M12 21.2c3.9-4.4 6.2-7.6 6.2-10.4a6.2 6.2 0 1 0-12.4 0c0 2.8 2.3 6 6.2 10.4Z"
            {...s}
          />
          <Circle cx={12} cy={10.6} r={2.3} {...s} />
        </>
      )}

      {name === 'calendar' && (
        <>
          <Rect x={3.4} y={5.2} width={17.2} height={15.4} rx={3.2} {...s} />
          <Path d="M3.4 9.8h17.2M8.4 3.4v3.4M15.6 3.4v3.4" {...s} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m6.5 9.5 5.5 5.5 5.5-5.5" {...s} />}
      {name === 'chevronUp' && <Path d="m6.5 14.5 5.5-5.5 5.5 5.5" {...s} />}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.6} {...s} />
          <Path d="M12 7.2V12l3.2 2" {...s} />
        </>
      )}

      {name === 'users' && (
        <>
          <Circle cx={9.2} cy={8.4} r={3.4} {...s} />
          <Path d="M3.4 19.6c0-3.2 2.6-5.2 5.8-5.2s5.8 2 5.8 5.2" {...s} />
          <Path d="M16.2 5.6a3.4 3.4 0 0 1 0 6.1M17.4 14.9c2 .6 3.2 2.2 3.2 4.7" {...s} />
        </>
      )}

      {name === 'minus' && <Path d="M7 12h10" {...s} />}
      {name === 'plus' && <Path d="M12 7v10M7 12h10" {...s} />}
    </Svg>
  );
}
