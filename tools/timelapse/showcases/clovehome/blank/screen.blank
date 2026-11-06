import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import action row
// import { ActionRow } from '@/features/clovehome/components/action-row';
// STEP 1.02 import activity sheet
// import { ActivitySheet } from '@/features/clovehome/components/activity-sheet';
// STEP 1.03 import balance
// import { Balance } from '@/features/clovehome/components/balance';
// STEP 1.04 import card rail
// import { CardRail } from '@/features/clovehome/components/card-rail';
// STEP 1.05 import dock
// import { Dock } from '@/features/clovehome/components/dock';
// STEP 1.06 import greeting
// import { Greeting } from '@/features/clovehome/components/greeting';
import { activity } from '@/features/clovehome/data/home';
import {
  GAP_ACTIONS_SHEET,
  GAP_BALANCE_CARDS,
  GAP_CARDS_ACTIONS,
  GAP_GREET_BALANCE,
  MARGIN,
  PAD_TOP,
  useCloveHomeLayout,
} from '@/features/clovehome/layout';
import { ct } from '@/features/clovehome/theme';
import { useInsets } from '@/features/clovehome/use-insets';

/**
 * Clove — the wallet.
 *
 * Assembly only: who you are, what you have, which cards it is on, the two
 * things you do with it, what happened lately, and where else to go.
 *
 * The sheet's height is computed from the window rather than left to `flex`,
 * so the list inside it can size its own rows to reach the dock. Nothing on
 * this screen is centred in a flexible band, which is the other way a hole
 * appears.
 *
 * The card rail scrolls sideways under the page margin, so the second card is
 * clipped by the screen edge exactly as the reference shows it.
 */
export default function ClovehomeScreen() {
  const insets = useInsets();
  const { sheetH, rowH } = useCloveHomeLayout(insets, activity.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      {/* STEP 1.07 greeting
      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        <Greeting />

        <View style={{ marginTop: GAP_GREET_BALANCE }}>
          <Balance />
        </View>
      </View>
      */}

      {/* STEP 1.08 card rail
      <View style={{ marginTop: GAP_BALANCE_CARDS, paddingLeft: MARGIN }}>
        <CardRail />
      </View>
      */}

      {/* STEP 1.09 action row
      <View style={{ marginTop: GAP_CARDS_ACTIONS, paddingHorizontal: MARGIN }}>
        <ActionRow onSend={() => router.push('/clovestats')} />
      </View>
      */}

      {/* STEP 1.10 activity sheet
      <View style={{ marginTop: GAP_ACTIONS_SHEET }}>
        <ActivitySheet height={sheetH} rowH={rowH} />
      </View>
      */}

      {/* STEP 1.11 view
      <View style={{ flex: 1, backgroundColor: ct.sheet }} />
      */}

      {/* STEP 1.12 the next block

      */}
      {/* STEP 1.13 dock
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Dock active={0} bottom={insets.bottom} />
      </View>
      */}
      {/* STEP 1.14 a stray gap under it | FIX 1.15 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
