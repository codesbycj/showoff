import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';
import { VoltMark } from './volt-mark';

/**
 * The wallet's top bar — the one screen in the showcase whose header carries
 * content; the other four leave it empty and use it only as a spacer.
 *
 * The mark is the traced-free SVG rather than the hot-linked raster the export
 * uses. At 32dp a 1024px plate would be resampled down through a dark backdrop
 * it brings with it.
 *
 * The avatar's lime ring is a `borderWidth` on the image's own wrapper, not a
 * shadow: `ring-2` in the export is a real ring, and a glow alone would vanish
 * on Android where coloured shadows are not drawn.
 */
export function WalletHeader({
  greeting,
  title,
  avatar,
  onNotifications,
}: {
  greeting: string;
  title: string;
  avatar: number;
  onNotifications?: () => void;
}) {
  return (
    <View
      style={{
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
        <VoltMark size={32} />
        <View style={{ flexShrink: 1 }}>
          <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
            {greeting}
          </Text>
          <Text numberOfLines={1} style={{ ...TYPE.headlineMd, color: vt.primary }}>
            {title}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
        <Pressable
          onPress={onNotifications}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: alpha(vt.surfaceContainerHigh, 0.6),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="notifications" size={22} color={vt.onSurface} />
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 8,
                height: 8,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
              }}
            />
          </View>
        </Pressable>

        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: R.full,
            borderWidth: 2,
            borderColor: vt.primaryFixed,
            backgroundColor: vt.surfaceContainerHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={avatar}
            style={{ width: 32, height: 32, borderRadius: R.full }}
            contentFit="cover"
          />
        </View>
      </View>
    </View>
  );
}
