import Svg, { Circle, Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

import { pf } from '../theme';

/**
 * The hero's background: a diagonal ramp with an ambient lime blob over it.
 *
 * Both halves are drawn here rather than with `expo-linear-gradient`, because
 * the ramp's axis is the one thing a two-point gradient gets wrong. CSS
 * `to bottom right` runs its gradient line perpendicular to the *other*
 * diagonal, so on a 358x161 box its direction is proportional to (H, W) and
 * both off-diagonal corners land exactly on the middle stop — which is what
 * the render shows: its top-right and bottom-left both read the `via` colour.
 * A naive corner-to-corner `start={{0,0}} end={{1,1}}` instead puts the
 * top-right at 83% of the ramp, a visible 9/24 off in red and blue.
 *
 * The blob is `w-32 h-32 rounded-full bg-primary-fixed blur-2xl opacity-40`,
 * hung off the card's bottom-right corner and clipped by it. A CSS blur has no
 * React Native equivalent, so it is solved instead of imitated: subtracting
 * the ramp from the render leaves a clean Gaussian centred 32dp inside the
 * corner, peaking at 30% of `#ACF847` and falling off with a 55dp sigma. The
 * stops below sample that curve every 20dp, and reproduce the measured
 * coverage to within a point across the whole card.
 *
 * `preserveAspectRatio="none"` lets the design's own 358x161 user space
 * stretch with the card, so the ramp's stops stay pinned to its corners and
 * the blob stays 32dp in from its bottom-right corner on any width — the
 * harness's 393dp screen included, which is 3dp wider than the 390 the export
 * was rendered at.
 */

const W = 358;
const H = 161;

/** The ramp's axis: proportional to (H, W), scaled so the far corner is 1. */
const K = (2 * W * H) / (W * W + H * H);

/** Peak coverage of the glow, and its Gaussian sigma, both in the ramp's units. */
const PEAK = 0.3;
const SIGMA = 55;
const RADIUS = 180;

const stops = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((d) => ({
  offset: d / RADIUS,
  opacity: PEAK * Math.exp(-(d * d) / (2 * SIGMA * SIGMA)),
}));

export function HeroWash() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient
          id="heroRamp"
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={K * H}
          y2={K * W}
        >
          <Stop offset="0" stopColor={pf.heroFrom} />
          <Stop offset="0.5" stopColor={pf.heroVia} />
          <Stop offset="1" stopColor={pf.heroTo} />
        </LinearGradient>

        <RadialGradient id="heroGlow" gradientUnits="userSpaceOnUse" cx={326} cy={137} r={RADIUS}>
          {stops.map((s) => (
            <Stop
              key={s.offset}
              offset={s.offset}
              stopColor={pf.limeGlow}
              stopOpacity={s.opacity}
            />
          ))}
        </RadialGradient>
      </Defs>

      <Rect x={0} y={0} width={W} height={H} fill="url(#heroRamp)" />
      <Circle cx={326} cy={137} r={RADIUS} fill="url(#heroGlow)" />
    </Svg>
  );
}
