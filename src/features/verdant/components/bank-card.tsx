import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { radius, vd } from '../theme';
import { ChipGlyph } from './chip-glyph';

/** A card is a card: 85.6 x 53.98mm, which is 1.586:1 and not negotiable. */
export const CARD_RATIO = 1.586;

/**
 * One card, face up, lit from the same corner as the rest of the stage.
 *
 * Two tones, because the reference's wallet holds two: a pale one catching
 * most of the light and the brand's own deep green behind it. Both are drawn
 * rather than photographed — see the note in `wallet.tsx` about why the 3D
 * render is rebuilt instead of traced.
 *
 * The face is one `Svg` and the chip is a `View` over it. On web an absolutely
 * positioned sibling paints above an `<svg>` whatever the order, which here is
 * what is wanted and is worth stating — the same rule silently hides an icon
 * when the sibling was meant to be *behind*.
 *
 * The sheen is a path, not an opacity on the whole card: a card reads as
 * plastic because one band of it is brighter than the rest, and a flat fill
 * with a border reads as a rectangle.
 */
export function BankCard({ width, tone }: { width: number; tone: 'pale' | 'dark' }) {
  const id = useId();
  const height = width / CARD_RATIO;
  const r = radius.card * (width / 150);

  const face = tone === 'pale' ? vd.cardPale : vd.cardDark;
  const edge = tone === 'pale' ? vd.cardPaleEdge : vd.cardDarkEdge;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={`${id}-face`} x1="4%" y1="0%" x2="96%" y2="100%">
            <Stop offset="0" stopColor={edge} />
            <Stop offset="0.42" stopColor={face} />
            <Stop offset="1" stopColor={tone === 'pale' ? '#cfd8ca' : '#17422f'} />
          </LinearGradient>
          <LinearGradient id={`${id}-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor="#ffffff" stopOpacity={tone === 'pale' ? 0.5 : 0.16} />
            <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={r}
          fill={`url(#${id}-face)`}
          stroke={edge}
          strokeWidth={0.5}
        />

        {/* A band across the top third, cut by the card's own top corners. */}
        {/* STEP 1.36 the sheen across every card
        <Path
          d={`M ${r} 0 H ${width - r} A ${r} ${r} 0 0 1 ${width} ${r}
              V ${height * 0.3} L 0 ${height * 0.62} V ${r}
              A ${r} ${r} 0 0 1 ${r} 0 Z`}
          fill={`url(#${id}-sheen)`}
        />
        */}
      </Svg>

      {/* High on the face: everything below the top third of a card in this
          wallet is behind the pocket's front panel. */}
      {/* STEP 1.37 and the chip
      <View style={{ position: 'absolute', left: width * 0.09, top: height * 0.16 }}>
        <ChipGlyph width={width * 0.135} />
      </View>
      */}
    </View>
  );
}
