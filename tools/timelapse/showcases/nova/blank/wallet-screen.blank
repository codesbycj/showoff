import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.03 the money card again
// import { BalanceCard } from '@/features/nova/components/balance-card';
// STEP 3.01 the small shared parts
// import { MenuGlyph, RoundButton, SectionHead } from '@/features/nova/components/bits';
// STEP 3.14 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/nova/components/tab-dock';
// STEP 3.05 things to do, and what was done
// import { ActionGrid, TxnRow } from '@/features/nova/components/txn-row';
import { TABS } from '@/features/nova/data/nav';
import { TXNS, WALLET, WALLET_ACTIONS } from '@/features/nova/data/wallet';
import { SP, nv, novaTheme } from '@/features/nova/theme';

/**
 * Screen 3 — the wallet.
 *
 * The same blue card as the dashboard, but with its action row lifted out and
 * set below as four square buttons, and a transaction list instead of a market
 * list. The card takes no `children` here, which is why its action row is a
 * slot rather than built in.
 */
export default function NovaWallet() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[novaTheme, { flex: 1, backgroundColor: nv.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + 8,
          paddingBottom: 116,
        }}
      >
{/* STEP 3.02 the bar across the top
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SP.margin,
          }}
        >
          <RoundButton glyph={<MenuGlyph />} label="Open menu" />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RoundButton icon="scan" label="Scan" />
            <RoundButton
              icon="bell"
              onPress={() => router.push('/nova/activity')}
              label="Notifications"
            />
          </View>
        </View>
*/}

{/* STEP 3.04 sixty-two thousand
        <BalanceCard
          scope={WALLET.scope}
          label={WALLET.balanceLabel}
          amount={WALLET.amount}
          cents={WALLET.cents}
          delta={WALLET.delta}
          deltaAmount={WALLET.deltaAmount}
          avatar={<WalletAvatar />}
          onScope={() => router.push('/nova/home')}
        />
*/}

        <View style={{ marginTop: SP.lg }}>
{/* STEP 3.06 four things you can do
          <ActionGrid
            actions={WALLET_ACTIONS}
            onPress={(key) => router.push(key === 'swap' ? '/nova/trade' : '/nova/activity')}
          />
*/}
        </View>

        <View style={{ marginTop: SP.xl }}>
{/* STEP 3.07 name the list
          <SectionHead
            title={WALLET.txnTitle}
            action={WALLET.txnAction}
            onAction={() => router.push('/nova/activity')}
          />
*/}
        </View>

{/* STEP 3.08 fill the ledger
        <View
          style={{
            marginTop: 14,
            gap: 10,
            // MISTAKE 3.09 the ledger came in inset from both edges
            marginHorizontal: 34,
          }}
        >
          {TXNS.map((txn) => (
            <TxnRow key={txn.key} txn={txn} onPress={() => router.push('/nova/activity')} />
          ))}
        </View>
*/}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
{/* STEP 3.15 the tab bar
        <TabDock
          active="wallet"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'wallet') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}

/**
 * The wallet card's avatar.
 *
 * The reference shows an illustrated portrait on an amber disc; the export
 * ships no image for it, so it is drawn — a head and shoulders, which is all
 * that survives at 36dp anyway.
 */
function WalletAvatar() {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f2b33d',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* head */}
      <View
        style={{
          position: 'absolute',
          top: 6,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: '#4a2f08',
        }}
      />
      {/* shoulders */}
      <View
        style={{
          width: 24,
          height: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: '#4a2f08',
        }}
      />
    </View>
  );
}
