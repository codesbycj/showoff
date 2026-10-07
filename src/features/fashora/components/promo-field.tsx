import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The promo code field and its Apply button.
 *
 * A `Text` showing the pre-filled code rather than a live `TextInput`: the
 * export ships the input with `value="FASHORA20"` already set, nothing in the
 * recording types into it, and a focused field raises a keyboard and a caret
 * the reference frame does not have.
 *
 * The export's `shadow-inner` has no React Native equivalent and is left out.
 * An inset shadow at Tailwind's default strength is invisible against a fill
 * this light, and the reference shows no trace of it to match.
 */
export function PromoField({
  code,
  apply,
  onApply,
}: {
  code: string;
  apply: string;
  onApply?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: fa.surfaceContainerLow,
        borderRadius: R.full,
        padding: 6,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.sm,
          paddingLeft: SP.gutterMobile,
          flex: 1,
        }}
      >
        <Symbol name="localActivity" size={20} color={fa.secondary} />
        <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: fa.onSurface, flex: 1 }}>
          {code}
        </Text>
      </View>

      <Pressable onPress={onApply} accessibilityRole="button">
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: R.full,
            backgroundColor: fa.onSurface,
          }}
        >
          <Text style={{ ...TYPE.labelMd, color: fa.surface }}>{apply}</Text>
        </View>
      </Pressable>
    </View>
  );
}
