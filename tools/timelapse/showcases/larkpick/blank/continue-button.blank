import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { BUTTON_HEIGHT, BUTTON_TOP } from '../layout';
import { lk, radius, type } from '../theme';
import { T } from './text';

/** The way on: full width, 56dp, the only other lime on the page. */
export function ContinueButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={copy.action}>
{/* STEP 1.21 the only other lime on the page
      <View
        style={{
          height: BUTTON_HEIGHT,
          marginTop: BUTTON_TOP,
          // MISTAKE 1.22 the button came in squeezed
          marginHorizontal: 46,
          borderRadius: radius.pill,
          backgroundColor: lk.lime,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="action" color={lk.onLime} style={{ height: type.action.line }}>
          {copy.action}
        </T>
      </View>
*/}
    </Pressable>
  );
}
