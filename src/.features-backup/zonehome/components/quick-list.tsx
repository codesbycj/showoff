import { Image, Pressable, View } from 'react-native';

import { fastest, quick } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type HeadProps = { margin: number; height: number };

/** "Fastest Delivery". */
export function QuickHead({ margin, height }: HeadProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{fastest.title}</T>
    </View>
  );
}

type Props = { margin: number; rowH: number; thumb: number; radius: number; onSelect: () => void };

/**
 * Who is quickest.
 *
 * **Mine, not the board's.** The board's home stops at its restaurant rail and
 * leaves 91dp of empty canvas above the tab bar, which `audit.js` reports as
 * `GAP` and R1 fails. I3's lever for that is the section the board cut, never
 * a taller block above it.
 *
 * Every photograph is a photograph (I4), and each `Image` carries explicit
 * numeric width and height: absolute insets alone make an `Image` paint
 * nothing on native, silently (Part 7).
 */
export function QuickList({ margin, rowH, thumb, radius, onSelect }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      {quick.map((q, i) => (
        <Pressable
          key={q.id}
          onPress={onSelect}
          accessibilityRole="button"
          accessibilityLabel={`${q.name}, ${q.minutes} minutes`}
        >
          {({ pressed }) => (
            <View
              style={{
                height: rowH,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                borderBottomWidth: i === quick.length - 1 ? 0 : 1,
                borderBottomColor: ct.hairline,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <View
                style={{
                  width: thumb,
                  height: thumb,
                  borderRadius: radius,
                  overflow: 'hidden',
                  backgroundColor: ct.tile,
                }}
              >
                <Image source={q.photo} style={{ width: thumb, height: thumb }} resizeMode="cover" />
              </View>

              <View style={{ flex: 1 }}>
                <T variant="cardName" numberOfLines={1}>
                  {q.name}
                </T>
                <T variant="cardMeta">{q.kind}</T>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Glyph name="star" size={12} color={ct.star} />
                  <T variant="rating">{q.rating.toFixed(1)}</T>
                </View>
                <T variant="cardMeta">{`${q.minutes} min`}</T>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
