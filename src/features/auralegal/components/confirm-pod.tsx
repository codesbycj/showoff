import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { Symbol } from './symbol';

/**
 * The circular confirm button at the foot of the scheduling stage, with its
 * caption beneath.
 *
 * It carries a lavender glow rather than a black shadow — the same trick the
 * primary CTA uses, and the design system's stated alternative to "harsh drop
 * shadows".
 */
export function ConfirmPod({ caption, onPress }: { caption: string; onPress?: () => void }) {
  return (
    <View style={{ alignItems: 'center', marginTop: SP.xs }}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={caption}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: R.full,
            backgroundColor: al.primaryContainer,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: al.primaryContainer,
            shadowOpacity: 0.3,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
        >
          <Symbol name="arrowForward" size={26} color={al.onPrimaryContainer} />
        </View>
      </Pressable>

      <Text
        style={{
          ...TYPE.labelSm,
          marginTop: SP.sm,
          letterSpacing: 0.35,
          color: al.onSurfaceVariant,
        }}
      >
        {caption}
      </Text>
    </View>
  );
}
