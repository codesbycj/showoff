import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

const ITEMS: { id: string; icon: GlyphName; label: string }[] = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'markets', icon: 'chart', label: 'Markets' },
  { id: 'swap', icon: 'swap', label: 'Swap' },
  { id: 'cards', icon: 'cards', label: 'Cards' },
  { id: 'account', icon: 'gear', label: 'Account' },
];

type Props = {
  width: number;
  height: number;
  lift: number;
  radius: number;
  item: number;
  bottomInset: number;
  active?: string;
  onSelect?: (id: string) => void;
};

/**
 * The floating dock: a narrow centred pill, not a full-width bar.
 *
 * The reference's spans about two thirds of the screen and the market list
 * passes *behind* it — its XRP row is half-covered. Building it edge-to-edge
 * turned it into a generic tab bar and flattened the whole screen, which is
 * what the first pass did.
 *
 * It clears the home indicator rather than sitting on it, which R1b names as
 * the one legitimate exception to "no space at the foot". `lift` is the gap
 * above the safe area and is **not** added to `insets.bottom`: the system
 * already reserves that strip when the app is not edge-to-edge, and padding by
 * the inset on top of it counts it twice.
 *
 * Each item is a 36dp box with `hitSlop` carrying it past 44 (R7).
 *
 * The five icons are my call — the reference's are about eight pixels across
 * on its board and cannot be read.
 */
export function Dock({
  width,
  height,
  lift,
  radius,
  item,
  bottomInset,
  active = 'home',
  onSelect,
}: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        width,
        bottom: bottomInset + lift,
        height,
        borderRadius: radius,
        backgroundColor: ct.dock,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        shadowColor: '#000000',
        shadowOpacity: 0.55,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
      }}
    >
      {ITEMS.map((it) => {
        const on = it.id === active;
        return (
          <Pressable
            key={it.id}
            onPress={() => onSelect?.(it.id)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={it.label}
          >
            {({ pressed }) => (
              <View
                style={{
                  width: item,
                  height: item,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? ct.dockOn : 'transparent',
                  opacity: pressed ? 0.7 : 1,
                }}
              >
                <Glyph
                  name={it.icon}
                  size={18}
                  color={on ? ct.accentFg : ct.sub}
                  strokeWidth={on ? 2.2 : 1.9}
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
