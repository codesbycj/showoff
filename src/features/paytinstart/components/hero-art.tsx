import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { pt } from '../theme';

/**
 * The illustration: someone climbing out of their own wallet, pointing up.
 *
 * The reference drops a hand-drawn line artwork in here, and a drawing cannot
 * be recreated and must not be traced badly (AGENTS.md, "Three kinds of
 * reference"). The other sanctioned route — free-licensed stock — has no
 * answer for a bespoke character in a bespoke style.
 *
 * So it is rebuilt as the thing the artwork is a picture of, in the same flat
 * dialect: one weight of black outline, white fills, round caps, no shading.
 * It costs nothing at runtime, it is sharp at any size, and it can be revealed
 * limb by limb on camera — which a dropped PNG cannot.
 *
 * **The limbs are drawn twice.** A black stroke at full width, then a white
 * stroke a few units narrower directly over it, which is how a flat
 * illustration gets an outlined tube — one path with a fill and a stroke would
 * need the outline to follow a shape that has no closed form here.
 *
 * **No JSX comments inside the groups.** Each group is revealed as one step of
 * the timelapse, and a `{/* … *\/}` nested inside the block staging it would
 * close that block early and the blank file would stop parsing. So the running
 * commentary lives above each group instead, which is why they read as a list:
 *
 *   1. the arm, from inside the wallet to the raised hand, and its finger;
 *   2. the fist on the end of it;
 *   3. the head, hair up in a bun, one eye and a line of a mouth;
 *   4. a card sliding out from behind the wallet;
 *   5. the wallet itself, over everything, with its stitched mouth, its stud
 *      and a contactless mark, because this is a payment wallet.
 *
 * Everything is in a 200-unit viewBox, so every number below is a fraction of
 * the artwork rather than a dp, and the whole thing scales with its box.
 */
export function HeroArt({ size }: { size: number }) {
  const outline = {
    stroke: pt.ink,
    strokeWidth: 2.6,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  };

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* STEP 1.07 an arm, pointing up
        <G fill="none" strokeLinecap="round">
          <Path d="M78 150 C86 118 104 96 128 72" stroke={pt.ink} strokeWidth={27} />
          <Path d="M78 150 C86 118 104 96 128 72" stroke={pt.paper} strokeWidth={21} />
          <Path d="M133 62 V36" stroke={pt.ink} strokeWidth={17} />
          <Path d="M133 62 V38" stroke={pt.paper} strokeWidth={11} />
        </G>
        */}

        {/* STEP 1.08 a fist on the end of it
        <Circle cx={131} cy={68} r={15} fill={pt.paper} {...outline} />
        */}

        {/* STEP 1.09 a head, with its hair up
        <G>
          <Circle cx={74} cy={80} r={21} fill={pt.paper} {...outline} />
          <Path
            d="M55 72 C56 56 70 50 82 54 C90 57 95 64 95 72 C88 68 80 67 74 68 C66 69 59 70 55 72 Z"
            fill={pt.ink}
          />
          <Circle cx={56} cy={57} r={9.5} fill={pt.ink} />
          <Circle cx={80} cy={82} r={2.4} fill={pt.ink} />
          <Path d="M76 91 C79 94 84 94 87 91" fill="none" {...outline} strokeWidth={2.2} />
        </G>
        */}

        {/* STEP 1.10 a card on its way out
        <G transform="rotate(-13 108 118)">
          <Rect x={70} y={92} width={82} height={50} rx={7} fill={pt.paper} {...outline} />
          <Path d="M70 107 H152" {...outline} fill="none" strokeWidth={2.2} />
        </G>
        */}

        {/* STEP 1.11 and the wallet it all came from
        <G strokeLinejoin="round">
          <Rect x={26} y={126} width={118} height={62} rx={11} fill={pt.paper} {...outline} />
          <Path
            d="M38 142 H132"
            stroke={pt.ink}
            strokeWidth={2}
            strokeDasharray="5 5"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx={128} cy={168} r={6} fill={pt.paper} {...outline} strokeWidth={2.2} />
          <Path
            d="M96 160 A9 9 0 0 1 96 176"
            fill="none"
            stroke={pt.ink}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          <Path
            d="M104 155 A16 16 0 0 1 104 181"
            fill="none"
            stroke={pt.ink}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </G>
        */}
      </Svg>
    </View>
  );
}
