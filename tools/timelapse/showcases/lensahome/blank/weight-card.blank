import { Pressable, View } from 'react-native';
import Svg, { Path, Polyline } from 'react-native-svg';

import { copy } from '../data/start';
import { CARD_PAD, CARD_TOP, WEIGHT_MIN } from '../layout';
import { ls, radius, type } from '../theme';
import { T } from './text';

/** The last eight weighings, scaled 0..1 for the line. */
const TREND = [0.72, 0.66, 0.74, 0.58, 0.52, 0.56, 0.42, 0.34];

/**
 * What the scales said.
 *
 * **It is a whole card, not a header.** The reference crops this one off at
 * its title, which is a thing a design shot can do and a phone cannot: the
 * card would be half visible above the dock with nothing in it. It carries
 * the figure, the week's change and the line those came off, and takes
 * `flex: 1` so it fills whatever the phone has left.
 */
export function WeightCard({ onOpen }: { onOpen?: () => void }) {
  const w = 120;
  const h = 46;

  return (
    <Pressable
      onPress={onOpen}
      style={{ flex: 1 }}
      accessibilityRole="button"
      accessibilityLabel={copy.weight}
    >
      <View
        style={{
          flex: 1,
          minHeight: WEIGHT_MIN,
          marginTop: CARD_TOP,
          borderRadius: radius.card,
          backgroundColor: ls.card,
          padding: CARD_PAD,
        }}
      >
{/* STEP 1.24 the heading
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
              <Path
                d="M5.4 8.4h13.2a1.4 1.4 0 0 1 1.4 1.5l-.8 9A1.4 1.4 0 0 1 17.8 20H6.2a1.4 1.4 0 0 1-1.4-1.1l-.8-9a1.4 1.4 0 0 1 1.4-1.5Z"
                stroke={ls.ink}
                strokeWidth={1.7}
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M9 8.4a3 3 0 0 1 6 0"
                stroke={ls.ink}
                strokeWidth={1.7}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </View>

          <T
            variant="rowTitle"
            color={ls.ink}
            style={{ flex: 1, marginLeft: 10, height: type.rowTitle.line }}
          >
            {copy.weight}
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
*/}

{/* STEP 1.25 the figure, and the line it came off
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <T variant="huge" color={ls.ink} style={{ height: type.huge.line }}>
              {copy.weightValue}
            </T>
            <T variant="macroName" color={ls.limeInk} style={{ height: type.macroName.line }}>
              {copy.weightNote}
            </T>
          </View>

          <Svg width={w} height={h}>
            <Polyline
              points={TREND.map((v, i) => `${(i / (TREND.length - 1)) * w},${h - v * h}`).join(' ')}
              stroke={ls.limeDeep}
              strokeWidth={2.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>
*/}
      </View>
    </Pressable>
  );
}
