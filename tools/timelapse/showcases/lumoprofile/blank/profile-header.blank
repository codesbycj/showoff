import { Image, Pressable, View } from 'react-native';

import { profile } from '../data/profile';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who this is, and the two things you can do about it.
 *
 * **The avatar is a photograph** (I4). Both buttons are 40dp with hit slop
 * past 44 (R7), and the primary one carries white on the deeper violet —
 * white on the board's brighter one is 2.9:1 and fails R4.
 */
export function ProfileHeader({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
      }}
    >
      {/* STEP 1.03 image
      <Image
        source={profile.avatar}
        style={{ width: 84, height: 84, borderRadius: 20 }}
        resizeMode="cover"
        accessibilityLabel={profile.name}
      />
      */}

      <View style={{ flex: 1, gap: 8 }}>
        <View>
          {/* STEP 1.04 name
          <T variant="display" numberOfLines={1}>
            {profile.name}
          </T>
          */}
          {/* STEP 1.05 handle
          <T variant="handle">{profile.handle}</T>
          */}
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {/* STEP 1.06 following
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={profile.following}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <View
              style={{
                height: 36,
                paddingHorizontal: 18,
                borderRadius: 18,
                backgroundColor: ct.violetDeep,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="btnOn">{profile.following}</T>
            </View>
          </Pressable>
          */}

          {/* STEP 1.07 message
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={profile.message}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <View
              style={{
                height: 36,
                paddingHorizontal: 18,
                borderRadius: 18,
                backgroundColor: ct.card,
                borderWidth: 1,
                borderColor: ct.line,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="btnOff">{profile.message}</T>
            </View>
          </Pressable>
          */}
        </View>
      </View>
    </View>
  );
}
