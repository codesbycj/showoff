import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; margin: number; orb: number; title: string; onBack?: () => void };

/**
 * Back control and the screen's title.
 *
 * The title is centred on the *screen*, not on the space left beside the orb,
 * so it does not shift when the back control appears during the reveal. The
 * orb sits over it in an absolute layer for the same reason.
 *
 * The visual box is an inner `View`: a `Pressable` function style is dropped in
 * the static web render and the control loses its height (RULES Part 7).
 */
export function TopBar({ height, margin, orb, title, onBack }: Props) {
  return (
    <View style={{ height, justifyContent: 'center' }}>
      <T variant="screenTitle" style={{ textAlign: 'center' }}>
        {title}
      </T>

      <View style={{ position: 'absolute', left: margin, top: (height - orb) / 2 }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          {({ pressed }) => (
            <View
              style={{
                width: orb,
                height: orb,
                borderRadius: orb / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.surface,
                borderWidth: 1,
                borderColor: ct.chipBorder,
                opacity: pressed ? 0.6 : 1,
              }}
            >
              <Glyph name="back" size={20} color={ct.ink} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
