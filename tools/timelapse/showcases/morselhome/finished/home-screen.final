import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View } from 'react-native';

import { MealCard, PairCards, ProgressCard } from '@/features/morselhome/components/cards';
import { Glyph } from '@/features/morselhome/components/glyph';
import { T } from '@/features/morselhome/components/text';
import { dock, me } from '@/features/morselhome/data/day';
import {
  CARD_GAP,
  CARDS_TOP,
  DOCK_HEIGHT,
  GREET_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
} from '@/features/morselhome/layout';
import { radius, ms, type } from '@/features/morselhome/theme';
import { useInsets } from '@/features/morselhome/use-insets';

/**
 * Morsel — the home screen.
 *
 * Assembly only: the menu, alerts and who is signed in, who the day belongs
 * to, how it is going, and what was eaten — with the dock floating over it.
 *
 * The four cards are given explicit heights so the stack reaches the bottom
 * edge rather than ending above the dock.
 */
export default function MorselhomeScreen() {
  const insets = useInsets();

  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    backgroundColor: ms.chip,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ms.canvas }}>
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Menu">
            <View style={disc}>
              <Glyph name="menu" size={19} tint={ms.ink} />
            </View>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
            <View style={disc}>
              <Glyph name="bell" size={19} tint={ms.ink} />
            </View>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Your account">
            <Image
              source={me.src}
              style={{
                width: HEADER_SIZE,
                height: HEADER_SIZE,
                borderRadius: radius.control,
                marginLeft: 10,
              }}
            />
          </Pressable>
        </View>

        <View style={{ marginTop: GREET_TOP }}>
          <T variant="greet" color={ms.body} style={{ height: type.greet.line }}>
            {me.greeting}
          </T>
          <T variant="display" color={ms.ink} style={{ height: type.display.line }}>
            {me.name}
          </T>
        </View>

        <View style={{ marginTop: CARDS_TOP }}>
          <ProgressCard />
        </View>

        <View style={{ marginTop: CARD_GAP }}>
          <PairCards />
        </View>

        <View style={{ marginTop: CARD_GAP }}>
          <MealCard />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + 6,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            borderRadius: radius.pill,
            backgroundColor: ms.chip,
          }}
        >
          {dock.map((d, i) => (
            <Pressable key={d} accessibilityRole="tab" accessibilityLabel={d}>
              <View
                style={{
                  width: DOCK_HEIGHT - 10,
                  height: DOCK_HEIGHT - 10,
                  marginLeft: i === 0 ? 0 : 6,
                  borderRadius: radius.control,
                  backgroundColor: i === 0 ? ms.dark : ms.canvas,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name={d} size={19} tint={i === 0 ? ms.onDark : ms.ink} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
