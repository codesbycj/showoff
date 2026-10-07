import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/features/pesse/components/app-header';
import { CalloutBanner } from '@/features/pesse/components/callout-banner';
import { CategoryRow, ShareBar } from '@/features/pesse/components/category-row';
import { OutflowChart } from '@/features/pesse/components/outflow-chart';
import { PaymentCard } from '@/features/pesse/components/payment-card';
import { QuickAction } from '@/features/pesse/components/quick-action';
import { SectionHead } from '@/features/pesse/components/section-head';
import { SpendingCap } from '@/features/pesse/components/spending-cap';
import { Symbol } from '@/features/pesse/components/symbol';
import { DOCK_CLEARANCE, TabDock } from '@/features/pesse/components/tab-dock';
import { ANALYTICS, CATEGORIES } from '@/features/pesse/data/analytics';
import { CARDS } from '@/features/pesse/data/cards';
import { TABS, WALLET } from '@/features/pesse/data/wallet';
import { LEVEL, R, SP, TYPE, ps, pesseTheme } from '@/features/pesse/theme';

/**
 * Screen 5 — analytics and cards.
 *
 * This is the Cards tab. The card *chooser* is a separate screen reached from
 * "Switch Card" here and from the balance pill on home, which is why this one
 * shows a single active card rather than the carousel.
 *
 * The chart's selection is real state. It is the only interactive thing above
 * the fold, and a bar chart whose bars do not respond is the first thing a
 * viewer tries.
 */
export default function PesseCards() {
  const insets = useSafeAreaInsets();
  const [day, setDay] = useState('d18');

  return (
    <View style={[pesseTheme, { flex: 1, backgroundColor: ps.surface }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
        <AppHeader
          tokens={WALLET.tokens}
          photo={require('../../../assets/images/pesse/linda.jpg')}
          onProfile={() => router.push('/pesse/settings')}
          onNotifications={() => router.push('/pesse/settings')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: SP.xs,
          paddingBottom: DOCK_CLEARANCE + insets.bottom,
          gap: SP.lg,
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 4,
                borderRadius: R.full,
                backgroundColor: ps.surfaceLow,
              },
              LEVEL.container,
            ]}
          >
            <RoundControl icon="chevronLeft" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 8,
              }}
            >
              <Symbol name="calendarToday" size={16} color={ps.olive} />
              <Text style={[TYPE.labelLg, { color: ps.onSurface }]}>{ANALYTICS.month}</Text>
            </View>
            <RoundControl icon="chevronRight" />
          </View>

          <Pressable accessibilityRole="button" accessibilityLabel="Download statement">
            <View
              style={[
                {
                  width: 40,
                  height: 40,
                  borderRadius: R.full,
                  backgroundColor: ps.surfaceLowest,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.container,
              ]}
            >
              <Symbol name="download" size={20} color={ps.onSurface} />
            </View>
          </Pressable>
        </View>

        <OutflowChart selected={day} onSelect={setDay} />

        <View style={{ gap: SP.md }}>
          <SectionHead
            title={ANALYTICS.categoryTitle}
            action={ANALYTICS.fullAnalytics}
            actionTone={ps.olive}
          />
          <ShareBar />
          <View style={{ gap: 10 }}>
            {CATEGORIES.map((c) => (
              <CategoryRow key={c.key} category={c} />
            ))}
          </View>
        </View>

        <View style={{ gap: SP.md }}>
          <SectionHead
            title={ANALYTICS.limitsTitle}
            action={ANALYTICS.switchCard}
            onAction={() => router.push('/pesse/select-card')}
          />
          <PaymentCard card={CARDS[0]} compact onPress={() => router.push('/pesse/select-card')} />
          <SpendingCap
            title={ANALYTICS.capTitle}
            subtitle={ANALYTICS.capSubtitle}
            value={ANALYTICS.cap}
            min={ANALYTICS.capMin}
            max={ANALYTICS.capMax}
            fraction={ANALYTICS.capFraction}
          />
        </View>

        <View style={{ gap: SP.md }}>
          <SectionHead title={ANALYTICS.quickTitle} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {ANALYTICS.quickActions.map((a) => (
              <QuickAction key={a.key} icon={a.icon} label={a.label} />
            ))}
          </View>
        </View>

        <CalloutBanner
          icon="receiptLong"
          title={ANALYTICS.tax.title}
          body={ANALYTICS.tax.body}
          cta={ANALYTICS.tax.cta}
        />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabDock
          active="cards"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'cards') router.push(tab.route);
          }}
        />
      </View>
    </View>
  );
}

/** One of the month navigator's two arrows. */
function RoundControl({ icon }: { icon: 'chevronLeft' | 'chevronRight' }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={icon}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: R.full,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name={icon} size={18} color={ps.onSurface} />
      </View>
    </Pressable>
  );
}
