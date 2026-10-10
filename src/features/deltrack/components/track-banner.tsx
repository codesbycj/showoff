import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { MoreDots } from './icons';
import { ParcelArt } from './parcel-art';
import { R, SP, TYPE, dt } from '../theme';

/**
 * The hero: the periwinkle card the tracking field and the in-transit card sit
 * inside.
 *
 * Its gradient washes out to the page's own white before its foot, so the card
 * has no visible bottom edge in the reference — which is why the in-transit
 * card can overhang it without anything to overhang. The container runs from
 * y=125 to just under its last child, and nothing anywhere relies on where it
 * actually ends.
 *
 * 20dp of padding, which is what puts the field and the card at x=36 in a
 * screen with a 16dp margin.
 */
export function TrackBanner({
  title,
  subtitle,
  onMore,
  children,
}: {
  title: string;
  subtitle: string;
  onMore?: () => void;
  children?: ReactNode;
}) {
  return (
    <LinearGradient
      // The axis is tipped: equal-colour contours in the reference run 43dp
      // lower on the right than on the left, so its left shoulder reaches
      // white at y=280 while its right one is still lilac at 330. That is a
      // gradient running down-and-left, not straight down — and the stops are
      // read along that axis rather than down the card.
      colors={[dt.heroTop, dt.heroMid, dt.heroLow, dt.heroWash, dt.heroPale, dt.heroFoot]}
      locations={[0, 0.15, 0.33, 0.51, 0.62, 0.74]}
      start={{ x: 0.16, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        marginHorizontal: SP.margin,
        borderRadius: R.hero,
        paddingHorizontal: SP.heroPad,
        paddingTop: 27,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ParcelArt size={43} />

        {/* The art is taller than the two lines beside it, so the row's
            height comes from the art. The 4dp of bottom padding lifts the
            text pair inside that row until the title's cap lands on 156. */}
        <View style={{ flex: 1, marginLeft: 9, paddingBottom: 4 }}>
          <Text style={[TYPE.cardTitle, { color: dt.ink }]}>{title}</Text>
          <Text style={[TYPE.body, { color: dt.muted, marginTop: 4 }]}>{subtitle}</Text>
        </View>

        <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel="More">
          {/* The dots sit on the title's line rather than on the row's
              middle, and the row's height comes from the art beside it — so
              they are pulled 22dp up out of it. */}
          <MoreDots size={20} color={dt.ink} style={{ marginTop: -22 }} />
        </Pressable>
      </View>

      {children}
    </LinearGradient>
  );
}
