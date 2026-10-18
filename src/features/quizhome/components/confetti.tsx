import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { qz } from '../theme';

/**
 * The throw of confetti behind a card's photograph.
 *
 * Flat marks — curled ribbons and chips of paper — so this is drawing range
 * (AGENTS.md, "Know what is in drawing range"). The *person* inside it is a
 * photograph, for the same rule read the other way.
 *
 * Positions are literals in a 100x100 user space rather than random, because a
 * reveal re-renders the card on every step and a random throw would reshuffle
 * itself in front of the camera.
 *
 * `density` thins the throw for the smaller trending cards, which carry the
 * same artwork at about two thirds the height.
 */

type Ribbon = { d: string; c: number; w: number };
type Chip = { x: number; y: number; r: number; c: number; rot?: number };

const RIBBONS: Ribbon[] = [
  { d: 'M12 6 C18 12 8 18 14 25 C19 31 11 36 15 43', c: 2, w: 2.4 },
  { d: 'M38 2 C44 9 34 14 40 21', c: 0, w: 2.2 },
  { d: 'M62 8 C68 14 58 20 64 27 C68 32 62 35 64 40', c: 1, w: 2.2 },
  { d: 'M86 4 C92 10 82 16 88 23', c: 3, w: 2.2 },
  { d: 'M26 26 C32 31 24 36 29 42', c: 4, w: 1.8 },
  { d: 'M74 30 C80 35 72 40 77 46', c: 2, w: 1.8 },
];

const CHIPS: Chip[] = [
  { x: 22, y: 16, r: 1.9, c: 0 },
  { x: 48, y: 11, r: 1.6, c: 1 },
  { x: 55, y: 30, r: 2.1, c: 3 },
  { x: 70, y: 17, r: 1.7, c: 4 },
  { x: 92, y: 26, r: 1.8, c: 1 },
  { x: 33, y: 46, r: 1.6, c: 5 },
  { x: 8, y: 32, r: 1.7, c: 3 },
  { x: 80, y: 48, r: 1.9, c: 0 },
  { x: 44, y: 38, r: 1.5, c: 2 },
  { x: 66, y: 52, r: 1.6, c: 5 },
];

const FLAKES: Chip[] = [
  { x: 30, y: 9, r: 2.6, c: 1, rot: 24 },
  { x: 58, y: 20, r: 2.4, c: 0, rot: -38 },
  { x: 84, y: 38, r: 2.6, c: 4, rot: 12 },
  { x: 16, y: 48, r: 2.3, c: 1, rot: -22 },
];

export function Confetti({
  width,
  height,
  density = 1,
}: {
  width: number;
  height: number;
  density?: number;
}) {
  const keep = <T,>(list: T[]) => list.slice(0, Math.max(1, Math.round(list.length * density)));

  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
      {keep(RIBBONS).map((r, i) => (
        <Path
          key={`r${i}`}
          d={r.d}
          stroke={qz.confetti[r.c]}
          strokeWidth={r.w}
          strokeLinecap="round"
          fill="none"
          opacity={0.95}
        />
      ))}
      {keep(CHIPS).map((c, i) => (
        <Circle key={`c${i}`} cx={c.x} cy={c.y} r={c.r} fill={qz.confetti[c.c]} />
      ))}
      {keep(FLAKES).map((f, i) => (
        <Rect
          key={`f${i}`}
          x={f.x}
          y={f.y}
          width={f.r * 2}
          height={f.r}
          rx={f.r * 0.4}
          fill={qz.confetti[f.c]}
          transform={`rotate(${f.rot ?? 0} ${f.x + f.r} ${f.y + f.r / 2})`}
        />
      ))}
    </Svg>
  );
}
