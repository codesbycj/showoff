import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.14 import amount panel
// import { AmountPanel } from '@/features/orbitsend/components/amount-panel';
// STEP 1.05 import contact picker
// import { ContactPicker } from '@/features/orbitsend/components/contact-picker';
// STEP 1.18 import keypad
// import { Keypad } from '@/features/orbitsend/components/keypad';
// STEP 1.10 import recipient card
// import { RecipientCard } from '@/features/orbitsend/components/recipient-card';
// STEP 1.01 import send header
// import { SendHeader } from '@/features/orbitsend/components/send-header';
// STEP 1.30 import slide send
// import { SlideSend } from '@/features/orbitsend/components/slide-send';
// STEP 1.17 import text
// import { T } from '@/features/orbitsend/components/text';
import { send } from '@/features/orbitsend/data/send';
import { useLayout } from '@/features/orbitsend/layout';
import { ct } from '@/features/orbitsend/theme';

/**
 * Orbit — send money.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The keypad is the remainder, so the slide control always sits on the foot
 * with no band under it (I3).
 */
export default function OrbitsendScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 send header
      <SendHeader margin={L.margin} height={L.headerH} onBack={() => router.push('/orbithome')} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 contact picker
      <ContactPicker margin={L.margin} height={L.railH} />
      */}

      <View style={{ height: L.gapRail }} />
      {/* STEP 1.10 recipient card
      <RecipientCard margin={L.margin} height={L.recipient.h} radius={L.recipient.radius} />
      */}

      <View style={{ height: L.gapRecipient }} />
      {/* STEP 1.14 amount panel
      <AmountPanel
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.amount.h}
        radius={L.amount.radius}
      />
      */}

      <View style={{ height: L.gapAmount }} />
      {/* STEP 1.17 view
      <View style={{ height: L.balanceH, alignItems: 'center' }}>
        <T variant="account">
          {send.balanceLabel}: ${send.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </T>
      </View>
      */}

      <View style={{ height: L.gapBalance }} />
      {/* STEP 1.18 keypad
      <Keypad margin={L.margin} height={L.keypad.h} gap={L.keypad.gap} />
      */}

      <View style={{ height: L.gapCta }} />
      {/* STEP 1.34 a stray gap above it | FIX 1.35 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.30 slide send
      <SlideSend margin={L.margin} height={L.cta.h} onPress={() => router.push('/orbitchart')} />
      */}
    </View>
  );
}
