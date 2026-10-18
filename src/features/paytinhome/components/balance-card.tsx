import { useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { CARD_BLOCK_W, CARD_PAD, CARD_RATIO, MARGIN } from '../layout';
import { ph, radius } from '../theme';
import { T } from './text';
import { VisaMark } from './visa-mark';

/**
 * The card: the one object on the screen that is not a list or a button.
 *
 * Its height is a ratio of its width rather than a number, so it keeps its
 * proportion on any phone instead of going square on a narrow one — a card
 * that loses its aspect stops reading as a card.
 *
 * The lime block is a panel inset from the card's right edge, carrying the
 * contactless mark, and the text column is padded to clear it. A first pass
 * ran the block off the edge and left the contactless mark down in the number
 * row, where the two overlapped and the card read as jumbled — the block and
 * the mark are one object in the reference, and the type has to stay out of
 * its way. Nothing is clipped to achieve it, which matters: overflow hidden
 * next to an elevation is unreliable on Android.
 */
export function BalanceCard({
  brand,
  balanceLabel,
  balance,
  number,
  name,
  expiryLabel,
  expiry,
}: {
  brand: string;
  balanceLabel: string;
  balance: string;
  number: string;
  name: string;
  expiryLabel: string;
  expiry: string;
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width - MARGIN * 2;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardWidth * CARD_RATIO,
        borderRadius: radius.card,
        backgroundColor: ph.ink,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
      accessibilityLabel={`${brand} card, balance ${balance}`}
    >
      {/* STEP 1.12 the block let into its side
      <View
        style={{
          position: 'absolute',
          right: CARD_PAD,
          top: cardWidth * CARD_RATIO * 0.26,
          width: CARD_BLOCK_W,
          height: cardWidth * CARD_RATIO * 0.46,
          borderRadius: 14,
          backgroundColor: ph.lime,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Contactless size={22} color={ph.text} />
      </View>
      */}

      {/* STEP 1.13 the scheme, and a sparkle
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <VisaMark color={ph.onInk} />
        <View style={{ flex: 1 }} />
        <Sparkle size={16} />
      </View>
      */}

      {/* STEP 1.14 the balance
      <View style={{ paddingRight: CARD_BLOCK_W + 14 }}>
        <T variant="cardLabel" color={ph.onInkMuted}>
          {balanceLabel}
        </T>
        <T variant="cardAmount" color={ph.onInk}>
          {balance}
        </T>
      </View>
      */}

      {/* STEP 1.15 the number
      <T variant="cardNumber" color={ph.onInk}>
        {number}
      </T>
      */}

      {/* STEP 1.16 and whose it is
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <T variant="cardName" color={ph.onInk}>
          {name}
        </T>
        <View style={{ flex: 1 }} />
        <T variant="cardLabel" color={ph.onInkMuted}>
          {`${expiryLabel} ${expiry}`}
        </T>
      </View>
      */}
    </View>
  );
}

/**
 * The contactless mark, beside the lime block.
 *
 * Two arcs and a dot rather than an icon from the set: every icon library
 * draws this at a different sweep, and on a card it reads as a specific mark
 * or as nothing at all.
 */
function Contactless({ size, color = ph.onInk }: { size: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M8 7 A10 10 0 0 1 8 17"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M13 4 A16 16 0 0 1 13 20"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** The four-point star the reference scatters over the card. */
function Sparkle({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 1.5 C12 8 16 12 22.5 12 C16 12 12 16 12 22.5 C12 16 8 12 1.5 12 C8 12 12 8 12 1.5 Z"
        fill={ph.lime}
      />
    </Svg>
  );
}
