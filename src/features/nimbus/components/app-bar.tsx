import { Pressable, StyleSheet, View } from 'react-native';

import { HEADER_BUTTON } from '../layout';
import { nb, radius, shadow } from '../theme';
import { Icon, type IconName } from './icon';
import { T } from './text';

/**
 * The header: a round button either side of a centred title.
 *
 * The title is absolutely positioned across the whole bar rather than placed
 * between the buttons, because in the reference it is centred on the *screen*
 * — "My Cards" sits at 196dp of a 390dp screen, and the buttons are different
 * widths of ink either side of it. Centring it in the remaining space would
 * put it a couple of dp off, and this is the one piece of text with nothing
 * else on its line to hide that.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the circle would lose its fill and its size in every harness shot.
 */
function RoundButton({
  name,
  size,
  onPress,
  accessibilityLabel,
}: {
  name: IconName;
  size: number;
  onPress?: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <View
        style={{
          width: HEADER_BUTTON,
          height: HEADER_BUTTON,
          borderRadius: radius.full,
          backgroundColor: nb.surface,
          alignItems: 'center',
          justifyContent: 'center',
          // MISTAKE 1.06 the buttons came in sitting low on the line
          marginTop: 12,
          ...shadow.soft,
        }}
      >
        <Icon name={name} size={size} color={nb.ink} strokeWidth={2.2} />
      </View>
    </Pressable>
  );
}

export function AppBar({
  title,
  onBack,
  onAdd,
}: {
  title: string;
  onBack?: () => void;
  onAdd?: () => void;
}) {
  return (
    <View
      style={{
        height: HEADER_BUTTON,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.03 a way back out
      <RoundButton name="back" size={24} onPress={onBack} accessibilityLabel="Back" />
      */}

      {/* STEP 1.04 the title, centred on the screen
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]} pointerEvents="none">
        <T variant="title" color={nb.ink} style={{ textAlign: 'center' }}>
          {title}
        </T>
      </View>
      */}

      {/* STEP 1.05 and a way to add another card
      <RoundButton name="add" size={18} onPress={onAdd} accessibilityLabel="Add a card" />
      */}
    </View>
  );
}
