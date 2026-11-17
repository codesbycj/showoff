import { Pressable, View } from 'react-native';

import { addons, badge, cta, hero, item, options, plus, quantity, total, usd } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BarProps } from './_item-parts-shared';

/**
 * The quantity and the primary action.
 *
 * **The button carries the total**, which is the item price plus the selected
 * add-ons times the quantity (R9) — the board's button carries no figure at
 * all, so nothing on its screen says what you are about to pay.
 *
 * The board also writes "Add to card" (I1).
 *
 * The fill and its shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function CartBar({ margin, height, radius, step, onAdd }: BarProps) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* STEP 1.23 "Fewer"
        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="Fewer">
          {({ pressed }) => (
            <View
              style={{
                width: step,
                height: step,
                borderRadius: step / 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: ct.fieldEdge,
                opacity: pressed ? 0.6 : 1,
              }}
            >
              <Glyph name="minus" size={14} color={ct.ink} strokeWidth={2.4} />
            </View>
          )}
        </Pressable>
        */}

        {/* STEP 1.24 t
        <T variant="qty">{quantity}</T>
        */}

        {/* STEP 1.25 "More"
        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="More">
          {({ pressed }) => (
            <View
              style={{
                width: step,
                height: step,
                borderRadius: step / 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: ct.fieldEdge,
                opacity: pressed ? 0.6 : 1,
              }}
            >
              <Glyph name="plus" size={14} color={ct.ink} strokeWidth={2.2} />
            </View>
          )}
        </Pressable>
        */}
      </View>

      {/* STEP 1.26 label
      <Pressable
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel={`${cta.label}, ${usd(total())}`}
        style={{ flex: 1 }}
      >
        {({ pressed }) => (
          <View
            style={{
              height,
              borderRadius: radius,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: ct.brand,
              opacity: pressed ? 0.88 : 1,
              shadowColor: '#5C0A04',
              shadowOpacity: 0.28,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 7,
            }}
          >
            <T variant="cta">{cta.label}</T>
            <T variant="cta">{`· ${usd(total())}`}</T>
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
