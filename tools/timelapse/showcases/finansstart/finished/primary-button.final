import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BUTTON_HEIGHT } from '../layout';
import { fn, radius } from '../theme';
import { T } from './text';

/**
 * The one thing this screen asks you to do.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the button would lose its fill and its height in every harness shot. The
 * pressed state is `useState` driven instead, which renders as a plain style
 * object and still gives a real one.
 */
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={{
          height: BUTTON_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: fn.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.86 : 1,
        }}
      >
        <T variant="button" color={fn.onYellow}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}
