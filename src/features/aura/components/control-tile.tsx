import { Eye, Gauge, Settings, Snowflake } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * One of the card's controls.
 *
 * The tile is a rounded square rather than a circle — these sit in a row of four
 * under the card and read as a control panel, where the home screen's circles
 * read as verbs. Same size, different shape, and that shape is the only thing
 * telling them apart.
 */
const ICONS = {
  freeze: Snowflake,
  cvv: Eye,
  limits: Gauge,
  settings: Settings,
} as const;

export function ControlTile({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress?: () => void;
}) {
  const Icon = ICONS[icon as keyof typeof ICONS] ?? Settings;
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <View
        style={{
          backgroundColor: au.surfaceLowest,
          borderRadius: R.md,
          paddingVertical: SP.md,
          alignItems: 'center',
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
          <Icon size={19} color={au.primary} strokeWidth={2.2} />
        </View>
        <Text style={[TYPE.labelMd, { marginTop: 8, color: au.onSurface }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
