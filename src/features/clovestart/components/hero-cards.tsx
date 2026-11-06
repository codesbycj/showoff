import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useCloveLayout } from '../layout';
import { ct, radius, type } from '../theme';
import { card } from '../data/start';
import { T } from './text';

/**
 * The hero: the app's own cards, fanned.
 *
 * **This block is not in the reference, and it is here deliberately.** The
 * board's opening screen is a lime field with a small mark in the corner and
 * then a third of a screen of nothing before the headline — a presentation
 * choice on an artboard and a band of dead canvas on a phone. R1 says fill
 * it, and says to fill it by making something bigger rather than by padding.
 * What this app is about is the card, so the card is the hero.
 *
 * **The fan sizes itself to the space left over.** `step` comes out of
 * `layout.ts`, which subtracts everything with a fixed height from the window
 * — so the stack grows on a tall phone and tightens on a short one instead of
 * leaving a hole under itself. That is the whole reason this is a fan of
 * three rather than one card: a single card cannot fill the band at any
 * honest aspect ratio.
 *
 * Built as real components rather than traced as a picture. React Native
 * rotates about an element's centre, so each card is offset after its
 * rotation rather than anchored and spun. `shadow*` and `elevation` are
 * carried together in one style object — a `Platform.select` between them is
 * exactly what the web harness cannot check.
 */
export function HeroCards({ insets }: { insets: { top: number; bottom: number } }) {
  const { heroH, cardW, cardH, step } = useCloveLayout(insets);
  // react-native-svg puts <Defs> ids in the document, so a fixed id collides
  // with any other gradient of the same name and everything paints in the
  // first one's colours.
  const sheen = `cloveSheen-${useId()}`;

  const shadow = {
    shadowColor: '#0B2A0C',
    shadowOpacity: 0.26,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  };

  const base = {
    position: 'absolute' as const,
    width: cardW,
    height: cardH,
    borderRadius: radius.card,
    ...shadow,
  };

  return (
    <View style={{ height: heroH, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{ width: cardW, height: heroH }}>
        <View
          style={{
            ...base,
            top: 0,
            backgroundColor: ct.limeSoft,
            borderWidth: 1,
            borderColor: 'rgba(21,70,26,0.18)',
            transform: [{ rotate: '-4deg' }],
          }}
        />
        <View
          style={{
            ...base,
            top: step,
            backgroundColor: '#E9F8D4',
            borderWidth: 1,
            borderColor: 'rgba(21,70,26,0.14)',
            transform: [{ rotate: '2deg' }],
          }}
        />
        <View style={{ ...base, top: step * 2, backgroundColor: ct.card, overflow: 'hidden' }}>
          <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={sheen} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#2C4A2E" stopOpacity="0.9" />
                <Stop offset="0.55" stopColor={ct.card} stopOpacity="1" />
                <Stop offset="1" stopColor="#0A1210" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${sheen})`} />
          </Svg>

          {/* zIndex, because the gradient above is absolutely positioned and a
              positioned sibling paints over a static one on the web render —
              which is how an icon once "went missing" behind its own backdrop. */}
          <View style={{ flex: 1, padding: 20, justifyContent: 'space-between', zIndex: 1 }}>
            <View>
              <T
                variant="cardLabel"
                color="rgba(255,255,255,0.62)"
                style={{ height: type.cardLabel.line }}
              >
                {card.label.toUpperCase()}
              </T>
              <T
                variant="cardFigure"
                color={ct.white}
                style={{ height: type.cardFigure.line, marginTop: 6 }}
              >
                {card.balance}
              </T>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <T variant="cardDigits" color="rgba(255,255,255,0.78)" style={{ flex: 1 }}>
                {card.digits}
              </T>
              <View style={{ width: 34, height: 21, borderRadius: 6, backgroundColor: ct.lime }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
