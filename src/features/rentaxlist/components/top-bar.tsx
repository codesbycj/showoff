import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { header } from '../data/browse';
import { AVATAR, BELL } from '../layout';
import { radius, rx } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The header: whose app, where you are, and what is waiting.
 *
 * The avatar is initials on the brand yellow rather than a photograph.
 * Photographs of real people are not redistributable, and this is what a real
 * app draws for an account with no picture.
 *
 * Both the unread dot and the add badge are siblings positioned over their
 * targets rather than children of them, so neither disturbs the centring of
 * what it marks and nothing has to overflow a clipped box.
 */
export function TopBar({ onBell }: { onBell?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <T variant="brand" color={rx.onDark}>
          {header.brand}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: radius.full,
              backgroundColor: rx.cardWarm,
            }}
          />
          <T variant="place" color={rx.onDarkMuted}>
            {header.place}
          </T>
        </View>
      </View>

      <Pressable
        onPress={onBell}
        onPressIn={() => setHeld(true)}
        onPressOut={() => setHeld(false)}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <View
          style={{
            width: BELL,
            height: BELL,
            borderRadius: radius.full,
            backgroundColor: rx.raised,
            borderWidth: 1,
            borderColor: rx.raisedEdge,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.7 : 1,
          }}
        >
          <Icon name="bell" size={15} />
        </View>
      </Pressable>

      <View style={{ marginLeft: 10 }}>
        <View
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: radius.full,
            backgroundColor: rx.cardWarm,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="flag" color={rx.onCard} style={{ fontSize: 11 }}>
            {header.initials}
          </T>
        </View>
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 14,
            height: 14,
            borderRadius: radius.full,
            backgroundColor: rx.badge,
            borderWidth: 2,
            borderColor: rx.canvas,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="plus" size={8} color={rx.onCard} strokeWidth={3} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          right: AVATAR + 6,
          top: 0,
          width: 7,
          height: 7,
          borderRadius: radius.full,
          backgroundColor: rx.alert,
        }}
        pointerEvents="none"
      />
    </View>
  );
}
