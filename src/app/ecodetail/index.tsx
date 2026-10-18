import { StatusBar } from 'expo-status-bar';
import ShoppingBag from 'lucide-react-native/icons/shopping-bag';
import { useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ProductStage } from '@/features/ecodetail/components/product-stage';
import { T } from '@/features/ecodetail/components/text';
import {
  claims,
  cta,
  description,
  product,
  selectedSize,
  sizes,
} from '@/features/ecodetail/data/product';
import {
  BAR_BOTTOM,
  BAR_HEIGHT,
  MARGIN,
  PANEL,
  SECTION_TOP,
  SHEET_TOP,
  SIZE_GAP,
  SIZE_HEIGHT,
} from '@/features/ecodetail/layout';
import { ec, radius } from '@/features/ecodetail/theme';
import { useInsets } from '@/features/ecodetail/use-insets';

/**
 * Eco Bites — the product.
 *
 * Assembly only: the product on its panel, what it is, what sizes it comes
 * in, what is in it, and the way to buy it.
 *
 * The panel is a share of the window rather than a dp height, so the sheet
 * under it starts at the same point on any phone instead of leaving the
 * description half off the page on a short one.
 */
export default function EcoDetail() {
  const insets = useInsets();
  const { height } = useWindowDimensions();
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: ec.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + BAR_HEIGHT + 28 }}
      >
        <ProductStage height={height * PANEL} topInset={insets.top} />

        <View style={{ paddingHorizontal: MARGIN, marginTop: SHEET_TOP }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <T variant="display" color={ec.ink} style={{ flex: 1 }}>
              {product.name}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Star size={15} />
              <T variant="rating" color={ec.ink}>
                {product.rating}
              </T>
            </View>
          </View>
          <T variant="body" color={ec.muted}>
            {product.tagline}
          </T>

          <T variant="section" color={ec.ink} style={{ marginTop: SECTION_TOP }}>
            {description.sizeTitle}
          </T>
          <View style={{ flexDirection: 'row', gap: SIZE_GAP, marginTop: 10 }}>
            {sizes.map((s) => {
              const on = s.key === selectedSize;
              return (
                <Pressable key={s.key} accessibilityRole="button" accessibilityLabel={s.label}>
                  <View
                    style={{
                      height: SIZE_HEIGHT,
                      paddingHorizontal: 14,
                      borderRadius: radius.pill,
                      backgroundColor: on ? ec.canvasDeep : ec.well,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <T variant="size" color={on ? ec.onLime : ec.ink}>
                      {s.label}
                    </T>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <T variant="section" color={ec.ink} style={{ marginTop: SECTION_TOP }}>
            {description.title}
          </T>
          <T variant="description" color={ec.muted} style={{ marginTop: 6 }}>
            {description.body}
          </T>

          <View style={{ flexDirection: 'row', gap: SIZE_GAP, marginTop: 14 }}>
            {claims.map((c) => (
              <View
                key={c}
                style={{
                  height: SIZE_HEIGHT,
                  paddingHorizontal: 14,
                  borderRadius: radius.pill,
                  backgroundColor: ec.well,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant="size" color={ec.muted}>
                  {c}
                </T>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Outside the scroll, so the description runs under it rather than
          pushes it off the page. */}
      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: insets.bottom + BAR_BOTTOM,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Pressable
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={cta}
          style={{ flex: 1 }}
        >
          <View
            style={{
              height: BAR_HEIGHT,
              borderRadius: radius.pill,
              backgroundColor: ec.canvas,
              borderWidth: 1,
              borderColor: ec.rule,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="button" color={ec.ink}>
              {cta}
            </T>
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="Bag">
          <View
            style={{
              width: BAR_HEIGHT,
              height: BAR_HEIGHT,
              borderRadius: radius.full,
              backgroundColor: ec.action,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={20} color={ec.onDark} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** The rating star. Drawn: a star is a flat mark, and every set draws it differently. */
function Star({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M10 1 L12.7 6.8 L19 7.6 L14.4 12 L15.6 18.4 L10 15.3 L4.4 18.4 L5.6 12 L1 7.6 L7.3 6.8 Z"
        fill={ec.star}
      />
    </Svg>
  );
}
