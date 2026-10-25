import { Pressable, View } from 'react-native';

import { copy } from '../data/home';
import { HEADER_SIZE } from '../layout';
import { radius, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The menu, and which month you are looking at.
 *
 * The picker is one control — a pill holding the mark, the month and the
 * chevron — rather than three things that happen to sit next to each other, so
 * the whole thing is the tap target rather than the 12dp chevron at its end.
 */
export function TopBar({ onMenu, onPick }: { onMenu?: () => void; onPick?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Pressable onPress={onMenu} accessibilityRole="button" accessibilityLabel="Menu">
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
          <Glyph name="menu" size={21} tint={tp.ink} />
        </View>
      </Pressable>

      <Pressable
        onPress={onPick}
        accessibilityRole="button"
        accessibilityLabel={`Month: ${copy.month}`}
      >
        <View
          style={{
            height: HEADER_SIZE,
            paddingHorizontal: 16,
            borderRadius: radius.pill,
            backgroundColor: tp.card,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Glyph name="calendar" size={17} tint={tp.ink} />
          <T
            variant="display"
            color={tp.ink}
            style={{ marginHorizontal: 8, height: type.display.line }}
          >
            {copy.month}
          </T>
          <Glyph name="caret" size={15} tint={tp.ink} />
        </View>
      </Pressable>
    </View>
  );
}
