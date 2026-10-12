import { Image, Pressable, Text, View } from 'react-native';

import { APP_BAR_HEIGHT, APP_BAR_PADDING } from '../layout';
import { ax, radius, shadow, type as t } from '../theme';
import { BrandMark } from './brand-mark';
import { Symbol } from './symbol';

const AVATAR = require('../../../../assets/images/apexpay/avatar-bar.jpg');

/**
 * The fixed bar across the top: mark, wordmark, Pro chip, bell, avatar.
 *
 * It holds to a 20dp side padding (`px-margin`) where the page below it uses
 * 16 (`px-margin-mobile`). That is the design's own inconsistency, not a slip
 * — the bar's content sits four points wider than everything under it, and
 * matching the page instead is immediately visible as the mark and the avatar
 * drifting inwards.
 *
 * On the real thing this is translucent over a blur. Here it is opaque: the
 * screen does not scroll anything under it at rest, so the blur would have
 * nothing to do but cost a frame.
 */
export function AppBar() {
  return (
    <View
      style={{
        height: APP_BAR_HEIGHT,
        paddingHorizontal: APP_BAR_PADDING,
        backgroundColor: ax.appBar,
        boxShadow: shadow.appBar,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* STEP 1.03 the mark
        <BrandMark size={32} />
        */}
        {/* STEP 1.04 and the name beside it
        <Text style={[t.headlineSm, { color: ax.ink }]}>ApexPay</Text>
        */}
        {/* STEP 1.05 the plan chip
        <View
          style={{
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: radius.full,
            backgroundColor: ax.surfaceHigh,
          }}
        >
          <Text style={[t.labelSm, { color: ax.inkVariant }]}>PRO</Text>
        </View>
        */}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* STEP 1.06 somewhere for alerts to land
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.full,
            backgroundColor: ax.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="notifications" size={20} color={ax.inkVariant} />
        </Pressable>
        */}

        {/* STEP 1.07 and the face of whoever is signed in
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={AVATAR} style={{ width: 32, height: 32, borderRadius: radius.full }} />
          <View
            style={{
              position: 'absolute',
              right: 6,
              bottom: 6,
              width: 8,
              height: 8,
              borderRadius: radius.full,
              backgroundColor: ax.signal,
            }}
          />
        </View>
        */}
      </View>
    </View>
  );
}
