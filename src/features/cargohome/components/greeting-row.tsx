import { Image, Pressable, View, type ImageSourcePropType } from 'react-native';

import { Icon } from './icon';
import { T } from './text';
import { AVATAR, ROUND_BUTTON } from '../layout';
import { radius, cg } from '../theme';

/**
 * Who is signed in, where they are, and the way to their alerts.
 *
 * The avatar and the bell are fixed sizes at either end and the name takes
 * whatever is left, so a longer name truncates rather than pushing the bell
 * off the edge.
 */
export function GreetingRow({
  greeting,
  location,
  avatar,
  onBell,
}: {
  greeting: string;
  location: string;
  avatar: ImageSourcePropType;
  onBell?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {/* STEP 1.05 put a face to the account, and a name beside it
      <View
        style={{
          width: AVATAR,
          height: AVATAR,
          borderRadius: radius.full,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: cg.surface,
        }}
      >
        <Image
          source={avatar}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          accessible
          accessibilityRole="image"
          accessibilityLabel={greeting}
        />
      </View>
      */}

      {/* STEP 1.06 the name, and where they are
      <View style={{ flex: 1 }}>
        <T variant="greeting" color={cg.ink} numberOfLines={1}>
          {greeting}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 }}>
          <Icon name="pin" size={13} color={cg.muted} />
          <T variant="meta" color={cg.muted} numberOfLines={1}>
            {location}
          </T>
        </View>
      </View>
      */}

      {/* STEP 1.07 and somewhere for alerts to land
      <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: ROUND_BUTTON,
            height: ROUND_BUTTON,
            borderRadius: radius.full,
            backgroundColor: cg.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="bell" size={19} color={cg.ink} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
