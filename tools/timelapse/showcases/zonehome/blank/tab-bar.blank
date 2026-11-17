import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  height: number;
  bottomInset: number;
  cart: number;
  cartLift: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The tab bar, with the cart raised out of it.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice.
 *
 * The raised cart is a child of its own slot rather than a floating sibling,
 * so it cannot straddle the bar's edge in a way R3 would call an accident — it
 * sits over the bar's top edge by design, covering no text.
 */
export function TabBar({ height, bottomInset, cart, cartLift, value, onSelect }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottomInset,
        backgroundColor: ct.white,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      {/* STEP 1.26 label
      <View style={{ height, flexDirection: 'row', alignItems: 'center' }}>
        {tabs.map((t) => {
          const on = t.id === value;
          const raised = t.id === 'cart';
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
              style={{ flex: 1 }}
            >
              {({ pressed }) => (
                <View style={{ alignItems: 'center', gap: 4, opacity: pressed ? 0.7 : 1 }}>
                  {raised ? (
                    <View
                      style={{
                        width: cart,
                        height: cart,
                        borderRadius: cart / 2,
                        marginTop: -cartLift,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ct.brand,
                        borderWidth: 4,
                        borderColor: ct.white,
                        shadowColor: '#5C0A04',
                        shadowOpacity: 0.26,
                        shadowRadius: 12,
                        shadowOffset: { width: 0, height: 5 },
                        elevation: 7,
                      }}
                    >
                      <Glyph name={t.glyph} size={20} color={ct.brandInk} />
                    </View>
                  ) : (
                    <Glyph
                      name={t.glyph}
                      size={20}
                      color={on ? ct.brand : ct.sub}
                      strokeWidth={1.8}
                    />
                  )}
                  <T variant={on ? 'tabOn' : 'tab'}>{t.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
      */}
    </View>
  );
}
