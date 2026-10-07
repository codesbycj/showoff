import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Note } from '../data/saved';
import { FONT, LEVEL, ll } from '../theme';

/**
 * One saved note — tinted glyph well, a tag-and-timestamp line, title, meta,
 * and a bookmark button that is always filled because every row here is, by
 * definition, already saved.
 */
export function NoteRow({ note, onPress }: { note: Note; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: ll.surface,
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: 'rgba(232,239,227,0.7)',
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              backgroundColor: note.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={note.icon} size={19} color={note.ink} />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  backgroundColor: note.tagTint,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    fontSize: 10,
                    lineHeight: 14,
                    color: note.tagInk,
                  }}
                >
                  {note.tag}
                </Text>
              </View>

              <Text
                style={{ fontFamily: FONT.regular, fontSize: 10, lineHeight: 14, color: ll.muted }}
              >
                {note.time}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: -0.12,
                color: ll.ink,
                marginTop: 2,
              }}
            >
              {note.title}
            </Text>
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: ll.muted }}
            >
              {note.meta}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: ll.surfaceSunken,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="bookmark" size={15} color={ll.ink} fill={ll.ink} />
        </View>
      </View>
    </Pressable>
  );
}
