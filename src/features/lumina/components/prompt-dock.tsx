import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, ll } from '../theme';

/**
 * The chat screen's composer — a white card holding the prompt line above a
 * row of controls.
 *
 * The prompt line is a `Text`, not a `TextInput`. The reference shows a
 * placeholder, and the recording never types into it; a real input would put a
 * blinking caret into every frame and open the soft keyboard the moment the
 * screen is touched on the emulator.
 */
export function PromptDock({
  placeholder,
  mode,
  onSend,
  onMic,
  onAttach,
  onMode,
}: {
  placeholder: string;
  mode: string;
  onSend?: () => void;
  onMic?: () => void;
  onAttach?: () => void;
  onMode?: () => void;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: ll.surface,
          borderRadius: 28,
          padding: 12,
          borderWidth: 1,
          borderColor: '#e2ecd9',
        },
        LEVEL.card,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <Icon name="pencil" size={16} color="#69756b" />
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: 14,
            lineHeight: 20,
            color: ll.subtle,
            marginLeft: 8,
          }}
        >
          {placeholder}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingTop: 4,
          borderTopWidth: 1,
          borderTopColor: ll.hairline,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable onPress={onAttach} accessibilityRole="button" accessibilityLabel="Attach">
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#dfe5dc',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="plus" size={16} color="#69756b" />
            </View>
          </Pressable>

          <Pressable onPress={onMode} accessibilityRole="button">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 999,
                backgroundColor: '#f4f6f2',
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.semibold,
                  fontSize: 12,
                  lineHeight: 16,
                  color: '#3d4a3f',
                }}
              >
                {mode}
              </Text>
              <Icon name="chevronDown" size={12} color="#69756b" />
            </View>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable onPress={onMic} accessibilityRole="button" accessibilityLabel="Voice input">
            <View
              style={{
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="mic" size={18} color="#4b5347" />
            </View>
          </Pressable>

          <Pressable onPress={onSend} accessibilityRole="button" accessibilityLabel="Send">
            <View
              style={[
                {
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#91eb2d',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.sm,
              ]}
            >
              <Icon name="send" size={16} color="#0d1a0b" />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
