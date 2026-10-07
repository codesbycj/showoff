import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The balance card.
 *
 * Its sheen is a diagonal gradient — lime at 10% in the top-left falling to the
 * deepest surface at 60% in the bottom-right — which is a real `LinearGradient`
 * laid over the fill rather than a baked image, since the card beneath is flat.
 *
 * The two action pills are deliberately unequal: Deposit is a neutral raised
 * pill and Instant Cashout is lime with a glow. The design system reserves lime
 * for "key betting interactions", and moving money out is the one this screen
 * is built around.
 */
export function BalanceCard({
  label,
  currency,
  total,
  audited,
  withdrawableLabel,
  withdrawable,
  bonusLabel,
  bonus,
  deposit,
  cashout,
  onDeposit,
  onCashout,
}: {
  label: string;
  currency: string;
  total: string;
  audited: string;
  withdrawableLabel: string;
  withdrawable: string;
  bonusLabel: string;
  bonus: string;
  deposit: string;
  cashout: string;
  onDeposit?: () => void;
  onCashout?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        overflow: 'hidden',
        backgroundColor: vt.surfaceContainerHigh,
      }}
    >
      <LinearGradient
        colors={[alpha(vt.primaryFixed, 0.1), 'transparent', alpha(vt.surfaceContainerLowest, 0.6)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        pointerEvents="none"
      />

      <View style={{ padding: SP.lg, gap: SP.lg }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
            <Symbol name="accountBalanceWallet" size={18} color={vt.primaryFixed} />
            <Text
              numberOfLines={1}
              style={{ ...TYPE.labelMd, letterSpacing: 0.8, color: vt.secondary }}
            >
              {label.toUpperCase()}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: SP.sm,
              paddingVertical: 2,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerLowest,
            }}
          >
            <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{currency}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: SP.sm }}>
          <Text style={{ ...TYPE.headlineXlMobile, color: vt.primary }}>{total}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Symbol name="formatImageLeft" size={12} color={vt.primaryFixed} />
            <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{audited}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderRadius: R.DEFAULT,
            backgroundColor: vt.surfaceContainerLowest,
            padding: SP.md,
          }}
        >
          <View style={{ flex: 1, paddingLeft: SP.xs, gap: 2 }}>
            <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{withdrawableLabel}</Text>
            <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{withdrawable}</Text>
          </View>

          <View
            style={{
              flex: 1,
              paddingLeft: SP.md,
              borderLeftWidth: 1,
              borderLeftColor: vt.surfaceContainerHighest,
              gap: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
              <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{bonusLabel}</Text>
              <Symbol name="info" size={12} color={vt.onSurfaceVariant} />
            </View>
            <Text style={{ ...TYPE.headlineMd, color: vt.onSurfaceVariant }}>{bonus}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: SP.md }}>
          <Pressable style={{ flex: 1 }} onPress={onDeposit}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SP.sm,
                paddingVertical: 14,
                borderRadius: R.full,
                backgroundColor: vt.surfaceContainerHighest,
              }}
            >
              <Symbol name="addCircle" size={18} color={vt.primary} />
              <Text style={{ ...TYPE.labelLg, color: vt.primary }}>{deposit}</Text>
            </View>
          </Pressable>

          <Pressable style={{ flex: 1 }} onPress={onCashout}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SP.sm,
                paddingVertical: 14,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
                shadowColor: vt.primaryFixed,
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <FilledIcon name="bolt" size={18} color={vt.onPrimaryFixed} />
              <Text numberOfLines={1} style={{ ...TYPE.labelLg, color: vt.onPrimaryFixed }}>
                {cashout}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
