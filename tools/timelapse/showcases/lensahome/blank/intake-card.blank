import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, eaten, goal, pct, ringShare } from '../data/start';
import { INTAKE_PAD, INTAKE_TOP, RING } from '../layout';
import { ls, radius, type } from '../theme';
import { T } from './text';

/**
 * How much of the day's allowance has gone.
 *
 * **The arc, the percentage and the pair of figures are one measurement.**
 * `ringShare` is `eaten / goal` and `pct` is the same thing rounded, so the
 * sweep cannot drift away from the number printed beside it.
 *
 * The arc rotates on the Circle itself, not on a wrapping `<G origin=…>` —
 * that prop is invalid in the DOM and red-bars the screen on web.
 *
 * The lime is an absolutely-filled child, so the blank state is a blank page.
 */
export function IntakeCard() {
  const r = (RING - 18) / 2;
  const c = 2 * Math.PI * r;

  return (
    <View style={{ marginTop: INTAKE_TOP, borderRadius: radius.card, padding: INTAKE_PAD }}>
{/* STEP 1.12 the lime
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: ls.lime,
          // MISTAKE 1.33 the card came in half-faded
          opacity: 0.45,
        }}
      />
*/}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
{/* STEP 1.13 what it measures
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: radius.pill,
                backgroundColor: ls.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Svg width={15} height={15} viewBox="0 0 24 24">
                <Path d="M13.4 2.6 5.6 13.4h5.2l-.6 8 7.8-10.8h-5.2Z" fill={ls.limeInk} />
              </Svg>
            </View>
            <T
              variant="cardLabel"
              color={ls.ink}
              style={{ marginLeft: 10, height: type.cardLabel.line }}
            >
              {copy.intake}
            </T>
          </View>
*/}

{/* STEP 1.14 the figure
          <T variant="huge" color={ls.ink} style={{ marginTop: 10, height: type.huge.line }}>
            {`${pct}%`}
          </T>
*/}
        </View>

{/* STEP 1.15 and the ring
        <View style={{ width: RING, height: RING, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={RING} height={RING} style={{ position: 'absolute' }}>
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={ls.card}
              strokeWidth={16}
              fill="none"
            />
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={ls.limeDeep}
              strokeWidth={16}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${c * ringShare} ${c}`}
              transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
            />
          </Svg>

          <View
            style={{
              width: RING - 44,
              height: RING - 44,
              borderRadius: radius.pill,
              backgroundColor: ls.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="ringBig" color={ls.ink} style={{ height: type.ringBig.line }}>
              {eaten.toLocaleString('en-US')}
            </T>
            <View
              style={{ height: 1, width: 34, backgroundColor: ls.hairline, marginVertical: 3 }}
            />
            <T variant="ringSmall" color={ls.muted} style={{ height: type.ringSmall.line }}>
              {goal.toLocaleString('en-US')}
            </T>
          </View>
        </View>
*/}
      </View>
    </View>
  );
}
