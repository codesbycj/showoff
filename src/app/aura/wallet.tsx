import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Landmark, Plus } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.05 what acts on it
// import { ControlTile } from '@/features/aura/components/control-tile';
// STEP 2.03 the card itself
// import { PaymentCard } from '@/features/aura/components/payment-card';
// STEP 2.07 the other balances
// import { PotCard } from '@/features/aura/components/pot-card';
import { NAV_CLEARANCE, PillNav } from '@/features/aura/components/pill-nav';
// STEP 2.01 name the screen
// import { ScreenHead } from '@/features/aura/components/screen-head';
// STEP 2.09 name the ledger
// import { SectionHead } from '@/features/aura/components/section-head';
// STEP 2.11 one line of it
// import { TxnRow } from '@/features/aura/components/txn-row';
import { CARD, NAV, USER, WALLET } from '@/features/aura/data/account';
import { R, SP, TYPE, au, auraTheme } from '@/features/aura/theme';

/**
 * Screen 2 — the wallet.
 *
 * The same card as Home, at full size and with its own furniture: the tier tags
 * it belongs to, the network it runs on, and the controls that act on it. Below
 * that the account moves from one card to the whole balance sheet.
 */
export default function AuraWallet() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[auraTheme, { flex: 1, backgroundColor: au.surface }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + SP.md,
          paddingBottom: NAV_CLEARANCE + insets.bottom,
        }}
      >
{/* STEP 2.02 my wallet
        <ScreenHead
          title={WALLET.title}
          subtitle={WALLET.subtitle}
          trailing={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: au.primaryBright,
                borderRadius: R.full,
                paddingHorizontal: 16,
                paddingVertical: 11,
              }}
            >
              <Plus size={16} color={au.onPrimary} strokeWidth={3} />
              <Text style={[TYPE.labelLg, { color: au.onPrimary }]}>{WALLET.addCard}</Text>
            </View>
          }
        />
*/}

{/* STEP 2.04 at full size
        <View style={{ marginTop: SP.lg }}>
          <PaymentCard
            balanceLabel={WALLET.card.balanceLabel}
            balance={CARD.balance}
            digits={CARD.digits}
            topRight={
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                {WALLET.card.tags.map((t) => (
                  <View
                    key={t}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      borderRadius: R.full,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={[TYPE.labelSm, { color: au.onPrimary }]}>{t}</Text>
                  </View>
                ))}
              </View>
            }
            footer={
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[TYPE.labelSm, { color: 'rgba(255,255,255,0.7)' }]}>
                    {WALLET.card.holderLabel}
                  </Text>
                  <Text style={[TYPE.labelLg, { marginTop: 3, color: au.onPrimary }]}>
                    {USER.name}
                  </Text>
                </View>
                <View style={{ marginRight: SP.lg }}>
                  <Text style={[TYPE.labelSm, { color: 'rgba(255,255,255,0.7)' }]}>
                    {WALLET.card.expiresLabel}
                  </Text>
                  <Text style={[TYPE.labelLg, { marginTop: 3, color: au.onPrimary }]}>
                    {CARD.expires}
                  </Text>
                </View>
                <Text style={[TYPE.headlineSm, { color: au.onPrimary, letterSpacing: 1 }]}>
                  {WALLET.card.network}
                </Text>
              </View>
            }
          />
        </View>
*/}

{/* STEP 2.06 freeze, reveal, limit, set
        <View style={{ flexDirection: 'row', gap: SP.sm + 2, marginTop: SP.md }}>
          {WALLET.controls.map((c) => (
            <ControlTile key={c.key} label={c.label} icon={c.icon} />
          ))}
        </View>
*/}

{/* STEP 2.08 the whole balance sheet
        <View
          style={{
            marginTop: SP.md,
            backgroundColor: au.surfaceLowest,
            borderRadius: R.lg,
            padding: SP.md,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={[TYPE.bodyMd, { color: au.onSurfaceVariant }]}>{WALLET.netLabel}</Text>
              <Text style={[TYPE.headlineLg, { marginTop: 2, color: au.onSurface }]}>
                {WALLET.net}
              </Text>
            </View>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                backgroundColor: au.surfaceLow,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Landmark size={19} color={au.primary} strokeWidth={2.2} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: SP.sm, marginTop: SP.md }}>
            {WALLET.pots.map((p) => (
              <PotCard key={p.key} label={p.label} value={p.value} amber={p.amber} />
            ))}
          </View>
        </View>
*/}

{/* STEP 2.10 recent transactions
        <View style={{ marginTop: SP.lg }}>
          <SectionHead title={WALLET.txnTitle} action={WALLET.seeAll} />
        </View>
*/}

{/* STEP 2.12 what moved
        <View
          style={{
            marginTop: SP.sm + 4,
            backgroundColor: au.surfaceLowest,
            borderRadius: R.lg,
            paddingHorizontal: SP.md,
            paddingVertical: SP.sm,
          }}
        >
          {WALLET.txns.map((t) => (
            <TxnRow
              key={t.key}
              name={t.name}
              when={t.when}
              amount={t.amount}
              source={t.source}
              icon={t.icon}
              credit={t.credit}
            />
          ))}
        </View>
*/}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 10) + 14,
        }}
      >
{/* STEP 2.13 float the dock
        <PillNav
          items={NAV}
          active="wallet"
          onSelect={(k) => {
            const item = NAV.find((n) => n.key === k);
            if (item && k !== 'wallet') router.push(item.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
