import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand } from '../data/journeys';
import { HEADER_AVATAR, HEADER_BUTTON, HEADER_GAP } from '../layout';
import { radius, sg } from '../theme';
import { FACES } from './faces';
import { Icon, type IconName } from './icon';
import { T } from './text';

/**
 * The header: the product's mark, what is waiting, and whose account it is.
 *
 * The mark is three stacked plates drawn in `react-native-svg`. A wordmark's
 * glyph is small, flat and geometric — squarely in drawing range — and
 * drawing it keeps it sharp at any size and ships no file.
 *
 * The unread dots are siblings positioned over their buttons rather than
 * children of them, so the glyph's own centring is undisturbed.
 */
export function TopBar() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path d="M12 2.6 L22 7.2 L12 11.8 L2 7.2 Z" fill={sg.ink} />
        <Path d="M12 11 L22 15.6 L12 20.2 L2 15.6 Z" fill={sg.ink} opacity={0.55} />
      </Svg>
      <T variant="wordmark" color={sg.ink} style={{ marginLeft: 7, flex: 1 }}>
        {brand.name}
      </T>

      <DotButton name="mail" label="Messages" />
      <View style={{ width: HEADER_GAP }} />
      <DotButton name="bell" label="Notifications" />
      <View style={{ width: HEADER_GAP }} />

      <Image
        source={FACES[1]}
        style={{ width: HEADER_AVATAR, height: HEADER_AVATAR, borderRadius: radius.full }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

function DotButton({ name, label }: { name: IconName; label: string }) {
  const [held, setHeld] = useState(false);

  return (
    <View>
      <Pressable
        onPressIn={() => setHeld(true)}
        onPressOut={() => setHeld(false)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <View
          style={{
            width: HEADER_BUTTON,
            height: HEADER_BUTTON,
            borderRadius: radius.full,
            backgroundColor: sg.chip,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.7 : 1,
          }}
        >
          <Icon name={name} size={16} />
        </View>
      </Pressable>

      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 9,
          height: 9,
          borderRadius: radius.full,
          backgroundColor: sg.alert,
          borderWidth: 1.5,
          borderColor: sg.canvas,
        }}
        pointerEvents="none"
      />
    </View>
  );
}
