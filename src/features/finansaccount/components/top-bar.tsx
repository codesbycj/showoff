import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { user } from '../data/account';
import { AVATAR, BELL } from '../layout';
import { fn, radius, shadow } from '../theme';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { T } from './text';

/**
 * The header: who you are, and anything waiting for you.
 *
 * The avatar is a free-licensed portrait, bundled and credited in
 * `assets/images/finansaccount/CREDITS.md`.
 */
export function TopBar({ onBell }: { onBell?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* STEP 1.03 a face for the account
      <Avatar face={0} size={AVATAR} />
      */}

      {/* STEP 1.04 and a name for it
      <View style={{ flex: 1, marginLeft: 10 }}>
        <T variant="eyebrow" color={fn.muted}>
          {user.eyebrow}
        </T>
        <T variant="name" color={fn.ink}>
          {user.name}
        </T>
      </View>
      */}

      {/* STEP 1.05 plus anything waiting
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
            backgroundColor: fn.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.75 : 1,
            ...shadow.card,
          }}
        >
          <Icon name="bell" size={17} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
