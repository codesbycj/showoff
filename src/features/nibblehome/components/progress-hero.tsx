import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, eaten, pct, ringShare } from '../data/start';
import { HERO_PAD, HERO_TOP, RING } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/**
 * How the day is going.
 *
 * **The ring and the percentage are the same measurement.** `ringShare` is
 * eaten over goal and `pct` is that as a whole number, so the arc cannot
 * drift away from the figure beside it — in the reference it already has.
 *
 * The arc starts at the top and runs clockwise: `rotation` is applied to the
 * Circle rather than to a wrapping `<G origin=…>`, which emits an invalid DOM
 * prop on web and red-bars the screen.
 *
 * The blue is an absolutely-filled child, so the blank state is a blank page.
 */
export function ProgressHero({ onDate }: { onDate?: () => void }) {
  const dot = useId();
  const r = (RING - 14) / 2;
  const c = 2 * Math.PI * r;

  return (
    <View style={{ marginTop: HERO_TOP, borderRadius: radius.card, padding: HERO_PAD }}>
{/* STEP 1.09 the blue
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: nb.blue,
          // MISTAKE 1.39 the card came in half-faded
          opacity: 0.4,
        }}
      />
*/}

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
{/* STEP 1.10 what it measures
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                backgroundColor: nb.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Svg width={15} height={15} viewBox="0 0 24 24">
                <Path
                  d="M4 16.6 9 10l4 3.6L20 6"
                  stroke={nb.ink}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
            <T
              variant="cardLabel"
              color={nb.ink}
              style={{ marginLeft: 10, height: type.cardLabel.line }}
            >
              {copy.progress}
            </T>
          </View>
*/}

{/* STEP 1.11 the figure
          <T variant="huge" color={nb.ink} style={{ marginTop: 10, height: type.huge.line }}>
            {`${pct}%`}
          </T>
*/}

{/* STEP 1.12 the day
          <Pressable onPress={onDate} accessibilityRole="button" accessibilityLabel={copy.date}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <T variant="dateLine" color={nb.blueInk} style={{ height: type.dateLine.line }}>
                {copy.date}
              </T>
              <Svg width={14} height={14} viewBox="0 0 24 24" style={{ marginLeft: 4 }}>
                <Path
                  d="m6.6 9.4 5.4 5.2 5.4-5.2"
                  stroke={nb.blueInk}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          </Pressable>
*/}
        </View>

{/* STEP 1.13 and the ring
        <View style={{ width: RING, height: RING, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={RING} height={RING} style={{ position: 'absolute' }}>
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={nb.blueDeep}
              strokeWidth={12}
              fill="none"
            />
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={nb.card}
              strokeWidth={12}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${c * ringShare} ${c}`}
              transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
            />
            <Circle
              id={dot}
              cx={RING / 2 + r * Math.sin(2 * Math.PI * ringShare)}
              cy={RING / 2 - r * Math.cos(2 * Math.PI * ringShare)}
              r={5}
              fill={nb.yellow}
            />
          </Svg>

          <View
            style={{
              width: RING - 34,
              height: RING - 34,
              borderRadius: radius.pill,
              backgroundColor: nb.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="ringBig" color={nb.ink} style={{ height: type.ringBig.line }}>
              {eaten.toLocaleString('en-US')}
            </T>
            <T variant="ringLabel" color={nb.muted} style={{ height: type.ringLabel.line }}>
              {copy.calories}
            </T>
          </View>
        </View>
*/}
      </View>
    </View>
  );
}
