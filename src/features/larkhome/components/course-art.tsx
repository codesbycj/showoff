import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ART } from '../layout';
import { lk } from '../theme';

/**
 * The line drawing on a course card.
 *
 * Drawn, and in range: a bubble, a dumbbell, a pan, a case, a lipstick are
 * each a small flat object, which is the side of the drawing-range rule that
 * *is* vectors (AGENTS.md, "Draw the interface"). They are strokes rather
 * than fills, which is the reference's own treatment and the one that keeps
 * them legible on five different pastel grounds.
 *
 * No `Defs` and no gradients, so there are no document-global ids to collide
 * when five of these mount on one screen.
 */
export function CourseArt({ name, size = ART }: { name: string; size?: number }) {
  const s = { stroke: lk.onCard, strokeWidth: 1.6, fill: 'none' } as const;
  const round = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {name === 'bubbles' ? (
        <>
          <Path
            d="M6 14h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H18l-8 7v-7H6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
            {...s}
            {...round}
          />
          <Path d="M26 28h26a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4v6l-7-6H26" {...s} {...round} />
          <Path d="M11 25h18M11 31h11" {...s} {...round} />
        </>
      ) : null}

      {name === 'dumbbell' ? (
        <>
          <Path d="M18 32h28" {...s} {...round} />
          <Rect x={8} y={22} width={10} height={20} rx={3} {...s} />
          <Rect x={46} y={22} width={10} height={20} rx={3} {...s} />
          <Rect x={2} y={27} width={6} height={10} rx={2} {...s} />
          <Rect x={56} y={27} width={6} height={10} rx={2} {...s} />
        </>
      ) : null}

      {name === 'pan' ? (
        <>
          <Path d="M8 30h34a0 0 0 0 1 0 0v6a17 17 0 0 1-34 0v-6Z" {...s} {...round} />
          <Path d="M42 33h18" {...s} {...round} />
          <Path d="M18 22c0-4 4-4 4-8M27 22c0-4 4-4 4-8" {...s} {...round} />
        </>
      ) : null}

      {name === 'case' ? (
        <>
          <Rect x={8} y={22} width={48} height={32} rx={5} {...s} />
          <Path d="M24 22v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6" {...s} {...round} />
          <Path d="M8 38h48" {...s} />
          <Circle cx={32} cy={38} r={3} {...s} />
        </>
      ) : null}

      {name === 'lipstick' ? (
        <>
          <Rect x={22} y={30} width={20} height={26} rx={3} {...s} />
          <Path d="M26 30V16a6 6 0 0 1 12 0v14" {...s} {...round} />
          <Path d="M22 40h20" {...s} />
        </>
      ) : null}
    </Svg>
  );
}
