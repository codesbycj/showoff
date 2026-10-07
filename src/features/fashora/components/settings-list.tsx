import { Fragment } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { SettingRow } from '../data/profile';
import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The account rows, as one card with hairlines between them.
 *
 * The dividers are inset by the card's own 16dp padding rather than running
 * edge to edge, so they stop short of the rounded corners — which is why the
 * card does not need to clip them, and why the clip and the shadow never have
 * to share a View here.
 *
 * Only the fit-profile row's value runs in the accent; the rest are muted. That
 * travels as a flag on the data rather than as a branch in the markup.
 */
export function SettingsList({
  items,
  onSelect,
}: {
  items: readonly SettingRow[];
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderRadius: R.lg,
        ...ELEV.card,
      }}
    >
      {items.map((item, i) => (
        <Fragment key={item.key}>
          {i > 0 ? (
            <View
              style={{ height: 1, backgroundColor: fa.surfaceContainer, marginHorizontal: SP.md }}
            />
          ) : null}

          <Pressable
            onPress={() => onSelect?.(item.key)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <View
              style={{
                paddingHorizontal: SP.md,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SP.gutterMobile,
                  flexShrink: 1,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: R.full,
                    backgroundColor: fa.surfaceContainerLow,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Symbol name={item.icon} size={20} />
                </View>
                <Text numberOfLines={1} style={{ ...TYPE.labelLg, color: fa.onSurface }}>
                  {item.label}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
                {item.value ? (
                  <Text
                    style={{
                      ...TYPE.bodySm,
                      ...(item.accent
                        ? { fontFamily: FONT.semibold, color: fa.primaryContainer }
                        : { color: fa.secondary }),
                    }}
                  >
                    {item.value}
                  </Text>
                ) : null}
                <Symbol name="chevronRight" size={20} color={fa.secondary} />
              </View>
            </View>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
}
