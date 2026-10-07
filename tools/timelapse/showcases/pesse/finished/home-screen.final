import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionPill } from '@/features/pesse/components/action-pill';
import { AppHeader } from '@/features/pesse/components/app-header';
import { BalanceBlock } from '@/features/pesse/components/balance-block';
import { ContactNode, InviteNode } from '@/features/pesse/components/contact-node';
import { PromoBanner } from '@/features/pesse/components/promo-banner';
import { SectionHead } from '@/features/pesse/components/section-head';
import { DOCK_CLEARANCE, TabDock } from '@/features/pesse/components/tab-dock';
import { TxnRow } from '@/features/pesse/components/txn-row';
import { CONTACTS, HISTORY, TABS, WALLET } from '@/features/pesse/data/wallet';
import { SP, ps, pesseTheme } from '@/features/pesse/theme';

/**
 * Screen 2 — home and wallet.
 *
 * One scrolling column with the header pinned above it and the dock floating
 * over it, which is the reference's own structure: a `fixed` header, a `main`
 * that scrolls under it, and a `fixed` nav.
 *
 * The Send-again rail bleeds to both screen edges — it undoes the page's 20dp
 * margin itself so a contact can be clipped by the right edge the way the
 * reference shows, which is the tell that it scrolls rather than wraps.
 */
export default function PesseHome() {
  const insets = useSafeAreaInsets();

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
        }}
      >
        <BalanceBlock
          label={WALLET.balanceLabel}
          balance={WALLET.balance}
          holdLabel={WALLET.holdLabel}
          hold={WALLET.hold}
          onSelectCard={() => router.push('/pesse/select-card')}
        />

        <View style={{ flexDirection: 'row', gap: SP.md, marginTop: SP.lg }}>
          <ActionPill
            icon="arrowForward"
            label={WALLET.send}
            rotate={-45}
            onPress={() => router.push('/pesse/send')}
          />
          <ActionPill
            icon="arrowForward"
            label={WALLET.receive}
            rotate={135}
            onPress={() => router.push('/pesse/send')}
          />
        </View>

        <View style={{ marginTop: SP.lg }}>
          <PromoBanner
            eyebrow={WALLET.promo.eyebrow}
            title={WALLET.promo.title}
            body={WALLET.promo.body}
            coin={require('../../../assets/images/pesse/coin.jpg')}
          />
        </View>

        <View style={{ marginTop: SP.lg }}>
          <SectionHead
            title={WALLET.sendAgainTitle}
            action={WALLET.addLabel}
            actionIcon="add"
            actionTone={ps.olive}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -SP.margin, marginTop: SP.sm }}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 12, paddingVertical: 4 }}
        >
          {CONTACTS.map((c) => (
            <ContactNode key={c.key} contact={c} onPress={() => router.push('/pesse/send')} />
          ))}
          <InviteNode label={WALLET.inviteLabel} />
        </ScrollView>

        <View style={{ marginTop: SP.lg }}>
          <SectionHead
            title={WALLET.historyTitle}
            action={WALLET.seeMore}
            onAction={() => router.push('/pesse/cards')}
          />
        </View>

        <View style={{ marginTop: SP.sm, gap: 8 }}>
          {HISTORY.map((t) => (
            <TxnRow key={t.key} txn={t} />
          ))}
        </View>
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
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
        />
      </View>
    </View>
  );
}
