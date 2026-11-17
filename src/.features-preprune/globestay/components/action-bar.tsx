import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  about,
  actions,
  gallery,
  hero,
  includes,
  overview,
  stay,
  total,
  unit,
  usd,
} from '../data/stay';
import { ct } from '../theme';
import { T } from './text';

import { ActionProps } from './_stay-parts-shared';

/**
 * The total, and the two actions.
 *
 * **The total is the rate times the nights** (R9) — the board shows a nightly
 * rate and never says what a stay costs.
 *
 * Both buttons are 52dp, so each clears R7 on its own, and each fill and its
 * shadow sit in one style object: a `Platform.select` for a shadow is exactly
 * what the web render cannot check (§4.4).
 */
export function ActionBar({ margin, height, radius, onBook }: ActionProps) {
  return (
    <View style={{ marginHorizontal: margin, gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T variant="totalLabel">{`${stay.nights} nights`}</T>
        <T variant="totalValue">{usd(total())}</T>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={actions.message} style={{ flex: 1 }}>
          {({ pressed }) => (
            <View
              style={{
                height,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.tile,
                opacity: pressed ? 0.8 : 1,
              }}
            >
              <T variant="ghost">{actions.message}</T>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={onBook}
          accessibilityRole="button"
          accessibilityLabel={`${actions.book}, ${usd(total())}`}
          style={{ flex: 1.3 }}
        >
          {({ pressed }) => (
            <View
              style={{
                height,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.brand,
                opacity: pressed ? 0.88 : 1,
                shadowColor: '#0A3C78',
                shadowOpacity: 0.3,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 7,
              }}
            >
              <T variant="cta">{actions.book}</T>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
