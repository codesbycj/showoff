import { StatusBar } from 'expo-status-bar';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.11 the three things to do with it
// import { ActionRow } from '@/features/furetinnew/components/action-row';
// STEP 1.06 what is in the wallet
// import { BalanceCard } from '@/features/furetinnew/components/balance-card';
// STEP 1.26 the way around
// import { Dock } from '@/features/furetinnew/components/dock';
// STEP 1.24 which is nothing
// import { EmptyState } from '@/features/furetinnew/components/empty-state';
// STEP 1.01 who is signed in
// import { Header } from '@/features/furetinnew/components/header';
// STEP 1.17 what the partner is offering
// import { PromoBanner } from '@/features/furetinnew/components/promo-banner';
// STEP 1.14 what else it does
// import { ServicePanel } from '@/features/furetinnew/components/service-panel';
import { T } from '@/features/furetinnew/components/text';
import { dots, section } from '@/features/furetinnew/data/wallet';
import {
  ACTION_TOP,
  CARD_TOP,
  DOCK_BOTTOM,
  DOTS_TOP,
  EMPTY_TOP,
  HEADER_TOP,
  MARGIN,
  PANEL_TOP,
  PROMO_TOP,
  SCROLL_TAIL,
  SECTION_TOP,
} from '@/features/furetinnew/layout';
import { fu, radius } from '@/features/furetinnew/theme';
import { useInsets } from '@/features/furetinnew/use-insets';

/**
 * Furetin — the wallet home, redrawn.
 *
 * Assembly only: who is here, what is in the wallet, what can be done with it,
 * what the partner is offering, and what was done lately — over a scroll, with
 * the dock floating above it.
 *
 * The list is empty on purpose. The reference's redraw shows the empty state,
 * and it is the harder thing to get right: a list with nothing in it still has
 * to fill the page.
 */
export default function FuretinNew() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: fu.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 across the top
        <Header />
        */}

        <View style={{ marginTop: CARD_TOP }}>
          {/* STEP 1.07 under the header
          <BalanceCard />
          */}
        </View>

        <View style={{ marginTop: ACTION_TOP }}>
          {/* STEP 1.12 under the card, not in it
          <ActionRow />
          */}
        </View>

        <View style={{ marginTop: PANEL_TOP }}>
          {/* STEP 1.15 four across
          <ServicePanel />
          */}
        </View>

        <View style={{ marginTop: PROMO_TOP }}>
          {/* STEP 1.18 in the middle of the page
          <PromoBanner />
          */}
        </View>

        {/* STEP 1.22 which of them this is
        <View
          style={{
            marginTop: DOTS_TOP,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          {Array.from({ length: dots.count }, (_, i) => (
            <View
              key={i}
              style={{
                width: i === dots.active ? 16 : 6,
                height: 6,
                borderRadius: radius.pill,
                backgroundColor: i === dots.active ? fu.dotOn : fu.dot,
              }}
            />
          ))}
        </View>
        */}

        {/* STEP 1.23 what happened lately
        <View
          style={{
            marginTop: SECTION_TOP,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <T variant="section" color={fu.ink}>
            {section.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={section.more}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <T variant="more" color={fu.yellowDeep}>
                {section.more}
              </T>
              <ChevronRight size={14} color={fu.yellowDeep} strokeWidth={2.2} />
            </View>
          </Pressable>
        </View>
        */}

        <View style={{ marginTop: EMPTY_TOP }}>
          {/* STEP 1.25 and says so
          <EmptyState />
          */}
        </View>
      </ScrollView>

      {/* Outside the scroll, so the page runs under it rather than pushes it. */}
      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: insets.bottom + DOCK_BOTTOM,
        }}
      >
        {/* STEP 1.27 floating at the foot
        <Dock />
        */}
      </View>
    </View>
  );
}
