import { Pressable, View } from 'react-native';

import { radius, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** A card's title, its mark, and the menu nobody opens. */
export function CardHead({ title }: { title: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
{/* STEP 1.08 its mark
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          backgroundColor: tp.canvas,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name="board" size={17} tint={tp.ink} />
      </View>
*/}
{/* STEP 1.09 and its name
      <T
        variant="display"
        color={tp.ink}
        style={{ flex: 1, marginLeft: 9, height: type.display.line }}
      >
        {title}
      </T>
*/}
      <Pressable accessibilityRole="button" accessibilityLabel="More" hitSlop={10}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: radius.control,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="dots" size={18} tint={tp.muted} />
        </View>
      </Pressable>
    </View>
  );
}
