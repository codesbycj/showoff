import { House, ShoppingBag, UtensilsCrossed, Zap } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { TYPE, au } from '../theme';

const LOOK = {
  home: { Icon: House, bg: au.primaryFixed, ink: au.primary, bar: au.primary },
  food: {
    Icon: UtensilsCrossed,
    bg: au.secondaryFixed,
    ink: au.secondary,
    bar: au.secondaryBright,
  },
  bolt: { Icon: Zap, bg: au.surfaceHighest, ink: au.primaryBright, bar: au.primaryBright },
  bag: { Icon: ShoppingBag, bg: au.surfaceHigh, ink: au.onSurfaceVariant, bar: au.outline },
} as const;

export function CategoryRow({
  name,
  note,
  amount,
  pct,
  icon,
}: {
  name: string;
  note: string;
  amount: string;
  pct: number;
  icon: string;
}) {
  const look = LOOK[icon as keyof typeof LOOK] ?? LOOK.bag;
  return (
    <View style={{ paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: look.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <look.Icon size={18} color={look.ink} strokeWidth={2.2} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[TYPE.labelLg, { color: au.onSurface }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}>{note}</Text>
        </View>

        <Text style={[TYPE.headlineSm, { marginLeft: 10, color: au.onSurface }]}>{amount}</Text>
      </View>

      <View
        style={{
          height: 5,
          borderRadius: 3,
          marginTop: 10,
          backgroundColor: au.surfaceHigh,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${Math.min(Math.max(pct, 0), 1) * 100}%`,
            height: '100%',
            borderRadius: 3,
            backgroundColor: look.bar,
          }}
        />
      </View>
    </View>
  );
}
