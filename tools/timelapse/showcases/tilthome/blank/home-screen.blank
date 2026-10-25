import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.07 what you can do with it
// import { ActionTile } from '@/features/tilthome/components/action-tile';
// STEP 1.05 what you have
// import { BalanceCard } from '@/features/tilthome/components/balance-card';
// STEP 1.11 the dock over the lot
// import { Dock } from '@/features/tilthome/components/dock';
// STEP 1.03 what the app is for
// import { Headline } from '@/features/tilthome/components/headline';
// STEP 1.09 where it has been going
// import { PaymentRow } from '@/features/tilthome/components/payment-row';
// STEP 1.01 the brand and who is signed in
// import { TopBar } from '@/features/tilthome/components/top-bar';
import { copy, payments, tiles } from '@/features/tilthome/data/home';
import { T } from '@/features/tilthome/components/text';
import {
  BALANCE_TOP,
  DISPLAY_TOP,
  DOCK_HEIGHT,
  HEADER_TOP,
  MARGIN,
  RECENT_TOP,
  ROW_GAP,
  TILE_GAP,
  TILES_TOP,
} from '@/features/tilthome/layout';
import { tl, type } from '@/features/tilthome/theme';
import { useInsets } from '@/features/tilthome/use-insets';

/**
 * Tilt — home.
 *
 * Assembly only: the brand and who is signed in, what the app is for, what you
 * have, the two things you can do with it, and where it has been going — over
 * a scroll, with the dock floating above it.
 *
 * The payment list is not on the reference, which crops its phone under the
 * two tiles. On a real 852dp screen that leaves about 140dp of empty paper, so
 * the list the balance card already promises is on the page instead and runs
 * under the dock. See `layout.ts`.
 */
export default function TilthomeScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tl.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom + DOCK_HEIGHT + 26,
        }}
      >
{/* STEP 1.02 in place
        <TopBar />
*/}

{/* STEP 1.04 two lines and a star
        <View style={{ marginTop: DISPLAY_TOP }}>
          <Headline />
        </View>
*/}

{/* STEP 1.06 to the penny
        <View style={{ marginTop: BALANCE_TOP }}>
          <BalanceCard />
        </View>
*/}

{/* STEP 1.08 out and in
        <View style={{ flexDirection: 'row', gap: TILE_GAP, marginTop: TILES_TOP }}>
          {tiles.map((t) => (
            <ActionTile key={t.id} label={t.label} tone={t.tone} />
          ))}
        </View>
*/}

        <T
          variant="cardLabel"
          color={tl.ink}
          style={{ marginTop: RECENT_TOP, height: type.cardLabel.line }}
        >
          {copy.recent}
        </T>

{/* STEP 1.10 three of them
        {payments.map((p, i) => (
          <View
            key={p.id}
            style={{
              marginTop: i === 0 ? 4 : ROW_GAP,
              // MISTAKE 1.12 the rows came in crushed together
              marginBottom: -14,
            }}
          >
            <PaymentRow who={p.who} note={p.note} amount={p.amount} src={p.src} out={p.out} />
          </View>
        ))}
*/}
      </ScrollView>

{/* STEP 1.13 floating over the list
      <Dock bottom={insets.bottom} />
*/}
    </View>
  );
}
