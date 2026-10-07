import { Pressable, Text, View } from 'react-native';

import type { Payment } from '../data/bag';
import { ELEV, FONT, R, SP, TYPE, alpha, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * Three payment tiles, one selected.
 *
 * The selection is a `ring-2`, which CSS draws outside the box; React Native
 * has no outline, so the ring is a View inset by -2 and the tile keeps its own
 * size. It is `primary` — the burnt orange — rather than the vivid fill, which
 * is why the selected tile reads as outlined rather than as lit up.
 *
 * The section label is `uppercase tracking-wider text-[11px]` over `label-md`'s
 * family, so it takes 11dp and 0.55 tracking rather than `labelMd`'s 13 and 0.
 */
export function PaymentOptions({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: readonly Payment[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View style={{ gap: SP.sm }}>
      <Text
        style={{
          fontFamily: FONT.semibold,
          fontSize: 11,
          lineHeight: 18,
          letterSpacing: 0.55,
          color: fa.secondary,
          paddingHorizontal: SP.xs,
        }}
      >
        {label.toUpperCase()}
      </Text>

      <View style={{ flexDirection: 'row', gap: SP.sm }}>
        {items.map((item) => {
          const on = item.key === selected;
          return (
            <Pressable
              key={item.key}
              style={{ flex: 1 }}
              onPress={() => onSelect?.(item.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
            >
              <View
                style={{
                  backgroundColor: on
                    ? alpha(fa.primaryContainer, 0.05)
                    : fa.surfaceContainerLowest,
                  borderRadius: R.DEFAULT,
                  padding: SP.gutterMobile,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SP.xs,
                  ...ELEV.card,
                  shadowOpacity: 0.04,
                  shadowRadius: 2,
                }}
              >
                <Symbol
                  name={item.icon}
                  size={22}
                  color={on ? fa.onSurface : fa.secondary}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    ...TYPE.labelSm,
                    fontFamily: on ? FONT.bold : TYPE.labelSm.fontFamily,
                    color: on ? fa.onSurface : fa.secondary,
                  }}
                >
                  {item.label}
                </Text>

                {on ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: R.DEFAULT + 2,
                      borderWidth: 2,
                      borderColor: fa.primary,
                    }}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
