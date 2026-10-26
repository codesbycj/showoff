import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { BUTTON_HEIGHT, BUTTON_TOP } from '../layout';
import { lk, radius, type } from '../theme';
import { T } from './text';

/**
 * The way on.
 *
 * Until an answer is chosen it is the page's own grey with muted type, and
 * it turns lime once there is something to go on with. An opacity fade was
 * the first attempt and it came out as a muddy olive - a waiting control
 * should look deliberate, not like a lit one that failed to paint.
 */
export function NextButton({ ready, onPress }: { ready: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={copy.action}>
      <View
        style={{
          height: BUTTON_HEIGHT,
          marginTop: BUTTON_TOP,
          borderRadius: radius.pill,
          backgroundColor: ready ? lk.lime : lk.wait,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="action" color={ready ? lk.onLime : lk.ink} style={{ height: type.action.line }}>
          {copy.action}
        </T>
      </View>
    </Pressable>
  );
}
