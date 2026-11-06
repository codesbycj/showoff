import { useId } from 'react';
import Svg, { Defs, Ellipse, Path, RadialGradient, Stop } from 'react-native-svg';

import { ct } from '../theme';

/**
 * Glu, the companion.
 *
 * **The reference's is a rendered 3D orb** — black, glossy, with a soft
 * highlight. A render cannot be reproduced and must not be traced; the rules
 * say to rebuild the idea in-app, so this is the idea: a sphere with a
 * radial fall-off and one specular highlight, which is what makes a drawn
 * circle read as an object rather than a disc.
 *
 * The same character appears in green on the home screen, where it has a
 * face; here it is the dark orb the onboarding uses.
 */
export function Orb({ size = 220, tint = '#101012' }: { size?: number; tint?: string }) {
  const id = useId();
  const body = `gluOrb-${id}`;
  const sheen = `gluSheen-${id}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id={body} cx="0.38" cy="0.32" r="0.78">
          <Stop offset="0" stopColor="#4A4A50" />
          <Stop offset="0.45" stopColor={tint} />
          <Stop offset="1" stopColor="#050506" />
        </RadialGradient>
        <RadialGradient id={sheen} cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Ellipse cx="100" cy="172" rx="56" ry="10" fill="#000000" opacity={0.45} />
      <Ellipse cx="100" cy="100" rx="78" ry="78" fill={`url(#${body})`} />
      <Ellipse cx="74" cy="66" rx="26" ry="18" fill={`url(#${sheen})`} />
      <Path
        d="M44 128c14 18 44 26 70 14"
        stroke="#FFFFFF"
        strokeOpacity="0.07"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** The green one, with a face, as it appears on the home screen. */
export function Mascot({ size = 56 }: { size?: number }) {
  const id = useId();
  const body = `gluBody-${id}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={body} cx="0.38" cy="0.3" r="0.8">
          <Stop offset="0" stopColor="#C6DBA8" />
          <Stop offset="0.6" stopColor={ct.mascot} />
          <Stop offset="1" stopColor={ct.mascotDeep} />
        </RadialGradient>
      </Defs>
      <Path
        d="M50 14c20 0 32 16 32 34 0 16-10 28-32 28S18 64 18 48c0-18 12-34 32-34Z"
        fill={`url(#${body})`}
      />
      <Ellipse cx="40" cy="48" rx="4" ry="5" fill="#2C3A22" />
      <Ellipse cx="60" cy="48" rx="4" ry="5" fill="#2C3A22" />
      <Path
        d="M44 60c4 3 8 3 12 0"
        stroke="#2C3A22"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}
