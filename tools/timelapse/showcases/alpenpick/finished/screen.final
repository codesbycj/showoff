import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { DestinationGrid } from '@/features/alpenpick/components/destination-grid';
import { Glyph } from '@/features/alpenpick/components/glyph';
import { T } from '@/features/alpenpick/components/text';
import { activities, header } from '@/features/alpenpick/data/pick';
import { useLayout } from '@/features/alpenpick/layout';
import { ct } from '@/features/alpenpick/theme';

/**
 * Alpenroute — pick a destination.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The grid is the remainder — its cards grow into whatever the header, the
 * chips and the action leave — so the screen always ends on its button with
 * no band under it (I3).
 */
export default function AlpenpickScreen() {
  const L = useLayout();

  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.white,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/alpenstay')}
        >
          <View style={round}>
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Filter destinations">
            <View style={round}>
              <Glyph name="filter" size={18} color={ct.ink} strokeWidth={1.8} />
            </View>
          </Pressable>

          <Pressable accessibilityRole="button" accessibilityLabel="Saved destinations">
            <View style={round}>
              <Glyph name="star" size={18} color={ct.ink} strokeWidth={1.8} />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ height: L.gapHeader }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <T variant="title">{header.title}</T>
      </View>

      <View style={{ height: L.gapTitle }} />
      <View style={{ marginHorizontal: L.margin, flexDirection: 'row', gap: 10 }}>
        {activities.map((activity) => (
          <Pressable
            key={activity.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!activity.on }}
            accessibilityLabel={activity.label}
          >
            <View
              style={{
                height: L.chip.h,
                paddingHorizontal: 16,
                borderRadius: L.chip.radius,
                backgroundColor: activity.on ? ct.lime : ct.white,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Glyph name={activity.glyph} size={16} color={ct.ink} strokeWidth={1.7} />
              <T variant={activity.on ? 'chipOn' : 'chip'}>{activity.label}</T>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ height: L.gapChips }} />
      <DestinationGrid
        margin={L.margin}
        width={L.card.w}
        height={L.card.h}
        radius={L.card.radius}
      />

      <View style={{ height: L.gapCta }} />
      <View style={{ marginHorizontal: L.margin }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={header.cta}
          onPress={() => router.push('/alpenstay')}
        >
          <View
            style={{
              height: L.cta.h,
              borderRadius: L.cta.h / 2,
              backgroundColor: ct.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="cta">{header.cta}</T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
