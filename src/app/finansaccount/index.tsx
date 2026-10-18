import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.14 what you can do with them
// import { ActionBar } from '@/features/finansaccount/components/action-bar';
// STEP 1.07 the accounts
// import { CardRail } from '@/features/finansaccount/components/card-rail';
// STEP 1.27 somewhere to go next
// import { TabBar } from '@/features/finansaccount/components/tab-bar';
import { T } from '@/features/finansaccount/components/text';
// STEP 1.01 who is looking
// import { TopBar } from '@/features/finansaccount/components/top-bar';
// STEP 1.19 and what happened today
// import { TransactionSheet } from '@/features/finansaccount/components/transaction-sheet';
import { user } from '@/features/finansaccount/data/account';
import {
  ACTIONS_TOP,
  CARDS_TOP,
  HEADER_TOP,
  MARGIN,
  SHEET_TOP,
  TITLE_TOP,
} from '@/features/finansaccount/layout';
import { fn } from '@/features/finansaccount/theme';
import { useInsets } from '@/features/finansaccount/use-insets';

/**
 * Finans — Account.
 *
 * Assembly only: who you are, what accounts you have, what you can do with
 * them, and what has happened today.
 *
 * The screen does not scroll. Everything above the sheet is a fixed number of
 * dp and the sheet takes the rest with `flex: 1`, which is what makes it reach
 * the tab bar on a tall phone instead of floating with paper under it — and
 * what makes the history scroll inside the sheet rather than the page scroll
 * under it.
 *
 * The card rail is the one block that escapes the page margin: it has to reach
 * the right-hand edge for the next card to show at it.
 *
 * Every handler is empty on purpose. The other screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function FinansAccount() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: fn.canvas }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.02 at the top
        <TopBar />
        */}

        {/* STEP 1.06 what the screen is
        <View style={{ marginTop: TITLE_TOP }}>
          <T variant="title" color={fn.ink}>
            {user.title}
          </T>
        </View>
        */}
      </View>

      <View style={{ marginTop: CARDS_TOP }}>
        {/* STEP 1.08 running off the edge
        <CardRail />
        */}
      </View>

      <View style={{ marginTop: ACTIONS_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.15 under the cards
        <ActionBar />
        */}
      </View>

      <View style={{ flex: 1, marginTop: SHEET_TOP }}>
        {/* STEP 1.20 in a sheet at the foot
        <TransactionSheet />
        */}
      </View>

      {/* STEP 1.28 across the bottom
      <TabBar active="home" bottomInset={insets.bottom} />
      */}
    </View>
  );
}
