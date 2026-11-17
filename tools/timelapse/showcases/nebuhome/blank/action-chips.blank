import { Pressable, View } from 'react-native';

import { actions } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * Receive, send, buy.
 *
 * **"Receive", not the board's "Recieve"** — I1 says fix the board's mistakes
 * silently and name them once in the handover.
 *
 * Each chip is 46dp tall, over R7's floor; the board's are 40.
 */
export function ActionChips({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap: 10 }}>
      {actions.map((action) => (
        <Pressable key={action.id} accessibilityRole="button" accessibilityLabel={action.label}>
          <View
            style={{
              height,
              borderRadius: radius,
              paddingHorizontal: 15,
              backgroundColor: ct.card,
              borderWidth: 1,
              borderColor: ct.line,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <T variant="chip">{action.label}</T>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 1,
                borderColor: ct.muted,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={action.glyph} size={13} color={ct.ink} strokeWidth={1.8} />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
