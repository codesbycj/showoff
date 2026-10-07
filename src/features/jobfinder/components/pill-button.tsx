import { Pressable, Text, View } from 'react-native';

import { R, TYPE, jf } from '../theme';

/**
 * The dark capsule CTA — "Lets Start" on onboarding, "Send Resume" on the job
 * detail sheet.
 *
 * The visual box is an inner `View` rather than a style function on the
 * `Pressable`. A `style={({ pressed }) => …}` is dropped in static render, which
 * silently loses the height and the fill, and every screenshot the harness takes
 * is a static render — so the button would measure as a bare text node.
 */
export function PillButton({
  label,
  onPress,
  width,
  height = 52,
  tone = jf.ink,
  labelTone = '#FFFFFF',
}: {
  label: string;
  onPress?: () => void;
  /** Fixed width where the design gives one; otherwise the button fills its parent. */
  width?: number;
  height?: number;
  tone?: string;
  labelTone?: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={{
          width,
          height,
          alignSelf: width ? 'auto' : 'stretch',
          borderRadius: R.full,
          backgroundColor: tone,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOpacity: 0.18,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 5,
        }}
      >
        <Text style={[TYPE.button, { color: labelTone }]}>{label}</Text>
      </View>
    </Pressable>
  );
}
