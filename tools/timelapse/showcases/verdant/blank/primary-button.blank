import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BUTTON_ARROW, BUTTON_GAP, BUTTON_HEIGHT } from '../layout';
import { radius, shadow, vd } from '../theme';
import { ArrowGlyph } from './arrow-glyph';
import { T } from './text';

/**
 * The one thing this screen asks you to do.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the pill would lose its fill and its height in every harness shot. The
 * pressed state is `useState` driven from `onPressIn`/`onPressOut` instead,
 * which renders as a plain style object and still gives a real one.
 *
 * 58dp is comfortably past the 44dp minimum target, and the label sits beside
 * its arrow rather than the arrow being pinned to the right edge — a centred
 * pair reads as one object, which is what the reference does.
 */
export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
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
          borderRadius: radius.full,
          backgroundColor: vd.button,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // MISTAKE 1.42 the label came in shoved left
          paddingLeft: 44,
          gap: BUTTON_GAP,
          opacity: held ? 0.88 : 1,
          transform: [{ scale: held ? 0.985 : 1 }],
          ...shadow.button,
        }}
      >
        {/* STEP 1.40 say what it does
        <T variant="button" color={vd.buttonInk}>
          {label}
        </T>
        */}
        {/* STEP 1.41 and point where it goes
        <ArrowGlyph size={BUTTON_ARROW} color={vd.buttonInk} />
        */}
      </View>
    </Pressable>
  );
}
