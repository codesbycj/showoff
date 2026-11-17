import { View } from 'react-native';

import { card, usd } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { width: number; height: number; radius: number; tilt: number; offset: number };

/**
 * The card, posed.
 *
 * **Rebuilt as a real component, not traced off the board's 3D render**
 * (RULES §2.2): a render cannot be recreated and must not be traced badly, so
 * the *idea* of it is built instead — a real card with real type on it, tilted
 * and shadowed, with a second card behind.
 *
 * The scheme mark is a contactless wave, not the board's Mastercard. Shipping
 * a real payment network's logo on a fictional card is impersonation.
 *
 * **Rotation is about the element's centre** whatever `transformOrigin` says
 * (Part 7), so both cards are the same size and rotate about their own middles
 * — which is what keeps the stack reading as one object.
 *
 * The fill and the shadow travel in one style object: a `Platform.select` for
 * a shadow is exactly what the web render cannot check (§4.4).
 */
export function CardStack({ width, height, radius, tilt, offset }: Props) {
  return (
    <View
      style={{ width: width + offset, height: height + offset, alignSelf: 'center' }}
    >
      {/* The card behind, offset down and right so it peeks out of the deck. */}
      <View
        style={{
          position: 'absolute',
          left: offset,
          top: offset,
          width,
          height,
          borderRadius: radius,
          backgroundColor: ct.cardBack,
          transform: [{ rotate: `${tilt - 2}deg` }],
          shadowColor: '#0D2409',
          shadowOpacity: 0.25,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 12 },
          elevation: 6,
        }}
      />

      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          borderRadius: radius,
          padding: 18,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.cardEdge,
          transform: [{ rotate: `${tilt}deg` }],
          shadowColor: '#0D2409',
          shadowOpacity: 0.22,
          shadowRadius: 26,
          shadowOffset: { width: 0, height: 16 },
          elevation: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <T variant="cardLabel">{card.label}</T>
            <T variant="cardValue">{usd(card.balance)}</T>
          </View>
          <Glyph name="chip" size={30} color={ct.chip} />
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}
        >
          {[0, 1, 2].map((g) => (
            <View key={g} style={{ flexDirection: 'row', gap: 3 }}>
              {[0, 1, 2, 3].map((d) => (
                <View
                  key={d}
                  style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: ct.onCard }}
                />
              ))}
            </View>
          ))}
          <T variant="cardNumber">{card.last4}</T>
        </View>

        <View style={{ flexDirection: 'row', gap: 14, marginTop: 8 }}>
          <T variant="cardMeta">{`Valid From ${card.validFrom}`}</T>
          <T variant="cardMeta">{`Valid Thru ${card.validThru}`}</T>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flex: 1 }}>
              <T variant="cardMeta">{card.holderLabel}</T>
              <T variant="cardHolder">{card.holder}</T>
            </View>
            <Glyph name="wave" size={26} color={ct.onCard} />
          </View>
        </View>
      </View>
    </View>
  );
}
