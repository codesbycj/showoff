import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Dock } from '@/features/flowmeals/components/dock';
import { MealCard } from '@/features/flowmeals/components/meal-card';
import { T } from '@/features/flowmeals/components/text';
import { WideMeal } from '@/features/flowmeals/components/wide-meal';
import { dayKcal, dinner, hero, intro, more, moreLabel } from '@/features/flowmeals/data/meals';
import { useLayout } from '@/features/flowmeals/layout';
import { ct } from '@/features/flowmeals/theme';

/**
 * Flowan — nourish.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero meal is the remainder, so the dinner card always sits above the
 * dock and the foot can never open a band (I3).
 */
export default function FlowmealsScreen() {
  const L = useLayout();
  const total = dayKcal([hero, ...more, dinner]);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View style={{ marginHorizontal: L.margin, height: L.introH, justifyContent: 'center' }}>
        <T variant="display">{intro.display}</T>
        <T variant="facts" style={{ marginTop: 6 }}>
          {intro.body} · {total} kcal today
        </T>
      </View>

      <View style={{ height: L.gapIntro }} />
      <View style={{ marginHorizontal: L.margin }}>
        <MealCard
          meal={hero}
          width={L.W - L.margin * 2}
          height={L.hero.h}
          imageH={L.hero.imageH}
          radius={L.hero.radius}
          big
          onOpen={() => router.push('/flowrecipe')}
        />
      </View>

      <View style={{ height: L.gapHero }} />
      <View style={{ marginHorizontal: L.margin, height: L.sectionH, justifyContent: 'center' }}>
        <T variant="section">{moreLabel}</T>
      </View>

      <View style={{ height: L.gapSection }} />
      <View style={{ marginHorizontal: L.margin, flexDirection: 'row', gap: 12 }}>
        {more.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            width={L.pair.w}
            height={L.pair.h}
            imageH={L.pair.imageH}
            radius={L.pair.radius}
            onOpen={() => router.push('/flowrecipe')}
          />
        ))}
      </View>

      <View style={{ height: L.gapPair }} />
      <WideMeal
        meal={dinner}
        margin={L.margin}
        height={L.wide.h}
        radius={L.wide.radius}
        onOpen={() => router.push('/flowrecipe')}
      />

      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="nourish"
        onNourish={() => router.push('/flowhome')}
      />
    </View>
  );
}
