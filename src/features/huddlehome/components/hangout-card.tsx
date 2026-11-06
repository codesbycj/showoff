import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { CARD_H, CARD_PHOTO, STACK } from '../layout';
import { ct, radius, type } from '../theme';
import { faces, type Hangout } from '../data/home';
import { T } from './text';

/**
 * One hangout in the list: a photograph of the place, what it is, when, and
 * who is already going.
 *
 * The avatar stack is a row of overlapping discs with a count on the end. The
 * count is computed from the faces that are *not* shown rather than typed, so
 * it cannot say "+4" beside five faces.
 */
export function HangoutCard({ item, onPress }: { item: Hangout; onPress?: () => void }) {
  // Two discs and a count: three plus a count does not fit the 227dp the
  // card leaves once the photo and the margins are paid for, and the row
  // wrapped onto a second line.
  const shown = faces.slice(0, 2);
  const extra = 5;

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.title} onPress={onPress}>
      <View
        style={{
          height: CARD_H,
          borderRadius: radius.card,
          backgroundColor: ct.card,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          shadowColor: '#1B1B2A',
          shadowOpacity: 0.05,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        }}
      >
        <View
          style={{
            width: CARD_PHOTO,
            height: CARD_PHOTO,
            borderRadius: radius.photo,
            overflow: 'hidden',
            backgroundColor: ct.hairline,
          }}
        >
          <Image
            source={item.photo}
            style={{ width: CARD_PHOTO, height: CARD_PHOTO }}
            contentFit="cover"
          />
        </View>

        <View style={{ flex: 1, marginLeft: 14, justifyContent: 'center' }}>
          <T
            variant="cardTitle"
            color={ct.ink}
            numberOfLines={1}
            style={{ height: type.cardTitle.line }}
          >
            {item.title}
          </T>
          <T
            variant="cardPlace"
            color={ct.muted}
            numberOfLines={1}
            style={{ height: type.cardPlace.line, marginTop: 4 }}
          >
            {item.place}
          </T>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <T
              variant="cardWhen"
              color={ct.ink}
              numberOfLines={1}
              style={{ height: type.cardWhen.line }}
            >
              {item.when}
            </T>
            <T
              variant="slots"
              color={ct.accent}
              numberOfLines={1}
              style={{ height: type.slots.line, marginLeft: 8 }}
            >
              {`${item.slots} slots left!`}
            </T>

            <View style={{ flex: 1 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {shown.map((f, i) => (
                <View
                  key={i}
                  style={{
                    width: STACK,
                    height: STACK,
                    borderRadius: STACK / 2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: ct.card,
                    marginLeft: i === 0 ? 0 : -9,
                  }}
                >
                  <Image
                    source={f}
                    style={{ width: STACK - 4, height: STACK - 4 }}
                    contentFit="cover"
                  />
                </View>
              ))}
              <View
                style={{
                  height: STACK,
                  minWidth: STACK,
                  paddingHorizontal: 5,
                  borderRadius: STACK / 2,
                  backgroundColor: ct.hairline,
                  borderWidth: 2,
                  borderColor: ct.card,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: -9,
                }}
              >
                <T variant="stack" color={ct.ink} style={{ height: type.stack.line }}>
                  {`+${extra}`}
                </T>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
