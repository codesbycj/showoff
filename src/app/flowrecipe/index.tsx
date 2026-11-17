import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View } from 'react-native';

import { Glyph } from '@/features/flowrecipe/components/glyph';
import { IngredientList } from '@/features/flowrecipe/components/ingredient-list';
import { MacroRings } from '@/features/flowrecipe/components/macro-rings';
import { T } from '@/features/flowrecipe/components/text';
import { energy, insight, macros, recipe } from '@/features/flowrecipe/data/recipe';
import { useLayout } from '@/features/flowrecipe/layout';
import { ct } from '@/features/flowrecipe/theme';

/**
 * Flowan — the recipe.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder and the sheet is sized, so the action always
 * sits on the foot (I3); every figure on the screen is computed from the
 * macros (R9).
 */
export default function FlowrecipeScreen() {
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
      <StatusBar style="light" />

      <View style={{ height: L.hero.h, backgroundColor: ct.tray }}>
        <Image
          source={recipe.image}
          style={{ width: L.W, height: L.hero.h }}
          resizeMode="cover"
          accessibilityLabel={recipe.name}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: L.insets.top + 4,
          left: L.margin,
          right: L.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/flowmeals')}
        >
          <View style={round}>
            <Glyph name="back" size={18} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="Save this recipe">
          <View style={round}>
            <Glyph name="bookmarked" size={17} color={ct.ink} />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: -26,
          backgroundColor: ct.page,
          borderTopLeftRadius: L.sheet.radius,
          borderTopRightRadius: L.sheet.radius,
        }}
      >
        <View style={{ height: L.handleH, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 40, height: 4.5, borderRadius: 3, backgroundColor: ct.line }} />
        </View>

        <View style={{ marginHorizontal: L.margin, height: L.slotH }}>
          <T variant="slot">{recipe.slot}</T>
        </View>

        <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
          <T variant="title" numberOfLines={1}>
            {recipe.name}
          </T>
        </View>

        <View
          style={{
            marginHorizontal: L.margin,
            height: L.factsH,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Glyph name="clock" size={14} color={ct.muted} strokeWidth={1.7} />
          <T variant="facts">
            {recipe.minutes} min · {energy(macros)} kcal · Serves {recipe.serves}
          </T>
        </View>

        <View style={{ height: L.gapFacts }} />
        <MacroRings margin={L.margin} height={L.ringsH} />

        <View style={{ height: L.gapRings }} />
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.tip.h,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            gap: 12,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: L.tip.radius,
              backgroundColor: ct.lilacSoft,
            }}
          />

          <Glyph name="spark" size={18} color={ct.lilac} />
          <View style={{ flex: 1 }}>
            <T variant="tipLabel">{insight.label}</T>
            <T variant="tipBody">{insight.body}</T>
          </View>
        </View>

        <View style={{ height: L.gapTip }} />
        <IngredientList margin={L.margin} tabsH={L.tabsH} itemH={L.item.h} gap={L.gapTabs} />

        <View style={{ height: L.gapItems }} />
        <View style={{ marginHorizontal: L.margin }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={recipe.cta}
            onPress={() => router.push('/flowmeals')}
          >
            <View
              style={{
                height: L.cta.h,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: L.cta.h / 2,
                  backgroundColor: ct.dark,
                }}
              />

              <T variant="cta">{recipe.cta}</T>
              <Glyph name="arrow" size={18} color={ct.onDark} strokeWidth={2} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
