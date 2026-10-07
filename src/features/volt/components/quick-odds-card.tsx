import { Pressable, Text, View } from 'react-native';

import { type Odd } from '../data/home';
import { R, SP, TYPE, alpha, vt } from '../theme';

/**
 * The three-up odds selector.
 *
 * Exactly one chip is selected at a time, and the selection lives in the screen
 * — this takes `selected` and `onSelect` rather than owning state, so the screen
 * stays the only place that knows what has been picked.
 *
 * The "Lock Bet" button is filled with `primary`, which in this system is plain
 * white rather than the lime. That is not a mistake in the spec: lime is
 * "reserved strictly for active states", and the button is an action, not a
 * state, so it takes the neutral. The selected odds chip is what goes lime.
 */
export function QuickOddsCard({
  title,
  sync,
  odds,
  selected,
  stakeLabel,
  stake,
  cta,
  onSelect,
  onLock,
}: {
  title: string;
  sync: string;
  odds: readonly Odd[];
  selected: string;
  stakeLabel: string;
  stake: string;
  cta: string;
  onSelect?: (key: string) => void;
  onLock?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.gutter,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <View
            style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: vt.primaryFixed }}
          />
          <Text style={{ ...TYPE.labelLg, color: vt.primary }}>{title}</Text>
        </View>
        <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
          {sync.toUpperCase()}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {odds.map((o) => {
          const on = o.key === selected;
          return (
            <Pressable key={o.key} style={{ flex: 1 }} onPress={() => onSelect?.(o.key)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: SP.md,
                  paddingHorizontal: SP.sm,
                  borderRadius: R.DEFAULT,
                  backgroundColor: on ? vt.primaryFixed : vt.surfaceContainer,
                  shadowColor: vt.primaryFixed,
                  shadowOpacity: on ? 0.3 : 0,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                <Text
                  style={{
                    ...TYPE.labelSm,
                    color: on ? alpha(vt.onPrimaryFixed, 0.8) : vt.secondary,
                  }}
                >
                  {o.label.toUpperCase()}
                </Text>
                <Text
                  style={{
                    ...TYPE.labelLg,
                    marginTop: SP.xs,
                    color: on ? vt.onPrimaryFixed : vt.primary,
                  }}
                >
                  {o.value}
                </Text>
                <Text
                  style={{
                    ...TYPE.labelSm,
                    fontSize: 10,
                    marginTop: 2,
                    color: on ? vt.onPrimaryFixed : vt.primaryFixed,
                  }}
                >
                  {o.multiplier}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{stakeLabel}</Text>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainer,
            }}
          >
            <Text style={{ ...TYPE.labelMd, color: vt.primary }}>{stake}</Text>
          </View>
        </View>

        <Pressable onPress={onLock}>
          <View
            style={{
              paddingHorizontal: SP.lg,
              paddingVertical: SP.sm,
              borderRadius: R.full,
              backgroundColor: vt.primary,
            }}
          >
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.onSecondary }}>
              {cta.toUpperCase()}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
