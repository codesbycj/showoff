import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.09 import action row
// import { ActionRow } from '@/features/orbithome/components/action-row';
// STEP 1.06 import balance block
// import { BalanceBlock } from '@/features/orbithome/components/balance-block';
// STEP 1.16 import contact rail
// import { ContactRail } from '@/features/orbithome/components/contact-rail';
// STEP 1.23 import dock
// import { Dock } from '@/features/orbithome/components/dock';
// STEP 1.02 import greeting row
// import { GreetingRow } from '@/features/orbithome/components/greeting-row';
// STEP 1.22 import movement list
// import { MovementList } from '@/features/orbithome/components/movement-list';
// STEP 1.19 import promo rail
// import { PromoRail } from '@/features/orbithome/components/promo-rail';
// STEP 1.13 import section row
// import { SectionRow } from '@/features/orbithome/components/section-row';
// STEP 1.01 import wash ground
// import { WashGround } from '@/features/orbithome/components/wash-ground';
import { sections } from '@/features/orbithome/data/home';
import { useLayout } from '@/features/orbithome/layout';
import { ct } from '@/features/orbithome/theme';

/**
 * Orbit — wallet.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The peach wash is an absolutely-filled child of the header block rather than
 * a fill on the block itself, so nothing but the page paints in frame one
 * (§5.5).
 */
export default function OrbithomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ height: L.wash.h }}>
        {/* STEP 1.01 wash ground
        <WashGround width={L.W} height={L.wash.h} radius={L.wash.radius} />
        */}

        <View style={{ paddingTop: L.insets.top }} />
        {/* STEP 1.02 greeting row
        <GreetingRow margin={L.margin} height={L.greetH} />
        */}

        <View style={{ height: L.gapGreet }} />
        {/* STEP 1.06 balance block
        <BalanceBlock height={L.balanceH} />
        */}

        <View style={{ height: L.gapBalance }} />
        {/* STEP 1.09 action row
        <ActionRow
          margin={L.margin}
          height={L.actionH}
          onTransfer={() => router.push('/orbitsend')}
        />
        */}
      </View>

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.13 section row
      <SectionRow margin={L.margin} height={L.sectionH} label={sections.quickSend} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.16 contact rail
      <ContactRail
        margin={L.margin}
        width={L.contact.w}
        height={L.contact.h}
        onSelect={() => router.push('/orbitsend')}
      />
      */}

      <View style={{ height: L.gapContacts }} />
      {/* STEP 1.19 promo rail
      <PromoRail margin={L.margin} width={L.promo.w} height={L.promo.h} radius={L.promo.radius} />
      */}

      <View style={{ height: L.gapPromo }} />
      {/* STEP 1.21 section row
      <SectionRow margin={L.margin} height={L.sectionH} label={sections.transactions} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.22 movement list
      <MovementList
        margin={L.margin}
        height={L.row.h}
        gap={L.row.gap}
        bottomPad={L.dock.h + L.dock.bottom}
      />
      */}

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.23 dock
      <Dock
        margin={L.margin}
        height={L.dock.h}
        radius={L.dock.radius}
        bottom={L.dock.bottom}
        active="home"
      />
      */}
    </View>
  );
}
