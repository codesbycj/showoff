import { StatusBar } from 'expo-status-bar';
import House from 'lucide-react-native/icons/house';
import Menu from 'lucide-react-native/icons/menu';
import Search from 'lucide-react-native/icons/search';
import ShoppingBasket from 'lucide-react-native/icons/shopping-basket';
import Tag from 'lucide-react-native/icons/tag';
import { Image, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

import { ChipRow } from '@/features/sproutshome/components/chip-row';
import { FeatureCard } from '@/features/sproutshome/components/feature-card';
import { T } from '@/features/sproutshome/components/text';
import { dishes, dock, header, selectedDock } from '@/features/sproutshome/data/home';
import {
  CHIP_TOP,
  DISH_GAP,
  DISH_H,
  DISH_TOP,
  DOCK_BOTTOM,
  DOCK_DISC,
  DOCK_HEIGHT,
  FEATURE_TOP,
  HEADER_DISC,
  HEADER_TOP,
  MARGIN,
  SCROLL_TAIL,
} from '@/features/sproutshome/layout';
import { radius, sp } from '@/features/sproutshome/theme';
import { useInsets } from '@/features/sproutshome/use-insets';

const MARK = require('../../../assets/images/sproutshome/mark.jpg');
const DISHES = [
  require('../../../assets/images/sproutshome/dish-1.jpg'),
  require('../../../assets/images/sproutshome/dish-2.jpg'),
];

const DOCK_ICONS = { home: House, tag: Tag, basket: ShoppingBasket, search: Search } as const;

/**
 * Sprouts — the shop home.
 *
 * Assembly only: the brand, what is featured, the aisles, and what is cooking.
 *
 * The feature card is a share of the window rather than a dp height, so the
 * composition holds on a short phone instead of pushing the aisles off it.
 */
export default function SproutsHome() {
  const insets = useInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: sp.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Menu">
            <Menu size={22} color={sp.onDark} strokeWidth={2.2} />
          </Pressable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <T variant="wordmark" color={sp.onDark}>
              {header.wordmark}
            </T>
          </View>
          <Image
            source={MARK}
            style={{ width: HEADER_DISC, height: HEADER_DISC, borderRadius: radius.full }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>

        <View style={{ marginTop: FEATURE_TOP }}>
          <FeatureCard height={height * 0.52} />
        </View>

        <View style={{ marginTop: CHIP_TOP }}>
          <ChipRow />
        </View>

        <View style={{ marginTop: DISH_TOP, flexDirection: 'row', gap: DISH_GAP }}>
          {dishes.map((d) => (
            <Image
              key={d.key}
              source={DISHES[d.art - 1]}
              style={{ flex: 1, height: DISH_H, borderRadius: radius.tile }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          ))}
        </View>
      </ScrollView>

      {/* Outside the scroll, so the cards run under it rather than push it. */}
      <View
        style={{
          position: 'absolute',
          left: MARGIN + 28,
          right: MARGIN + 28,
          bottom: insets.bottom + DOCK_BOTTOM,
          height: DOCK_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: sp.dock,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 7,
        }}
      >
        {dock.map((t) => {
          const Icon = DOCK_ICONS[t.icon];
          const on = t.key === selectedDock;
          return (
            <Pressable key={t.key} accessibilityRole="button" accessibilityLabel={t.key}>
              <View
                style={{
                  width: DOCK_DISC,
                  height: DOCK_DISC,
                  borderRadius: radius.full,
                  backgroundColor: on ? sp.dockWell : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  size={19}
                  color={sp.onDark}
                  strokeWidth={on ? 2.2 : 1.8}
                  fill={on ? sp.onDark : 'none'}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
