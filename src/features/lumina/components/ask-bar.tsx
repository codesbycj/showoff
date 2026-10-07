import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { RoundButton } from './round-button';
import { FONT, LEVEL, SP, ll } from '../theme';

/**
 * The home screen's query row — a wide "Ask a Question" pill followed by three
 * circular media shortcuts.
 *
 * The pill is a `Pressable`, not a text input: the reference is a tap target
 * that opens the chat screen, and a real input would put a caret in every
 * recorded frame.
 *
 * The pill is 48dp and the three buttons 44dp, which is the reference's own
 * mismatch (`h-12` against `w-11 h-11`) rather than a rounding slip — the row
 * centres them, so the buttons sit 2dp inside the pill top and bottom.
 */
export function AskBar({
  placeholder,
  onAsk,
  onScreen,
  onCamera,
  onMic,
}: {
  placeholder: string;
  onAsk?: () => void;
  onScreen?: () => void;
  onCamera?: () => void;
  onMic?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
      <Pressable style={{ flex: 1 }} onPress={onAsk} accessibilityRole="button">
        <View
          style={[
            {
              height: 48,
              borderRadius: 999,
              paddingHorizontal: SP.md,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: ll.surface,
              borderWidth: 1,
              borderColor: 'rgba(6,46,30,0.05)',
            },
            LEVEL.card,
          ]}
        >
          <Icon name="commentDots" size={15} color={ll.subtle} />
          <Text
            style={{
              fontFamily: FONT.semibold,
              fontSize: 12,
              lineHeight: 16,
              color: '#4b5347',
              marginLeft: 10,
            }}
          >
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <RoundButton
        icon="screen"
        size={44}
        iconSize={14}
        lift="soft"
        onPress={onScreen}
        label="Video lesson"
      />
      <RoundButton
        icon="camera"
        size={44}
        iconSize={14}
        lift="soft"
        onPress={onCamera}
        label="Camera solver"
      />
      <RoundButton
        icon="mic"
        size={44}
        iconSize={14}
        lift="soft"
        onPress={onMic}
        label="Voice question"
      />
    </View>
  );
}
