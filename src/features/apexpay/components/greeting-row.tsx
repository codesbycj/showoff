import { Image, Pressable, Text, View } from 'react-native';

import { ax, radius, type as t } from '../theme';
import { Symbol } from './symbol';

const AVATAR = require('../../../../assets/images/apexpay/avatar.jpg');

/**
 * Avatar, greeting and name on the left; a second bell on the right.
 *
 * Yes, a second bell — there is one in the app bar directly above this. That
 * is the export's own doing and it is kept, because the two are visibly
 * different objects: the bar's is `surface-container` with `on-surface-variant`
 * glyphs, this one is `surface-container-high` with `on-surface`, and this one
 * alone carries the unread dot.
 */
export function GreetingRow({ name, greeting }: { name: string; greeting: string }) {
  return (
    <View
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 44, height: 44 }}>
          <Image source={AVATAR} style={{ width: 44, height: 44, borderRadius: radius.full }} />
          {/*
            The ring is drawn as a border on a slightly larger box rather than
            with `ring-2`, which React Native has no equivalent for. The border
            takes the canvas colour, so it reads as a hole punched round the dot.
          */}
          <View
            style={{
              position: 'absolute',
              right: -1,
              bottom: -1,
              width: 14,
              height: 14,
              borderRadius: radius.full,
              borderWidth: 2,
              borderColor: ax.canvas,
              backgroundColor: ax.signal,
            }}
          />
        </View>

        <View>
          <Text style={[t.bodySm, { color: ax.inkMuted }]}>{greeting}</Text>
          <Text style={[t.headlineSm, { color: ax.ink }]}>{name}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.full,
          backgroundColor: ax.surfaceHigh,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="notifications" size={20} color={ax.ink} />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 8,
            height: 8,
            borderRadius: radius.full,
            backgroundColor: ax.signal,
          }}
        />
      </Pressable>
    </View>
  );
}
