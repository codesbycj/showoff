import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { profile } from '../data/dash';
import { STAT_DISC, TILE_H } from '../layout';
import { hk, radius } from '../theme';
import { T } from './text';

const PROFILE = require('../../../../assets/images/hookdash/profile.jpg');

/**
 * Who this is, and how many friends they have.
 *
 * The photograph fills the tile and the name sits on it — so the tile is the
 * picture rather than a card with a picture in it, which is what the reference
 * does and what stops four dark cards reading as four grey rectangles.
 *
 * `overflow: 'hidden'` crops the photograph to the tile's corners, and nothing
 * here carries `elevation` — the two together are unreliable on Android.
 */
export function ProfileTile({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={profile.name}>
      <View style={{ height: TILE_H, borderRadius: radius.card, overflow: 'hidden' }}>
        {/* STEP 1.04 their picture
        <Image
          source={PROFILE}
          style={{ position: 'absolute', width: '100%', height: TILE_H }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        */}

        {/* STEP 1.05 their name
        <View style={{ padding: 12 }}>
          <T variant="cardTitle" color={hk.ink}>
            {profile.name}
          </T>
        </View>
        */}

        <View style={{ flex: 1 }} />

        {/* STEP 1.06 and how many friends
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 8,
          }}
        >
          <View
            style={{
              width: STAT_DISC,
              height: STAT_DISC,
              borderRadius: radius.full,
              backgroundColor: hk.well,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FriendMark size={22} />
          </View>
          <View>
            <T variant="statLabel" color={hk.muted}>
              {profile.statLabel}
            </T>
            <T variant="stat" color={hk.ink}>
              {profile.stat}
            </T>
          </View>
        </View>
        */}
      </View>
    </Pressable>
  );
}

/**
 * A person with a heart beside them.
 *
 * Drawn rather than taken from an icon set: the reference's mark is a filled
 * silhouette with a heart cut into its shoulder, and every set's "person" is a
 * stroke. A silhouette is a flat shape — drawing range.
 */
function FriendMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={10} cy={7.4} r={4.2} fill={hk.ink} />
      <Path d="M2.6 20.4 C2.6 15.8 6 13 10 13 C14 13 17.4 15.8 17.4 20.4 Z" fill={hk.ink} />
      <Path
        d="M18.2 13.2 C16.6 11.8 14 12.8 14 14.8 C14 16.6 16.2 18.1 18.2 19.4 C20.2 18.1 22.4 16.6 22.4 14.8 C22.4 12.8 19.8 11.8 18.2 13.2 Z"
        fill={hk.ink}
      />
    </Svg>
  );
}
