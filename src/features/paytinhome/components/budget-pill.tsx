import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { BUDGET_HEIGHT } from '../layout';
import { ph, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * "Set Budget" — the one call to action on the card, sitting half over its
 * top edge.
 *
 * It is a sibling of the card rather than a child of it, positioned by the
 * screen. A child hanging over its parent's rounded corner is the exact shape
 * Android clips, and the card needs no clip for anything else.
 */
export function BudgetPill({ label, onPress }: { label: string; onPress?: () => void }) {
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
          height: BUDGET_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: ph.ink,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 4,
          paddingRight: 12,
          opacity: held ? 0.85 : 1,
        }}
      >
        <View
          style={{
            width: BUDGET_HEIGHT - 8,
            height: BUDGET_HEIGHT - 8,
            borderRadius: radius.full,
            backgroundColor: ph.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="plus" size={14} color={ph.text} strokeWidth={2.4} />
        </View>
        <T variant="budget" color={ph.onInk} style={{ marginLeft: 7 }}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}
