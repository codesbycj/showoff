import { Pressable, View } from 'react-native';

import { fields } from '../data/book';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress?: () => void };

/**
 * The time field, in its unchosen state — the reference shows "Choose Time"
 * with a chevron rather than a value.
 *
 * Whole-row pressable, so the tap target is the full 64dp card rather than the
 * chevron alone (R7).
 */
export function TimeField({ margin, height, radius, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={fields.timeEmpty}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ct.surface,
            borderWidth: 1,
            borderColor: ct.hairline,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Glyph name="clock" size={13} color={ct.sub} strokeWidth={1.7} />
              <T variant="fieldLabel">{fields.timeLabel}</T>
            </View>
            <T variant="fieldEmpty">{fields.timeEmpty}</T>
          </View>

          <Glyph name="chevronDown" size={18} color={ct.ink} strokeWidth={2} />
        </View>
      )}
    </Pressable>
  );
}
