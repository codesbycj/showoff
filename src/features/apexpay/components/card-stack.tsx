import { Pressable, Text, View } from 'react-native';

import { ACTIVE_CARD, STACKED_CARDS } from '../data/home';
import { ax, radius, type as t } from '../theme';
import { MaskedNumber, NetworkMark } from './card-brand';
import { Symbol } from './symbol';

/**
 * The mask toggle, and the tallest thing in every row.
 *
 * 20x24, not the 20x20 its 16px glyph suggests: on the web the glyph is inline
 * content on the body's 20px line box with `p-0.5` either side. It is what
 * sets each row's height, so at 20 tall all three rows come out 4dp short and
 * the whole stack climbs 16dp up the page.
 */
const EYE = {
  width: 20,
  height: 24,
  marginLeft: 4,
  alignItems: 'center',
  justifyContent: 'center',
} as const;

/**
 * One covered card: its network, its last four, and the toggle.
 *
 * The padding is asymmetric (`pt-3 pb-4`), which is what keeps the visible
 * sliver of a covered card looking like its top edge rather than a centred
 * strip.
 */
function CollapsedRow({
  last4,
  network,
  filled,
  numberColor,
  overlap,
}: {
  last4: string;
  network: (typeof STACKED_CARDS)[number]['network'];
  filled: boolean;
  numberColor: string;
  overlap: number;
}) {
  return (
    <View
      style={{
        marginTop: overlap,
        borderRadius: filled ? radius.panel : 0,
        backgroundColor: filled ? ax.cardRow : 'transparent',
        paddingHorizontal: 12,
        paddingTop: filled ? 12 : 8,
        paddingBottom: filled ? 16 : 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <NetworkMark network={network} size={15} />
        <MaskedNumber last4={last4} color={numberColor} />
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Show number" hitSlop={8} style={EYE}>
        <Symbol name="visibilityOff" size={16} color={ax.inkMuted60} />
      </Pressable>
    </View>
  );
}

/**
 * The credit card stack: two collapsed rows with one open card under them.
 *
 * **The rows overlap.** Each one carries a negative top margin — `-mt-1` on
 * the second, `-mt-2` on the active card — so it rides 4 and then 8 points
 * over the one above it. That overlap is the entire stacked-card effect, and
 * laying the three out with a positive gap instead (which is the obvious
 * reading) spreads them into a plain list and makes the well 20 points taller.
 *
 * The depth is carried by four steps of translucent grey and nothing else:
 * the well at 70%, an unfilled row, a row at 60%, the active card at 90%. No
 * shadows — and reaching for `elevation` here would both miss the look and
 * collide with the clip, since `overflow: hidden` and `elevation` on one View
 * is unreliable on Android.
 */
export function CardStack() {
  return (
    <View
      style={{
        borderRadius: radius.well,
        backgroundColor: ax.stackWell,
        padding: 12,
        overflow: 'hidden',
      }}
    >
      {/* STEP 1.32 the card at the back
      <CollapsedRow
        network={STACKED_CARDS[0].network}
        last4={STACKED_CARDS[0].last4}
        filled={false}
        numberColor={ax.inkMuted70}
        overlap={0}
      />
      */}
      {/* STEP 1.33 and one riding over it
      <CollapsedRow
        network={STACKED_CARDS[1].network}
        last4={STACKED_CARDS[1].last4}
        filled
        numberColor={ax.inkMuted80}
        overlap={-4}
      />
      */}

      <View
        style={{
          marginTop: -8,
          // MISTAKE 1.34 the cards came out spaced instead of stacked
          top: 16,
          borderRadius: radius.panel,
          backgroundColor: ax.cardActive,
          padding: 20,
          gap: 20,
        }}
      >
        {/* STEP 1.35 the one card that is open
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <NetworkMark network={ACTIVE_CARD.network} size={16} />
            <MaskedNumber last4={ACTIVE_CARD.last4} color={ax.inkMuted90} />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Show number"
            hitSlop={8}
            style={EYE}
          >
            <Symbol name="visibilityOff" size={16} color={ax.inkMuted70} />
          </Pressable>
        </View>
        */}

        {/* STEP 1.36 whose it is, and what is on it
        <View style={{ gap: 6, paddingTop: 8 }}>
          <Text style={[t.body13, { color: ax.inkMuted70 }]}>{ACTIVE_CARD.holder}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={[t.cardBalance, { color: ax.ink }]}>{ACTIVE_CARD.balance}</Text>
            <Text style={[t.expiry, { color: ax.inkMuted60, marginLeft: 12 }]}>
              {ACTIVE_CARD.expiry}
            </Text>
          </View>
        </View>
        */}
      </View>
    </View>
  );
}
