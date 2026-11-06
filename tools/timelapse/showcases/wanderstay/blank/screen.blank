import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

// STEP 1.01 import amenity row
// import { AmenityRow } from '@/features/wanderstay/components/amenity-row';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/wanderstay/components/glyph';
// STEP 1.03 import hero
// import { HeroImage } from '@/features/wanderstay/components/hero';
// STEP 1.04 import text
// import { T } from '@/features/wanderstay/components/text';
import { amenities, copy } from '@/features/wanderstay/data/stay';
import {
  CTA_H,
  GAP_AMENITY_DESC,
  GAP_DESC_CTA,
  GAP_LINK_AMENITY,
  GAP_TITLE_LINK,
  HANDLE,
  MARGIN,
  SHEET_PAD,
  TITLE_H,
  useStayLayout,
} from '@/features/wanderstay/layout';
import { ct, radius, type } from '@/features/wanderstay/theme';
import { useInsets } from '@/features/wanderstay/use-insets';

/**
 * Wander — one stay.
 *
 * Assembly only: the photograph and its others, what the place is called and
 * how it is rated, what it has, what it is like, and the way to book it.
 *
 * The sheet's height is the sum of its contents and the photograph takes the
 * rest, which is what puts the booking row on the safe area on every phone
 * rather than leaving a band under it. Expanding the description grows the
 * sheet and shortens the photograph by exactly one line.
 */
export default function WanderstayScreen() {
  const insets = useInsets();
  const [open, setOpen] = useState(false);
  const { heroH, amenityW } = useStayLayout(insets, open ? 5 : 3);

  return (
    <View style={{ flex: 1, backgroundColor: ct.sheet }}>
      <StatusBar style="light" />

      {/* STEP 1.05 hero image
      <HeroImage height={heroH} insetTop={insets.top} onBack={() => router.back()} />
      */}

      <View
        style={{
          flex: 1,
          marginTop: -28,
          backgroundColor: ct.sheet,
          borderTopLeftRadius: radius.sheet,
          borderTopRightRadius: radius.sheet,
          paddingHorizontal: MARGIN,
          paddingTop: SHEET_PAD,
        }}
      >
        {/* STEP 1.06 view
        <View style={{ height: HANDLE, alignItems: 'center' }}>
          <View style={{ width: 38, height: 4, borderRadius: 2, backgroundColor: ct.hairline }} />
        </View>
        */}

        {/* STEP 1.07 name
        <View style={{ flexDirection: 'row', alignItems: 'center', height: TITLE_H }}>
          <T variant="title" color={ct.ink} style={{ flex: 1, height: type.title.line }}>
            {copy.name}
          </T>
          <Glyph name="star" size={15} tint={ct.ink} />
          <T variant="rating" color={ct.ink} style={{ height: type.rating.line, marginLeft: 5 }}>
            {copy.rating}
          </T>
          <T
            variant="reviews"
            color={ct.muted}
            style={{ height: type.reviews.line, marginLeft: 5 }}
          >
            {copy.reviews}
          </T>
        </View>
        */}

        {/* STEP 1.08 kind
        <T
          variant="link"
          color={ct.blue}
          style={{ height: type.link.line, marginTop: GAP_TITLE_LINK }}
        >
          {copy.kind}
        </T>
        */}

        {/* STEP 1.09 amenity row
        <View style={{ marginTop: GAP_LINK_AMENITY }}>
          <AmenityRow tileW={amenityW} />
        </View>
        */}

        {/* STEP 1.10 view
        <View style={{ marginTop: GAP_AMENITY_DESC }}>
          <T variant="desc" color={ct.muted}>
            {open ? `${copy.short} ${copy.more}` : copy.short}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={open ? copy.readLess : copy.readMore}
            onPress={() => setOpen((v) => !v)}
            style={{ alignSelf: 'flex-start', paddingVertical: 12 }}
          >
            <T variant="descLink" color={ct.ink} style={{ height: type.descLink.line }}>
              {open ? copy.readLess : copy.readMore}
            </T>
          </Pressable>
        </View>
        */}

        <View style={{ flex: 1 }} />

        {/* STEP 1.11 price
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: insets.bottom + 12,
          }}
        >
          <View style={{ marginRight: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <T variant="price" color={ct.ink} style={{ height: type.price.line }}>
                {copy.price}
              </T>
              <T
                variant="priceUnit"
                color={ct.muted}
                style={{ height: type.priceUnit.line, marginLeft: 4, marginBottom: 3 }}
              >
                {copy.priceUnit}
              </T>
            </View>
            <T variant="reviews" color={ct.muted} style={{ height: type.reviews.line }}>
              {copy.dates}
            </T>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.cta}
            onPress={() => router.push('/wandertrips')}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View
                style={{
                  height: CTA_H,
                  borderRadius: radius.cta,
                  backgroundColor: ct.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.9 : 1,
                }}
              >
                <T variant="cta" color={ct.onBlue} style={{ height: type.cta.line }}>
                  {copy.cta}
                </T>
              </View>
            )}
          </Pressable>
        </View>
        */}
        {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
