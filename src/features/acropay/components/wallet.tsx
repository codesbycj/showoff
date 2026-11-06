import { useId } from 'react';
import Svg, { Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

/**
 * The hero, drawn.
 *
 * **The reference's is a rendered 3D wallet with notes, cards and a receipt
 * spilling out of it.** A render cannot be reproduced and must not be traced
 * badly; the rules offer stock or a rebuild of the idea, and a photograph of
 * a wallet dropped on a white sheet would read as a sticker. So this is the
 * idea: a wallet with cards and a note standing out of it, drawn as the
 * shapes they are.
 *
 * It is one SVG rather than a stack of Views so the whole thing scales from
 * a single `size` and keeps its proportions on any phone.
 */
export function Wallet({ size = 150 }: { size?: number }) {
  const id = useId();
  const leather = `acroLeather-${id}`;
  const card = `acroCard-${id}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 160 160">
      <Defs>
        <LinearGradient id={leather} x1="0" y1="0" x2="0.6" y2="1">
          <Stop offset="0" stopColor="#3B3C46" />
          <Stop offset="1" stopColor="#1B1C23" />
        </LinearGradient>
        <LinearGradient id={card} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF8FB0" />
          <Stop offset="1" stopColor={ct.pink} />
        </LinearGradient>
      </Defs>

      {/* what is standing out of the wallet, drawn first so the body overlaps it */}
      <G>
        <Rect
          x="36"
          y="26"
          width="58"
          height="76"
          rx="7"
          fill="#F4F5F8"
          transform="rotate(-9 65 64)"
        />
        <Rect
          x="44"
          y="34"
          width="42"
          height="5"
          rx="2.5"
          fill="#D6D8E0"
          transform="rotate(-9 65 64)"
        />
        <Rect
          x="44"
          y="45"
          width="30"
          height="5"
          rx="2.5"
          fill="#D6D8E0"
          transform="rotate(-9 65 64)"
        />

        <Rect
          x="68"
          y="20"
          width="62"
          height="42"
          rx="7"
          fill={`url(#${card})`}
          transform="rotate(7 99 41)"
        />
        <Rect
          x="76"
          y="46"
          width="26"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.72)"
          transform="rotate(7 99 41)"
        />

        <Rect
          x="92"
          y="34"
          width="54"
          height="38"
          rx="6"
          fill="#53B98A"
          transform="rotate(-14 119 53)"
        />
        <Rect
          x="104"
          y="46"
          width="30"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.72)"
          transform="rotate(-14 119 53)"
        />
      </G>

      {/* the wallet body */}
      <Rect x="18" y="62" width="124" height="80" rx="16" fill={`url(#${leather})`} />
      <Path d="M18 92h124v34a16 16 0 0 1-16 16H34a16 16 0 0 1-16-16Z" fill="#2A2B34" />
      <Rect x="96" y="96" width="42" height="26" rx="9" fill="#14151B" />
      <Rect x="104" y="104" width="18" height="10" rx="5" fill={ct.gold} />
      <Path
        d="M22 86c22 6 46 9 70 9s46-3 66-9"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
}
