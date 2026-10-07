import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.06 import the boost banner
// import { BoostBanner } from '@/features/volt/components/boost-banner';
// STEP 4.24 import the settled drawer
// import { SettledBets } from '@/features/volt/components/settled-bets';
// STEP 4.01 import the slip header
// import { SlipHeader } from '@/features/volt/components/slip-header';
// STEP 4.09 import the leg card
// import { SlipLeg } from '@/features/volt/components/slip-leg';
// STEP 4.14 import the stake panel
// import { StakePanel } from '@/features/volt/components/stake-panel';
// STEP 4.28 import the dock
// import { TabBar } from '@/features/volt/components/tab-bar';
import { NAV } from '@/features/volt/data/home';
import {
  BOOST,
  CHIPS,
  LEGS,
  MODES,
  PAYOUT,
  SETTLED,
  SETTLED_HEAD,
  SLIP,
  STAKE,
  SUMMARY,
} from '@/features/volt/data/slip';
import { R, SP, TYPE, voltTheme, vt } from '@/features/volt/theme';

/**
 * Screen 4 — the bet slip.
 *
 * Two selections live here: the slip mode and the quick-stake chip. Neither
 * recomputes anything — the export's script does recalculate the payout from
 * the stake, but the figures it produces for the reference's own values are the
 * ones carried in `data/slip.ts`, so recomputing would only risk drifting from
 * the reference while adding arithmetic to a showcase.
 */
export default function VoltSlip() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<string>('parlay');
  const [chip, setChip] = useState<string>('50');

  return (
    <View style={[voltTheme, { flex: 1, backgroundColor: vt.surface }]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + SP.gutter,
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 110,
          gap: SP.xl,
        }}
      >
{/* STEP 4.02 what is in the slip
        <SlipHeader
          title={SLIP.title}
          count={SLIP.count}
          clear={SLIP.clear}
          modes={MODES}
          selected={mode}
          onSelect={setMode}
        />
*/}

{/* STEP 4.07 the boost | FIX 4.08 the struck-out figure is the old one, not the new
        <BoostBanner
          title={BOOST.title}
          badge={BOOST.badge}
          blurb={BOOST.blurb}
          was={BOOST.now}
          now={BOOST.was}
        />
*/}

{/* STEP 4.10 the boost, the right way round
        <BoostBanner
          title={BOOST.title}
          badge={BOOST.badge}
          blurb={BOOST.blurb}
          was={BOOST.was}
          now={BOOST.now}
        />
*/}

        <View style={{ gap: SP.md }}>
{/* STEP 4.15 name the legs
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SP.xs,
            }}
          >
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
              {SLIP.legsTitle.toUpperCase()}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: R.full,
                  backgroundColor: vt.primaryFixed,
                }}
              />
              <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{SLIP.legsLive}</Text>
            </View>
          </View>
*/}

{/* STEP 4.25 room for the legs
          {LEGS.map((leg) => (
            <SlipLeg key={leg.key} leg={leg} />
          ))}
*/}
        </View>

{/* STEP 4.29 the calculator
        <StakePanel
          title={STAKE.title}
          balanceLabel={STAKE.balanceLabel}
          balance={STAKE.balance}
          amount={STAKE.amount}
          chips={CHIPS}
          selectedChip={chip}
          summary={SUMMARY}
          payout={PAYOUT}
          cta={STAKE.cta}
          onChip={setChip}
        />
*/}

{/* STEP 4.30 what has already settled
        <SettledBets title={SETTLED_HEAD.title} window={SETTLED_HEAD.window} bets={SETTLED} />
*/}
      </ScrollView>

{/* STEP 4.31 pin the dock
      <TabBar
        items={NAV}
        active="bets"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'bets') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
