import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { NewsItem } from '../data/home';
import { FONT, R, vt } from '../theme';

/** The rail's card width. Two and a bit fit the screen, which is the point. */
export const NEWS_CARD_WIDTH = 176;

/**
 * One story in the news rail.
 *
 * The card clips its banner and the tag sits inside that clip, so the two
 * cannot be the same view: `overflow: 'hidden'` together with `elevation` is
 * unreliable on Android, and this card needs both. The banner takes the clip
 * and the card takes the shadow.
 *
 * The headline is pinned to two lines rather than left to reflow. All three of
 * the export's headlines happen to take two, and letting one take three would
 * leave a card taller than its neighbours in a row that has no other alignment.
 */
export function NewsCard({ item, onPress }: { item: NewsItem; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: NEWS_CARD_WIDTH,
          backgroundColor: vt.card,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: vt.line,
          shadowColor: '#000000',
          shadowOpacity: 0.03,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View
          style={{
            height: 96,
            borderTopLeftRadius: R.md - 1,
            borderTopRightRadius: R.md - 1,
            overflow: 'hidden',
            backgroundColor: vt.line,
          }}
        >
          <Image source={item.image} style={{ flex: 1 }} contentFit="cover" />
          <View
            style={{
              position: 'absolute',
              left: 6,
              bottom: 6,
              backgroundColor: item.tagInk,
              borderRadius: R.sm,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontFamily: FONT.bold, fontSize: 9, lineHeight: 13, color: vt.card }}>
              {item.tag}
            </Text>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text
            numberOfLines={2}
            style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 17, color: vt.ink }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontFamily: FONT.medium,
              fontSize: 9.5,
              lineHeight: 13,
              color: vt.faint,
            }}
          >
            {item.when}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
