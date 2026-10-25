import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Glyph } from '@/features/rovaseat/components/glyph';
import { SeatMap } from '@/features/rovaseat/components/seat-map';
import { T } from '@/features/rovaseat/components/text';
import { chosen, copy, total } from '@/features/rovaseat/data/search';
import {
  BUTTON_HEIGHT,
  BUTTON_TOP,
  CARD_PAD,
  DISPLAY_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  MAP_TOP,
  MARGIN,
  SUMMARY_HEIGHT,
  SUMMARY_TOP,
} from '@/features/rovaseat/layout';
import { radius, rv, type } from '@/features/rovaseat/theme';
import { useInsets } from '@/features/rovaseat/use-insets';

/**
 * Rova — the seat map.
 *
 * Assembly only: the way back, what the screen is, the coach from above, what
 * you have taken, and the one thing it asks.
 *
 * The summary is read out of the map rather than written beside it: the
 * reference names two seats that are not marked on its own plan, and prices a
 * business-class booking at "Free".
 */
export default function RovaseatScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: rv.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      <View style={{ flexDirection: 'row', alignItems: 'center', height: HEADER_SIZE }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              backgroundColor: rv.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={18} tint={rv.ink} />
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 12 }}>
          <Glyph name="pin" size={17} tint={rv.green} />
          <T variant="brand" color={rv.ink} style={{ marginLeft: 6, height: type.brand.line }}>
            {copy.brand}
          </T>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              backgroundColor: rv.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="bell" size={18} tint={rv.ink} />
          </View>
        </Pressable>
      </View>

      <T
        variant="display"
        color={rv.ink}
        style={{ marginTop: DISPLAY_TOP, height: type.display.line }}
      >
        {copy.title}
      </T>

      <View style={{ flex: 1, marginTop: MAP_TOP }}>
        <SeatMap />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: SUMMARY_TOP }}>
        {[
          { id: 'seats', label: copy.selected, value: chosen, mark: 'seat' as const },
          { id: 'price', label: copy.price, value: total, mark: 'person' as const },
        ].map((s) => (
          <View key={s.id} style={{ flex: 1 }}>
            <T variant="fieldLabel" color={rv.muted} style={{ height: type.fieldLabel.line }}>
              {s.label}
            </T>
            <View
              style={{
                height: SUMMARY_HEIGHT - 22,
                marginTop: 6,
                paddingHorizontal: CARD_PAD - 4,
                borderRadius: radius.field,
                backgroundColor: rv.card,
                borderWidth: 1,
                borderColor: rv.cardEdge,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Glyph name={s.mark} size={16} tint={rv.green} />
              <T variant="chip" color={rv.ink} style={{ marginLeft: 8, height: type.chip.line }}>
                {s.value}
              </T>
            </View>
          </View>
        ))}
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={copy.action}>
        <View
          style={{
            height: BUTTON_HEIGHT,
            marginTop: BUTTON_TOP,
            borderRadius: radius.pill,
            backgroundColor: rv.green,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="action" color={rv.onGreen} style={{ height: type.action.line }}>
            {copy.action}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
