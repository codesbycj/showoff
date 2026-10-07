import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Card } from './bits';
import { Symbol } from './symbol';
import { CART, type CartItem } from '../data/cart';
import { FONT, R, TYPE, rb } from '../theme';

/**
 * One line in the cart.
 *
 * The promo line carries a mint ribbon pinned to the card's top-right corner,
 * which is why the card wraps in a positioning `View` rather than drawing the
 * ribbon inside its padding — the reference lets it sit on the card's edge.
 */
export function CartRow({
  item,
  onRemove,
  onFavourite,
}: {
  item: CartItem;
  onRemove?: () => void;
  onFavourite?: () => void;
}) {
  return (
    <View style={{ marginTop: item.deal ? 10 : 0 }}>
      {item.deal ? (
        <View
          style={{
            position: 'absolute',
            top: -10,
            right: 10,
            zIndex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: rb.mintTint,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderTopLeftRadius: R.base,
            borderTopRightRadius: R.base,
          }}
        >
          <Symbol name="verified" size={14} color="#047857" />
          <Text style={[TYPE.labelMd, { color: '#047857' }]}>{item.deal}</Text>
        </View>
      ) : null}

      <Card padding={12}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={item.photo}
            style={{ width: 62, height: 62, borderRadius: R.md }}
            contentFit="cover"
          />

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={[TYPE.titleLg, { color: rb.ink }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
                  {item.sub}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Pressable
                  onPress={onFavourite}
                  accessibilityRole="button"
                  accessibilityLabel="Save for later"
                >
                  <Symbol name="favorite" size={19} color={rb.crimson} />
                </Pressable>
                <Pressable
                  onPress={onRemove}
                  accessibilityRole="button"
                  accessibilityLabel="Remove"
                >
                  <Symbol name="delete" size={19} color={rb.secondary} />
                </Pressable>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                <Text
                  style={{
                    fontFamily: FONT.displayBold,
                    fontSize: 20,
                    lineHeight: 26,
                    color: item.wasPrice ? '#047857' : rb.crimson,
                  }}
                >
                  {item.price}
                </Text>
                {item.wasPrice ? (
                  <Text
                    style={[
                      TYPE.bodyMd,
                      { color: rb.secondary, textDecorationLine: 'line-through' },
                    ]}
                  >
                    {item.wasPrice}
                  </Text>
                ) : null}
              </View>

              <Stepper qty={item.qty} />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

/** The quantity stepper — minus, a tabular count, plus. */
export function Stepper({ qty }: { qty: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: rb.surfaceHigh,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 7,
      }}
    >
      <Text style={{ fontFamily: FONT.bold, fontSize: 17, lineHeight: 20, color: rb.ink }}>−</Text>
      <Text style={[TYPE.titleMd, { color: rb.ink }]}>{qty}</Text>
      <Text style={{ fontFamily: FONT.bold, fontSize: 17, lineHeight: 20, color: rb.ink }}>+</Text>
    </View>
  );
}

/** The drop-off note strip. */
export function DropoffRow({ onEdit }: { onEdit?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: rb.surfaceHigh,
        borderRadius: R.lg,
        padding: 12,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: rb.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="editNote" size={20} color={rb.crimson} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[TYPE.titleMd, { color: rb.ink }]}>{CART.dropoffTitle}</Text>
        <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
          {CART.dropoffBody}
        </Text>
      </View>

      <Pressable onPress={onEdit} accessibilityRole="button">
        <Text style={[TYPE.labelLg, { color: rb.crimson }]}>{CART.edit}</Text>
      </Pressable>
    </View>
  );
}

/** The order summary card. */
export function SummaryCard() {
  return (
    <Card padding={16}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text style={[TYPE.headlineMd, { color: rb.ink }]}>{CART.summaryTitle}</Text>
        <Text style={[TYPE.bodyMd, { color: rb.secondary }]}>{CART.summaryStore}</Text>
      </View>

      <View style={{ gap: 10 }}>
        {CART.lines.map((l) => (
          <View
            key={l.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[TYPE.bodyLg, { color: rb.secondary }]}>{l.label}</Text>
              {'chip' in l && l.chip ? (
                <View
                  style={{
                    backgroundColor: rb.mintTint,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: R.sm,
                  }}
                >
                  <Text style={[TYPE.labelSm, { color: '#047857' }]}>{l.chip}</Text>
                </View>
              ) : null}
            </View>

            <Text style={[TYPE.titleMd, { color: l.tone === 'mint' ? '#047857' : rb.ink }]}>
              {l.value}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: rb.surfaceHigh,
          marginVertical: 14,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={[TYPE.headlineMd, { color: rb.ink }]}>{CART.totalLabel}</Text>
          <Text style={[TYPE.bodyMd, { color: rb.secondary }]}>{CART.totalNote}</Text>
        </View>

        <Text
          style={{
            fontFamily: FONT.displayBold,
            fontSize: 26,
            lineHeight: 32,
            color: rb.crimson,
          }}
        >
          {CART.total}
        </Text>
      </View>
    </Card>
  );
}
