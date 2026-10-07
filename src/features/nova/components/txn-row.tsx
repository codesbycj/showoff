import { Pressable, Text, View } from 'react-native';

import { DeltaPill } from './bits';
import { CoinMark } from './coin-mark';
import { Icon, type IconName } from './icon';
import type { Txn } from '../data/wallet';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * One row on the wallet's transaction list.
 *
 * Three groups: the coin and its amount, a delta pill, then the fiat value and
 * a timestamp. The middle group is what separates this from the market row —
 * it sits between the two rather than under either, so the row needs
 * `space-between` across three children and not two.
 */
export function TxnRow({ txn, onPress }: { txn: Txn; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: nv.surface,
            borderRadius: R.base,
            padding: 12,
            borderWidth: 1,
            borderColor: nv.border,
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <CoinMark coin={txn.coin} size={40} radius={20} />

          <View>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 15,
                lineHeight: 19,
                letterSpacing: -0.15,
                color: nv.ink,
              }}
            >
              {txn.amount} {txn.coin}
            </Text>
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 12, lineHeight: 16, color: nv.subtle }}
            >
              {txn.name}
            </Text>
          </View>
        </View>

        <DeltaPill value={txn.delta} up={txn.up} />

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 15,
              lineHeight: 19,
              letterSpacing: -0.15,
              color: nv.ink,
            }}
          >
            {txn.value}
          </Text>
          <Text style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: nv.subtle }}>
            {txn.time}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The wallet's four square action buttons.
 *
 * The first is solid ink and the rest are white, which is the reference's way
 * of marking the primary action without a label — so `primary` is the first
 * item's flag rather than a colour the caller picks.
 */
export function ActionGrid({
  actions,
  onPress,
}: {
  actions: readonly { key: string; icon: IconName; label: string }[];
  onPress?: (key: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 14 }}>
      {actions.map((a, i) => {
        const primary = i === 0;

        return (
          <Pressable
            key={a.key}
            style={{ flex: 1 }}
            onPress={() => onPress?.(a.key)}
            accessibilityRole="button"
            accessibilityLabel={a.label}
          >
            <View
              style={[
                {
                  height: 60,
                  borderRadius: R.base,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: primary ? nv.ink : nv.surface,
                },
                !primary && { borderWidth: 1, borderColor: nv.border },
                primary ? LEVEL.card : LEVEL.sm,
              ]}
            >
              <Icon
                name={a.icon}
                size={a.icon === 'deposit' ? 24 : 20}
                color={primary ? '#ffffff' : '#374151'}
                strokeWidth={2.4}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
