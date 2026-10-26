import { View } from 'react-native';

import { CARD_PAD, CARD_TOP } from '../layout';
import { radius, sg } from '../theme';
// STEP 1.14 and the calories
// import { CalorieGauge } from './calorie-gauge';
import { DayStrip } from './day-strip';

/**
 * The lime card: the week, and the day's calories.
 *
 * **The lime is a separate, absolutely-filled child rather than this View's
 * own `backgroundColor`.** A container that carries its own fill is painted
 * from step one of the reveal, so the first frame of the recording opens on a
 * bar of colour with nothing in it. As a child it is a step like everything
 * else, and the blank state is a blank page.
 */
export function DayCard({ picked, onPick }: { picked: number; onPick?: (n: number) => void }) {
  return (
    <View style={{ marginTop: CARD_TOP, borderRadius: radius.card, padding: CARD_PAD }}>
{/* STEP 1.10 the lime
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: sg.lime,
        }}
      />
*/}

{/* STEP 1.11 the week
      <DayStrip picked={picked} onPick={onPick} />
*/}
{/* STEP 1.15 and the ring
      <CalorieGauge />
*/}
    </View>
  );
}
