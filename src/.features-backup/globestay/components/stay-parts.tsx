import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  about,
  actions,
  gallery,
  hero,
  includes,
  overview,
  stay,
  total,
  unit,
  usd,
} from '../data/stay';
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
            backgroundColor: 'rgba(255,255,255,0.88)',
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={18} color={ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

type HeroProps = { width: number; height: number; topInset: number; control: number; onBack: () => void };

/**
 * The place.
 *
 * **A photograph, because a lake is a picture *of* somewhere** (I4), and it is
 * the page's ground for its region (§5.5), so it may paint before the controls
 * over it are staged.
 *
 * The board heads its own detail screen "Lake Como" over a photograph of
 * Venice; this one is a lake under mountains, so the picture agrees with the
 * name (R9, I1).
 */
export function StayHero({ width, height, topInset, control, onBack }: HeroProps) {
  return (
    <View style={{ width, height }}>
      <Image source={hero} style={{ width, height }} resizeMode="cover" />

      <View
        style={{
          position: 'absolute',
          left: 18,
          right: 18,
          top: topInset + 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        <Round glyph="more" label="More" size={control} />
      </View>
    </View>
  );
}

type TitleProps = { margin: number; height: number };

/** The name, the rating and the rate. */
export function StayTitle({ margin, height }: TitleProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="place" numberOfLines={1}>
          {stay.name}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Glyph name="star" size={12} color={ct.star} />
          <T variant="rating">{stay.rating.toFixed(1)}</T>
          <T variant="meta">{`(${stay.reviews}) · ${stay.country}`}</T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <T variant="price">{usd(stay.rate)}</T>
        <T variant="priceUnit">{unit}</T>
      </View>
    </View>
  );
}

type ChipProps = { margin: number; height: number };

/** What the price includes. */
export function IncludeRow({ margin, height }: ChipProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 10 }}>
      {includes.map((i) => (
        <View
          key={i.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            height,
            paddingHorizontal: 14,
            borderRadius: height / 2,
            borderWidth: 1,
            borderColor: ct.cardEdge,
            backgroundColor: ct.white,
          }}
        >
          <Glyph name={i.glyph} size={15} color={ct.ink} strokeWidth={1.7} />
          <T variant="chip">{i.label}</T>
        </View>
      ))}
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** "Schedule Overview" — the board writes "Scehdule" (I1). */
export function OverviewTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{overview.title}</T>
    </View>
  );
}

/** One run, 100 characters — R5's ceiling is 110, and the board's own
 *  paragraph is cut off mid-word by the bottom of its artboard. */
export function AboutBlock({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="about">{about}</T>
    </View>
  );
}

type RailProps = { margin: number; height: number; width: number; radius: number };

/**
 * The other shots.
 *
 * **Mine, not the board's.** Its sheet ends on two buttons with the paragraph
 * cropped above them; I3's lever for that space is the section the board cut.
 *
 * **A horizontal `ScrollView`, not a wrap** (R2), pinned to its own height so
 * it cannot absorb the screen's slack.
 */
export function ShotRail({ margin, height, width, radius }: RailProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {gallery.map((g) => (
          <Image
            key={g.id}
            source={g.photo}
            style={{ width, height, borderRadius: radius, backgroundColor: ct.tile }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

type ActionProps = { margin: number; height: number; radius: number; onBook: () => void };

/**
 * The total, and the two actions.
 *
 * **The total is the rate times the nights** (R9) — the board shows a nightly
 * rate and never says what a stay costs.
 *
 * Both buttons are 52dp, so each clears R7 on its own, and each fill and its
 * shadow sit in one style object: a `Platform.select` for a shadow is exactly
 * what the web render cannot check (§4.4).
 */
export function ActionBar({ margin, height, radius, onBook }: ActionProps) {
  return (
    <View style={{ marginHorizontal: margin, gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T variant="totalLabel">{`${stay.nights} nights`}</T>
        <T variant="totalValue">{usd(total())}</T>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={actions.message} style={{ flex: 1 }}>
          {({ pressed }) => (
            <View
              style={{
                height,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.tile,
                opacity: pressed ? 0.8 : 1,
              }}
            >
              <T variant="ghost">{actions.message}</T>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={onBook}
          accessibilityRole="button"
          accessibilityLabel={`${actions.book}, ${usd(total())}`}
          style={{ flex: 1.3 }}
        >
          {({ pressed }) => (
            <View
              style={{
                height,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.brand,
                opacity: pressed ? 0.88 : 1,
                shadowColor: '#0A3C78',
                shadowOpacity: 0.3,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 7,
              }}
            >
              <T variant="cta">{actions.book}</T>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
