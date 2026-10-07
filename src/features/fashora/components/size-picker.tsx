import { Pressable, Text, View } from 'react-native';

import type { Size } from '../data/detail';
import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

/**
 * The size tokens, and the size-guide link above them.
 *
 * Five 28dp circles with 6dp between them come to 164dp, which fits the 168dp
 * half-column with four to spare — so the row is laid out rather than scrolled,
 * even though the export wraps it in an `overflow-x-auto`. Nothing in the
 * reference runs off the edge here, which is the test for whether a row is
 * really a scroller.
 */
export function SizePicker({
  label,
  guide,
  items,
  selected,
  onSelect,
  onGuide,
}: {
  label: string;
  guide: string;
  items: readonly Size[];
  selected: string;
  onSelect?: (key: string) => void;
  onGuide?: () => void;
}) {
  return (
    <View style={{ gap: SP.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...TYPE.labelLg, color: fa.onSurface }}>{label}</Text>
        <Pressable onPress={onGuide} accessibilityRole="button">
          <Text style={{ ...TYPE.labelSm, color: fa.tertiary, textDecorationLine: 'underline' }}>
            {guide}
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 4 }}>
        {items.map((item) => {
          const on = item.key === selected;
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: R.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? fa.primaryContainer : fa.surfaceContainer,
                  // `shadow-sm shadow-primary-container/40`: a tint on the
                  // small shadow, not the dock's 20dp halo.
                  ...(on
                    ? { ...ELEV.card, shadowColor: fa.primaryContainer, shadowOpacity: 0.4 }
                    : null),
                }}
              >
                <Text
                  style={{
                    ...TYPE.labelSm,
                    fontFamily: on ? FONT.bold : TYPE.labelSm.fontFamily,
                    color: on ? fa.onPrimary : fa.onSurfaceVariant,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
