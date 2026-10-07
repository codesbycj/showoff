import {
  Bell,
  ChevronRight,
  CircleHelp,
  Coins,
  Landmark,
  ShieldCheck,
  UserRound,
} from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { R, TYPE, au } from '../theme';
import { Toggle } from './toggle';

/**
 * One settings line.
 *
 * The trailing slot is decided here rather than by the caller, because the three
 * possibilities — a verified badge, a switch, or a chevron — are mutually
 * exclusive and the row has to know which it is to avoid drawing a chevron next
 * to a switch. A row with a switch is not a row you can tap through.
 */
const ICONS = {
  id: UserRound,
  bank: Landmark,
  shield: ShieldCheck,
  bell: Bell,
  coin: Coins,
  help: CircleHelp,
} as const;

export function SettingsRow({
  name,
  note,
  icon,
  badge,
  toggle,
  dot,
  first,
  onPress,
}: {
  name: string;
  note: string;
  icon: string;
  badge?: string;
  toggle?: boolean;
  dot?: boolean;
  first?: boolean;
  onPress?: () => void;
}) {
  const Icon = ICONS[icon as keyof typeof ICONS] ?? UserRound;
  return (
    <Pressable onPress={toggle ? undefined : onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          borderTopWidth: first ? 0 : 1,
          borderTopColor: au.surfaceHigh,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: au.surfaceLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={18} color={au.primary} strokeWidth={2.2} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[TYPE.labelLg, { color: au.onSurface }]} numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}
            numberOfLines={1}
          >
            {note}
          </Text>
        </View>

        {badge ? (
          <View
            style={{
              backgroundColor: au.surfaceLow,
              borderRadius: R.full,
              paddingHorizontal: 9,
              paddingVertical: 4,
              marginRight: 6,
            }}
          >
            <Text style={[TYPE.labelSm, { color: au.primary }]}>{badge}</Text>
          </View>
        ) : null}

        {dot ? (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              marginRight: 8,
              backgroundColor: au.secondaryBright,
            }}
          />
        ) : null}

        {toggle ? <Toggle on /> : <ChevronRight size={18} color={au.outline} strokeWidth={2.4} />}
      </View>
    </Pressable>
  );
}
