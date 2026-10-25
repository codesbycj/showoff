import { Pressable, View } from 'react-native';

import { calories, meal, progress, weight } from '../data/day';
import { CARD_PAD, HERO_HEIGHT, MEAL_HEIGHT, PAIR_HEIGHT } from '../layout';
import { radius, ms, type } from '../theme';
import { Glyph, Spark } from './glyph';
import { T } from './text';

/**
 * A card's own label: a mark in a disc and a word, on a tinted pill.
 *
 * Every card opens with one, which is what makes four different fills read as
 * one family rather than four unrelated blocks.
 */
function Tag({
  mark,
  label,
  ink,
}: {
  mark: 'trend' | 'scale' | 'flame';
  label: string;
  ink: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: radius.control,
          backgroundColor: 'rgba(255, 255, 255, 0.18)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name={mark} size={13} tint={ink} />
      </View>
      <T variant="tag" color={ink} style={{ marginLeft: 7, height: type.tag.line }}>
        {label}
      </T>
    </View>
  );
}

/** How much of today's target is done, and what the target is. */
export function ProgressCard() {
  return (
    <View
      style={{
        height: HERO_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: ms.indigo,
        padding: CARD_PAD,
      }}
    >
      <Tag mark="trend" label={progress.tag} ink={ms.onDark} />
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <T variant="figure" color={ms.onDark} style={{ height: type.figure.line }}>
            {progress.pct}
          </T>
          <T variant="meta" color="rgba(255,255,255,0.7)" style={{ height: type.meta.line }}>
            {progress.date}
          </T>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: radius.card - 4,
            backgroundColor: ms.canvas,
            alignItems: 'center',
          }}
        >
          <T variant="statValue" color={ms.ink} style={{ height: type.statValue.line }}>
            {progress.target}
          </T>
          <T variant="statLabel" color={ms.body} style={{ height: type.statLabel.line }}>
            {progress.targetUnit}
          </T>
        </View>
      </View>
    </View>
  );
}

/** Today's weight, and today's calories, side by side. */
export function PairCards() {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View
        style={{
          flex: 1,
          height: PAIR_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: ms.teal,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
        <Tag mark="scale" label={weight.tag} ink={ms.onDark} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <T variant="figureSm" color={ms.onDark} style={{ height: type.figureSm.line }}>
              {weight.value}
            </T>
            <T
              variant="unit"
              color="rgba(255,255,255,0.7)"
              style={{ marginLeft: 4, height: type.unit.line }}
            >
              {weight.unit}
            </T>
          </View>
          <T variant="meta" color="rgba(255,255,255,0.7)" style={{ height: type.meta.line }}>
            {weight.change}
          </T>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          height: PAIR_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: ms.lime,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
        <Tag mark="flame" label={calories.tag} ink={ms.onLight} />
        <Spark width={120} tint={ms.onLight} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="figureSm" color={ms.onLight} style={{ height: type.figureSm.line }}>
            {calories.value}
          </T>
          <T variant="unit" color={ms.body} style={{ marginLeft: 4, height: type.unit.line }}>
            {calories.unit}
          </T>
        </View>
      </View>
    </View>
  );
}

/** What was eaten, and what it was made of. */
export function MealCard() {
  const disc = {
    width: 30,
    height: 30,
    borderRadius: radius.control,
    backgroundColor: 'rgba(16, 17, 20, 0.08)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        height: MEAL_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: ms.sky,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Tag mark="flame" label={meal.tag} ink={ms.onLight} />
          <T
            variant="meta"
            color={ms.body}
            style={{ marginTop: 4, marginLeft: 31, height: type.meta.line }}
          >
            {meal.kcal}
          </T>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Add to this meal">
          <View style={disc}>
            <Glyph name="plus" size={15} tint={ms.onLight} />
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {meal.macros.map((m) => (
          <View key={m.id} style={{ flex: 1 }}>
            <T variant="statLabel" color={ms.body} style={{ height: type.statLabel.line }}>
              {m.label}
            </T>
            <T variant="statValue" color={ms.onLight} style={{ height: type.statValue.line }}>
              {m.value}
            </T>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 12,
            paddingRight: 8,
            paddingVertical: 7,
            borderRadius: radius.pill,
            backgroundColor: 'rgba(16, 17, 20, 0.08)',
          }}
        >
          <T variant="tag" color={ms.onLight} style={{ height: type.tag.line }}>
            {meal.when}
          </T>
          <Glyph name="caret" size={13} tint={ms.onLight} />
        </View>
        <View style={{ flex: 1 }} />
        <Pressable accessibilityRole="button" accessibilityLabel="Edit this meal">
          <View style={disc}>
            <Glyph name="pencil" size={14} tint={ms.onLight} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
