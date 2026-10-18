import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { HEADER_BUTTON, HEADER_GAP } from '../layout';
import { radius, sj } from '../theme';
import { Icon, type IconName } from './icon';
import { T } from './text';

/**
 * The header: the screen's name, and two round buttons.
 *
 * Ranged left with the buttons at the right, not centred: the reference does
 * it this way and it is the right call on a dark screen — a centred title with
 * two controls beside it has to be absolutely positioned to stay centred, and
 * here there is nothing to centre it against.
 */
export function AppBar({
  title,
  onSearch,
  onBell,
}: {
  title: string;
  onSearch?: () => void;
  onBell?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <T variant="title" color={sj.onDark}>
        {title}
      </T>
      <View style={{ flex: 1 }} />
      {/* STEP 1.03 a way to search
      <RoundButton name="search" onPress={onSearch} label="Search" />
      */}
      <View style={{ width: HEADER_GAP }} />
      {/* STEP 1.04 and anything waiting
      <RoundButton name="bell" onPress={onBell} label="Notifications" />
      */}
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
          backgroundColor: sj.raised,
          borderWidth: 1,
          borderColor: sj.raisedEdge,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.7 : 1,
        }}
      >
        <Icon name={name} size={17} />
      </View>
    </Pressable>
  );
}
