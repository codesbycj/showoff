import { Pressable, useWindowDimensions, View } from 'react-native';

import { CARD } from '../data/cards';
import { CARD_HEIGHT, CARD_META_COL, CARD_PAD, CARD_PLATE, MARGIN } from '../layout';
import { nb, radius } from '../theme';
import { CardFace } from './card-face';
import { Icon } from './icon';
import { MaskedNumber } from './masked-number';
import { MastercardMark } from './mastercard-mark';
import { T } from './text';

/**
 * The card at the front of the stack.
 *
 * Its face is a 3D render in the reference — a black slab with light raking
 * across it — and it is rebuilt here as three flat layers instead of an image,
 * so it stays sharp at any width and costs the bundle nothing:
 *
 * Its face — the base colour, the wash down from the lit top edge and the blue
 * bounce in the bottom-left corner — is painted by `card-face.tsx`, which has
 * the sampled numbers behind every stop. What is left here is the content and
 * a hairline along the top edge for the lit rim, inset by the corner radius so
 * it stops where the corner turns.
 *
 * Every row below is positioned by an explicit `marginTop` off the one above
 * it, each measured from the reference: 19 to "Physical Card", 51.7 to
 * "Available Balance", 72 to the balance, 107.7 to the number, 140.7 to the
 * labels — all from the card's own top edge.
 */
export function BankCard({
  hidden = false,
  onToggleHidden,
}: {
  hidden?: boolean;
  onToggleHidden?: () => void;
}) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        height: CARD_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: nb.card,
        overflow: 'hidden',
      }}
    >
      {/* STEP 1.13 light the face
      <CardFace width={width - MARGIN * 2} />
      */}

      {/* STEP 1.14 and catch the top edge
      <View
        style={{
          position: 'absolute',
          left: radius.card,
          right: radius.card,
          top: 0,
          height: 1,
          backgroundColor: 'rgba(255,255,255,0.35)',
        }}
      />
      */}

      <View style={{ flex: 1, paddingLeft: CARD_PAD, paddingRight: CARD_PAD }}>
        {/* STEP 1.15 say which card it is
        <T variant="cardKind" color={nb.onCardMuted} style={{ marginTop: 19 }}>
          {CARD.kind}
        </T>
        */}

        {/* STEP 1.16 what the figure means
        <T variant="cardCaption" color={nb.onCard} style={{ marginTop: 18.7 }}>
          {CARD.caption}
        </T>
        */}

        {/* STEP 1.17 and the figure
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6.3 }}>
          <T variant="amount" color={nb.onCard}>
            {hidden ? CARD.amountHidden : CARD.amount}
          </T>
          {hidden ? null : (
            <T variant="cents" color="rgba(255,255,255,0.72)">
              {CARD.cents}
            </T>
          )}
        </View>
        */}

        {/* STEP 1.18 the number, all but the last four
        <View style={{ marginTop: 8.4 }}>
          <MaskedNumber last4={CARD.last4} />
        </View>
        */}

        {/* STEP 1.19 label the foot of the card
        <View style={{ flexDirection: 'row', marginTop: 18.7 }}>
          <T variant="cardMetaLabel" color={nb.onCardLabel} style={{ width: CARD_META_COL }}>
            {CARD.holderLabel}
          </T>
          <T variant="cardMetaLabel" color={nb.onCardLabel}>
            {CARD.expiresLabel}
          </T>
        </View>
        */}

        {/* STEP 1.20 whose card it is, and until when
        <View style={{ flexDirection: 'row', marginTop: 4.8 }}>
          <T variant="cardMetaValue" color={nb.onCard} style={{ width: CARD_META_COL }}>
            {CARD.holder}
          </T>
          <T variant="cardMetaFigure" color={nb.onCard}>
            {CARD.expires}
          </T>
        </View>
        */}
      </View>

      {/* STEP 1.21 whose rails it runs on
      <View style={{ position: 'absolute', right: 22.6, bottom: 18.5 }}>
        <MastercardMark />
      </View>
      */}

      {/* STEP 1.22 and a way to hide the balance
      <Pressable
        onPress={onToggleHidden}
        accessibilityRole="button"
        accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
        style={{ position: 'absolute', right: CARD_PAD, top: 14 }}
      >
        <View
          style={{
            width: CARD_PLATE,
            height: CARD_PLATE,
            borderRadius: radius.plate,
            backgroundColor: nb.cardPlate,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name={hidden ? 'show' : 'hide'}
            size={14}
            color="rgba(18,18,18,0.92)"
            strokeWidth={1.8}
          />
        </View>
      </Pressable>
      */}
    </View>
  );
}
