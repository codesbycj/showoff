import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Textbook } from '../data/saved';
import { FONT, LEVEL, ll } from '../theme';

/** Width of one card on the library's textbook rail. */
export const TEXTBOOK_CARD_WIDTH = 245;

/**
 * One textbook on the "Recent Textbooks" rail — a gradient spine, its title
 * block, and a progress footer below a hairline.
 *
 * The footer's label row and its bar are separated by 6dp, and the bar is a
 * track with an absolutely sized fill rather than a percentage-width child, so
 * a progress of 0 still renders the track at full width.
 */
export function TextbookCard({ book, onPress }: { book: Textbook; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            width: TEXTBOOK_CARD_WIDTH,
            backgroundColor: ll.surface,
            borderRadius: 24,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(232,239,227,0.7)',
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <LinearGradient
            colors={[book.coverFrom, book.coverTo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 56,
              height: 72,
              borderRadius: 12,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: FONT.extrabold,
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: 0.5,
                color: book.coverInk,
                opacity: 0.7,
              }}
            >
              {book.code}
            </Text>

            <Icon name="library" size={24} color={book.coverInk} strokeWidth={1.8} />

            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 8,
                lineHeight: 10,
                color: book.coverInk,
              }}
            >
              {book.volume}
            </Text>
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: book.badgeTint,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 999,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 10,
                  lineHeight: 14,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  color: book.badgeInk,
                }}
              >
                {book.badge}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 12,
                lineHeight: 17,
                letterSpacing: -0.12,
                color: ll.ink,
              }}
            >
              {book.title}
            </Text>
            <Text
              style={{ fontFamily: FONT.regular, fontSize: 11, lineHeight: 16, color: ll.muted }}
            >
              {book.subtitle}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: 'rgba(232,239,227,0.6)',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <Text
              style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14, color: ll.muted }}
            >
              {book.progressLabel}
            </Text>
            <Text
              style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14, color: ll.ink }}
            >
              {book.pageLabel}
            </Text>
          </View>

          <View
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: ll.surfaceSunken,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${book.progress * 100}%`,
                height: 6,
                borderRadius: 3,
                backgroundColor: book.barColor,
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
