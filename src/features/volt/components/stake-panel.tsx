import { Pressable, Text, View } from 'react-native';

import { type Chip, type SummaryRow } from '../data/slip';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The stake calculator: amount, quick chips, the odds breakdown and the CTA.
 *
 * The amount is a `Text`, not a `TextInput`. The export uses a real
 * `<input type="number">` and recomputes the payout from it, but a live input
 * would raise the keyboard over the panel mid-take; the figure is shown at the
 * value the reference carries, and the chips below select rather than add.
 *
 * "MAX" is the only chip that is not an increment, and the export styles it
 * differently for that reason — a raised fill with lime type instead of a lime
 * fill with dark type. So the active state and the MAX state are two different
 * looks, and both are branched here.
 */
export function StakePanel({
  title,
  balanceLabel,
  balance,
  amount,
  chips,
  selectedChip,
  summary,
  payout,
  cta,
  onChip,
  onPlace,
}: {
  title: string;
  balanceLabel: string;
  balance: string;
  amount: string;
  chips: readonly Chip[];
  selectedChip: string;
  summary: readonly SummaryRow[];
  payout: { label: string; value: string };
  cta: string;
  onChip?: (key: string) => void;
  onPlace?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.xl,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...TYPE.labelMd, letterSpacing: 0.8, color: vt.secondary }}>
          {title.toUpperCase()}
        </Text>
        <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>
          {balanceLabel}{' '}
          <Text style={{ ...TYPE.bodySm, fontFamily: TYPE.bodyLg.fontFamily, color: vt.onSurface }}>
            {balance}
          </Text>
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerLowest,
          paddingHorizontal: SP.md,
          paddingVertical: SP.md,
        }}
      >
        <Text style={{ ...TYPE.headlineMd, marginRight: SP.xs, color: vt.secondary }}>$</Text>
        <Text style={{ ...TYPE.headlineMd, flex: 1, letterSpacing: 0.5, color: vt.primary }}>
          {amount}
        </Text>
        <Symbol name="backspace" size={18} color={vt.secondary} />
      </View>

      <View style={{ flexDirection: 'row', gap: SP.xs }}>
        {chips.map((c) => {
          const isMax = c.key === 'max';
          const on = c.key === selectedChip;
          return (
            <Pressable key={c.key} style={{ flex: 1 }} onPress={() => onChip?.(c.key)}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: SP.sm,
                  borderRadius: R.full,
                  backgroundColor: isMax
                    ? vt.surfaceContainerHighest
                    : on
                      ? vt.primaryFixed
                      : vt.surfaceContainer,
                  shadowColor: vt.primaryFixed,
                  shadowOpacity: on && !isMax ? 0.3 : 0,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...TYPE.labelSm,
                    color: isMax ? vt.primaryFixed : on ? vt.onPrimaryFixed : vt.onSurface,
                  }}
                >
                  {c.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          gap: SP.sm,
          paddingTop: SP.sm,
          borderTopWidth: 1,
          borderTopColor: alpha(vt.surfaceContainerHigh, 0.6),
        }}
      >
        {summary.map((row) => (
          <View
            key={row.key}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
              <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{row.label}</Text>
              {row.accent ? <FilledIcon name="bolt" size={14} color={vt.primaryFixed} /> : null}
            </View>
            <Text style={{ ...TYPE.labelSm, color: row.accent ? vt.primaryFixed : vt.onSurface }}>
              {row.value}
            </Text>
          </View>
        ))}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: SP.md,
            marginTop: SP.xs,
            borderTopWidth: 1,
            borderTopColor: alpha(vt.surfaceContainerHigh, 0.6),
          }}
        >
          <Text style={{ ...TYPE.labelLg, letterSpacing: 0.8, color: vt.onSurface }}>
            {payout.label.toUpperCase()}
          </Text>
          <Text style={{ ...TYPE.headlineXlMobile, color: vt.primaryFixed }}>{payout.value}</Text>
        </View>
      </View>

      <Pressable onPress={onPlace}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SP.sm,
            paddingVertical: SP.gutter,
            borderRadius: R.full,
            backgroundColor: vt.primaryFixed,
            shadowColor: vt.primaryFixed,
            shadowOpacity: 0.5,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
          }}
        >
          <FilledIcon name="verified" size={24} color={vt.onPrimaryFixed} />
          <Text style={{ ...TYPE.headlineMd, color: vt.onPrimaryFixed }}>{cta}</Text>
        </View>
      </Pressable>
    </View>
  );
}
