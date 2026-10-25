import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AmountHead } from '@/features/tiltsend/components/amount-head';
import { CardStack } from '@/features/tiltsend/components/card-stack';
import { ContactRail } from '@/features/tiltsend/components/contact-rail';
import { Dock } from '@/features/tiltsend/components/dock';
import { TopBar } from '@/features/tiltsend/components/top-bar';
import { DISPLAY_TOP, HEADER_TOP, MARGIN, RAIL_TOP, STACK_TOP } from '@/features/tiltsend/layout';
import { tl } from '@/features/tiltsend/theme';
import { useInsets } from '@/features/tiltsend/use-insets';

/**
 * Tilt — send money.
 *
 * Assembly only: the brand and who is signed in, how much is going, who it is
 * going to, which card it is coming from, and the dock over the lot.
 *
 * The card stack runs off the bottom edge rather than stopping above the dock:
 * the card being paid with is whole and the rest show only their top edge,
 * which is both what a wallet looks like and what keeps the screen full.
 */
export default function TiltsendScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tl.canvas }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        <TopBar />

        <View style={{ marginTop: DISPLAY_TOP }}>
          <AmountHead />
        </View>

        <View style={{ marginTop: RAIL_TOP }}>
          <ContactRail />
        </View>

        <View style={{ marginTop: STACK_TOP }}>
          <CardStack />
        </View>
      </View>

      <Dock bottom={insets.bottom} />
    </View>
  );
}
