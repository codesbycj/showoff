import { Image, Pressable, View } from 'react-native';

import {
  addons,
  badge,
  cta,
  hero,
  item,
  options,
  plus,
  quantity,
  total,
  usd,
} from '../data/item';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

function Round({ glyph, label, size, onPress }: { glyph: GlyphName; label: string; size: number; onPress?: () => void }) {
  return (
    <Pressable hitSlop={8} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.white,
            opacity: pressed ? 0.7 : 1,
            shadowColor: '#2A1A14',
            shadowOpacity: 0.18,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
          }}
        >
          <Glyph name={glyph} size={17} color={ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

type HeroProps = { width: number; height: number; topInset: number; control: number; onBack: () => void };

/**
 * The dish.
 *
 * **A photograph, because a burger is a picture *of* something** (I4), and it
 * is the page's ground for its region (§5.5), so it may paint before the
 * controls over it are staged.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7).
 */
export function ItemHero({ width, height, topInset, control, onBack }: HeroProps) {
  return (
    <View style={{ width, height }}>
      <Image source={hero} style={{ width, height }} resizeMode="cover" />

      <View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          top: topInset + 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Round glyph="arrowUpRight" label="Share" size={control} />
          <Round glyph="search" label="Help" size={control} />
        </View>
      </View>
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** "#1 Most liked". A label, not a sentence (R5). */
export function LikedBadge({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'flex-start' }}>
      <View
        style={{
          height,
          paddingHorizontal: 10,
          borderRadius: height / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.tile,
        }}
      >
        <T variant="badge">{badge}</T>
      </View>
    </View>
  );
}

type TitleProps = { margin: number; nameH: number; metaH: number; priceH: number };

/** Name, calories and price. */
export function ItemTitle({ margin, nameH, metaH, priceH }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: nameH, justifyContent: 'center' }}>
        <T variant="name" numberOfLines={1}>
          {item.name}
        </T>
      </View>
      <View style={{ height: metaH, justifyContent: 'center' }}>
        <T variant="meta">{`${item.place} · ${item.calories} Cal`}</T>
      </View>
      <View style={{ height: priceH, justifyContent: 'center' }}>
        <T variant="price">{usd(item.price)}</T>
      </View>
    </View>
  );
}

/** What the thing is. One run, 69 characters — R5's ceiling is 110. */
export function ItemBlurb({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="blurb">{item.blurb}</T>
    </View>
  );
}

/** "Add ons for Burger" — the board writes "Bourger" (I1). */
export function AddonHead({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T variant="sectionTitle">{addons.title}</T>
        <View style={{ flex: 1 }} />
        <View
          style={{
            height: 22,
            paddingHorizontal: 9,
            borderRadius: 11,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.tile,
          }}
        >
          <T variant="optional">{addons.optional}</T>
        </View>
      </View>
      <T variant="sectionNote">{addons.note}</T>
    </View>
  );
}

type OptionProps = { margin: number; height: number; rowH: number; box: number };

/**
 * The add-ons.
 *
 * Each row is 42dp with `hitSlop` taking the real target past R7's 44 — the
 * board draws them smaller still, and inflating them to 44dp of empty space
 * would open exactly the gaps R1 exists to catch.
 */
export function AddonList({ margin, height, rowH, box }: OptionProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {options.map((o, i) => (
        <Pressable
          key={o.id}
          hitSlop={{ top: 2, bottom: 2, left: 0, right: 0 }}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: !!o.on }}
          accessibilityLabel={`${o.label}, ${plus(o.price)}`}
        >
          {({ pressed }) => (
            <View
              style={{
                height: rowH,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                borderBottomWidth: i === options.length - 1 ? 0 : 1,
                borderBottomColor: ct.hairline,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <View
                style={{
                  width: box,
                  height: box,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: o.on ? 0 : 1.5,
                  borderColor: ct.fieldEdge,
                  backgroundColor: o.on ? ct.brand : ct.white,
                }}
              >
                {o.on ? <Glyph name="check" size={13} color={ct.brandInk} strokeWidth={2.8} /> : null}
              </View>

              <T variant="option" style={{ flex: 1 }}>
                {o.label}
              </T>
              <T variant="optionPrice">{plus(o.price)}</T>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

type BarProps = { margin: number; height: number; radius: number; step: number; onAdd: () => void };

/**
 * The quantity and the primary action.
 *
 * **The button carries the total**, which is the item price plus the selected
 * add-ons times the quantity (R9) — the board's button carries no figure at
 * all, so nothing on its screen says what you are about to pay.
 *
 * The board also writes "Add to card" (I1).
 *
 * The fill and its shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function CartBar({ margin, height, radius, step, onAdd }: BarProps) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="Fewer">
          {({ pressed }) => (
            <View
              style={{
                width: step,
                height: step,
                borderRadius: step / 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: ct.fieldEdge,
                opacity: pressed ? 0.6 : 1,
              }}
            >
              <Glyph name="minus" size={14} color={ct.ink} strokeWidth={2.4} />
            </View>
          )}
        </Pressable>

        <T variant="qty">{quantity}</T>

        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="More">
          {({ pressed }) => (
            <View
              style={{
                width: step,
                height: step,
                borderRadius: step / 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: ct.fieldEdge,
                opacity: pressed ? 0.6 : 1,
              }}
            >
              <Glyph name="plus" size={14} color={ct.ink} strokeWidth={2.2} />
            </View>
          )}
        </Pressable>
      </View>

      <Pressable
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel={`${cta.label}, ${usd(total())}`}
        style={{ flex: 1 }}
      >
        {({ pressed }) => (
          <View
            style={{
              height,
              borderRadius: radius,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: ct.brand,
              opacity: pressed ? 0.88 : 1,
              shadowColor: '#5C0A04',
              shadowOpacity: 0.28,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 7,
            }}
          >
            <T variant="cta">{cta.label}</T>
            <T variant="cta">{`· ${usd(total())}`}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
