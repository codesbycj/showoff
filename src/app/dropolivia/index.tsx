import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

import { ActionGrid } from '@/features/dropolivia/components/action-grid';
import { Dock } from '@/features/dropolivia/components/dock';
import { RecentCard } from '@/features/dropolivia/components/recent-card';
import { ShipmentSheet } from '@/features/dropolivia/components/shipment-sheet';
import { T } from '@/features/dropolivia/components/text';
import { recent, sections } from '@/features/dropolivia/data/track';
import {
  DARK_TOP,
  DOCK_BOTTOM,
  MARGIN,
  RECENT_TOP,
  SCROLL_TAIL,
} from '@/features/dropolivia/layout';
import { dl } from '@/features/dropolivia/theme';
import { useInsets } from '@/features/dropolivia/use-insets';

/**
 * Delivery — tracking.
 *
 * Assembly only: the parcel that is moving, the four things that can be
 * started, and the last thing that was tracked.
 *
 * The yellow sheet is the first thing in the scroll rather than a fixed header,
 * because it carries the status and the status scrolls with the page — the
 * reference's does too, which is why its rounded foot is visible at rest.
 */
export default function DropOlivia() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: dl.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + SCROLL_TAIL }}
      >
        <ShipmentSheet topInset={insets.top} />

        <View style={{ paddingHorizontal: MARGIN }}>
          <T variant="section" color={dl.onDark} style={{ marginTop: DARK_TOP }}>
            {sections.actions}
          </T>

          <View style={{ marginTop: 14 }}>
            <ActionGrid />
          </View>

          <View
            style={{
              marginTop: DARK_TOP,
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <T variant="section" color={dl.onDark}>
              {sections.recent}
            </T>
            <Pressable accessibilityRole="button" accessibilityLabel={sections.more}>
              <T variant="more" color={dl.onDarkSoft}>
                {sections.more}
              </T>
            </Pressable>
          </View>

          <View style={{ marginTop: RECENT_TOP, gap: 12 }}>
            {recent.map((r) => (
              <RecentCard key={r.key} item={r} />
            ))}
          </View>
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
        <Dock />
      </View>
    </View>
  );
}
