import { Image, Pressable, View } from 'react-native';

import { account } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is signed in, and the two controls beside them.
 *
 * **The avatar is a photograph** (I4). Both controls are 44dp of real box
 * (R7); the board draws them at 38dp.
 */
export function FeedHeader({ margin, height }: Props) {
  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.card,
    borderWidth: 1,
    borderColor: ct.line,
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
      {/* STEP 1.03 image
      <Image
        source={account.avatar}
        style={{ width: 44, height: 44, borderRadius: 22 }}
        resizeMode="cover"
        accessibilityLabel={account.name}
      />
      */}

      {/* STEP 1.04 name
      <View style={{ flex: 1 }}>
        <T variant="name">{account.name}</T>
        <T variant="handle">{account.handle}</T>
      </View>
      */}

      {/* STEP 1.05 "Search"
      <Pressable accessibilityRole="button" accessibilityLabel="Search">
        <View style={round}>
          <Glyph name="search" size={19} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.06 "Notifications"
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View style={round}>
          <Glyph name="bell" size={19} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
