import { LinearGradient } from 'expo-linear-gradient';

/**
 * The soft accent wash that bleeds out of a dark surface's corner.
 *
 * The design gets these with `blur-3xl` on a tinted circle. React Native has no
 * blur filter for a View — `expo-blur` blurs what is *behind* a surface, which
 * is the opposite operation — so the falloff has to be drawn.
 *
 * Concentric circles at stepped opacity were the obvious approach and they are
 * visibly banded at 3x: five rings read as five rings, and smoothing them needs
 * thirty Views for one piece of decoration. A diagonal `LinearGradient` anchored
 * at the corner gives a clean falloff in one node. It is not radial, but the
 * only part of the circle that was ever visible is the quadrant inside the
 * card, and across that quadrant a diagonal and a radial differ by less than
 * the tint's own alpha.
 *
 * It fills its parent rather than being a box pinned in a corner. A linear
 * gradient only reaches zero along its own axis, so a 200dp square pinned to a
 * corner still has visible alpha along two of its edges and terminates in a
 * hard line. Filling the parent puts those edges under the parent's own clip,
 * where there is nothing to see.
 *
 * `corner` names which corner it pours from, which sets the gradient's axis.
 */
const CORNERS = {
  'top-right': { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
  'bottom-right': { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
  'top-left': { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
} as const;

export function Glow({
  color,
  opacity = 0.3,
  corner = 'top-right',
  reach = 0.75,
}: {
  /** An `r,g,b` triple — the component supplies the alpha per stop. */
  color: string;
  opacity?: number;
  corner?: keyof typeof CORNERS;
  /** How far across the parent the wash fades out, 0 to 1. */
  reach?: number;
}) {
  const { start, end } = CORNERS[corner];
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[`rgba(${color},${opacity})`, `rgba(${color},${opacity * 0.38})`, `rgba(${color},0)`]}
      locations={[0, reach * 0.45, reach]}
      start={start}
      end={end}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  );
}
