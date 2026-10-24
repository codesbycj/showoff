import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { START_GAP, START_SIZE } from '../layout';
import { pt, radius, shadow } from '../theme';
import { ArrowGlyph } from './arrow-glyph';
import { T } from './text';

/**
 * The foot of the screen: a way past it, and a way on.
 *
 * Both handlers are props — screens decide navigation, components never do.
 *
 * The visual box of the round button is an inner `View`, never the
 * `Pressable`'s own style: a `style={({pressed}) => …}` function is dropped in
 * a static web render, and the circle would lose its fill and its size in
 * every harness shot. The pressed states are `useState` driven instead.
 */
export function FooterActions({
  skip,
  start,
  onSkip,
  onStart,
}: {
  skip: string;
  start: string;
  onSkip?: () => void;
  onStart?: () => void;
}) {
  const [heldSkip, setHeldSkip] = useState(false);
  const [heldStart, setHeldStart] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* STEP 1.23 a way past all this
      <Pressable
        onPress={onSkip}
        onPressIn={() => setHeldSkip(true)}
        onPressOut={() => setHeldSkip(false)}
        hitSlop={14}
        accessibilityRole="button"
        accessibilityLabel="Skip onboarding"
        style={{ opacity: heldSkip ? 0.5 : 1 }}
      >
        <T variant="action" color={pt.ink}>
          {skip}
        </T>
      </Pressable>
      */}

      <View style={{ flex: 1 }} />

      {/* STEP 1.24 and the way on
      <Pressable
        onPress={onStart}
        onPressIn={() => setHeldStart(true)}
        onPressOut={() => setHeldStart(false)}
        accessibilityRole="button"
        accessibilityLabel={start}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: heldStart ? 0.8 : 1 }}>
          <T variant="action" color={pt.ink}>
            {start}
          </T>
          <View
            style={{
              width: START_SIZE,
              height: START_SIZE,
              borderRadius: radius.full,
              backgroundColor: pt.ink,
              alignItems: 'center',
              justifyContent: 'center',
              // MISTAKE 1.25 the button came in faded
              opacity: 0.4,
              marginLeft: START_GAP,
              ...shadow.start,
            }}
          >
            <ArrowGlyph size={21} color={pt.onInk} angle={-45} />
          </View>
        </View>
      </Pressable>
      */}
    </View>
  );
}
