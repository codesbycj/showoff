import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { R, SP, TYPE, tx } from '../theme';

/**
 * The home greeting and the signed-in avatar.
 *
 * The presence dot straddles the avatar's lower-right corner and carries a 2dp
 * ring in the canvas colour, so the circle reads as cut out of the photo. That
 * ring is a border on the dot rather than a gap in the image, and the avatar is
 * rounded by its own `borderRadius` rather than by a clipping parent — a clip
 * on the path to the dot would take it with it, and Android clips more eagerly
 * than the web.
 */
export function GreetingHeader({
  hello,
  welcome,
  avatar,
}: {
  hello: string;
  welcome: string;
  avatar: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
        paddingTop: SP.md,
      }}
    >
      <View>
        <Text style={{ ...TYPE.headlineLg, color: tx.onSurface }}>{hello}</Text>
        <Text style={{ ...TYPE.bodyMd, color: tx.onSurfaceVariant }}>{welcome}</Text>
      </View>

      <View>
        <Image
          source={avatar}
          style={{ width: 48, height: 48, borderRadius: R.full }}
          contentFit="cover"
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 14,
            height: 14,
            borderRadius: R.full,
            backgroundColor: tx.secondary,
            borderWidth: 2,
            borderColor: tx.surface,
          }}
        />
      </View>
    </View>
  );
}
