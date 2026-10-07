import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The signed-in greeting, and the feed's own notification button.
 *
 * The bell appears twice on this screen — once in the app bar and once here —
 * and only this one carries the unread dot. That is the export's doing, not a
 * mistake in the rebuild, and it is what the reference renders.
 *
 * The dot is a `ring-2 ring-surface` in the export, which draws *outside* the
 * 10dp circle rather than inside it. So the View is 14dp with a 2dp border in
 * the canvas colour and sits 8dp in from the button's top-right corner, which
 * puts the 10dp of fill exactly where the export's `top-2.5 right-2.5` does.
 *
 * `tracking-normal` on the kicker overrides the type scale's own `0.02em`, so
 * the label is set at zero tracking rather than at `labelSm`'s.
 */
export function GreetingRow({
  hello,
  name,
  avatar,
  onNotifications,
}: {
  hello: string;
  name: string;
  avatar: number;
  onNotifications?: () => void;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SP.marginMobile,
        paddingTop: SP.sm,
        paddingBottom: SP.gutterMobile,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.gutterMobile, flex: 1 }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainer,
            ...ELEV.card,
          }}
        >
          <Image
            source={avatar}
            style={{ width: 48, height: 48, borderRadius: R.full }}
            contentFit="cover"
          />
        </View>

        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0, color: fa.secondary }}>{hello}</Text>
          <Text numberOfLines={1} style={{ ...TYPE.headlineSm, color: fa.onSurface }}>
            {name}
          </Text>
        </View>
      </View>

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
            backgroundColor: fa.surfaceContainerLow,
            alignItems: 'center',
            justifyContent: 'center',
            ...ELEV.card,
          }}
        >
          <Symbol name="notifications" size={22} />
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 14,
              height: 14,
              borderRadius: R.full,
              borderWidth: 2,
              borderColor: fa.surface,
              backgroundColor: fa.primaryContainer,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}
