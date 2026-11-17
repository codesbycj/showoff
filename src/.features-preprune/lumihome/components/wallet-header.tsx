import { Image, Pressable, View } from 'react-native';

import { avatar, greeting } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; margin: number; avatarSize: number; control: number };

/**
 * Who is signed in, and the two things in the corner.
 *
 * The avatar is a **photograph** (I4) and carries explicit numeric width and
 * height: absolute insets alone make an `Image` paint nothing on native,
 * silently (Part 7).
 *
 * The notification dot sits **wholly inside** the bell's own box, so it can
 * never straddle an edge (R3).
 */
export function WalletHeader({ height, margin, avatarSize, control }: Props) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Image
        source={avatar}
        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
      />

      <View style={{ flex: 1 }}>
        <T variant="eyebrow">{greeting.eyebrow}</T>
        <T variant="hello">{greeting.hello}</T>
      </View>

      <Pressable hitSlop={6} accessibilityRole="button" accessibilityLabel="Notifications, 1 new">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph name="bell" size={21} color={ct.ink} />
            <View
              style={{
                position: 'absolute',
                // Wholly inside the bell's own box. Straddling its edge is the
                // shape R3 calls an accident, and it fired here at top 5.
                top: 10,
                right: 10,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: ct.badge,
                borderWidth: 1.5,
                borderColor: ct.white,
              }}
            />
          </View>
        )}
      </Pressable>

      <Pressable hitSlop={6} accessibilityRole="button" accessibilityLabel="Menu">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph name="grid" size={20} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
