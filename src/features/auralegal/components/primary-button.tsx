import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { FilledIcon } from './filled-icon';

/**
 * The full-width lavender CTA.
 *
 * The design system specifies it exactly: a `9999px` pill filled with
 * `primary`, `on-primary` text at `label-lg`, and a glow rather than a drop
 * shadow — `0 8px 24px rgba(196,181,253,0.35)`, which is the *primary
 * container* colour at 35%, not black. That tinted shadow is what makes the
 * button read as lit from within on this canvas, so it is carried rather than
 * flattened to a neutral elevation.
 */
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SP.sm,
          paddingVertical: SP.md,
          paddingHorizontal: SP.lg,
          borderRadius: R.full,
          backgroundColor: al.primary,
          shadowColor: al.primaryContainer,
          shadowOpacity: 0.35,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      >
        <FilledIcon name="calendarMonth" size={20} color={al.onPrimary} />
        <Text style={{ ...TYPE.labelLg, color: al.onPrimary }}>{label}</Text>
      </View>
    </Pressable>
  );
}
