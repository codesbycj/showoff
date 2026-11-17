import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { DateStrip } from '@/features/alpenfly/components/date-strip';
import { FilterChips } from '@/features/alpenfly/components/filter-chips';
import { Glyph } from '@/features/alpenfly/components/glyph';
import { RouteCard } from '@/features/alpenfly/components/route-card';
import { T } from '@/features/alpenfly/components/text';
import { TicketList } from '@/features/alpenfly/components/ticket-list';
import { labels, modes, tickets } from '@/features/alpenfly/data/fly';
import { useLayout } from '@/features/alpenfly/layout';
import { ct } from '@/features/alpenfly/theme';

/**
 * Alpenroute — flight search.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The ticket list is the remainder and runs off the bottom edge, so the foot
 * cannot open a band (I3); the count above it is the list's own length (R9).
 */
export default function AlpenflyScreen() {
  const L = useLayout();

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
          gap: 12,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/alpenpick')}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>

        <View
          style={{
            flex: 1,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.white,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 4,
          }}
        >
          {modes.map((mode) => (
            <Pressable
              key={mode.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: !!mode.on }}
              accessibilityLabel={mode.label}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: mode.on ? ct.dark : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant={mode.on ? 'modeOn' : 'modeOff'}>{mode.label}</T>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ height: L.gapHeader }} />
      <RouteCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.route.h}
        radius={L.route.radius}
      />

      <View style={{ height: L.gapRoute }} />
      <FilterChips margin={L.margin} height={L.filters.h} radius={L.filters.radius} />

      <View style={{ height: L.gapFilters }} />
      <DateStrip margin={L.margin} height={L.stripH} />

      <View style={{ height: L.gapStrip }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.countH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="count">
          {tickets.length} {labels.found}
        </T>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filter results"
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="filter" size={17} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>
      </View>

      <View style={{ height: L.gapCount }} />
      <TicketList
        margin={L.margin}
        height={L.ticket.h}
        gap={L.ticket.gap}
        radius={L.ticket.radius}
      />
    </View>
  );
}
