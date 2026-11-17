import { Pressable, View } from 'react-native';

import { screen } from '../data/confirm';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

/** A round control in the header. Its box is on an inner `View`, because a
 *  `Pressable` function style is dropped in a static render (RULES Part 7). */
function Round({
  glyph,
  label,
  size,
  onPress,
}: {
  glyph: GlyphName;
  label: string;
  size: number;
  onPress?: () => void;
}) {
  return (
    <Pressable hitSlop={6} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.disc,
            opacity: pressed ? 0.6 : 1,
          }}
        >
          <Glyph name={glyph} size={18} color={ct.ink} strokeWidth={2} />
        </View>
      )}
    </Pressable>
  );
}

type Props = { height: number; margin: number; control: number; onBack: () => void };

/** Back, title, help. The title is centred on the screen, not between the
 *  controls — §4.2's "check what a group is aligned to before centring it". */
export function ConfirmHeader({ height, margin, control, onBack }: Props) {
  return (
    <View style={{ height, marginHorizontal: margin, justifyContent: 'center' }}>
      <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
        <T variant="title">{screen.title}</T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        <View style={{ flex: 1 }} />
        <Round glyph="help" label="Help" size={control} />
      </View>
    </View>
  );
}
