import { Pressable, Text, View } from 'react-native';

import type { Colorway } from '../data/detail';
import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The colourway swatches.
 *
 * 28dp circles, and the selected one carries a white check rather than a ring —
 * the export's `outline-offset-2` ring only appears once its own JS runs, and
 * the reference, which is the first paint, shows the check alone.
 */
export function ColorPicker({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: readonly Colorway[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View style={{ gap: SP.sm }}>
      <Text style={{ ...TYPE.labelLg, color: fa.onSurface }}>{label}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, paddingTop: 4 }}>
        {items.map((item) => {
          const on = item.key === selected;
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item.key)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: on }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: R.full,
                  backgroundColor: item.swatch,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...ELEV.card,
                }}
              >
                {on ? <Symbol name="check" size={14} color={fa.onPrimary} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
