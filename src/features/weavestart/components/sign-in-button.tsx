import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BUTTON_HEIGHT } from '../layout';
import { radius, wv } from '../theme';
import { BrandGlyph } from './brand-glyph';
import { T } from './text';

/**
 * One of the two ways in.
 *
 * `tone` swaps the fill, the ink and the edge together rather than taking
 * three props: the two buttons are the same button in two materials, and
 * splitting them would let them drift apart.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the button would lose its fill and its height in every harness shot.
 */
export function SignInButton({
  label,
  glyph,
  tone,
  onPress,
}: {
  label: string;
  glyph: 'google' | 'apple';
  tone: 'light' | 'dark';
  onPress?: () => void;
}) {
  const [held, setHeld] = useState(false);
  const light = tone === 'light';

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
          backgroundColor: light ? wv.light : wv.canvas,
          borderWidth: light ? 0 : 1,
          borderColor: wv.darkEdge,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: held ? 0.86 : 1,
        }}
      >
        {/* STEP 1.09 whose account
        <BrandGlyph name={glyph} size={19} />
        */}
        {/* STEP 1.10 and what it says
        <T variant="button" color={light ? wv.onLight : wv.ink}>
          {label}
        </T>
        */}
      </View>
    </Pressable>
  );
}
