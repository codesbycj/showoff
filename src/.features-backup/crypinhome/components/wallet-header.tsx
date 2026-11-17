import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { brand } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const AVATAR = require('../../../../assets/images/crypinhome/avatar.jpg');

type Props = { height: number; margin: number; avatar: number };

/**
 * The wordmark, a notification bell and the account avatar.
 *
 * The avatar is a photograph (I4) with an explicit numeric width and height —
 * absolute insets alone make an `Image` paint nothing on Android, silently
 * (RULES Part 7).
 *
 * Both controls are 44dp touch targets drawn smaller: the bell's disc is 36dp
 * with `hitSlop`, the avatar 34dp likewise. R7's fix for a control the
 * reference drew small is hit slop, and the handover says so.
 */
export function WalletHeader({ height, margin, avatar }: Props) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Glyph name="spark" size={18} color={ct.ink} />
        <T variant="brand">{brand}</T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Notifications">
          {({ pressed }) => (
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.disc,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <Glyph name="bell" size={17} color={ct.ink} strokeWidth={1.8} />
            </View>
          )}
        </Pressable>

        <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Your account">
          {({ pressed }) => (
            <Image
              source={AVATAR}
              style={{
                width: avatar,
                height: avatar,
                borderRadius: avatar / 2,
                opacity: pressed ? 0.7 : 1,
              }}
              contentFit="cover"
              transition={0}
              accessibilityLabel="Account avatar"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}
