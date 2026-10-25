import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AVATAR, BELL } from '../layout';
import { ph, radius, shadow } from '../theme';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { T } from './text';
import { WaveGlyph } from './wave-glyph';

/**
 * The header: who you are, and the one thing that might be waiting for you.
 *
 * The bell's unread dot is drawn as a sibling positioned over the button
 * rather than inside it, so the button's own centring is not disturbed by a
 * second child — and so nothing has to overflow a clipped box, which Android
 * does not forgive next to an elevation.
 */
export function TopBar({
  name,
  greeting,
  onBell,
}: {
  name: string;
  greeting: string;
  onBell?: () => void;
}) {
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar face={0} size={AVATAR} />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <T variant="eyebrow" color={ph.muted}>
          {name}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="greeting" color={ph.text}>
            {greeting}
          </T>
          <View style={{ marginLeft: 6 }}>
            <WaveGlyph size={17} />
          </View>
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
            backgroundColor: ph.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.75 : 1,
            ...shadow.soft,
          }}
        >
          <Icon name="bell" size={18} color={ph.text} />
        </View>
      </Pressable>

      <View
        style={{
          position: 'absolute',
          right: 8,
          top: 6,
          width: 8,
          height: 8,
          borderRadius: radius.full,
          backgroundColor: ph.alert,
        }}
        pointerEvents="none"
      />
    </View>
  );
}
