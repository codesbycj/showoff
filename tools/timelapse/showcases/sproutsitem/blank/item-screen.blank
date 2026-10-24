import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

// STEP 1.01 the dish
// import { ProductStage } from '@/features/sproutsitem/components/product-stage';
// STEP 1.09 what people think of it
// import { StatRow } from '@/features/sproutsitem/components/stat-row';
import { T } from '@/features/sproutsitem/components/text';
import { cta, description, product } from '@/features/sproutsitem/data/product';
import {
  BAR_BOTTOM,
  BAR_HEIGHT,
  MARGIN,
  PANEL,
  SECTION_TOP,
  SHEET_TOP,
} from '@/features/sproutsitem/layout';
import { radius, sp } from '@/features/sproutsitem/theme';
import { useInsets } from '@/features/sproutsitem/use-insets';

/**
 * Sprouts — the product.
 *
 * Assembly only: the dish on its panel, what it is, what it costs, what people
 * think of it, and the way to buy it.
 *
 * The panel is a share of the window rather than a dp height, so the sheet
 * under it starts at the same point on any phone instead of leaving the
 * description half off the page on a short one.
 */
export default function SproutsItem() {
  const insets = useInsets();
  const { height } = useWindowDimensions();
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: sp.sheet }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + BAR_HEIGHT + 26 }}
      >
        {/* STEP 1.02 on its panel
        <ProductStage height={height * PANEL} topInset={insets.top} />
        */}

        <View style={{ paddingHorizontal: MARGIN, marginTop: SHEET_TOP }}>
          {/* STEP 1.06 whose it is
          <T variant="brand" color={sp.panel}>
            {product.brand}
          </T>
          */}

          {/* STEP 1.07 what it is, and what it costs
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginTop: 6,
            }}
          >
            <T variant="display" color={sp.onDark} style={{ flex: 1 }}>
              {product.name}
            </T>
            <View style={{ alignItems: 'flex-end' }}>
              <T variant="price" color={sp.panel}>
                {product.price}
              </T>
              <T variant="was" color={sp.was} style={{ textDecorationLine: 'line-through' }}>
                {product.was}
              </T>
            </View>
          </View>
          */}

          {/* STEP 1.08 by weight
          <T variant="unit" color={sp.was} style={{ marginTop: 4 }}>
            {product.unit}
          </T>
          */}

          <View style={{ marginTop: SECTION_TOP }}>
            {/* STEP 1.10 and what is in it
            <StatRow />
            */}
          </View>

          {/* STEP 1.12 the whole story
          <T variant="body" color={sp.onDarkSoft} style={{ marginTop: SECTION_TOP }}>
            {description}
          </T>
          */}
        </View>
      </ScrollView>

      {/* Outside the scroll, so the description runs under it rather than
          pushes it off the page. */}
      {/* STEP 1.13 and the way to buy it
      <Pressable
        onPressIn={() => setHeld(true)}
        onPressOut={() => setHeld(false)}
        accessibilityRole="button"
        accessibilityLabel={cta}
        style={{
          position: 'absolute',
          left: MARGIN + 30,
          right: MARGIN + 30,
          bottom: insets.bottom + BAR_BOTTOM,
        }}
      >
        <View
          style={{
            height: BAR_HEIGHT,
            borderRadius: radius.pill,
            backgroundColor: sp.panel,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.86 : 1,
          }}
        >
          <T variant="button" color={sp.ink}>
            {cta}
          </T>
        </View>
      </Pressable>
      */}
    </View>
  );
}
