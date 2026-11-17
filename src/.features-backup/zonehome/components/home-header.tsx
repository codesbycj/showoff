import { Image, Pressable, View } from 'react-native';

import { location, promo, search, texture } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  width: number;
  height: number;
  radius: number;
  margin: number;
  topInset: number;
  barH: number;
  gapBar: number;
  promoH: number;
};

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
              <View style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 }}>
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
              <View style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 }}>
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
    </View>
  );
}

type SearchProps = { margin: number; height: number; control: number; top: number };

/**
 * The search field, straddling the header's lower edge as the board draws it.
 *
 * R3 allows a control to sit inside a surface but not to straddle the edge of
 * content it covers — this crosses the header's *edge*, not any of its text,
 * and that is the one shape on this board where the overlap is the design.
 * Named in the handover.
 *
 * It is a `Pressable`, not a `TextInput`: this showcase is filmed, not typed
 * into, and a focused input would put a blinking caret in every frame.
 */
export function SearchBar({ margin, height, control, top }: SearchProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        top,
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <Pressable
        accessibilityRole="search"
        accessibilityLabel={search.placeholder}
        style={{ flex: 1 }}
      >
        {({ pressed }) => (
          <View
            style={{
              height,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 16,
              borderRadius: height / 2,
              backgroundColor: ct.field,
              opacity: pressed ? 0.85 : 1,
              shadowColor: '#2A1A14',
              shadowOpacity: 0.16,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 7,
            }}
          >
            <Glyph name="search" size={17} color={ct.sub} />
            <T variant="placeholder">{search.placeholder}</T>
          </View>
        )}
      </Pressable>

      <Pressable accessibilityRole="button" accessibilityLabel="Map view">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.brand,
              opacity: pressed ? 0.85 : 1,
              shadowColor: '#5C0A04',
              shadowOpacity: 0.26,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 7,
            }}
          >
            <Glyph name="map" size={19} color={ct.brandInk} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
