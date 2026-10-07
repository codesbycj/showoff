import { Pressable, View } from 'react-native';

import { type NavItem } from '../data/home';
import { ELEV, R, SP, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * The floating navigation capsule.
 *
 * Icon-only — this is the one dock across these showcases that carries no
 * labels at all, which is why the active state has to do more work: the icon
 * inverts into a solid white disc rather than just changing colour.
 *
 * The capsule is centred and capped at 340dp rather than filling the gutter,
 * which the export does with `max-w-[340px]`. On a 393dp screen that leaves it
 * visibly inset from both margins, and that inset is the design.
 *
 * The gap below it is the *larger* of the design's 24dp and the safe-area
 * inset, never their sum. Adding them stacked a full 24dp on top of a 46dp
 * gesture bar and floated the capsule ~70dp off the bottom edge on the device,
 * where the web render — which reports no inset at all — looked right.
 */
export function Dock({
  items,
  active,
  inset,
  onSelect,
}: {
  items: readonly NavItem[];
  active: string;
  inset: number;
  onSelect?: (item: NavItem) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: Math.max(inset, SP.lg),
        alignItems: 'center',
        paddingHorizontal: SP.margin,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 340,
          height: 64,
          borderRadius: R.full,
          backgroundColor: tx.primary,
          paddingHorizontal: SP.md,
          ...ELEV.floating,
          shadowOpacity: 0.24,
        }}
      >
        {items.map((item) => {
          const on = item.key === active;
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: R.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? tx.surface : 'transparent',
                }}
              >
                <Symbol
                  name={item.icon}
                  size={24}
                  color={on ? tx.primary : alpha(tx.onPrimary, 0.6)}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
