import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { HEADER_BUTTON, HEADER_GAP } from '../layout';
import { radius, shadow, ss } from '../theme';
import { Icon, type IconName } from './icon';

/**
 * The header: a way back on the left, three ways on at the right.
 *
 * Buttons only — the title sits under them in the reference rather than
 * between them, which is what lets it be two lines of display.
 */
export function AppBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RoundButton name="back" onPress={onBack} label="Go back" />
      <View style={{ flex: 1 }} />
      <RoundButton name="plus" label="Add" />
      <View style={{ width: HEADER_GAP }} />
      <RoundButton name="share" label="Share" />
      <View style={{ width: HEADER_GAP }} />
      <RoundButton name="calendar" label="Calendar" />
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
          backgroundColor: ss.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.75 : 1,
          ...shadow.card,
        }}
      >
        <Icon name={name} size={17} />
      </View>
    </Pressable>
  );
}
