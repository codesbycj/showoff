import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AVATAR, BELL } from '../layout';
import { ph, radius, shadow } from '../theme';
// STEP 1.03 a face for the account
// import { Avatar } from './avatar';
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
      {/* STEP 1.04 on the left
      <Avatar face={0} size={AVATAR} />
      */}

      {/* STEP 1.05 the name and the greeting
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
      */}

      {/* STEP 1.06 and anything waiting
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
            // MISTAKE 1.07 the bell came in sitting low
            marginTop: 10,
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
      */}

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
      {/* STEP 1.08 one more unread | FIX 1.09 one bell, one dot
      <View style={{ position: 'absolute', right: 30, top: 4, width: 8, height: 8, borderRadius: radius.full, backgroundColor: ph.alert }} />
      */}

    </View>
  );
}
