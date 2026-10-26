import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { BOOK_HEIGHT, BOOK_TOP } from '../layout';
import { radius, type, vl } from '../theme';
import { Chevron } from './glyphs';
import { T } from './text';

/**
 * The one thing someone opening this app most often wants.
 *
 * The green is an absolutely-filled child rather than this View's own fill,
 * so the blank state is a blank page and the bar arrives as a step.
 */
export function BookBar({ onBook }: { onBook?: () => void }) {
  return (
    <View
      style={{
        height: BOOK_HEIGHT,
        marginTop: BOOK_TOP,
        borderRadius: radius.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
{/* STEP 1.20 the green
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: vl.green,
        }}
      />
*/}

      <View style={{ flex: 1 }}>
        <T variant="bookTitle" color={vl.onGreen} style={{ height: type.bookTitle.line }}>
          {copy.book}
        </T>
        <T variant="bookNote" color={vl.onGreenDim} style={{ height: type.bookNote.line }}>
          {copy.bookNote}
        </T>
      </View>

      <Pressable
        onPress={onBook}
        accessibilityRole="button"
        accessibilityLabel={copy.book}
        style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: radius.pill,
            backgroundColor: vl.gold,
          }}
        >
          <T variant="joinBtn" color={vl.onGold} style={{ height: type.joinBtn.line }}>
            {copy.bookBtn}
          </T>
          <View style={{ marginLeft: 4 }}>
            <Chevron size={13} tint={vl.onGold} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
