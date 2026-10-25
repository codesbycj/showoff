import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Glyph } from '@/features/rovabook/components/glyph';
import { T } from '@/features/rovabook/components/text';
import { TicketStack } from '@/features/rovabook/components/ticket-stack';
import { copy, dock } from '@/features/rovabook/data/search';
import {
  DISPLAY_TOP,
  DOCK_HEIGHT,
  FOOT_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
  TICKETS_TOP,
  TIMER_HEIGHT,
  TIMER_TOP,
} from '@/features/rovabook/layout';
import { radius, rv, type } from '@/features/rovabook/theme';
import { useInsets } from '@/features/rovabook/use-insets';

/**
 * Rova — the tickets.
 *
 * Assembly only: the brand and alerts, what you are doing, how long the seats
 * are held, the tickets themselves, a word about the city, and the dock.
 *
 * The dock floats over the page rather than sitting under it, so the stack
 * runs on beneath it and the screen is full to its bottom edge.
 */
export default function RovabookScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: rv.canvas }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', height: HEADER_SIZE }}>
          <Glyph name="pin" size={18} tint={rv.green} />
          <T
            variant="brand"
            color={rv.ink}
            style={{ marginLeft: 6, flex: 1, height: type.brand.line }}
          >
            {copy.brand}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
            <View
              style={{
                width: HEADER_SIZE,
                height: HEADER_SIZE,
                borderRadius: radius.control,
                backgroundColor: rv.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="bell" size={18} tint={rv.ink} />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: DISPLAY_TOP }}>
          {copy.display.map((line) => (
            <T key={line} variant="display" color={rv.ink} style={{ height: type.display.line }}>
              {line}
            </T>
          ))}
        </View>

        <View
          style={{
            height: TIMER_HEIGHT,
            marginTop: TIMER_TOP,
            alignSelf: 'flex-start',
            paddingHorizontal: 12,
            borderRadius: radius.pill,
            backgroundColor: rv.greenDim,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Glyph name="calendar" size={14} tint={rv.green} />
          <T variant="radio" color={rv.body} style={{ marginLeft: 7, height: type.radio.line }}>
            {copy.timer}
          </T>
          <T variant="time" color={rv.green} style={{ marginLeft: 6, height: type.time.line }}>
            {copy.countdown}
          </T>
        </View>

        <View style={{ marginTop: TICKETS_TOP }}>
          <TicketStack />
        </View>

        <View
          style={{
            marginTop: FOOT_TOP,
            // clear of the floating dock, so the last line is not half-hidden
            marginBottom: DOCK_HEIGHT + 18,
          }}
        >
          {copy.footTitle.map((line) => (
            <T key={line} variant="display" color={rv.ink} style={{ height: type.display.line }}>
              {line}
            </T>
          ))}
          <T variant="blurb" color={rv.body} style={{ marginTop: 4 }}>
            {copy.footBlurb}
          </T>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: insets.bottom + 8,
          height: DOCK_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: rv.card,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}
      >
        {dock.map((d) => (
          // The live tab sizes to its own label and the rest share what is
          // left. `flex: 0` gives the pill no basis at all, so the label was
          // clipped by its own background.
          <Pressable
            key={d.id}
            accessibilityRole="tab"
            accessibilityLabel={d.label}
            style={d.on ? { flexGrow: 0, flexShrink: 0 } : { flex: 1 }}
          >
            <View
              style={{
                height: DOCK_HEIGHT - 16,
                paddingHorizontal: d.on ? 18 : 0,
                borderRadius: radius.pill,
                backgroundColor: d.on ? rv.green : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph
                name={
                  d.id === 'home'
                    ? 'pin'
                    : d.id === 'explore'
                      ? 'swap'
                      : d.id === 'saved'
                        ? 'seat'
                        : 'person'
                }
                size={18}
                tint={d.on ? rv.onGreen : rv.muted}
              />
              {d.on ? (
                <T
                  variant="radio"
                  color={rv.onGreen}
                  style={{ marginLeft: 7, height: type.radio.line }}
                >
                  {d.label}
                </T>
              ) : null}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
