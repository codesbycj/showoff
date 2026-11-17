import { Pressable, ScrollView, View } from 'react-native';

import {
  PRICE,
  about,
  amenities,
  facts,
  pricing,
  usd,
  venue,
  yearSaving,
  yearly,
} from '../data/gym';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type BlockProps = { margin: number; height: number };

/** The venue's name and its rating. */
export function GymTitle({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <T variant="venue" numberOfLines={1} style={{ flex: 1 }}>
        {venue.name}
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
        <Glyph name="star" size={14} color={ct.star} />
        <T variant="rating">{venue.rating.toFixed(1)}</T>
        <T variant="reviews">{`(${venue.reviews})`}</T>
      </View>
    </View>
  );
}

/** Where it is. The board's address is a real one; this street is invented. */
export function GymAddress({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <Glyph name="pin" size={13} color={ct.sub} />
      <T variant="address" numberOfLines={1}>
        {venue.address}
      </T>
    </View>
  );
}

type ChipProps = { margin: number; height: number; radius: number };

/**
 * What the place has.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third chip cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The board also spells it "Coffe Shop"; a typo is not a design (I1).
 */
export function AmenityRow({ margin, height, radius }: ChipProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 9, alignItems: 'center' }}
      >
        {amenities.map((a) => (
          <View
            key={a.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              height,
              paddingHorizontal: 14,
              borderRadius: radius,
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.white,
            }}
          >
            <Glyph name={a.glyph} size={16} color={ct.ink} strokeWidth={1.8} />
            <T variant="chip">{a.label}</T>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/**
 * What it costs.
 *
 * **Both figures derive from one price table** (R9): the yearly price is the
 * monthly one times twelve, less the discount, and the saving is the
 * difference. The board prints "253,000" beside "Second Payment: 200,00/mo",
 * which is two currencies, two separators and no relationship between them.
 */
export function PriceRow({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <T variant="price">{usd(PRICE.month)}</T>
        <T variant="priceUnit">{pricing.unit}</T>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 12,
          height: 30,
          borderRadius: 15,
          backgroundColor: ct.accentSoft,
        }}
      >
        <T variant="priceAlt">
          {`${pricing.yearLabel} ${usd(yearly)}${pricing.yearUnit} · save ${usd(yearSaving)}`}
        </T>
      </View>
    </View>
  );
}

/** What the place is. One run, 95 characters — R5's ceiling is 110, and the
 *  board's own paragraph runs to 243 and is cut off mid-word by the screen. */
export function AboutBlock({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="about">{about}</T>
    </View>
  );
}

type FactProps = { margin: number; height: number; radius: number };

/**
 * Hours, size, and how much is on.
 *
 * **Mine, not the board's.** The board fills this space with more of the same
 * paragraph, cropped. I3's lever is the row the board cut, and these are the
 * three facts a venue page genuinely carries — labels and measurements, not
 * prose (R5).
 */
export function FactStrip({ margin, height, radius }: FactProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius,
        backgroundColor: ct.field,
      }}
    >
      {facts.map((f, i) => (
        <View
          key={f.id}
          style={{
            flex: 1,
            alignItems: 'center',
            gap: 2,
            borderLeftWidth: i === 0 ? 0 : 1,
            borderLeftColor: ct.fieldEdge,
          }}
        >
          <T variant="factValue">{f.value}</T>
          <T variant="factLabel">{f.label}</T>
        </View>
      ))}
    </View>
  );
}

type CtaProps = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * Reserve.
 *
 * The board floats this as a pill over its own cropped paragraph — a control
 * straddling the text under it, which R3 calls a FAIL outright. Here it is the
 * last block in the column, flush with the foot, so nothing is covered.
 *
 * Its fill and shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function ReserveCta({ margin, height, radius, onPress }: CtaProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Reserve at ${venue.name}`}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            backgroundColor: ct.dark,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#0B1A0F',
            shadowOpacity: 0.25,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 7,
          }}
        >
          <Glyph name="classes" size={17} color={ct.darkInk} strokeWidth={1.8} />
          <T variant="reserve">Reserve</T>
        </View>
      )}
    </Pressable>
  );
}
