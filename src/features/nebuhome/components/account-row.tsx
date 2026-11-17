import { Image, Pressable, View } from 'react-native';

import { account } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is signed in, and the two controls beside them.
 *
 * **The avatar is a photograph** (I4). The board's is a 3D cartoon head — a
 * specific arrangement rather than an idea — so the subject is kept and the
 * medium changes.
 *
 * Both controls are 44dp of real box (R7); the board draws them at 38dp.
 */
export function AccountRow({ margin, height }: Props) {
  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.cardSoft,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* STEP 1.05 image
      <Image
        source={account.avatar}
        style={{ width: 44, height: 44, borderRadius: 22 }}
        resizeMode="cover"
        accessibilityLabel={account.name}
      />
      */}

      {/* STEP 1.06 welcome
      <View style={{ flex: 1 }}>
        <T variant="welcome">{account.welcome}</T>
        <T variant="name">{account.name}</T>
      </View>
      */}

      {/* STEP 1.07 "Search"
      <Pressable accessibilityRole="button" accessibilityLabel="Search">
        <View style={round}>
          <Glyph name="search" size={19} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.08 "Notifications"
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View style={round}>
          <Glyph name="bell" size={19} color={ct.ink} strokeWidth={1.8} />
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: ct.dot,
            }}
          />
        </View>
      </Pressable>
      */}
    </View>
  );
}
