import { ArrowDownLeft, ArrowUpRight, CreditCard, MoreHorizontal } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * The four quick actions, grouped in one card.
 *
 * Each action carries its own tint rather than inheriting one, because the
 * design uses colour to separate money leaving from money arriving — purple for
 * send, amber for request — and a single accent would lose that.
 *
 * Columns are `flex: 1` so the four circles land on even centres whatever their
 * labels measure.
 */
const LOOK = {
  send: { Icon: ArrowUpRight, bg: au.primaryFixed, ink: au.primary },
  request: { Icon: ArrowDownLeft, bg: au.secondaryFixed, ink: au.secondary },
  topup: { Icon: CreditCard, bg: au.surfaceHighest, ink: au.onSurface },
  more: { Icon: MoreHorizontal, bg: au.surfaceHigh, ink: au.onSurfaceVariant },
} as const;

export function ActionRow({
  actions,
  onSelect,
}: {
  actions: readonly { key: string; label: string; icon: string }[];
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        backgroundColor: au.surfaceLowest,
        borderRadius: R.lg,
        paddingVertical: SP.md + 2,
        paddingHorizontal: SP.sm,
        flexDirection: 'row',
      }}
    >
      {actions.map((a) => {
        const look = LOOK[a.icon as keyof typeof LOOK] ?? LOOK.more;
        return (
          <Pressable key={a.key} style={{ flex: 1 }} onPress={() => onSelect?.(a.key)}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: look.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <look.Icon size={22} color={look.ink} strokeWidth={2.4} />
              </View>
              <Text style={[TYPE.labelLg, { marginTop: 8, color: au.onSurface }]}>{a.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
