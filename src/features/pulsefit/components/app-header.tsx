import { Image, Pressable, Text, View, type ImageSourcePropType } from 'react-native';

import { BrandMark } from './brand-mark';
import { Symbol } from './symbol';
import { HEADER_HEIGHT, MARGIN } from '../layout';
import { LEVEL, R, TYPE, pf } from '../theme';

/**
 * The pinned header: mark, wordmark, bell, avatar.
 *
 * 64dp tall, directly under the status bar, on the page's own `#F7F9FB` with
 * a `0 1px 8px` hairline shadow under it.
 *
 * The export paints it at 85% of that same hex over a body of the same hex and
 * blurs what passes behind — which composites to exactly `#F7F9FB` while the
 * page is at rest, and the page is at rest in every frame that gets measured.
 * Painting it opaque is therefore pixel-identical at the top of the scroll and
 * better behaved below it: a `backdrop-filter` is one of the things the web
 * harness renders and the device does not.
 *
 * The bell's tap target is 44dp but its glyph is 22, so the group's right edge
 * is the avatar's, which lands on the 16dp margin like everything else.
 */
export function AppHeader({
  brand,
  title,
  avatar,
  onNotifications,
  onProfile,
}: {
  brand: string;
  title: string;
  avatar: ImageSourcePropType;
  onNotifications?: () => void;
  onProfile?: () => void;
}) {
  return (
    <View
      style={[
        {
          height: HEADER_HEIGHT,
          paddingHorizontal: MARGIN,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: pf.canvas,
        },
        LEVEL.header,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <BrandMark size={32} />

        <View>
          <Text style={[TYPE.brandOverline, { color: pf.inkVariant, textTransform: 'uppercase' }]}>
            {brand}
          </Text>
          <Text style={[TYPE.brandTitle, { color: pf.ink }]}>{title}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Pressable
          onPress={onNotifications}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Symbol name="notifications" size={22} color={pf.inkVariant} />
          </View>
        </Pressable>

        <Pressable onPress={onProfile} accessibilityRole="button" accessibilityLabel="Profile">
          <Image
            source={avatar}
            style={[{ width: 32, height: 32, borderRadius: R.full }, LEVEL.avatarSm]}
          />
        </Pressable>
      </View>
    </View>
  );
}
