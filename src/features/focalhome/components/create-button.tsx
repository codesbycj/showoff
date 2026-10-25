import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { CREATE_HEIGHT, CREATE_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * The one thing the screen asks you to do.
 *
 * Full width and 54dp tall. The plus is part of the label rather than a
 * separate glyph, because at this size a drawn plus beside the words only
 * competes with them — and a label that reads "+ Create new task" cannot get
 * out of step with an icon it does not have.
 */
export function CreateButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Create new task">
      <View
        style={{
          height: CREATE_HEIGHT,
          marginTop: CREATE_TOP,
          borderRadius: radius.pill,
          backgroundColor: fc.black,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="action" color={fc.onBlack} style={{ height: type.action.line }}>
          {copy.create}
        </T>
      </View>
    </Pressable>
  );
}
