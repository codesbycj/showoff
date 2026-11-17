import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.26 import blurb row
// import { BlurbRow } from '@/features/vestaitem/components/blurb-row';
// STEP 1.31 import cart bar
// import { CartBar } from '@/features/vestaitem/components/cart-bar';
// STEP 1.27 import delivery row
// import { DeliveryRow } from '@/features/vestaitem/components/delivery-row';
// STEP 1.01 import detail header
// import { DetailHeader } from '@/features/vestaitem/components/detail-header';
// STEP 1.04 import hero shot
// import { HeroShot } from '@/features/vestaitem/components/hero-shot';
// STEP 1.13 import item title
// import { ItemTitle } from '@/features/vestaitem/components/item-title';
// STEP 1.11 import shot rail
// import { ShotRail } from '@/features/vestaitem/components/shot-rail';
// STEP 1.16 import size head
// import { SizeHead } from '@/features/vestaitem/components/size-head';
// STEP 1.19 import size picker
// import { SizePicker } from '@/features/vestaitem/components/size-picker';
import { useLayout } from '@/features/vestaitem/layout';
import { ct } from '@/features/vestaitem/theme';

/**
 * Vesta — product detail.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * One screenful, not a scroll (R6): the hero takes the slack so everything
 * below it lands above the fold, which is also why the foot cannot open a band.
 */
export default function VestaitemScreen() {
  const L = useLayout();
  const [size, setSize] = useState('l');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />

      {/* STEP 1.01 detail header
      <DetailHeader
        height={L.headerH}
        margin={L.margin}
        control={L.control}
        onBack={() => router.back()}
      />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 hero shot
      <HeroShot margin={L.margin} height={L.hero.h} radius={L.hero.radius} />
      */}

      <View style={{ height: L.gapHero }} />
      {/* STEP 1.11 shot rail
      <ShotRail height={L.rail.h} margin={L.margin} thumb={L.rail.thumb} gap={L.rail.gap} />
      */}

      <View style={{ height: L.gapRail }} />
      {/* STEP 1.13 item title
      <ItemTitle margin={L.margin} height={L.titleH} />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.16 size head
      <SizeHead margin={L.margin} height={L.sizeHeadH} />
      */}

      <View style={{ height: L.gapSizeHead }} />
      {/* STEP 1.19 size picker
      <SizePicker
        margin={L.margin}
        height={L.size.h}
        min={L.size.min}
        value={size}
        onSelect={setSize}
      />
      */}

      <View style={{ height: L.gapSize }} />
      {/* STEP 1.26 blurb row
      <BlurbRow margin={L.margin} height={L.blurbH} />
      */}

      <View style={{ height: L.gapBlurb }} />
      {/* STEP 1.27 delivery row
      <DeliveryRow margin={L.margin} height={L.deliveryH} />
      */}

      <View style={{ height: L.gapDelivery }} />
      {/* STEP 1.34 a stray gap above it | FIX 1.35 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.31 cart bar
      <CartBar margin={L.margin} height={L.cta.h} radius={L.cta.radius} share={L.cta.share} />
      */}
    </View>
  );
}
