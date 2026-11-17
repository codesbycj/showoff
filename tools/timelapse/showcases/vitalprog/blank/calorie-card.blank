import { View } from 'react-native';
import {
  calorieRow,
  calorieSeries,
  calories,
  dayLabels,
  kmShare,
  leaderboard,
  pct,
  screen,
  share,
  trends,
  type Trend,
} from '../data/programs';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { CalorieProps, Sparkline } from './_prog-parts-shared';

/**
 * Today's burn.
 *
 * **The headline is the sum of the sparkline beside it** (R9), so the figure
 * and the picture cannot disagree.
 *
 * The fill is on an absolutely-filled child so a staged reveal does not open
 * on an empty white card (§5.5 / I9).
 */
export function CalorieCard({ margin, height, radius, sparkW }: CalorieProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, paddingHorizontal: 14, justifyContent: 'center' }}
    >
      {/* STEP 1.03 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.white,
        }}
      />
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* STEP 1.04 glyph
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.lilac,
          }}
        >
          <Glyph name="bolt" size={18} color={ct.accentDeep} />
        </View>
        */}

        <View style={{ flex: 1 }}>
          {/* STEP 1.05 t
          <T variant="kcal">{`${calories()} ${calorieRow.unit}`}</T>
          */}
          {/* STEP 1.06 label
          <T variant="kcalLine">{calorieRow.label}</T>
          */}
        </View>

        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          {/* STEP 1.07 time
          <T variant="time">{calorieRow.time}</T>
          */}
          {/* STEP 1.08 sparkline
          <Sparkline width={sparkW} height={18} />
          */}
        </View>
      </View>
    </View>
  );
}
