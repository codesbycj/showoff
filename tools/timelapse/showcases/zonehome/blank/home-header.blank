import { Image, Pressable, View } from 'react-native';

import { location, promo, texture } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { Props } from './_home-header-shared';

/**
 * The dark header: where it is going, and what is off.
 *
 * **The fill and the photograph are on an absolutely-filled child**, so a
 * reveal that stages the location row and the promo does not open on a solid
 * black sheet (§5.5 / I9). The clip lives on that child and `elevation` does
 * not: Android is unreliable with `overflow: 'hidden'` and `elevation` on the
 * same View (Part 7).
 *
 * The texture is a **photograph** (I4) — the board's header is a photographed
 * spread, not a drawn pattern. It sits under a scrim because the copy over it
 * has to clear 4.5:1 (R4).
 *
 * The promo says "15%" and "EXTRA DISCOUNT" and one short line. R5: a unit, a
 * count, a state — never a sentence the design does not have.
 */
export function HomeHeader({
  width,
  height,
  radius,
  margin,
  topInset,
  barH,
  gapBar,
  promoH,
}: Props) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.02 image
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
          overflow: 'hidden',
          backgroundColor: ct.header,
        }}
      >
        <Image source={texture} style={{ width, height }} resizeMode="cover" />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.headerScrim,
          }}
        />
      </View>
      */}

      {/* STEP 1.03 "Menu"
      <View style={{ paddingTop: topInset }}>
        <View
          style={{
            height: barH,
            marginHorizontal: margin,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Menu">
            {({ pressed }) => (
              <View
                style={{
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.6 : 1,
                }}
              >
                <Glyph name="menu" size={20} color={ct.onDark} />
              </View>
            )}
          </Pressable>

          <Pressable
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`${location.label}, ${location.value}`}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View style={{ alignItems: 'center', opacity: pressed ? 0.7 : 1 }}>
                <T variant="locLabel">{location.label}</T>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <T variant="locValue">{location.value}</T>
                  <Glyph name="chevronDown" size={13} color={ct.onDark} strokeWidth={2.1} />
                </View>
              </View>
            )}
          </Pressable>

          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Notifications">
            {({ pressed }) => (
              <View
                style={{
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.6 : 1,
                }}
              >
                <Glyph name="bell" size={19} color={ct.onDark} />
              </View>
            )}
          </Pressable>
        </View>

        <View style={{ height: gapBar }} />

        <View
          style={{
            height: promoH,
            marginHorizontal: margin,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <T variant="promoValue">{promo.value}</T>
          <View style={{ flex: 1 }}>
            <T variant="promoLabel">{promo.label}</T>
            <T variant="promoLine">{promo.line}</T>
          </View>
        </View>
      </View>
      */}
    </View>
  );
}
