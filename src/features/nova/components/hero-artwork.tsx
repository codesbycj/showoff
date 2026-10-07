import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { nv } from '../theme';

/**
 * The onboarding screen's 3D composition: a purple Ethereum coin and a sage
 * hardware wallet, orbited by two curving transfer arrows and three gold coins.
 *
 * The reference builds this out of stacked `div`s — CSS gradients, two
 * `border-x` triangles for the Ethereum diamond, and `radial-gradient` coins,
 * each with an `inset` box-shadow for the lit edge. Two of those do not cross
 * over: React Native has no radial gradient and no inset shadow, and a
 * CSS-triangle diamond is a worse drawing of the mark than the real path.
 *
 * So the whole thing is one SVG instead. That buys the radial gradients
 * outright, puts the arrows and the objects in a single coordinate space so
 * nothing drifts when the box is resized, and lets the lit edge be what it
 * actually is — a soft highlight ellipse over the top-left of each sphere,
 * which is what the inset shadow was imitating.
 *
 * Drawn on a 280-unit square and scaled by the caller.
 */
export function HeroArtwork({ size = 280 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 280 280">
        <Defs>
          {/* The lilac coin: lit from the top-left, falling to deep violet. */}
          <RadialGradient id="coin" cx="34%" cy="28%" r="78%">
            <Stop offset="0%" stopColor="#c9b6ff" />
            <Stop offset="45%" stopColor="#9175e2" />
            <Stop offset="100%" stopColor="#5b44ad" />
          </RadialGradient>

          {/* The sage wallet, lit from the bottom-right the way the reference is. */}
          <LinearGradient id="wallet" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#4f7f61" />
            <Stop offset="55%" stopColor="#7cb38c" />
            <Stop offset="100%" stopColor="#a0d5b0" />
          </LinearGradient>

          {/* The gold coins — the reference's `radial-gradient(35% 35%)`. */}
          <RadialGradient id="gold" cx="35%" cy="35%" r="72%">
            <Stop offset="0%" stopColor="#ffd978" />
            <Stop offset="60%" stopColor="#d49b35" />
            <Stop offset="100%" stopColor="#996a1a" />
          </RadialGradient>

          {/* The specular bloom sitting over each sphere's lit shoulder. */}
          <RadialGradient id="sheen" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity={0.55} />
            <Stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </RadialGradient>

          {/* Ambient backglow, standing in for the page's two blurred orbs. */}
          <RadialGradient id="glowViolet" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#a088ff" stopOpacity={0.3} />
            <Stop offset="100%" stopColor="#a088ff" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="glowLime" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={nv.lime} stopOpacity={0.24} />
            <Stop offset="100%" stopColor={nv.lime} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* --- ambient glow, behind everything --------------------------- */}
        <Circle cx={96} cy={110} r={96} fill="url(#glowViolet)" />
        <Circle cx={196} cy={150} r={88} fill="url(#glowLime)" />

        {/* --- the two orbiting transfer arrows -------------------------- */}
        <G opacity={0.9}>
          <Path
            d="M 78 62 C 132 36, 190 56, 206 102"
            stroke="#e2e8f0"
            strokeWidth={7}
            strokeLinecap="round"
            fill="none"
          />
          <Polygon points="216,110 205,84 187,102" fill="#e2e8f0" />

          <Path
            d="M 196 214 C 134 244, 76 222, 62 174"
            stroke="#cbd5e1"
            strokeWidth={7}
            strokeLinecap="round"
            fill="none"
          />
          <Polygon points="52,166 63,192 81,174" fill="#cbd5e1" />
        </G>

        {/* --- the sage hardware wallet, behind the coin ------------------ */}
        <G transform="rotate(12 194 176)">
          <Rect x={134} y={116} width={120} height={120} rx={34} fill="url(#wallet)" />
          {/* The clasp hanging off the top edge. */}
          <Path
            d="M178 116 h32 v10 a10 10 0 0 1 -10 10 h-12 a10 10 0 0 1 -10 -10 z"
            fill="#4f7a5e"
          />
          {/* The little indicator stud. */}
          <Circle cx={194} cy={156} r={6} fill="#ffffff" fillOpacity={0.45} />
        </G>

        {/* --- the lilac Ethereum coin, in front -------------------------- */}
        <G transform="rotate(-12 96 118)">
          <Circle cx={96} cy={118} r={68} fill="url(#coin)" />
          {/* Specular highlight on the lit shoulder. */}
          <Circle cx={72} cy={92} r={34} fill="url(#sheen)" />

          {/* The Ethereum mark: upper and lower pyramid, split by its waist. */}
          <G transform="translate(96 118)">
            <Polygon points="0,-40 17,-10 0,0 -17,-10" fill="#ffffff" fillOpacity={0.96} />
            <Polygon points="0,-40 -17,-10 0,0" fill="#ffffff" fillOpacity={0.78} />
            <Polygon points="0,6 17,-4 0,26 -17,-4" fill="#ffffff" fillOpacity={0.9} />
            <Polygon points="0,6 -17,-4 0,26" fill="#ffffff" fillOpacity={0.72} />
          </G>
        </G>

        {/* --- the three gold coins spilling out ------------------------- */}
        <Gold cx={224} cy={82} r={13} />
        <Gold cx={126} cy={196} r={22} star="✦" />
        <Gold cx={206} cy={224} r={28} star="★" />
      </Svg>
    </View>
  );
}

/**
 * One gold coin: the graded disc, a rim a shade darker, and a sheen over the
 * lit shoulder. `star` is decorative and drawn as a path-free `Circle` pip
 * rather than a glyph, because an emoji star is the one thing on this screen
 * that would not survive the platform change.
 */
function Gold({ cx, cy, r, star }: { cx: number; cy: number; r: number; star?: string }) {
  return (
    <G>
      <Circle cx={cx} cy={cy} r={r} fill="url(#gold)" />
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#7d5512"
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      <Circle cx={cx - r * 0.28} cy={cy - r * 0.3} r={r * 0.52} fill="url(#sheen)" />
      {star ? <Sparkle cx={cx} cy={cy} r={r * 0.46} six={star === '✦'} /> : null}
    </G>
  );
}

/**
 * The emblem struck into the two larger coins — a four-pointed sparkle or a
 * five-pointed star, drawn rather than set as `✦` / `★`.
 */
function Sparkle({ cx, cy, r, six }: { cx: number; cy: number; r: number; six: boolean }) {
  if (six) {
    const d =
      `M ${cx} ${cy - r} Q ${cx + r * 0.2} ${cy - r * 0.2} ${cx + r} ${cy} ` +
      `Q ${cx + r * 0.2} ${cy + r * 0.2} ${cx} ${cy + r} ` +
      `Q ${cx - r * 0.2} ${cy + r * 0.2} ${cx - r} ${cy} ` +
      `Q ${cx - r * 0.2} ${cy - r * 0.2} ${cx} ${cy - r} Z`;
    return <Path d={d} fill="#6b4710" fillOpacity={0.75} />;
  }

  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return <Polygon points={pts.join(' ')} fill="#6b4710" fillOpacity={0.75} />;
}
