import { Pressable, View } from 'react-native';

import { answers } from '../data/start';
import { CHIP_GAP, CHIP_HEIGHT, CHIPS_TOP } from '../layout';
import { lk, radius, type } from '../theme';
import { T } from './text';

/** One answer. Each is a 52dp target, which is the whole half-width tile. */
function Chip({
  label,
  picked,
  onPress,
}: {
  label: string;
  picked: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1 }}
      accessibilityRole="radio"
      accessibilityState={{ selected: picked }}
      accessibilityLabel={label}
    >
      <View
        style={{
          height: CHIP_HEIGHT,
          borderRadius: radius.chip,
          backgroundColor: picked ? lk.lime : lk.pill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="chip" color={picked ? lk.onLime : lk.ink} style={{ height: type.chip.line }}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}

/**
 * The four words to choose between.
 *
 * Two rows of two, written out rather than mapped so the reveal can land them
 * one at a time. The choice is state held by the screen, so nothing is lit
 * until the recording taps one — the reference ships with the right answer
 * already highlighted, which is a picture of a quiz rather than a quiz.
 */
export function AnswerGrid({
  picked,
  onPick,
}: {
  picked: string | null;
  onPick?: (a: string) => void;
}) {
  const chip = (i: number) => ({
    label: answers[i],
    picked: picked === answers[i],
    onPress: () => onPick?.(answers[i]),
  });

  return (
    <View
      style={{
        marginTop: CHIPS_TOP,
        gap: CHIP_GAP,
        // MISTAKE 1.24 the answers came in half-faded
        opacity: 0.4,
      }}
    >
      <View style={{ flexDirection: 'row', gap: CHIP_GAP }}>
{/* STEP 1.17 one word
        <Chip {...chip(0)} />
*/}
{/* STEP 1.18 another
        <Chip {...chip(1)} />
*/}
      </View>
      <View style={{ flexDirection: 'row', gap: CHIP_GAP }}>
{/* STEP 1.19 another
        <Chip {...chip(2)} />
*/}
{/* STEP 1.20 and the last
        <Chip {...chip(3)} />
*/}
      </View>
    </View>
  );
}
