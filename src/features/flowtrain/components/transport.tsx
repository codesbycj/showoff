import { Pressable, View } from 'react-native';

import { controls } from '../data/train';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { height: number; onPause?: () => void };

/**
 * Previous, pause, next.
 *
 * The pause control is 76dp and the two beside it are 56dp, all over R7's
 * floor. Each glyph is wrapped so it is a child of its own `View` rather than
 * a bare sibling of a positioned one — on web an `<svg>` paints below an
 * absolutely-positioned sibling and simply disappears (§7).
 */
export function Transport({ height, onPause }: Props) {
  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
      }}
    >
      {controls.map((control) =>
        control.glyph === 'pause' ? (
          <Pressable
            key={control.id}
            accessibilityRole="button"
            accessibilityLabel={control.label}
            onPress={onPause}
          >
            <View
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="pause" size={26} color={ct.onDark} />
            </View>
          </Pressable>
        ) : (
          <Pressable key={control.id} accessibilityRole="button" accessibilityLabel={control.label}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: ct.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={control.glyph} size={20} color={ct.ink} strokeWidth={1.6} />
            </View>
          </Pressable>
        ),
      )}
    </View>
  );
}
