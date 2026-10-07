import { Pressable, Text, View } from 'react-native';

import { type Mode } from '../data/slip';
import { R, SP, TYPE, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The slip's title row and its three-way mode selector.
 *
 * The selector is a segmented control inside a single pill rather than three
 * separate chips — a `grid-cols-3` on a `rounded-full` track — so the three
 * share one background and the active one is a pill inside it. Equal thirds
 * come from `flex: 1` on each, which is what keeps the track from reflowing as
 * the labels change length.
 */
export function SlipHeader({
  title,
  count,
  clear,
  modes,
  selected,
  onSelect,
  onClear,
}: {
  title: string;
  count: string;
  clear: string;
  modes: readonly Mode[];
  selected: string;
  onSelect?: (key: string) => void;
  onClear?: () => void;
}) {
  return (
    <View style={{ gap: SP.md, paddingTop: SP.xs }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flexShrink: 1 }}>
          <FilledIcon name="confirmationNumber" size={20} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>
            {title} <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{count}</Text>
          </Text>
        </View>

        <Pressable onPress={onClear}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.xs,
              paddingHorizontal: SP.md,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainer,
            }}
          >
            <Symbol name="deleteSweep" size={16} color={vt.secondary} />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
              {clear.toUpperCase()}
            </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: SP.xs,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerLow,
        }}
      >
        {modes.map((m) => {
          const on = m.key === selected;
          return (
            <Pressable key={m.key} style={{ flex: 1 }} onPress={() => onSelect?.(m.key)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SP.xs,
                  paddingVertical: SP.sm,
                  borderRadius: R.full,
                  backgroundColor: on ? vt.primaryFixed : 'transparent',
                  shadowColor: vt.primaryFixed,
                  shadowOpacity: on ? 0.35 : 0,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...TYPE.labelMd, color: on ? vt.onPrimaryFixed : vt.secondary }}
                >
                  {m.label}
                </Text>
                {on ? (
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: R.full,
                      backgroundColor: vt.onPrimaryFixed,
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
