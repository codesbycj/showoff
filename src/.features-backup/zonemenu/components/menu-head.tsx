import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';

import { banner, delivery, offers, place, reviews, usd } from '../data/menu';
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
            backgroundColor: 'rgba(255,255,255,0.22)',
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={17} color={ct.onDark} />
        </View>
      )}
    </Pressable>
  );
}

type BannerProps = {
  width: number;
  height: number;
  margin: number;
  topInset: number;
  control: number;
  onBack: () => void;
};

/**
 * The promo banner.
 *
 * **The photograph and the brand wash are on an absolutely-filled child**, so
 * a reveal that stages the wordmark and the controls does not open on a solid
 * red sheet (§5.5 / I9).
 *
 * The scrim runs top to bottom, which `expo-linear-gradient` handles; only a
 * *diagonal* is mirrored on web (Part 7). It is there because the wordmark has
 * to clear 4.5:1 over a photograph (R4).
 */
export function MenuBanner({ width, height, margin, topInset, control, onBack }: BannerProps) {
  return (
    <View style={{ width, height }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: ct.brand, overflow: 'hidden' }}>
        <Image source={banner.photo} style={{ width, height }} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(224,41,29,0.9)', 'rgba(224,41,29,0.35)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          pointerEvents="none"
        />
      </View>

      <View style={{ paddingTop: topInset }}>
        <View
          style={{
            marginHorizontal: margin,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Round glyph="back" label="Back" size={control} onPress={onBack} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Round glyph="heart" label="Save" size={control} />
            <Round glyph="arrowUpRight" label="Share" size={control} />
          </View>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <T variant="bannerKicker">{banner.kicker}</T>
          <T variant="bannerWord">{banner.word}</T>
        </View>
      </View>
    </View>
  );
}

type DiscProps = { size: number; top: number };

/**
 * The restaurant's own mark.
 *
 * **Drawn, and for a fictional restaurant** — the board sets McDonald's arches
 * here. It straddles the banner's lower edge, which is the board's design and
 * the one shape on this screen where an overlap is deliberate; it crosses an
 * *edge*, never any text (R3).
 */
export function PlaceDisc({ size, top }: DiscProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        alignItems: 'center',
      }}
      pointerEvents="none"
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.white,
          borderWidth: 3,
          borderColor: ct.white,
          shadowColor: '#2A1A14',
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 5 },
          elevation: 6,
        }}
      >
        <View
          style={{
            width: size - 10,
            height: size - 10,
            borderRadius: (size - 10) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.brand,
          }}
        >
          <Glyph name="tag" size={size * 0.42} color={ct.brandInk} strokeWidth={1.9} />
        </View>
      </View>
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** The restaurant's name, rating and distance. */
export function PlaceTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="place">{place.name}</T>
    </View>
  );
}

export function PlaceMeta({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <Glyph name="star" size={12} color={ct.star} />
      <T variant="rating">{place.rating.toFixed(1)}</T>
      <T variant="meta">{`(${reviews(place.reviews)})`}</T>
      <T variant="meta">·</T>
      <T variant="badge">{place.badge}</T>
      <T variant="meta">·</T>
      <T variant="meta">{place.distance}</T>
    </View>
  );
}

type DeliveryProps = { margin: number; height: number; radius: number };

/** How long, how much, and the minimum. All labels and units (R5). */
export function DeliveryCard({ margin, height, radius }: DeliveryProps) {
  return (
    <View style={{ marginHorizontal: margin, height, paddingHorizontal: 14, justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: ct.fieldEdge,
          backgroundColor: ct.white,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FDEDEB',
          }}
        >
          <Glyph name="bag" size={17} color={ct.brand} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <T variant="deliveryLabel">{delivery.label}</T>
            <T variant="deliveryValue">{delivery.value}</T>
          </View>
          <T variant="deliveryLabel">
            {`${delivery.chargeLabel} ${usd(delivery.charge)} · ${delivery.minLabel} ${usd(delivery.min)}`}
          </T>
        </View>
      </View>
    </View>
  );
}

type OfferProps = { margin: number; height: number; radius: number; gap: number };

/**
 * The running offers.
 *
 * The percentage drives every was-price in the grid below (R9), so an offer
 * and a card cannot disagree.
 */
export function OfferRow({ margin, height, radius, gap }: OfferProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {offers.map((o) => (
        <View
          key={o.id}
          style={{
            flex: 1,
            borderRadius: radius,
            borderWidth: 1,
            borderColor: ct.fieldEdge,
            backgroundColor: ct.tile,
            paddingHorizontal: 12,
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <T variant="offerValue">{`${Math.round(o.off * 100)}% off`}</T>
          <T variant="offerNote" numberOfLines={2}>
            {`Min. order ${usd(o.minOrder)} · ${o.note}`}
          </T>
        </View>
      ))}
    </View>
  );
}
