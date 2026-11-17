import { Image, Pressable, View } from 'react-native';

import { account } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is signed in, and notifications.
 *
 * **The avatar is a photograph** (I4) — initials on a disc is a fallback
 * state, not a substitute.
 */
export function AccountRow({ margin, height }: Props) {
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
      {/* STEP 1.02 image
      <Image
        source={account.avatar}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        resizeMode="cover"
        accessibilityLabel={account.name}
      />
      */}

      {/* STEP 1.03 welcome
      <View style={{ flex: 1 }}>
        <T variant="welcome">{account.welcome}</T>
        <T variant="name">{account.name}</T>
      </View>
      */}

      {/* STEP 1.04 "Notifications"
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: ct.greenSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="bell" size={19} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
