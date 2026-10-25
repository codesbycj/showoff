import { Pressable, View } from 'react-native';

import { copy } from '../data/data';
import { INPUT_HEIGHT } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What you are about to ask.
 *
 * The mic and the send button are separate `Pressable`s with their own labels
 * rather than decoration on the field: they do two different things, and a bar
 * that is one target sends half the taps to the wrong one.
 */
export function AskBar({ onSend }: { onSend?: () => void }) {
  const disc = INPUT_HEIGHT - 12;

  return (
    <View
      style={{
        height: INPUT_HEIGHT,
        borderRadius: radius.control,
        // On this screen the bar sits on paper rather than on the black
        // sheet, so it is the pale control with an acid send button rather
        // than an acid bar — otherwise it is the loudest thing on a quiet
        // page and reads as the answer rather than as the question.
        backgroundColor: '#F2F2F3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Dictate">
        <View
          style={{
            width: disc,
            height: disc,
            borderRadius: radius.control,
            backgroundColor: '#E4E5E7',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="mic" size={18} tint={vt.onCanvas} />
        </View>
      </Pressable>

      <T
        variant="input"
        color={vt.onCard}
        style={{ flex: 1, marginLeft: 12, height: type.input.line }}
      >
        {copy.draft}
      </T>

      <Pressable onPress={onSend} accessibilityRole="button" accessibilityLabel="Send">
        <View
          style={{
            width: disc,
            height: disc,
            borderRadius: radius.control,
            backgroundColor: vt.acid,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="send" size={17} tint={vt.onAcid} />
        </View>
      </Pressable>
    </View>
  );
}
