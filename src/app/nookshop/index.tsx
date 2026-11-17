import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.08 import kind rail
// import { KindRail } from '@/features/nookshop/components/kind-rail';
// STEP 1.15 import piece grid
// import { PieceGrid } from '@/features/nookshop/components/piece-grid';
// STEP 1.19 import promo card
// import { PromoCard } from '@/features/nookshop/components/promo-card';
// STEP 1.01 import shop header
// import { ShopHeader } from '@/features/nookshop/components/shop-header';
// STEP 1.05 import text
// import { T } from '@/features/nookshop/components/text';
import { header } from '@/features/nookshop/data/shop';
import { useLayout } from '@/features/nookshop/layout';
import { ct } from '@/features/nookshop/theme';

/**
 * Nook - the catalog.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The cards are the remainder, so the screen always ends on the promo with no
 * band under it (I3).
 */
export default function NookshopScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.white }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 shop header
      <ShopHeader margin={L.margin} height={L.headerH} onCart={() => router.push('/nookroom')} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 title
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <T variant="title">{header.title}</T>
      </View>
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.08 kind rail
      <KindRail margin={L.margin} height={L.kind.h} size={L.kind.size} />
      */}

      <View style={{ height: L.gapKind }} />
      {/* STEP 1.15 piece grid
      <PieceGrid
        margin={L.margin}
        width={L.card.w}
        height={L.card.h}
        radius={L.card.radius}
        onOpen={() => router.push('/nookroom')}
      />
      */}

      <View style={{ height: L.gapCards }} />
      {/* STEP 1.19 promo card
      <PromoCard
        margin={L.margin}
        height={L.promo.h}
        radius={L.promo.radius}
        onPress={() => router.push('/nookroom')}
      />
      */}

      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
