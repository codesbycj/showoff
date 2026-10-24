import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { findFriends } from '../data/dash';
import { STAT_DISC, TILE_H } from '../layout';
import { hk, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * The way to meet people, with two of them shown.
 *
 * The faces overlap by a third of their width, so they read as "these people"
 * rather than as a list — which is why they are laid out with a negative
 * margin and not a gap.
 */
export function FindTile({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Find friends">
      <View
        style={{
          // MISTAKE 1.26 the tile came in squeezed
          paddingVertical: 24,
          height: TILE_H,
          borderRadius: radius.card,
          backgroundColor: hk.card,
          padding: 12,
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.09 what it offers
        <T variant="cardTitle" color={hk.ink}>
          {findFriends.title}
        </T>
        */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Plus size={20} />
          </View>
          {/* STEP 1.10 and two of them
          {findFriends.faces.map((f, i) => (
            <Image
              key={f}
              source={FACES[f]}
              style={{
                width: STAT_DISC,
                height: STAT_DISC,
                borderRadius: radius.full,
                marginLeft: -10 + i * 0,
                borderWidth: 2,
                borderColor: hk.card,
              }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          ))}
          */}
        </View>
      </View>
    </Pressable>
  );
}

/** The add mark. Drawn at 20dp, where an icon set's cap style reads as mush. */
function Plus({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M10 2.4 V17.6 M2.4 10 H17.6"
        stroke={hk.ink}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
