import { Pressable, View } from 'react-native';

import { dish } from '../data/dish';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { top: number };

/**
 * How many bowls, as the board poses it: a vertical pill floating on the left
 * edge of the hero.
 *
 * Each disc is a **sibling** of the next, never nested - a `role="button"`
 * inside another is torn apart by the static web build's HTML parser (RULES
 * Part 7). The pill's own fill lives on an absolutely-filled child so an
 * emptied pill paints nothing in frame one of the reveal (I9).
 */
export function QtyPill({ top }: Props) {
  return (
    <View style={{ position: 'absolute', left: 0, top }}>
      <View
        style={{
          width: 58,
          borderTopRightRadius: 26,
          borderBottomRightRadius: 26,
          alignItems: 'center',
          paddingVertical: 8,
          gap: 6,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderTopRightRadius: 26,
            borderBottomRightRadius: 26,
          }}
        />

        <Pressable accessibilityRole="button" accessibilityLabel="One more">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="plus" size={16} color={ct.onAccent} strokeWidth={2.1} />
          </View>
        </Pressable>

        {/* STEP 1.06 t
        <T variant="qty">{String(dish.qty).padStart(2, '0')}</T>
        */}

        {/* STEP 1.07 "One fewer"
        <Pressable accessibilityRole="button" accessibilityLabel="One fewer">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.14)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="minus" size={16} color={ct.onDark} strokeWidth={2.1} />
          </View>
        </Pressable>
        */}
      </View>
    </View>
  );
}
