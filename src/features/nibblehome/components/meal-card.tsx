import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, macros, mealCalories } from '../data/start';
import { MEAL_MIN, MEAL_PAD, MEAL_TOP } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/**
 * One macro column, with the share of its own target under it.
 *
 * The rail is this column's `share`, laid out as two flex boxes — a
 * percentage width needs a definite parent and a `flex: 1` column is not
 * one. The reference leaves the columns as four bare numbers with half a card
 * of empty mint under them.
 */
function Macro({ i }: { i: number }) {
  const m = macros[i];
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <T variant="macroName" color={nb.mintInk} style={{ height: type.macroName.line }}>
        {m.name}
      </T>
      <T variant="macroValue" color={nb.ink} style={{ height: type.macroValue.line }}>
        {m.value}
      </T>
      <View
        style={{
          height: 4,
          width: 46,
          marginTop: 7,
          borderRadius: 2,
          backgroundColor: nb.card,
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: m.share, borderRadius: 2, backgroundColor: nb.mintInk }} />
        <View style={{ flex: 1 - m.share }} />
      </View>
    </View>
  );
}

/** The meal that has not happened yet. */
function NextMeal({ onAdd }: { onAdd?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: radius.pill,
          backgroundColor: nb.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={17} height={17} viewBox="0 0 24 24">
          <Path
            d="M3.6 11.6h16.8a1 1 0 0 1 1 1.2 9.4 9.4 0 0 1-9.4 7.4 9.4 9.4 0 0 1-9.4-7.4 1 1 0 0 1 1-1.2Z"
            stroke={nb.ink}
            strokeWidth={1.7}
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M9.2 8.6c0-1.8 2-2 2-3.8M13.6 8.6c0-1.8 2-2 2-3.8"
            stroke={nb.ink}
            strokeWidth={1.7}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <T variant="mealName" color={nb.ink} style={{ height: type.mealName.line }}>
          {copy.lunch}
        </T>
        <T variant="mealNote" color={nb.mintInk} style={{ height: type.mealNote.line }}>
          {copy.lunchNote}
        </T>
      </View>

      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add to lunch">
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: radius.pill,
            backgroundColor: nb.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={15} height={15} viewBox="0 0 24 24">
            <Path
              d="M12 5.4v13.2M5.4 12h13.2"
              stroke={nb.ink}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The meal, and what it was made of.
 *
 * **The calorie line is the macros.** The reference says 350 calories over
 * grams that come to 645; `mealCalories` is 4·protein + 9·fat + 4·carbs, so
 * the headline and the columns are one number seen twice.
 *
 * The mint is an absolutely-filled child, so the blank state is a blank page.
 */
export function MealCard({ onAdd, onEdit }: { onAdd?: () => void; onEdit?: () => void }) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: MEAL_MIN,
        marginTop: MEAL_TOP,
        borderRadius: radius.card,
        padding: MEAL_PAD,
        justifyContent: 'space-between',
      }}
    >
{/* STEP 1.27 the mint
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: nb.mint,
        }}
      />
*/}

{/* STEP 1.28 the meal
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: radius.pill,
            backgroundColor: nb.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Circle cx={12} cy={12} r={4.2} stroke={nb.ink} strokeWidth={1.7} fill="none" />
            <Path
              d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8"
              stroke={nb.ink}
              strokeWidth={1.7}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <T variant="mealName" color={nb.ink} style={{ height: type.mealName.line }}>
            {copy.breakfast}
          </T>
          <T variant="mealNote" color={nb.mintInk} style={{ height: type.mealNote.line }}>
            {`${mealCalories} calories`}
          </T>
        </View>

        <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add to breakfast">
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: radius.pill,
              backgroundColor: nb.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Path
                d="M12 5.4v13.2M5.4 12h13.2"
                stroke={nb.ink}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
*/}

{/* STEP 1.29 the macros
      <View style={{ flexDirection: 'row' }}>
        <Macro i={0} />
        <Macro i={1} />
        <Macro i={2} />
        <Macro i={3} />
      </View>
*/}

{/* STEP 1.30 a rule
      <View style={{ height: 1, backgroundColor: nb.mintDeep, opacity: 0.6 }} />
*/}

{/* STEP 1.31 what is next
      <NextMeal onAdd={onAdd} />
*/}

{/* STEP 1.32 the day, and a way to change it
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 32,
            paddingHorizontal: 14,
            borderRadius: radius.pill,
            backgroundColor: nb.card,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <T variant="pill" color={nb.ink} style={{ height: type.pill.line }}>
            {copy.today}
          </T>
          <Svg width={13} height={13} viewBox="0 0 24 24" style={{ marginLeft: 6 }}>
            <Path
              d="m6.6 9.4 5.4 5.2 5.4-5.2"
              stroke={nb.ink}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        <View style={{ flex: 1 }} />

        <Pressable onPress={onEdit} accessibilityRole="button" accessibilityLabel="Edit breakfast">
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: radius.pill,
              backgroundColor: nb.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Path
                d="M4.6 19.4h3.2l9.2-9.2-3.2-3.2-9.2 9.2Zm11-13.6 1.6-1.6a1.4 1.4 0 0 1 2 0l1.2 1.2a1.4 1.4 0 0 1 0 2l-1.6 1.6Z"
                stroke={nb.ink}
                strokeWidth={1.7}
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
*/}
    </View>
  );
}
