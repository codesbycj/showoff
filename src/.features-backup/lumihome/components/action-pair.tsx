import { Pressable, View } from 'react-native';

import { actions } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; disc: number };

/**
 * Pay and Deposit.
 *
 * Both are 52dp, so each clears R7 on its own. Each fill and its shadow sit in
 * one style object — a `Platform.select` for a shadow is exactly what the web
 * render cannot check (§4.4).
 *
 * The lime button sets its label in the darkest green: lime carries text
 * nowhere on this board, because lime on white is 1.6:1 and fails R4.
 */
export function ActionPair({ margin, height, radius, disc }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 14 }}>
      {actions.map((a) => {
        const deep = a.tone === 'deep';
        return (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: radius,
                  backgroundColor: deep ? ct.deep : ct.lime,
                  opacity: pressed ? 0.88 : 1,
                  shadowColor: deep ? '#0D2409' : '#6E9B3C',
                  shadowOpacity: 0.22,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 5,
                }}
              >
                <T variant={deep ? 'actionDeep' : 'actionLime'}>{a.label}</T>
                <View
                  style={{
                    width: disc,
                    height: disc,
                    borderRadius: disc / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: deep ? ct.lime : ct.deep,
                  }}
                >
                  <Glyph
                    name={a.glyph}
                    size={15}
                    color={deep ? ct.deep : ct.lime}
                    strokeWidth={2}
                  />
                </View>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
