import { Pressable, View } from 'react-native';

import { copy, progress } from '../data/quiz';
import { HEADER_SIZE } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The way back, what this is, and how far through it you are.
 *
 * The count is a real reading of the data — `done` of `total` — rather than a
 * string, so it cannot disagree with the bar underneath it.
 */
export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View
          style={{
            width: HEADER_SIZE,
            height: HEADER_SIZE,
            borderRadius: radius.control,
            borderWidth: 1.4,
            borderColor: sk.slabEdge,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="back" size={19} tint={sk.ink} />
        </View>
      </Pressable>

      <T
        variant="title"
        color={sk.body}
        style={{ flex: 1, textAlign: 'center', height: type.title.line }}
      >
        {copy.title}
      </T>

      <View
        style={{
          width: HEADER_SIZE,
          height: HEADER_SIZE,
          borderRadius: radius.control,
          borderWidth: 1.4,
          borderColor: sk.slabEdge,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="step" color={sk.ink} style={{ height: type.step.line }}>
          {`${progress.done}/${progress.total}`}
        </T>
      </View>
    </View>
  );
}
