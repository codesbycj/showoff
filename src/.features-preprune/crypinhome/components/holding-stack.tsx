import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View } from 'react-native';

import { holdings, PRICE, portfolio, usd } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** Each card's tint runs left-to-right, bright at the coin and gone by the end. */
const TINT: Record<string, [string, string]> = {
  btc: ['rgba(238,154,55,0.55)', 'rgba(238,154,55,0.04)'],
  eth: ['rgba(96,104,178,0.55)', 'rgba(96,104,178,0.05)'],
};

type Props = {
  margin: number;
  height: number;
  cardH: number;
  radius: number;
  gap: number;
  inset: number;
  bleed: number;
  pillH: number;
  coin: number;
};

/**
 * The two largest holdings as a tapering deck, and a way to the rest.
 *
 * **The deck tapers downward and nothing straddles anything.** The first pass
 * overlapped the cards by a few dp and pinned the "View All" pill to the bottom
 * of the same box, so the pill cut across the Ethereum card's lower edge — the
 * exact shape R3 calls an accident: a floating control half on and half off the
 * surface under it. Each card now sits in its own band, inset one step further
 * than the one above, and the pill is the last step of that taper rather than
 * something laid over it.
 *
 * The cards are **thin** (~40dp), **bled wider than the page margin** so the
 * deck runs almost edge to edge, and tinted with a **horizontal** gradient —
 * bright behind the coin, gone by the price. The gradient runs left to right,
 * which `expo-linear-gradient` handles; only a *diagonal* is mirrored on web
 * (RULES Part 7).
 *
 * Each value is `units × price` from `data/wallet.ts`, so a card and a market
 * row cannot disagree about what Bitcoin costs (R9).
 */
export function HoldingStack({
  margin,
  height,
  cardH,
  radius,
  gap,
  inset,
  bleed,
  pillH,
  coin,
}: Props) {
  const disc = coin - 12;

  return (
    <View style={{ height, marginHorizontal: margin - bleed }}>
      {holdings.map((h, i) => (
        <View
          key={h.id}
          style={{
            position: 'absolute',
            top: i * (cardH + gap),
            left: i * inset,
            right: i * inset,
            height: cardH,
            borderRadius: radius,
          }}
        >
          <LinearGradient
            colors={TINT[h.id]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: radius,
              backgroundColor: '#121212',
            }}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 12 + i * 2,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <View
              style={{
                width: disc,
                height: disc,
                borderRadius: disc / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: h.id === 'btc' ? ct.btc : ct.eth,
              }}
            >
              <Glyph name={h.id} size={13} color={ct.white} />
            </View>

            <T variant="coinName" style={{ flex: 1 }}>
              {h.name}
            </T>
            <T variant="coinValue">{usd(h.units * PRICE[h.id])}</T>
          </View>
        </View>
      ))}

      {/* The last step of the taper, not a control laid over the deck. */}
      <Pressable
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={portfolio.viewAll}
        style={{
          position: 'absolute',
          top: holdings.length * (cardH + gap),
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              height: pillH,
              paddingLeft: 14,
              paddingRight: 11,
              borderRadius: pillH / 2,
              backgroundColor: ct.disc,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <T variant="viewAll">{portfolio.viewAll}</T>
            <Glyph name="chevronRight" size={12} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
