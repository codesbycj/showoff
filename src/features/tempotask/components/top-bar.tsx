import { Pressable, View } from 'react-native';

import { copy } from '../data/task';
import { HEADER_SIZE } from '../layout';
import { radius, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The way back, and what you are looking at.
 *
 * The title is centred on the screen rather than on the space left beside the
 * control, so it does not shift when the back button is not there. The
 * trailing spacer is the same width as the control for exactly that reason.
 */
export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
{/* STEP 1.03 the way back
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View
          style={{
            width: HEADER_SIZE,
            height: HEADER_SIZE,
            borderRadius: radius.control,
            backgroundColor: tp.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="back" size={19} tint={tp.ink} />
        </View>
      </Pressable>
*/}
{/* STEP 1.04 and the title
      <T
        variant="display"
        color={tp.ink}
        style={{ flex: 1, textAlign: 'center', height: type.display.line }}
      >
        {copy.title}
      </T>
*/}
      <View style={{ width: HEADER_SIZE }} />
    </View>
  );
}
