import { Pressable, View } from 'react-native';

import { screen } from '../data/item';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

/** A round control. Its box is on an inner `View`, because a `Pressable`
 *  function style is dropped in a static render (RULES Part 7). */
function Round({
  glyph,
  label,
  size,
  tint,
  onPress,
}: {
  glyph: GlyphName;
  label: string;
  size: number;
  tint?: string;
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
            borderWidth: 1,
            borderColor: ct.fieldEdge,
            backgroundColor: ct.white,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={19} color={tint ?? ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

type Props = { height: number; margin: number; control: number; onBack: () => void };

/** Back, title, save. The title is centred on the screen, not between the
 *  controls — §4.2's "check what a group is aligned to before centring it". */
export function DetailHeader({ height, margin, control, onBack }: Props) {
  return (
    <View style={{ height, marginHorizontal: margin, justifyContent: 'center' }}>
      {/* STEP 1.02 title
      <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
        <T variant="sectionTitle">{screen.title}</T>
      </View>
      */}

      {/* STEP 1.03 round
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        <View style={{ flex: 1 }} />
        <Round glyph="heart" label="Save this item" size={control} />
      </View>
      */}
    </View>
  );
}
