import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BUTTON_HEIGHT } from '../layout';
import { radius, tb, type } from '../theme';
import { ProviderGlyph } from './provider-glyph';
import { T } from './text';

/**
 * One of the three ways in.
 *
 * `tone` swaps the fill and the ink together rather than taking them as two
 * props: these are one button in two materials, and splitting them would let
 * them drift apart.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style. A
 * `style={({pressed}) => …}` function is silently dropped in a static web
 * render, so the button would lose its fill and its height in every shot the
 * harness takes — which is the only way this screen is ever checked.
 *
 * The label is centred in the button and the mark sits against it rather than
 * being pinned to the left edge, so the three buttons read as a stack of the
 * same object even though their labels are different lengths.
 */
export function SignInButton({
  label,
  glyph,
  tone,
  onPress,
}: {
  label: string;
  glyph: 'guest' | 'apple' | 'google';
  tone: 'raise' | 'green';
  onPress?: () => void;
}) {
  const [held, setHeld] = useState(false);
  const green = tone === 'green';
  const ink = green ? tb.onGreen : tb.onRaise;

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
          borderRadius: radius.button,
          backgroundColor: green ? tb.green : tb.raise,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.85 : 1,
        }}
      >
        <ProviderGlyph name={glyph} size={19} tint={ink} />
        <T variant="button" color={ink} style={{ marginLeft: 10, height: type.button.line }}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}
