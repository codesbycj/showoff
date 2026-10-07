import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al, alpha } from '../theme';

import { FilledIcon } from './filled-icon';

/**
 * The "Instant 15-Min Briefing" banner.
 *
 * Its fill is a left-to-right gradient between two neighbouring surface tones —
 * `surface-container` to `surface-container-high`, four points apart. It is
 * subtle enough to look like a flat card, and it is drawn as a real gradient
 * rather than flattened to one of the two because the design system calls this
 * out as its elevation idiom: "depth avoids harsh drop shadows, relying on
 * layered surface tones".
 */
export function BriefingBanner({
  title,
  subtitle,
  action,
  onPress,
}: {
  title: string;
  subtitle: string;
  action: string;
  onPress?: () => void;
}) {
  return (
    <LinearGradient
      colors={[al.surfaceContainer, al.surfaceContainerHigh]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SP.md,
        borderRadius: SP.lg,
        padding: SP.md,
        marginBottom: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flexShrink: 1 }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: SP.md,
            backgroundColor: alpha(al.secondary, 0.15),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FilledIcon name="calendarMonth" size={24} color={al.secondary} />
        </View>

        <View style={{ flexShrink: 1 }}>
          <Text numberOfLines={1} style={{ ...TYPE.titleMd, color: al.onSurface }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: al.onSurfaceVariant }}>
            {subtitle}
          </Text>
        </View>
      </View>

      <Pressable onPress={onPress}>
        <View
          style={{
            paddingHorizontal: SP.md,
            paddingVertical: 10,
            borderRadius: R.full,
            backgroundColor: al.primary,
          }}
        >
          <Text style={{ ...TYPE.labelMd, color: al.onPrimary }}>{action}</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
}
