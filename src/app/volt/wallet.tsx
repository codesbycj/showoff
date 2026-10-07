import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.18 import the activity list
// import { ActivityList } from '@/features/volt/components/activity-list';
// STEP 5.08 import the balance card
// import { BalanceCard } from '@/features/volt/components/balance-card';
// STEP 5.10 import the cashout module
// import { CashoutCard } from '@/features/volt/components/cashout-card';
// STEP 5.16 import the insights panel
// import { InsightsCard } from '@/features/volt/components/insights-card';
// STEP 5.03 import the identity card
// import { ProfileCard } from '@/features/volt/components/profile-card';
// STEP 5.23 import the dock
// import { TabBar } from '@/features/volt/components/tab-bar';
// STEP 5.01 import the top bar
// import { WalletHeader } from '@/features/volt/components/wallet-header';
import { NAV } from '@/features/volt/data/home';
import {
  ACTIVITY,
  ACTIVITY_HEAD,
  BALANCE,
  CASHOUT,
  HEADER,
  INSIGHTS,
  PRESETS,
  PROFILE,
  STATS,
} from '@/features/volt/data/wallet';
import { SP, voltTheme, vt } from '@/features/volt/theme';

/**
 * Screen 5 — wallet, profile and cashout.
 *
 * The only screen whose header carries content, so it sits outside the scroll
 * view and the content starts under it. The other four leave the export's fixed
 * header empty and use the safe-area inset in its place.
 *
 * One selection lives here: the cashout preset. The export's script also
 * rewrites the transfer button's label from the amount; the label is carried in
 * the data at the reference's own value instead, so the screen never has to
 * format currency.
 */
export default function VoltWallet() {
  const insets = useSafeAreaInsets();
  const [preset, setPreset] = useState<string>('500');

  return (
    <View style={[voltTheme, { flex: 1, backgroundColor: vt.surface }]}>
      <StatusBar style="light" />

      <View style={{ paddingTop: insets.top }}>
{/* STEP 5.02 the top bar
        <WalletHeader greeting={HEADER.greeting} title={HEADER.title} avatar={HEADER.avatar} />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 110,
          gap: SP.xl,
        }}
      >
{/* STEP 5.04 who this is
        <ProfileCard
          name={PROFILE.name}
          tier={PROFILE.tier}
          handle={PROFILE.handle}
          member={PROFILE.member}
          photo={PROFILE.photo}
          stats={STATS}
        />
*/}

{/* STEP 5.09 what is in the account
        <BalanceCard
          label={BALANCE.label}
          currency={BALANCE.currency}
          total={BALANCE.total}
          audited={BALANCE.audited}
          withdrawableLabel={BALANCE.withdrawableLabel}
          withdrawable={BALANCE.withdrawable}
          bonusLabel={BALANCE.bonusLabel}
          bonus={BALANCE.bonus}
          deposit={BALANCE.deposit}
          cashout={BALANCE.cashout}
        />
*/}

{/* STEP 5.11 getting it out
        <CashoutCard
          title={CASHOUT.title}
          blurb={CASHOUT.blurb}
          eta={CASHOUT.eta}
          amountLabel={CASHOUT.amountLabel}
          max={CASHOUT.max}
          amount={CASHOUT.amount}
          presets={PRESETS}
          selectedPreset={preset}
          destinationLabel={CASHOUT.destinationLabel}
          change={CASHOUT.change}
          card={CASHOUT.card}
          cardNumber={CASHOUT.cardNumber}
          bank={CASHOUT.bank}
          cta={CASHOUT.cta}
          security={CASHOUT.security}
          onPreset={setPreset}
        />
*/}

{/* STEP 5.17 how the month went
        <InsightsCard
          title={INSIGHTS.title}
          month={INSIGHTS.month}
          recordLabel={INSIGHTS.recordLabel}
          wins={INSIGHTS.wins}
          losses={INSIGHTS.losses}
          ratio={INSIGHTS.ratio}
          sportLabel={INSIGHTS.sportLabel}
          sport={INSIGHTS.sport}
          sportShare={INSIGHTS.sportShare}
          bestLabel={INSIGHTS.bestLabel}
          bestTicket={INSIGHTS.bestTicket}
          bestAmount={INSIGHTS.bestAmount}
        />
*/}

{/* STEP 5.19 room for the ledger | FIX 5.24 the link is the action, not the heading
        <ActivityList
          title={ACTIVITY_HEAD.action}
          action={ACTIVITY_HEAD.title}
          items={ACTIVITY}
        />
*/}

{/* STEP 5.25 the ledger, labelled properly
        <ActivityList title={ACTIVITY_HEAD.title} action={ACTIVITY_HEAD.action} items={ACTIVITY} />
*/}
      </ScrollView>

{/* STEP 5.26 pin the dock
      <TabBar
        items={NAV}
        active="profile"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'profile') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
