import { Image, Pressable, View } from 'react-native';

import { day } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The date, the greeting and the athlete.
 *
 * **The avatar is a photograph** (I4), ringed by the streak badge the board
 * draws under it. The badge sits below the disc rather than on it, so it never
 * straddles the face it belongs to (R3).
 */
export function DayHeader({ margin, height }: Props) {
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
      {/* STEP 1.02 date
      <View style={{ flex: 1 }}>
        <T variant="date">{day.date}</T>
        <T variant="greeting">{day.greeting}</T>
      </View>
      */}

      {/* STEP 1.03 "Your profile"
      <Pressable accessibilityRole="button" accessibilityLabel="Your profile">
        <View style={{ width: 58, height: 66, alignItems: 'center' }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              borderWidth: 2,
              borderColor: ct.violet,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={day.avatar}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              resizeMode="cover"
            />
          </View>

          <View
            style={{
              marginTop: -9,
              height: 19,
              paddingHorizontal: 7,
              borderRadius: 10,
              backgroundColor: ct.lime,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Glyph name="flame" size={10} color={ct.onLime} />
            <T variant="badge">{day.streak}</T>
          </View>
        </View>
      </Pressable>
      */}
    </View>
  );
}
