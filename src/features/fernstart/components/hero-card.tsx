import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct, radius, type } from '../theme';
import { card } from '../data/start';
import { T } from './text';

/**
 * The card, posed.
 *
 * The reference's hero is a 3D render of a card floating at an angle, which
 * the rules say to rebuild as the idea of it in-app rather than trace: this
 * is a real card component with real type on it, rotated and shadowed. Its
 * balance is the same figure the home showcase puts at the top of its own
 * screen.
 *
 * The gradient is drawn in SVG user space. `expo-linear-gradient` mirrors a
 * diagonal on the web render, which would put the light on the wrong corner
 * and is invisible until the reference is beside it.
 */
export function HeroCard({ width, height }: { width: number; height: number }) {
  const id = `fernCard-${useId()}`;

  // Sized so the *rotated* card still fits the screen: at 0.94 of the width
  // the tilt pushed the "Fern" mark 28dp past the clip and the audit caught
  // it being cut in half. A rotated box is wider than the box, and that is
  // the number that has to fit.
  // A rotated box is wider than the box: w*cos(a) + h*sin(a). The front card
  // is sized and tilted so that figure still fits 393dp, which is why the
  // tilt is 8 degrees and not the reference's steeper pose — at 14 degrees
  // the "Fern" mark came off the edge and the audit caught it being cut.
  const cardW = Math.min(width * 0.9, 354);
  const cardH = Math.round(cardW * 0.63);
  // A rotated card's bounding box is taller than the card, and a second one
  // behind it fills the rest. Without the pair the band left over above the
  // headline measured 133dp of empty ground -- a gap the eye reads as
  // "unfinished" and the audit now reads as a failure.
  const step = Math.max(24, Math.min(132, Math.round(height - cardH * 1.1)));

  return (
    // Not clipped. The clip was here when the card was wider than the screen
    // and its rotated box was extending the document; at 0.9 of the width the
    // rotated box is 381dp and fits, so the only thing the clip still did was
    // cut the back card's top corners off square.
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: cardW, height: cardH + step }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: cardW,
            height: cardH,
            borderRadius: radius.card,
            backgroundColor: '#20421F',
            borderWidth: 1,
            borderColor: 'rgba(168,224,152,0.22)',
            transform: [{ scale: 0.93 }, { rotate: '-16deg' }, { translateY: -6 }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: cardW,
            height: cardH,
            borderRadius: radius.card,
            overflow: 'hidden',
            transform: [{ rotate: '-8deg' }, { translateY: step }],
            shadowColor: '#03150A',
            shadowOpacity: 0.5,
            shadowRadius: 28,
            shadowOffset: { width: 0, height: 18 },
            elevation: 14,
          }}
        >
          <Svg width={cardW} height={cardH} style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={id} x1="0.1" y1="0" x2="0.9" y2="1">
                <Stop offset="0" stopColor="#A9E59F" />
                <Stop offset="0.5" stopColor={ct.leaf} />
                <Stop offset="1" stopColor="#4FA44E" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width={cardW} height={cardH} fill={`url(#${id})`} />
          </Svg>

          <View style={{ flex: 1, padding: 18, justifyContent: 'space-between', zIndex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <T variant="cardBrand" color={ct.onLeaf} style={{ height: type.cardBrand.line }}>
                  {card.brand}
                </T>
                <T
                  variant="cardLabel"
                  color={ct.onLeaf}
                  style={{ height: type.cardLabel.line, marginTop: 10 }}
                >
                  {card.label}
                </T>
                <T
                  variant="cardFigure"
                  color={ct.onLeaf}
                  style={{ height: type.cardFigure.line, marginTop: 3 }}
                >
                  {card.balance}
                </T>
              </View>
              <View
                style={{
                  height: 26,
                  paddingHorizontal: 10,
                  borderRadius: 13,
                  backgroundColor: 'rgba(13,34,16,0.14)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant="cardLabel" color={ct.onLeaf} style={{ height: type.cardLabel.line }}>
                  {`+${card.delta}`}
                </T>
              </View>
            </View>

            <T variant="cardDigits" color={ct.onLeaf}>
              {card.digits}
            </T>
          </View>
        </View>
      </View>
    </View>
  );
}
