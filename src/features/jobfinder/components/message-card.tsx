import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Conversation } from '../data/messages';
import { CARD_SHADOW, FONT, R, jf } from '../theme';
import { BrandMark, NikitinN } from './brand-mark';

/**
 * One conversation in the list.
 *
 * The company badge overhangs the portrait's bottom-right corner, so the
 * portrait is clipped by its own `borderRadius` and the wrapper does no
 * clipping at all — `overflow: 'hidden'` on the wrapper would cut the badge in
 * half, and on Android it would also fight the card's elevation.
 *
 * `unread` shows the dot, in the company's own colour. Whether the timestamp
 * goes blue and bold is a different question, and the reference answers it by
 * the timestamp itself: the one conversation that is stamped with a clock time
 * rather than a date is emphasised, and the other unread one, stamped
 * "Yesterday", is not. So it is derived here rather than carried as a second
 * flag that could disagree with the text beside it.
 */
export function MessageCard({
  conversation: c,
  onPress,
}: {
  conversation: Conversation;
  onPress?: () => void;
}) {
  const today = /\b(AM|PM)$/.test(c.when);
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 14,
            backgroundColor: jf.card,
            borderRadius: 24,
            padding: 16,
          },
          CARD_SHADOW,
        ]}
      >
        <View>
          <Image
            source={c.photo}
            style={{ width: 52, height: 52, borderRadius: 16 }}
            contentFit="cover"
            transition={0}
          />
          <View
            style={{
              position: 'absolute',
              right: -4,
              bottom: -4,
              width: 20,
              height: 20,
              borderRadius: R.full,
              backgroundColor: c.brandBg,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: jf.card,
            }}
          >
            {c.brand === 'nikitin' ? (
              <NikitinN size={10} />
            ) : (
              <BrandMark brand={c.brand} size={10} />
            )}
          </View>
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 4,
              gap: 8,
            }}
          >
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 14, lineHeight: 19, color: jf.ink }}
              numberOfLines={1}
            >
              {c.name}
            </Text>
            <Text
              style={{
                fontFamily: today ? FONT.bold : FONT.medium,
                fontSize: 11,
                lineHeight: 15,
                color: today ? jf.unread : '#A3A3A3',
              }}
            >
              {c.when}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginBottom: 4,
            }}
          >
            <Text
              style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 15, color: '#6B7280' }}
            >
              {c.company}
            </Text>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#D4D4D4' }} />
            <Text
              style={{
                flex: 1,
                fontFamily: FONT.medium,
                fontSize: 11,
                lineHeight: 15,
                color: '#A3A3A3',
              }}
              numberOfLines={1}
            >
              {c.role}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 12,
              lineHeight: 19,
              color: '#404040',
            }}
            numberOfLines={2}
          >
            {c.preview}
          </Text>
        </View>

        {c.unread ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginTop: 8,
              backgroundColor: c.brandBg,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
