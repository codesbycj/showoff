import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { foot } from '../data/flow';
import { FOOT_BUTTON, FOOT_GAP } from '../layout';
import { radius, sc, shadow } from '../theme';
import { Icon } from './icon';

/**
 * The three round controls at the foot of the screen.
 *
 * One of them is dark. That is the reference's own emphasis — scheduling is
 * what this screen is for — and it comes from the data rather than from a
 * position, so reordering them cannot leave the wrong one filled in.
 */
export function ChromeBar({ onSelect }: { onSelect?: (key: string) => void }) {
  const [held, setHeld] = useState<string | null>(null);

  return (
    <View style={{ flexDirection: 'row', gap: FOOT_GAP }}>
      {/* STEP 1.17 three of them
      {foot.map((f) => (
        <Pressable
          key={f.key}
          onPress={() => onSelect?.(f.key)}
          onPressIn={() => setHeld(f.key)}
          onPressOut={() => setHeld(null)}
          accessibilityRole="button"
          accessibilityLabel={f.key}
        >
          <View
            style={{
              width: FOOT_BUTTON,
              height: FOOT_BUTTON,
              borderRadius: radius.full,
              backgroundColor: f.dark ? sc.active : sc.surface,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held === f.key ? 0.8 : 1,
              ...shadow.card,
            }}
          >
            <Icon name={f.key} size={19} color={f.dark ? sc.onActive : sc.ink} />
          </View>
        </Pressable>
      ))}
      */}
    </View>
  );
}
