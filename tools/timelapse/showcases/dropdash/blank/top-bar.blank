import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { user } from '../data/dashboard';
import { AVATAR, HEADER_BUTTON, HEADER_GAP } from '../layout';
import { dd, radius } from '../theme';
import { FACES } from './faces';
import { Icon, type IconName } from './icon';
import { T } from './text';

/**
 * The header: who is on shift, and the two things they might need.
 *
 * The unread dot is a sibling positioned over the bell rather than a child of
 * it, so the button's own centring is undisturbed and nothing has to overflow
 * a clipped box.
 */
export function TopBar({ onHelp, onBell }: { onHelp?: () => void; onBell?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* STEP 1.03 a face for the account
      <Image
        source={FACES[0]}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.full }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      */}

      {/* STEP 1.04 and a name for it
      <View style={{ flex: 1, marginLeft: 11 }}>
        <T variant="eyebrow" color={dd.muted}>
          {user.eyebrow}
        </T>
        <T variant="name" color={dd.ink}>
          {user.name}
        </T>
      </View>
      */}

      {/* STEP 1.05 plus the two things they might need
      <RoundButton name="help" onPress={onHelp} label="Help" />
      */}
      <View style={{ width: HEADER_GAP }} />
      <View>
        <RoundButton name="bell" onPress={onBell} label="Notifications" />
        <View
          style={{
            position: 'absolute',
            right: 1,
            top: 1,
            width: 8,
            height: 8,
            borderRadius: radius.full,
            backgroundColor: dd.blue,
            borderWidth: 1.5,
            borderColor: dd.canvas,
          }}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

function RoundButton({
  name,
  onPress,
  label,
}: {
  name: IconName;
  onPress?: () => void;
  label: string;
}) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
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
          backgroundColor: dd.surface,
          borderWidth: 1,
          borderColor: dd.edge,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.7 : 1,
        }}
      >
        <Icon name={name} size={16} />
      </View>
    </Pressable>
  );
}
