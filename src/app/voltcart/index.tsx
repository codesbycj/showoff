import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.04 import address row
// import { AddressRow } from '@/features/voltcart/components/address-row';
// STEP 1.01 import cart header
// import { CartHeader } from '@/features/voltcart/components/cart-header';
// STEP 1.08 import cart lines
// import { CartLines } from '@/features/voltcart/components/cart-lines';
// STEP 1.17 import checkout bar
// import { CheckoutBar } from '@/features/voltcart/components/checkout-bar';
// STEP 1.24 import tab bar
// import { TabBar } from '@/features/voltcart/components/tab-bar';
import { useLayout } from '@/features/voltcart/layout';
import { ct } from '@/features/voltcart/theme';

/**
 * Voltline — cart.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The line list takes the remainder and the summary sits above the action, so
 * the screen always ends on its button (I3) and every figure on it is computed
 * from the lines (R9).
 */
export default function VoltcartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 cart header
      <CartHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 address row
      <AddressRow margin={L.margin} height={L.address.h} radius={L.address.radius} />
      */}

      <View style={{ height: L.gapAddress }} />
      {/* STEP 1.15 a stray gap above it | FIX 1.16 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.08 cart lines
      <CartLines
        margin={L.margin}
        selectH={L.selectH}
        height={L.line.h}
        radius={L.line.radius}
        gap={L.line.gap}
        bottomPad={L.line.gap}
      />
      */}

      {/* STEP 1.17 checkout bar
      <CheckoutBar margin={L.margin} summaryH={L.summary.h} ctaH={L.cta.h} gap={L.gapCta} />
      */}

      {/* STEP 1.23 view
      <View style={{ height: L.bar.h + 10 }} />
      */}

      {/* STEP 1.29 a stray gap above it | FIX 1.30 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.24 tab bar
      <TabBar height={L.bar.h} active="cart" onCart={() => router.push('/volthome')} />
      */}
    </View>
  );
}
