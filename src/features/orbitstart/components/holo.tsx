import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { card } from '../data/start';
import { CARD_RATIO, CARD_SHARE } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * The holographic sweep, and the card standing on it.
 *
 * The sweep is a real gradient rather than a photograph of one, and every id
 * comes from `useId`: react-native-svg's `Defs` ids are document-global on
 * web, so two gradients sharing a name both render whichever mounted first.
 *
 * The ring is drawn in the stage's own measured units — the screen passes its
 * width and height in dp — rather than in a 0-100 viewBox stretched to the
 * box. A non-square viewBox scales x and y differently and drags the stroke
 * width with it, which turns a ring into an egg.
 *
 * **The card is upright, not on its side.** The reference lays it across the
 * ring with its digits running bottom-to-top, which is a poster pose: it is a
 * picture of a card rather than a card. Rebuilt as a real card component,
 * leaning a few degrees. React Native rotates about an element's centre
 * whatever `transformOrigin` says, and a small rotation about the middle
 * keeps all four corners inside the stage.
 */
export function HoloStage({ w, h }: { w: number; h: number }) {
  const sweep = useId();
  const face = useId();

  const cardW = Math.round(w * CARD_SHARE);
  const cardH = Math.round(cardW / CARD_RATIO);

  // The ring is sized off the width so it still reads as one C. Sizing it to
  // fill the stage's height instead crops both sides away and leaves two
  // unrelated arcs; it has to be wider than the screen but not by much.
  const thick = w * 0.17;
  const r = w * 0.55;
  const cx = w * 0.4;
  const cy = h * 0.48;

  // A "C": the drawn run covers 259 degrees and the gap is turned round to
  // sit on the right-hand side, where the reference's opening is.
  const c = 2 * Math.PI * r;

  return (
    <View style={{ width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={w} height={h} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient
            id={sweep}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={String(w)}
            y2={String(h)}
          >
            <Stop offset="0" stopColor={ob.holo3} />
            <Stop offset="0.45" stopColor={ob.holo1} />
            <Stop offset="1" stopColor={ob.holo2} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={`url(#${sweep})`}
          strokeWidth={thick}
          fill="none"
          strokeDasharray={`${c * 0.72} ${c * 0.28}`}
          transform={`rotate(50.5 ${cx} ${cy})`}
        />
      </Svg>

      <View style={{ transform: [{ rotate: '-4deg' }] }}>
        <View
          style={{
            width: cardW,
            height: cardH,
            borderRadius: radius.card,
            backgroundColor: ob.card,
            borderWidth: 1,
            borderColor: ob.cardEdge,
            padding: 18,
            justifyContent: 'space-between',
            shadowColor: '#000000',
            shadowOpacity: 0.55,
            shadowRadius: 26,
            shadowOffset: { width: 0, height: 18 },
            elevation: 14,
          }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <Svg width={40} height={40} viewBox="0 0 40 40">
              <Defs>
                <LinearGradient
                  id={face}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                >
                  <Stop offset="0" stopColor={ob.holo1} />
                  <Stop offset="1" stopColor={ob.holo2} />
                </LinearGradient>
              </Defs>
              {/* a spiral: the brand's mark, and a small flat shape */}
              <Path
                d="M20 4a16 16 0 1 1-11.3 27.3l4.5-4.5A9.6 9.6 0 1 0 10.4 20h-6.4A16 16 0 0 1 20 4Z"
                fill={`url(#${face})`}
              />
              <Circle cx={20} cy={20} r={4.6} fill={`url(#${face})`} opacity={0.8} />
            </Svg>
          </View>

          <View>
            <T variant="pan" color={ob.ink} numberOfLines={1} style={{ height: type.pan.line }}>
              {card.pan}
            </T>
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <View>
                <T variant="cardLabel" color={ob.muted} style={{ height: type.cardLabel.line }}>
                  {card.validLabel.toUpperCase()}
                </T>
                <T variant="cardValue" color={ob.ink} style={{ height: type.cardValue.line }}>
                  {card.valid}
                </T>
              </View>
              <View style={{ marginLeft: 28 }}>
                <T variant="cardLabel" color={ob.muted} style={{ height: type.cardLabel.line }}>
                  {card.cvvLabel}
                </T>
                <T variant="cardValue" color={ob.ink} style={{ height: type.cardValue.line }}>
                  {card.cvv}
                </T>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
