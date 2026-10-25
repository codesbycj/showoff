import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.03 how much is going
// import { AmountHead } from '@/features/tiltsend/components/amount-head';
// STEP 1.07 which card it comes from
// import { CardStack } from '@/features/tiltsend/components/card-stack';
// STEP 1.05 who it is going to
// import { ContactRail } from '@/features/tiltsend/components/contact-rail';
// STEP 1.09 the dock over the lot
// import { Dock } from '@/features/tiltsend/components/dock';
// STEP 1.01 the brand and who is signed in
// import { TopBar } from '@/features/tiltsend/components/top-bar';
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
{/* STEP 1.02 in place
        <TopBar />
*/}

{/* STEP 1.04 to the cent
        <View style={{ marginTop: DISPLAY_TOP }}>
          <AmountHead />
        </View>
*/}

{/* STEP 1.06 four of them
        <View style={{ marginTop: RAIL_TOP }}>
          <ContactRail />
        </View>
*/}

{/* STEP 1.08 and the two behind it
        <View
          style={{
            marginTop: STACK_TOP,
            // MISTAKE 1.10 the wallet came in shifted off the margin
            marginLeft: 26,
          }}
        >
          <CardStack />
        </View>
*/}
      </View>

{/* STEP 1.11 floating over the lot
      <Dock bottom={insets.bottom} />
*/}
    </View>
  );
}
