import { Pressable, ScrollView, Text, View } from 'react-native';

import { type League } from '../data/scores';
import { R, SP, TYPE, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * The league filter rail.
 *
 * Unlike the sport chips on explore, the active one here takes a solid lime
 * *fill* with dark text rather than a glow over a raised surface — the design
 * system's "active filter pill: solid fill with deep dark charcoal text,
 * immediate visual priority". The two rails are deliberately different states
 * of the same idea and are not shared.
 */
export function LeagueChips({
  leagues,
  selected,
  onSelect,
}: {
  leagues: readonly League[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SP.margin }}
      contentContainerStyle={{
        paddingHorizontal: SP.margin,
        gap: SP.sm,
        alignItems: 'center',
        paddingVertical: 2,
      }}
    >
      {leagues.map((l) => {
        const on = l.key === selected;
        return (
          <Pressable key={l.key} onPress={() => onSelect?.(l.key)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SP.xs,
                paddingHorizontal: SP.md,
                paddingVertical: SP.sm,
                borderRadius: R.full,
                backgroundColor: on ? vt.primaryFixed : vt.surfaceContainerHigh,
                shadowColor: vt.primaryFixed,
                shadowOpacity: on ? 0.3 : 0,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <Symbol name={l.icon} size={16} color={on ? vt.onPrimaryFixed : vt.secondary} />
              <Text style={{ ...TYPE.labelMd, color: on ? vt.onPrimaryFixed : vt.secondary }}>
                {l.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
