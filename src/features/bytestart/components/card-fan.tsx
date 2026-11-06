import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct, radius, type } from '../theme';
import { card } from '../data/start';
import { T } from './text';

/**
 * Three cards fanned, which is the reference's hero.
 *
 * **Rebuilt as real components, not traced.** The reference's fan is a 3D
 * render; the rules say such a thing is either stood in for with stock or
 * rebuilt as the idea of it in-app — a real card, posed and shadowed. These
 * are real Views with real type on them, which also means the balance on the
 * front card is the same string the home screen shows.
 *
 * React Native rotates about an element's centre, so each card is given its
 * own offset after the rotation rather than being anchored and spun — an
 * anchored rotation pushes a card out of its own box and it gets clipped.
 */
export function CardFan({ width, height }: { width: number; height: number }) {
  const id = `byteCard-${useId()}`;

  const cardW = Math.min(width * 0.52, 196);
  const cardH = Math.round(cardW * 1.56);
  const shadow = {
    shadowColor: '#000A0C',
    shadowOpacity: 0.5,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  };

  // Every card is absolutely placed against a stage of known size. An
  // absolute child of a centring flex parent measured 0x0 on the web render
  // -- the text inside it then reported as "clipped by a zero-size box",
  // which is exactly what it was.
  const base = {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    width: cardW,
    height: cardH,
    borderRadius: radius.card,
    ...shadow,
  };

  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: cardW, height: cardH }}>
        <View
          style={{
            ...base,
            backgroundColor: ct.cardPale,
            transform: [{ rotate: '-20deg' }, { translateX: -58 }, { translateY: 6 }],
          }}
        />
        <View
          style={{
            ...base,
            backgroundColor: ct.cardMid,
            transform: [{ rotate: '-11deg' }, { translateX: -26 }, { translateY: -2 }],
          }}
        />
        <View
          style={{
            ...base,
            overflow: 'hidden',
            transform: [{ rotate: '-4deg' }, { translateX: 16 }],
          }}
        >
          <Svg width={cardW} height={cardH} style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={id} x1="0" y1="0" x2="0.8" y2="1">
                <Stop offset="0" stopColor={ct.tealLit} />
                <Stop offset="1" stopColor="#09302E" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width={cardW} height={cardH} fill={`url(#${id})`} />
          </Svg>

          <View style={{ flex: 1, padding: 16, justifyContent: 'space-between', zIndex: 1 }}>
            <T variant="cardBrand" color={ct.onDeep} style={{ height: type.cardBrand.line }}>
              {card.brand}
            </T>
            <View>
              <T variant="cardLabel" color={ct.faint} style={{ height: type.cardLabel.line }}>
                {card.label.toUpperCase()}
              </T>
              <T
                variant="cardFigure"
                color={ct.onDeep}
                style={{ height: type.cardFigure.line, marginTop: 3 }}
              >
                {card.balance}
              </T>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
