import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { AVATAR } from '../layout';
import { ct, type } from '../theme';
import { avatar, copy } from '../data/home';
import { T } from './text';

/**
 * Who is here, and the way to their profile.
 *
 * **The reference's avatar is a 3D cartoon character.** That is a render, not
 * something to trace badly, and the rules put faces in photographs anyway —
 * so it is a portrait. Everything else about the row is the reference's.
 */
export function TopBar({ onProfile }: { onProfile?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <T variant="greeting" color={ct.ink} style={{ height: type.greeting.line }}>
          {copy.greeting}
        </T>
        <T variant="sub" color={ct.muted} style={{ height: type.sub.line, marginTop: 2 }}>
          {copy.welcome}
        </T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Your profile" onPress={onProfile}>
        <View
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: AVATAR / 2,
            overflow: 'hidden',
            backgroundColor: ct.hairline,
          }}
        >
          <Image source={avatar} style={{ width: AVATAR, height: AVATAR }} contentFit="cover" />
        </View>
      </Pressable>
    </View>
  );
}
