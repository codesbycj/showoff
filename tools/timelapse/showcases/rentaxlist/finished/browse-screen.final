import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { CarCard } from '@/features/rentaxlist/components/car-card';
import { DateRow } from '@/features/rentaxlist/components/date-row';
import { FloatingDock } from '@/features/rentaxlist/components/floating-dock';
import { SegmentTabs } from '@/features/rentaxlist/components/segment-tabs';
import { T } from '@/features/rentaxlist/components/text';
import { TopBar } from '@/features/rentaxlist/components/top-bar';
import { cars, headline, tabs } from '@/features/rentaxlist/data/browse';
import {
  CARD_GAP,
  CARDS_TOP,
  DATE_TOP,
  DOCK_BOTTOM,
  DOCK_HEIGHT,
  HEADER_TOP,
  MARGIN,
  TABS_TOP,
  TITLE_TOP,
} from '@/features/rentaxlist/layout';
import { rx } from '@/features/rentaxlist/theme';
import { useInsets } from '@/features/rentaxlist/use-insets';

/**
 * RentaX — browse.
 *
 * Assembly only: who and where you are, what the app is for, which catalogue,
 * when you want it, and the cars themselves.
 *
 * Two pieces of state live here rather than in the controls that change them —
 * which catalogue is open and how the list is drawn — because both change what
 * the list below shows, and a control that owns its own state cannot be driven
 * from anywhere else.
 *
 * Every handler is empty on purpose. The detail screen is its own showcase
 * with its own slug, so there is nothing to push to yet; what matters is that
 * the decision is made here.
 */
export default function RentaxList() {
  const insets = useInsets();
  const [tab, setTab] = useState<string>(tabs[0].key);
  const [view, setView] = useState<'rows' | 'grid'>('rows');

  return (
    <View style={{ flex: 1, backgroundColor: rx.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: DOCK_HEIGHT + DOCK_BOTTOM + insets.bottom + 12,
        }}
      >
        <TopBar />

        <View style={{ marginTop: TITLE_TOP }}>
          <T variant="display" color={rx.onDark}>
            {headline.one}
          </T>
          <T variant="display" color={rx.onDark}>
            {headline.two}
          </T>
        </View>

        <View style={{ marginTop: TABS_TOP }}>
          <SegmentTabs items={tabs} active={tab} onSelect={setTab} />
        </View>

        <View style={{ marginTop: DATE_TOP }}>
          <DateRow view={view} onView={setView} />
        </View>

        <View style={{ marginTop: CARDS_TOP, gap: CARD_GAP }}>
          {cars.map((car) => (
            <CarCard
              key={car.key}
              name={car.name}
              range={car.range}
              rating={car.rating}
              recommend={car.recommend}
              priceLabel={car.priceLabel}
              price={car.price}
              card={car.card}
              body={car.body}
              swatch={car.swatch}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + DOCK_BOTTOM,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        <FloatingDock active="browse" />
      </View>
    </View>
  );
}
