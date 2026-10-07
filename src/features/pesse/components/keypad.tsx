import { Pressable, Text, View } from 'react-native';

import { KEYPAD, type Key } from '../data/send';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The numeric keypad.
 *
 * Twelve tiles in a soft grey well, three to a row. The row structure comes out
 * of the list rather than being written three times — the last row is `000`,
 * `0` and a backspace, so hard-coding rows means hard-coding that exception
 * too.
 *
 * `lit` marks one key in lime. The reference's render catches a key mid-press,
 * and a keypad screenshot with no key pressed reads as a different design — so
 * the pressed state is a prop the screen sets, not only a touch response.
 */
export function Keypad({ lit, onKey }: { lit?: string; onKey?: (key: Key) => void }) {
  return (
    <View
      style={{
        backgroundColor: ps.surfaceLow,
        borderRadius: R.lg,
        padding: 12,
        gap: 10,
      }}
    >
      {[0, 3, 6, 9].map((start) => (
        <View key={start} style={{ flexDirection: 'row', gap: 10 }}>
          {KEYPAD.slice(start, start + 3).map((key, i) => {
            const on = key.kind === 'digit' && key.value === lit;
            return (
              <Pressable
                key={key.kind === 'digit' ? key.value : `back-${i}`}
                style={{ flex: 1 }}
                onPress={() => onKey?.(key)}
                accessibilityRole="button"
                accessibilityLabel={key.kind === 'digit' ? key.value : 'Backspace'}
              >
                <View
                  style={[
                    {
                      height: 56,
                      borderRadius: R.base,
                      backgroundColor: on ? ps.lime : ps.surfaceLowest,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    LEVEL.container,
                  ]}
                >
                  {key.kind === 'digit' ? (
                    <Text style={[TYPE.headlineMd, { color: on ? ps.onLime : ps.onSurface }]}>
                      {key.value}
                    </Text>
                  ) : (
                    <Symbol name="backspace" size={22} color={ps.onSurface} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
