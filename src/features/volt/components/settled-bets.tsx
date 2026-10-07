import { Text, View } from 'react-native';

import { type SettledBet } from '../data/slip';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The settled-bets drawer at the foot of the slip.
 *
 * Both rows in the reference are wins, so the won state is the only one the
 * export draws. Rather than invent a lost state that no reference shows, the
 * row takes its colours from the data's own `amount` and `result` strings and
 * nothing branches — a lost bet would need a design decision this export does
 * not supply.
 */
export function SettledBets({
  title,
  window,
  bets,
}: {
  title: string;
  window: string;
  bets: readonly SettledBet[];
}) {
  return (
    <View
      style={{
        borderRadius: R.xl,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
          <Symbol name="history" size={20} color={vt.secondary} />
          <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{title}</Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainer,
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{window}</Text>
        </View>
      </View>

      <View style={{ gap: SP.md }}>
        {bets.map((b) => (
          <View
            key={b.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: R.lg,
              backgroundColor: vt.surfaceContainer,
              padding: SP.md,
              gap: SP.sm,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: R.full,
                  backgroundColor: alpha(vt.primaryFixed, 0.2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FilledIcon name="checkCircle" size={18} color={vt.primaryFixed} />
              </View>

              <View style={{ flexShrink: 1, gap: 2 }}>
                <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: vt.onSurface }}>
                  {b.fixture}
                </Text>
                <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
                  {b.detail}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ ...TYPE.labelMd, color: vt.primaryFixed }}>{b.amount}</Text>
              <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{b.result.toUpperCase()}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
