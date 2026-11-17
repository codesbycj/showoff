import { Image, Pressable, View } from 'react-native';

import { stay } from '../data/trip';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  radius: number;
  thumb: number;
  thumbRadius: number;
  onPress: () => void;
};

/**
 * Where the party sleeps.
 *
 * **The room is a photograph** (I4): an interior is a picture *of* somewhere.
 *
 * One column beside the thumbnail, as the board stacks it — name, address,
 * rating, price. A price pulled out into a column of its own took enough width
 * off the name to truncate it.
 *
 * The white fill lives on an absolutely-filled child so an emptied card paints
 * nothing during a reveal (§5.5), and the shadow travels with it — left
 * behind, the card would open the take as a white strip with a shadow under
 * it. `shadow*` and `elevation` ride together in one style object rather than
 * a `Platform.select` the web render could never check (I8).
 *
 * The reviews link is padded to its own 44dp box rather than left at its line
 * height, which is all a text link otherwise offers a thumb (R7).
 */
export function StayCard({ margin, height, radius, thumb, thumbRadius, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {/* STEP 1.26 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.white,
          shadowColor: '#1F3324',
          shadowOpacity: 0.1,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 5,
        }}
      />
      */}

      {/* STEP 1.27 name
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          gap: 14,
        }}
      >
        <Image
          source={stay.image}
          style={{ width: thumb, height: thumb, borderRadius: thumbRadius }}
          resizeMode="cover"
        />

        <View style={{ flex: 1 }}>
          <T variant="stayName" numberOfLines={1}>
            {stay.name}
          </T>

          <View style={{ flexDirection: 'row', gap: 7, paddingTop: 3 }}>
            <View style={{ paddingTop: 2 }}>
              <Glyph name="pin" size={15} color={ct.muted} strokeWidth={1.6} />
            </View>
            <View>
              <T variant="stayLine">{stay.area}</T>
              <T variant="stayLine">{stay.city}</T>
            </View>
          </View>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${stay.rating} out of 10, read reviews`}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 13 }}
          >
            <Glyph name="star" size={15} color={ct.ink} filled />
            <T variant="rating">{stay.rating}</T>
            <T variant="link" style={{ textDecorationLine: 'underline' }}>
              {stay.reviews}
            </T>
          </Pressable>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
            <T variant="price">{stay.price}</T>
            <T variant="per">{stay.per}</T>
          </View>
        </View>
      </View>
      */}
    </View>
  );
}
