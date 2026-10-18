import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/finanssend/components/app-bar';
// STEP 1.04 where it is going
// import { DestinationCard } from '@/features/finanssend/components/destination-card';
// STEP 1.10 the one thing it asks
// import { PrimaryButton } from '@/features/finanssend/components/primary-button';
// STEP 1.13 their faces
// import { RecentRow } from '@/features/finanssend/components/recent-row';
import { T } from '@/features/finanssend/components/text';
// STEP 1.15 and everyone else
// import { TransferSheet } from '@/features/finanssend/components/transfer-sheet';
import { form, headings } from '@/features/finanssend/data/transfer';
import {
  BLOCK_TOP,
  BUTTON_TOP,
  CARD_TOP,
  HEAD_GAP,
  HEADER_TOP,
  MARGIN,
  SHEET_TOP,
} from '@/features/finanssend/layout';
import { fn } from '@/features/finanssend/theme';
import { useInsets } from '@/features/finanssend/use-insets';

/**
 * Finans — Transfer.
 *
 * Assembly only: where it is going, the button that sends it, who you sent to
 * last, and everyone else you could.
 *
 * The screen does not scroll. Everything above the sheet is a fixed number of
 * dp and the sheet takes the rest with `flex: 1`, which is what makes it reach
 * the bottom on a tall phone — and what makes the payee list scroll inside the
 * sheet rather than the page scroll under it.
 *
 * The last-transfer row is the one block that escapes the page margin: it has
 * to reach the right-hand edge to read as a scroll.
 *
 * Every handler is empty on purpose. The other screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function FinansSend() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: fn.canvas }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.02 across the top
        <AppBar title={form.title} />
        */}

        <View style={{ marginTop: CARD_TOP }}>
          {/* STEP 1.05 under the header
          <DestinationCard />
          */}
        </View>

        <View style={{ marginTop: BUTTON_TOP }}>
          {/* STEP 1.11 under the form
          <PrimaryButton label={form.cta} />
          */}
        </View>

        {/* STEP 1.12 who you sent to last
        <View style={{ marginTop: BLOCK_TOP }}>
          <T variant="section" color={fn.ink}>
            {headings.recent}
          </T>
        </View>
        */}
      </View>

      <View style={{ marginTop: HEAD_GAP }}>
        {/* STEP 1.14 running off the edge
        <RecentRow />
        */}
      </View>

      <View style={{ flex: 1, marginTop: SHEET_TOP }}>
        {/* STEP 1.16 in a sheet at the foot
        <TransferSheet />
        */}
      </View>
    </View>
  );
}
