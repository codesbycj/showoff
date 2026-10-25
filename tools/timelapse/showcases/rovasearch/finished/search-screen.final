import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { DetailCard } from '@/features/rovasearch/components/detail-card';
import { Glyph } from '@/features/rovasearch/components/glyph';
import { RouteCard } from '@/features/rovasearch/components/route-card';
import { T } from '@/features/rovasearch/components/text';
import { copy } from '@/features/rovasearch/data/search';
import {
  BLURB_TOP,
  BUTTON_HEIGHT,
  BUTTON_TOP,
  DETAIL_TOP,
  DISPLAY_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
  ROUTE_TOP,
} from '@/features/rovasearch/layout';
import { radius, rv, type } from '@/features/rovasearch/theme';
import { useInsets } from '@/features/rovasearch/use-insets';

/**
 * Rova — the search screen.
 *
 * Assembly only: the brand and alerts, what the app is for, where you are
 * going, when and in what, and the one thing the screen asks.
 *
 * The stack is sized so it reaches the bottom edge — built at the reference's
 * squatter proportions it stops about 135dp short. See `layout.ts`.
 */
export default function RovasearchScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: rv.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

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

      <T variant="blurb" color={rv.body} style={{ marginTop: BLURB_TOP }}>
        {copy.blurb}
      </T>

      <View style={{ marginTop: ROUTE_TOP }}>
        <RouteCard />
      </View>

      <View style={{ marginTop: DETAIL_TOP }}>
        <DetailCard />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.action}>
          <View
            style={{
              height: BUTTON_HEIGHT,
              marginTop: BUTTON_TOP,
              borderRadius: radius.pill,
              backgroundColor: rv.green,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="action" color={rv.onGreen} style={{ height: type.action.line }}>
              {copy.action}
            </T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
