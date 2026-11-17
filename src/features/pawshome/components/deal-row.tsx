import { Image, Pressable, View } from 'react-native';

import { deals } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; thumb: number; onOpen: () => void };

/**
 * The flash sale.
 *
 * The card's fill lives on an absolutely-filled child, so an emptied row
 * paints nothing during a reveal rather than opening the take on a grey strip
 * (SS5.5).
 *
 * The chevron sits in a lifted View because an `<svg>` paints BELOW a
 * positioned sibling on web: that absolutely-filled ground hides it outright
 * while the text beside it survives, so the icon just looks missing (SS7).
 */
export function DealRow({ margin, height, radius, thumb, onOpen }: Props) {
  return (
    <View style={{ marginHorizontal: margin, gap: 10 }}>
      {deals.map((deal) => (
        <Pressable
          key={deal.id}
          accessibilityRole="button"
          accessibilityLabel={`${deal.name}, ${deal.sub}`}
          onPress={onOpen}
        >
          <View
            style={{
              height,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              gap: 12,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: radius,
                backgroundColor: ct.card,
              }}
            />

            <Image
              source={deal.image}
              style={{ width: thumb, height: thumb, borderRadius: 12 }}
              resizeMode="cover"
            />

            <View style={{ flex: 1, gap: 2 }}>
              <T variant="cardName" numberOfLines={1}>
                {deal.name}
              </T>
              <T variant="cardSub" numberOfLines={1}>
                {deal.sub}
              </T>
            </View>

            <T variant="price">${deal.price}</T>

            <View style={{ zIndex: 1 }}>
              <Glyph name="chevron" size={16} color={ct.muted} strokeWidth={2} />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
