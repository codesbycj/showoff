import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { vs } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * "Aug 2026" and its chevron, on the right of the spending heading.
 *
 * Its own component rather than markup inside the heading, so the heading
 * stays a heading — and so the control that changes the whole screen's period
 * is one named thing rather than two elements that happen to sit together.
 */
export function PeriodPicker({ label, onPress }: { label: string; onPress?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={`Period: ${label}`}
      style={{ opacity: held ? 0.6 : 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <T variant="sectionMeta" color={vs.inkSoft}>
          {label}
        </T>
        <Icon name="period" size={15} color={vs.muted} strokeWidth={2} />
      </View>
    </Pressable>
  );
}
