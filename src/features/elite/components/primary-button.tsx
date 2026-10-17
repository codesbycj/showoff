import { Pressable, View } from 'react-native';

import { T } from './text';
import { BUTTON_HEIGHT } from '../layout';
import { radius, shadow, el } from '../theme';

/**
 * The call to action.
 *
 * The visual box is on an inner `View`, not on the `Pressable`. A `Pressable`
 * given a function style (`style={({ pressed }) => ...}`) renders with no
 * style at all in a static web render, which is what the preview harness
 * takes: the button silently loses its height and its fill and the bottom of
 * the screen collapses.
 */
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {/* STEP 1.20 fill it, round it, and light it
      <View
        style={{
          height: BUTTON_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: el.violet,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.button,
        }}
      >
        <T variant="cta" color={el.onViolet}>
          {label}
        </T>
      </View>
      */}
    </Pressable>
  );
}
