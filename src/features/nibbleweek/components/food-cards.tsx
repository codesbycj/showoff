import { Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { copy, foods } from '../data/start';
import { CARDS_TOP, CARD_MIN, CARD_PAD } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/** One figure with its colour tab, the shape the reference uses twice. */
function Line({ value, label, tint }: { value: string; label: string; tint: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 4, height: 28, borderRadius: 2, backgroundColor: tint }} />
      <View style={{ marginLeft: 10 }}>
        <T variant="foodValue" color={nb.ink} style={{ height: type.foodValue.line }}>
          {value}
        </T>
        <T variant="foodLabel" color={nb.muted} style={{ height: type.foodLabel.line }}>
          {label}
        </T>
      </View>
    </View>
  );
}

/** One card. Written out in `FoodCards` so the reveal lands them one at a time. */
function Card({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const f = foods[i];
  const filled = f.tone === 'blue';

  return (
    <Pressable
      onPress={() => onPress?.(f.id)}
      style={{ flex: 1 }}
      accessibilityRole="button"
      accessibilityLabel={f.name}
    >
      <View
        style={{
          flex: 1,
          minHeight: CARD_MIN,
          borderRadius: radius.card,
          // MISTAKE 1.38 the cards came in squared off on one corner
          borderTopRightRadius: 0,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
{/* STEP 1.24 its colour
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.card,
            backgroundColor: filled ? nb.blue : nb.well,
          }}
        />
*/}

{/* STEP 1.25 its name
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <T variant="foodName" color={nb.ink} style={{ flex: 1, height: type.foodName.line }}>
            {f.name}
          </T>
          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Circle cx={12} cy={5.4} r={1.7} fill={nb.ink} />
            <Circle cx={12} cy={12} r={1.7} fill={nb.ink} />
            <Circle cx={12} cy={18.6} r={1.7} fill={nb.ink} />
          </Svg>
        </View>
*/}

        {/*
          All four figures, not the reference's two. Two lines leave a hand's
          width of empty card between the name and the foot, and the data for
          the other two is already here — the bar above reads the same grams.
          One tint per macro, matching the legend under the bar.
        */}
{/* STEP 1.26 what it cost
        <Line value={String(f.cal)} label={copy.calories} tint={nb.lilac} />
*/}
{/* STEP 1.27 the carbs
        <Line value={`${f.carbs}g`} label={copy.carbs} tint={nb.coral} />
*/}
{/* STEP 1.28 the protein
        <Line value={`${f.protein}g`} label={copy.protein} tint={nb.mintDeep} />
*/}
{/* STEP 1.29 and the fat
        <Line value={`${f.fat}g`} label={copy.fat} tint={nb.yellowDeep} />
*/}
      </View>
    </Pressable>
  );
}

/** The two things logged today. */
export function FoodCards({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', gap: 14, marginTop: CARDS_TOP }}>
{/* STEP 1.23 the first
      <Card i={0} onPress={onPress} />
*/}
{/* STEP 1.30 and the second
      <Card i={1} onPress={onPress} />
*/}
    </View>
  );
}
