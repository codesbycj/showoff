import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.03 the money card
// import { BalanceCard, CardAction, InitialsAvatar } from '@/features/nova/components/balance-card';
// STEP 2.01 the small shared parts
// import { FilterChip, MenuGlyph, RoundButton, SectionHead } from '@/features/nova/components/bits';
// STEP 2.10 a line per coin
// import { MarketRow } from '@/features/nova/components/market-row';
// STEP 2.06 an offer
// import { PromoBanner } from '@/features/nova/components/promo-banner';
// STEP 2.16 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/nova/components/tab-dock';
import { COINS, HOME, MARKET_FILTERS } from '@/features/nova/data/market';
import { TABS } from '@/features/nova/data/nav';
import { FONT, SP, nv, novaTheme } from '@/features/nova/theme';

/**
 * Screen 2 — the home dashboard.
 *
 * One scrolling column inside the page's 20dp margin, with the dock floating
 * over it. The filter rail bleeds to both edges so its last chip can be clipped
 * by the right edge the way the reference shows — the tell that it scrolls.
 */
export default function NovaHome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[novaTheme, { flex: 1, backgroundColor: nv.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: 116,
        }}
      >
{/* STEP 2.02 who is looking
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SP.margin,
            marginBottom: SP.margin,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <RoundButton glyph={<MenuGlyph />} label="Open menu" />

            <View>
              <Text
                style={{
                  fontFamily: FONT.semibold,
                  fontSize: 11,
                  lineHeight: 15,
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                  color: nv.muted,
                }}
              >
                {HOME.eyebrow}
              </Text>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  lineHeight: 23,
                  letterSpacing: -0.36,
                  color: nv.ink,
                }}
              >
                {HOME.name}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RoundButton icon="scan" onPress={() => router.push('/nova/wallet')} label="Scan" />
            <RoundButton
              icon="bell"
              badge
              onPress={() => router.push('/nova/activity')}
              label="Notifications"
            />
          </View>
        </View>
*/}

        <View style={{ paddingHorizontal: SP.margin }}>
{/* STEP 2.04 seventy-four thousand
          <BalanceCard
            scope={HOME.scope}
            label={HOME.balanceLabel}
            amount={HOME.amount}
            cents={HOME.cents}
            delta={HOME.delta}
            deltaAmount={HOME.deltaAmount}
            deltaNote={HOME.deltaNote}
            avatar={<InitialsAvatar initials={HOME.initials} />}
            onScope={() => router.push('/nova/wallet')}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                // MISTAKE 2.05 the three buttons came in stacked
                flexDirection: 'column',
              }}
            >
              <CardAction
                icon="deposit"
                label={HOME.actions.deposit}
                solid
                onPress={() => router.push('/nova/wallet')}
              />
              <CardAction
                icon="trade"
                label={HOME.actions.trade}
                onPress={() => router.push('/nova/trade')}
              />
              <CardAction
                icon="earn"
                label={HOME.actions.earn}
                limeIcon
                onPress={() => router.push('/nova/trade')}
              />
            </View>
          </BalanceCard>
*/}
        </View>

        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg }}>
{/* STEP 2.07 zero fees this month
          <PromoBanner
            eyebrow={HOME.promo.eyebrow}
            title={HOME.promo.title}
            titleAccent={HOME.promo.titleAccent}
            body={HOME.promo.body}
            onPress={() => router.push('/nova/trade')}
          />
*/}
        </View>

        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg }}>
{/* STEP 2.08 name the list
          <SectionHead
            title={HOME.marketTitle}
            action={HOME.marketAction}
            actionTone={nv.blue}
            onAction={() => router.push('/nova/trade')}
          />
*/}
        </View>

{/* STEP 2.09 a rail to sort it by
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 8, paddingVertical: 2 }}
          style={{ marginTop: 12 }}
        >
          {MARKET_FILTERS.map((f, i) => (
            <FilterChip key={f} label={f} selected={i === 0} />
          ))}
        </ScrollView>
*/}

        <View style={{ paddingHorizontal: SP.margin, marginTop: 12, gap: 10 }}>
{/* STEP 2.11 fill the market in
          {COINS.map((coin) => (
            <MarketRow key={coin.key} coin={coin} onPress={() => router.push('/nova/trade')} />
          ))}
*/}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
{/* STEP 2.17 the tab bar
        <TabDock
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
