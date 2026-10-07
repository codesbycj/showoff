import { Pressable, Text, View } from 'react-native';

import type { NavItem } from '../data/chrome';
import { ELEV, FONT, R, SP, TYPE, alpha, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The floating navigation capsule.
 *
 * It is wider than the screen, and that is the design rather than a bug to fix.
 * Four labelled targets at 44dp with 16dp of side padding each come to about
 * 407dp inside a 393dp phone, so the capsule overhangs both edges by ~7dp and
 * the reference shows it: on the home feed the orange Home pill is cut off at
 * the left, on the profile the orange Profile pill is cut off at the right.
 * Centring it and letting it overflow is what reproduces that — the items carry
 * `flexShrink: 0` so Yoga keeps their natural width instead of squeezing them
 * back inside.
 *
 * The gap below is the *larger* of the design's 16dp and the safe-area inset,
 * never their sum. The export writes `pb-safe` on the wrapper and `mb-4` on the
 * capsule, which reads as "add them" — and on a device with a 34dp gesture bar
 * that floats the dock 50dp off the bottom edge, where the web render, which
 * reports no inset at all, looks right.
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
        bottom: Math.max(inset, SP.md),
        alignItems: 'center',
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          padding: SP.xs,
          borderRadius: R.full,
          backgroundColor: alpha(fa.onSurface, 0.9),
          ...ELEV.dock,
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
              accessibilityState={{ selected: on }}
              style={{ flexShrink: 0 }}
            >
              <View
                style={{
                  height: 44,
                  minWidth: 44,
                  paddingHorizontal: SP.md,
                  borderRadius: R.full,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  backgroundColor: on ? fa.primaryContainer : 'transparent',
                  ...(on ? ELEV.glow : null),
                }}
              >
                <Symbol
                  name={item.icon}
                  size={20}
                  color={on ? fa.onPrimary : fa.secondaryFixedDim}
                />
                <Text
                  style={{
                    ...TYPE.labelSm,
                    fontFamily: on ? FONT.bold : TYPE.labelSm.fontFamily,
                    color: on ? fa.onPrimary : fa.secondaryFixedDim,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
