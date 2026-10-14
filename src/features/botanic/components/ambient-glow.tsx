import { useId } from 'react';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * One of the soft coloured discs behind the dish.
 *
 * The export makes these with `bg-primary/20 blur-3xl` — a hard-edged circle
 * pushed through a Gaussian. React Native has no CSS filter, and `expo-blur` is
 * the wrong tool: a `BlurView` blurs what is *behind* it, where this needs the
 * element's own fill blurred.
 *
 * So the falloff is computed rather than eyeballed, from the two things the
 * markup actually states — the circle's radius and the blur's sigma.
 *
 * The part that is easy to get wrong, and did: **a blurred disc does not reach
 * its own opacity at the centre.** Once sigma approaches the radius most of the
 * fill has been smeared outside it, and what is left in the middle is
 * `1 - exp(-R^2 / 2*sigma^2)` of nominal. For the green disc here — R 96,
 * sigma 64 — that is 0.675, so a ramp that peaked at the full 20% came out
 * half again too bright, and sampled against the reference as +9 levels of red
 * and +11 of green right under the glow's centre.
 *
 * The shape is the 1D error-function edge profile, rescaled so its centre
 * lands on that 2D value. Not exact — the true 2D profile has no closed form —
 * but it is right at the centre, right in the tail, and within a level or two
 * between, which is finer than the eye reads on a wash this dark.
 *
 * The gradient's id comes from `useId`, and that is not tidiness. SVG ids
 * resolve per *document*, and on web every `Svg` here is inlined into the one
 * page DOM — so three glows all declaring `id="g"` leave `url(#g)` pointing at
 * whichever mounted first, and the gold disc and the glow under the dish both
 * silently render in the green one's colour. It looks like a palette mistake
 * and samples as one.
 */

/** Abramowitz & Stegun 7.1.26. Max error 1.5e-7, which is far past enough here. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-x * x);
  return sign * y;
}

/** How much of its own opacity a disc of radius R keeps at the centre under sigma. */
const centreValue = (R: number, sigma: number) => 1 - Math.exp(-(R * R) / (2 * sigma * sigma));

const STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];

export function AmbientGlow({
  radius,
  sigma,
  color,
  opacity,
  style,
}: {
  /** The unblurred circle's radius, in dp. */
  radius: number;
  /** The blur's standard deviation — Tailwind's `blur-2xl` is 40, `blur-3xl` 64. */
  sigma: number;
  color: string;
  opacity: number;
  style?: object;
}) {
  const id = useId();
  // Three sigmas past the edge is where a Gaussian is done to a part in a
  // thousand, so the drawn box can stop there without a visible cut.
  const reach = radius + 3 * sigma;
  const size = reach * 2;

  const peak = centreValue(radius, sigma);
  const edge = 0.5 * (1 + erf(radius / (sigma * Math.SQRT2)));

  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          {STOPS.map((s) => {
            const r = s * reach;
            const profile = 0.5 * (1 + erf((radius - r) / (sigma * Math.SQRT2)));
            return (
              <Stop
                key={s}
                offset={s}
                stopColor={color}
                stopOpacity={opacity * peak * (profile / edge)}
              />
            );
          })}
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width={size} height={size} fill={`url(#${id})`} />
    </Svg>
  );
}

/** The drawn box for a given circle and blur, so callers can place its centre. */
export const glowBox = (radius: number, sigma: number) => (radius + 3 * sigma) * 2;
