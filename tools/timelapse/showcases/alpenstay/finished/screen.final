import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Glyph } from '@/features/alpenstay/components/glyph';
import { StayGallery } from '@/features/alpenstay/components/stay-gallery';
import { T } from '@/features/alpenstay/components/text';
import { amenities, facts, stay, stayTotal } from '@/features/alpenstay/data/stay';
import { useLayout } from '@/features/alpenstay/layout';
import { ct } from '@/features/alpenstay/theme';

/**
 * Alpenroute — the stay.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The gallery is the remainder, so the price bar always sits on the foot (I3),
 * and the total it books is the nightly rate times the nights (R9).
 */
export default function AlpenstayScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <StayGallery
        width={L.W}
        height={L.gallery.h}
        radius={L.gallery.radius}
        insetTop={L.insets.top}
        margin={L.margin}
        onBack={() => router.push('/alpenpick')}
      />

      <View style={{ height: L.gapTitle }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <Glyph name="pin" size={14} color={ct.limeDeep} strokeWidth={1.8} />
          <T variant="region">{stay.region.toUpperCase()}</T>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <T variant="title" style={{ flex: 1 }} numberOfLines={1}>
            {stay.name}
          </T>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel={stay.reviews}
            hitSlop={{ top: 14, bottom: 14, left: 12, right: 12 }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <T variant="reviews">{stay.reviews}</T>
            <Glyph name="chevron" size={13} color={ct.ink} strokeWidth={2.2} />
          </Pressable>
        </View>
      </View>

      <View style={{ height: L.gapTitle }} />
      <View style={{ marginHorizontal: L.margin, flexDirection: 'row', gap: 8 }}>
        {facts.map((fact) => (
          <View
            key={fact.id}
            style={{
              height: L.factsH,
              paddingHorizontal: 13,
              borderRadius: L.factsH / 2,
              backgroundColor: ct.white,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <Glyph name={fact.glyph} size={15} color={ct.ink} strokeWidth={1.7} />
            <T variant="chip">{fact.label}</T>
          </View>
        ))}
      </View>

      <View style={{ height: L.gapFacts }} />
      <View style={{ marginHorizontal: L.margin, flexDirection: 'row', gap: 10 }}>
        {amenities.map((amenity) => (
          <View
            key={amenity.id}
            style={{
              flex: 1,
              height: L.amenity.h,
              borderRadius: L.amenity.radius,
              backgroundColor: ct.tray,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Glyph name={amenity.glyph} size={20} color={ct.ink} strokeWidth={1.7} />
            <T variant="amenity">{amenity.label}</T>
          </View>
        ))}
      </View>

      <View style={{ height: L.gapAmenity }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.bar.h,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <T variant="priceLabel">From</T>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
            <T variant="price">${stay.nightly}</T>
            <T variant="per">/ night · ${stayTotal()} total</T>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${stay.cta}, $${stayTotal()}`}
          onPress={() => router.push('/alpenfly')}
        >
          <View
            style={{
              height: 54,
              paddingHorizontal: 28,
              borderRadius: 27,
              backgroundColor: ct.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="cta">{stay.cta}</T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
