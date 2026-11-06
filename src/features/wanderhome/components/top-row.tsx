import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { AVATAR } from '../layout';
import { ct, radius, type } from '../theme';
import { avatar, copy } from '../data/home';
import { T } from './text';

/** Who is travelling, and what they have banked. */
export function TopRow({ onProfile }: { onProfile?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Your profile" onPress={onProfile}>
        <View
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: AVATAR / 2,
            overflow: 'hidden',
            backgroundColor: ct.field,
          }}
        >
          <Image source={avatar} style={{ width: AVATAR, height: AVATAR }} contentFit="cover" />
        </View>
      </Pressable>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <T variant="hello" color={ct.dim} style={{ height: type.hello.line }}>
          {copy.hello}
        </T>
        <T variant="name" color={ct.onPage} style={{ height: type.name.line }}>
          {copy.name}
        </T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={copy.miles}>
        <View
          style={{
            height: 44,
            paddingHorizontal: 16,
            borderRadius: radius.pill,
            backgroundColor: ct.blue,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="miles" color={ct.onBlue} style={{ height: type.miles.line }}>
            {copy.miles}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
