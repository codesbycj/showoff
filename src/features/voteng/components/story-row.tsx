import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { Story } from '../data/news';
import { FONT, R, SP, vt } from '../theme';

/** Square, so a portrait and a skyline crop to the same block. */
const THUMB = 72;

/**
 * One story in the vertical list under the lead.
 *
 * The tag is set as coloured text here rather than the filled pill the lead and
 * the home rail use. Five filled pills stacked down a column would read as the
 * loudest thing on the screen, and they sit next to the fact-check verdicts,
 * which *are* pills and need to stay the strongest signal on the page. Same
 * colour, a quieter container.
 */
export function StoryRow({ story, onPress }: { story: Story; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: vt.card,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: vt.line,
          padding: 10,
          shadowColor: '#000000',
          shadowOpacity: 0.03,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View
          style={{
            width: THUMB,
            height: THUMB,
            borderRadius: R.DEFAULT,
            overflow: 'hidden',
            backgroundColor: vt.line,
          }}
        >
          <Image source={story.image} style={{ flex: 1 }} contentFit="cover" />
        </View>

        <View style={{ flex: 1, marginLeft: SP.md, justifyContent: 'center' }}>
          <Text
            style={{
              fontFamily: FONT.black,
              fontSize: 9,
              lineHeight: 13,
              letterSpacing: 0.45,
              textTransform: 'uppercase',
              color: story.tagInk,
            }}
          >
            {story.tag}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              marginTop: 3,
              fontFamily: FONT.bold,
              fontSize: 13,
              lineHeight: 18,
              letterSpacing: -0.2,
              color: vt.ink,
            }}
          >
            {story.title}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 10, lineHeight: 14, color: vt.muted }}
            >
              {story.source}
            </Text>
            <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: vt.ghost }} />
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 10, lineHeight: 14, color: vt.faint }}
            >
              {story.when}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
