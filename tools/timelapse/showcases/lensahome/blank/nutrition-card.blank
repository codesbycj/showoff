import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, macroRows } from '../data/start';
import { BAR_HEIGHT, CARD_PAD, CARD_TOP, MACRO_GAP } from '../layout';
import { ls, radius, type } from '../theme';
import { T } from './text';

const TONES = {
  pink: ls.pink,
  butter: ls.butter,
  sky: ls.sky,
} as const;

/**
 * One macro: what it is, how much of it, and how far through its target.
 *
 * The rail is `share`, the percentage is the same ratio rounded, and the
 * label is the two grams it came from — three views of one pair of numbers,
 * computed in `data/start.ts` so they cannot drift.
 */
function Row({ i }: { i: number }) {
  const m = macroRows[i];
  return (
    <View style={{ marginTop: MACRO_GAP }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="macroName" color={ls.muted} style={{ flex: 1, height: type.macroName.line }}>
          {m.name}
        </T>
        <T variant="macroValue" color={ls.ink} style={{ height: type.macroValue.line }}>
          {m.label}
        </T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <T variant="macroPct" color={ls.ink} style={{ width: 44, height: type.macroPct.line }}>
          {`${m.pct}%`}
        </T>
        <View
          style={{
            flex: 1,
            height: BAR_HEIGHT,
            borderRadius: radius.pill,
            backgroundColor: ls.well,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: m.share,
              borderRadius: radius.pill,
              backgroundColor: TONES[m.tone],
            }}
          />
          <View style={{ flex: 1 - m.share }} />
        </View>
      </View>
    </View>
  );
}

/** The three macros, under a header that opens the full breakdown. */
export function NutritionCard({ onOpen }: { onOpen?: () => void }) {
  return (
    <View
      style={{
        marginTop: CARD_TOP,
        borderRadius: radius.card,
        backgroundColor: ls.card,
        padding: CARD_PAD,
      }}
    >
{/* STEP 1.18 the heading
      <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel={copy.nutrition}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: radius.pill,
              backgroundColor: ls.well,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Circle cx={12} cy={12} r={8.4} stroke={ls.ink} strokeWidth={1.7} fill="none" />
              <Path d="M12 3.6V12l6 5.8" stroke={ls.ink} strokeWidth={1.7} fill="none" />
            </Svg>
          </View>

          <T
            variant="rowTitle"
            color={ls.ink}
            style={{ flex: 1, marginLeft: 10, height: type.rowTitle.line }}
          >
            {copy.nutrition}
          </T>

          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path
              d="m9.6 6 5.4 6-5.4 6"
              stroke={ls.faint}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>
*/}

{/* STEP 1.19 carbs
      <Row i={0} />
*/}
{/* STEP 1.20 fat
      <Row i={1} />
*/}
{/* STEP 1.21 and protein
      <Row i={2} />
*/}
    </View>
  );
}
