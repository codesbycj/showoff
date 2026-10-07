import Svg, { Circle, Line, Path } from 'react-native-svg';

/**
 * The small stroked faces that sit inside a mood chip's coloured well.
 *
 * These are a different family from `mood-faces` — those are the big gradient
 * characters on the onboarding cluster, these are flat 24-box line drawings at
 * 20dp, sharing one stroke weight and taking their colour from the caller. The
 * design uses both, so both exist.
 *
 * The export draws the eyes on `happy` as zero-length lines with a round cap
 * (`x1="9" x2="9.01"`), which is the standard SVG way to get a dot from a
 * stroke. That is carried across literally rather than swapped for a filled
 * circle: the cap makes the dot exactly `strokeWidth` across, so a circle would
 * have to be r=1.25 to match, and reading that off by eye is how a chip ends up
 * with eyes a point too big.
 */

export type GlyphKind = 'happy' | 'angry' | 'sleepy' | 'bored';

export function MoodGlyph({
  kind,
  size = 20,
  color,
}: {
  kind: GlyphKind;
  size?: number;
  color: string;
}) {
  const common = {
    stroke: color,
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {kind === 'happy' ? (
        <>
          <Path d="M8 14s1.5 2 4 2 4-2 4-2" {...common} />
          <Line x1="9" y1="9" x2="9.01" y2="9" {...common} />
          <Line x1="15" y1="9" x2="15.01" y2="9" {...common} />
        </>
      ) : null}

      {kind === 'angry' ? (
        <>
          <Path d="M8 9l2 1" {...common} />
          <Path d="M16 9l-2 1" {...common} />
          <Path d="M8 15s1.5-1.5 4-1.5 4 1.5 4 1.5" {...common} />
        </>
      ) : null}

      {kind === 'sleepy' ? (
        <>
          <Path d="M7 10c1 0 2-1 2-1" {...common} />
          <Path d="M15 10c1 0 2-1 2-1" {...common} />
          <Circle cx="12" cy="14" r="1.5" fill={color} />
        </>
      ) : null}

      {kind === 'bored' ? (
        <>
          <Circle cx="8" cy="10" r="1.5" fill={color} />
          <Circle cx="16" cy="10" r="1.5" fill={color} />
          <Line x1="9" y1="15" x2="15" y2="15" {...common} />
        </>
      ) : null}
    </Svg>
  );
}
