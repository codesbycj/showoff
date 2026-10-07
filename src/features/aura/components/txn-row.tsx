import {
  ArrowLeftRight,
  Coffee,
  House,
  Laptop,
  ReceiptText,
  ShoppingBag,
  Wifi,
} from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { TYPE, au } from '../theme';

/**
 * One line of the ledger.
 *
 * Money in is drawn in the brand purple and money out in the ordinary ink, which
 * is the only thing separating them — the sign is easy to miss at this size, so
 * colour carries it.
 *
 * `source` is optional because the same row serves Home, where every expense
 * comes off the one card and naming it would be noise, and Wallet, where it is
 * the point.
 */
const LOOK = {
  home: { Icon: House, bg: au.primaryFixed, ink: au.primary },
  wifi: { Icon: Wifi, bg: au.secondaryFixed, ink: au.secondary },
  bag: { Icon: ShoppingBag, bg: au.surfaceHighest, ink: au.onSurface },
  receipt: { Icon: ReceiptText, bg: au.errorContainer, ink: au.onErrorContainer },
  device: { Icon: Laptop, bg: au.surfaceHigh, ink: au.onSurface },
  transfer: { Icon: ArrowLeftRight, bg: au.primaryFixed, ink: au.primary },
  coffee: { Icon: Coffee, bg: au.secondaryFixed, ink: au.secondary },
} as const;

export function TxnRow({
  name,
  when,
  amount,
  source,
  icon,
  credit,
  onPress,
}: {
  name: string;
  when: string;
  amount: string;
  source?: string;
  icon: string;
  credit?: boolean;
  onPress?: () => void;
}) {
  const look = LOOK[icon as keyof typeof LOOK] ?? LOOK.bag;
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: look.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <look.Icon size={19} color={look.ink} strokeWidth={2.2} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[TYPE.labelLg, { color: au.onSurface }]} numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}
            numberOfLines={1}
          >
            {when}
          </Text>
        </View>

        <View style={{ marginLeft: 10, alignItems: 'flex-end' }}>
          <Text style={[TYPE.headlineSm, { color: credit ? au.primaryBright : au.onSurface }]}>
            {amount}
          </Text>
          {source ? (
            <Text style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}>
              {source}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
