import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

import { Balance } from '@/features/orbithome/components/balance';
import { CardsRow } from '@/features/orbithome/components/cards-row';
import { Header } from '@/features/orbithome/components/header';
import { QuickRow } from '@/features/orbithome/components/quick-row';
import { SpendChart } from '@/features/orbithome/components/spend-chart';
import {
  AMOUNT_TOP,
  AVATAR,
  BALANCE_TOP,
  CARDS_HEIGHT,
  CARDS_TOP,
  CHART_MIN,
  CHART_TOP,
  HEADER_TOP,
  MARGIN,
  QUICK_HEIGHT,
  QUICK_TOP,
} from '@/features/orbithome/layout';
import { ob, type } from '@/features/orbithome/theme';
import { useInsets } from '@/features/orbithome/use-insets';

/**
 * Orbit — the balance.
 *
 * Assembly only: who is signed in, what is in the account, the two things you
 * do most, what the account gives back and who you paid, and where the month
 * went.
 *
 * The chart takes whatever the blocks above it leave, measured rather than
 * guessed, so the card's last bar sits on the bottom inset at any screen
 * height instead of leaving a band of canvas under it.
 */
export default function OrbithomeScreen() {
  const insets = useInsets();
  const { height } = useWindowDimensions();

  const used =
    insets.top +
    HEADER_TOP +
    AVATAR +
    BALANCE_TOP +
    type.label.line +
    AMOUNT_TOP +
    type.balance.line +
    QUICK_TOP +
    QUICK_HEIGHT +
    CARDS_TOP +
    CARDS_HEIGHT +
    CHART_TOP +
    insets.bottom;
  const chart = Math.max(CHART_MIN, height - used);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ob.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      <Header />

      <View style={{ marginTop: BALANCE_TOP }}>
        <Balance />
      </View>

      <View style={{ marginTop: QUICK_TOP }}>
        <QuickRow onTransfer={() => router.push('/orbitover')} />
      </View>

      <View style={{ marginTop: CARDS_TOP }}>
        <CardsRow onOpen={() => router.push('/orbitover')} />
      </View>

      <View style={{ marginTop: CHART_TOP }}>
        <SpendChart h={chart} />
      </View>
    </View>
  );
}
