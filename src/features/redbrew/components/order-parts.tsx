import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Card, Chip } from './bits';
import { Symbol } from './symbol';
import { ORDERS, type Order } from '../data/orders';
import { FONT, LEVEL, R, TYPE, rb } from '../theme';

/**
 * The live-order panel: a status banner, a photographic slice, and the review
 * block under it.
 *
 * A crimson hairline runs along the very top of the card, which is why the card
 * clips — and therefore carries no elevation of its own. The drop lives on the
 * wrapper, because a clip and an elevation on one View is the pairing Android
 * renders unreliably.
 */
export function LiveOrderCard({
  onSubmit,
  onSkip,
}: {
  onSubmit?: () => void;
  onSkip?: () => void;
}) {
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
      <View
        style={{
          borderRadius: R.lg,
          backgroundColor: rb.surface,
          borderWidth: 1,
          borderColor: rb.hairline,
          overflow: 'hidden',
        }}
      >
        <View style={{ height: 4, backgroundColor: rb.crimson }} />

        <View style={{ padding: 14, gap: 14 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: rb.crimsonTint,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol name="moped" size={22} color={rb.crimson} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[TYPE.labelMd, { color: rb.secondary }]} numberOfLines={1}>
                  {ORDERS.liveLabel}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT.displayBold,
                    fontSize: 13,
                    lineHeight: 18,
                    letterSpacing: -0.1,
                    textTransform: 'uppercase',
                    color: rb.ink,
                  }}
                  numberOfLines={1}
                >
                  {ORDERS.liveTitle}
                </Text>
              </View>
            </View>

            <Chip label={ORDERS.liveEta} tone="crimsonSoft" />
          </View>

          <View style={{ borderRadius: R.md, overflow: 'hidden' }}>
            <Image
              source={require('../../../../assets/images/redbrew/order-slice.jpg')}
              style={{ width: '100%', height: 104 }}
              contentFit="cover"
            />

            <LinearGradient
              colors={['rgba(20,18,16,0)', 'rgba(20,18,16,0.78)']}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 60 }}
            />

            <View
              style={{
                position: 'absolute',
                left: 12,
                right: 12,
                bottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Symbol name="localCafe" size={17} color="#ffffff" />
                <Text style={[TYPE.labelLg, { color: '#ffffff' }]} numberOfLines={1}>
                  {ORDERS.sliceName}
                </Text>
              </View>
              <Text style={[TYPE.titleLg, { color: '#ffffff' }]}>{ORDERS.slicePrice}</Text>
            </View>
          </View>

          <ReviewBlock onSubmit={onSubmit} onSkip={onSkip} />
        </View>
      </View>
    </View>
  );
}

/**
 * The rate-and-review block.
 *
 * The stars are presentational — the reference wires them with inline JS that
 * rewrites the label and the button text. The recording never taps them, so the
 * rating is fixed at the reference's default of five and the button agrees.
 *
 * The feedback field is a `Text` showing the placeholder rather than a
 * `TextInput`: a real input would put a caret in every recorded frame and open
 * the keyboard the moment the screen is touched.
 */
function ReviewBlock({ onSubmit, onSkip }: { onSubmit?: () => void; onSkip?: () => void }) {
  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Symbol name="rateReview" size={18} color={rb.ink} />
          <Text style={[TYPE.bodyLg, { fontFamily: FONT.bold, color: rb.ink }]}>
            {ORDERS.rateTitle}
          </Text>
        </View>
        <Text
          style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 15, color: rb.crimson }}
          numberOfLines={1}
        >
          {ORDERS.rateLabel}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <SolidStar key={i} size={32} color={i <= ORDERS.rating ? rb.crimson : rb.surfaceHigh} />
        ))}
      </View>

      <View
        style={{
          backgroundColor: rb.surfaceLow,
          borderRadius: R.md,
          padding: 12,
          minHeight: 58,
        }}
      >
        <Text style={[TYPE.bodyMd, { color: rb.secondary }]}>{ORDERS.feedbackPlaceholder}</Text>
      </View>

      <Pressable onPress={onSubmit} accessibilityRole="button">
        <View
          style={[
            {
              height: 48,
              borderRadius: 999,
              backgroundColor: rb.crimson,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            },
            LEVEL.cta,
          ]}
        >
          <Symbol name="verified" size={18} color={rb.onCrimson} />
          <Text style={[TYPE.labelLg, { color: rb.onCrimson, textTransform: 'uppercase' }]}>
            {ORDERS.submit}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onSkip} accessibilityRole="button">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Text style={[TYPE.labelLg, { color: rb.secondary }]}>{ORDERS.skip}</Text>
          <Symbol name="chevronRight" size={17} color={rb.secondary} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * A solid star.
 *
 * Material Symbols Outlined is the FILL 0 cut, so its `star` is a hollow
 * outline — the reference's rating stars are solid crimson. Drawn rather than
 * swapped for another glyph, because no unfilled family carries a filled star.
 */
function SolidStar({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 17.27l5.18 3.13a.6.6 0 00.89-.65l-1.37-5.88 4.56-3.95a.6.6 0 00-.34-1.05l-6.01-.51-2.35-5.54a.6.6 0 00-1.11 0L9.1 8.36l-6.01.51a.6.6 0 00-.34 1.05l4.56 3.95-1.37 5.88a.6.6 0 00.89.65L12 17.27z"
        fill={color}
      />
    </Svg>
  );
}

/** One row on the order-history list. */
export function OrderRow({ order, onAction }: { order: Order; onAction?: () => void }) {
  const tone =
    order.tone === 'live' ? rb.crimson : order.tone === 'done' ? '#047857' : rb.secondary;

  return (
    <Card padding={12}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[TYPE.titleLg, { color: rb.ink }]}>{order.number}</Text>
            {order.live ? (
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: rb.crimson }} />
            ) : null}
          </View>
          <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
            {order.detail}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: FONT.displayBold,
            fontSize: 18,
            lineHeight: 24,
            color: rb.ink,
          }}
        >
          {order.price}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
          <Symbol name={order.statusIcon} size={17} color={tone} />
          <Text style={[TYPE.labelMd, { color: tone }]} numberOfLines={1}>
            {order.status}
          </Text>
        </View>

        <Pressable onPress={onAction} accessibilityRole="button">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: order.tone === 'live' ? rb.crimson : rb.surfaceLow,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
            }}
          >
            <Symbol
              name={order.actionIcon}
              size={16}
              color={order.tone === 'live' ? rb.onCrimson : rb.ink}
            />
            <Text style={[TYPE.labelMd, { color: order.tone === 'live' ? rb.onCrimson : rb.ink }]}>
              {order.action}
            </Text>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}
