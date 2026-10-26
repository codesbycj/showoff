import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { actual, copy, legend, recommended } from '../data/start';
import { CARD_PAD, CARD_TOP, PIE } from '../layout';
import { ls, radius, type } from '../theme';
import { T } from './text';

const TONES = { pink: ls.pink, butter: ls.butter, sky: ls.sky } as const;
const INKS = { pink: ls.pinkInk, butter: ls.butterInk, sky: ls.skyInk } as const;

type Slice = { id: string; name: string; pct: number; tone: keyof typeof TONES };

/** A point on the pie's rim, measured clockwise from twelve o'clock. */
function rim(cx: number, cy: number, r: number, turn: number) {
  const a = (turn - 0.25) * 2 * Math.PI;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/**
 * One pie.
 *
 * The wedges are built from the shares themselves — each one starts where the
 * last ended, so they close the circle exactly rather than being three arcs
 * that happen to look right. The label sits at the middle of its own wedge,
 * two thirds of the way out, which keeps it inside the slice however narrow
 * the slice is.
 */
function Pie({ slices, caption }: { slices: Slice[]; caption: string }) {
  const r = PIE / 2;
  let turn = 0;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={PIE} height={PIE}>
        <Circle cx={r} cy={r} r={r} fill={ls.well} />
        {slices.map((s) => {
          const share = s.pct / 100;
          const from = rim(r, r, r, turn);
          const to = rim(r, r, r, turn + share);
          const large = share > 0.5 ? 1 : 0;
          const d = `M ${r} ${r} L ${from.x} ${from.y} A ${r} ${r} 0 ${large} 1 ${to.x} ${to.y} Z`;
          turn += share;
          return <Path key={s.id} d={d} fill={TONES[s.tone]} />;
        })}
      </Svg>

      {/*
        The percentages are laid over the Svg as Text, not drawn inside it.
        A react-native-svg <Text> takes its own font resolution path, and this
        showcase's ramp lives in `T` — one of them would end up in a different
        face from everything else on the screen.
      */}
      <View style={{ position: 'absolute', width: PIE, height: PIE }}>
        {slices.map((s, i) => {
          const before = slices.slice(0, i).reduce((a, b) => a + b.pct, 0) / 100;
          const mid = before + s.pct / 200;
          const p = rim(r, r, r * 0.6, mid);
          return (
            <T
              key={s.id}
              variant="slice"
              color={INKS[s.tone]}
              style={{
                position: 'absolute',
                left: p.x - 18,
                top: p.y - type.slice.line / 2,
                width: 36,
                textAlign: 'center',
                height: type.slice.line,
              }}
            >
              {`${s.pct}%`}
            </T>
          );
        })}
      </View>

      <T variant="pieName" color={ls.muted} style={{ marginTop: 10, height: type.pieName.line }}>
        {caption}
      </T>
    </View>
  );
}

/**
 * What the day should have been made of, and what it was.
 *
 * Both pies are computed from grams in `data/start.ts`: the left from the
 * targets, the right from what was eaten. The reference labels its right-hand
 * pie "Actual" and fills it with numbers that are not the actual split.
 */
export function NutritionCard({ onOpen }: { onOpen?: () => void }) {
  return (
    <View
      style={{
        marginTop: CARD_TOP,
        borderRadius: radius.card,
        backgroundColor: ls.card,
        // MISTAKE 1.28 the card came in half-faded
        opacity: 0.45,
        padding: CARD_PAD,
      }}
    >
{/* STEP 1.22 the heading
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
            variant="cardLabel"
            color={ls.ink}
            style={{ flex: 1, marginLeft: 10, height: type.cardLabel.line }}
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

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
        <View style={{ flex: 1 }}>
{/* STEP 1.23 what the day should have been
          <Pie slices={recommended as Slice[]} caption={copy.recommended} />
*/}
        </View>

{/* STEP 1.25 a rule between them
        <View style={{ width: 1, height: PIE, backgroundColor: ls.hairline }} />
*/}

        <View style={{ flex: 1 }}>
{/* STEP 1.26 what it actually was
          <Pie slices={actual as Slice[]} caption={copy.actual} />
*/}
        </View>

{/* STEP 1.27 and what the colours mean
        <View style={{ width: 86 }}>
          {legend.map((l) => (
            <View key={l.id} style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  marginTop: 4,
                  borderRadius: radius.pill,
                  backgroundColor: TONES[l.tone],
                }}
              />
              <View style={{ marginLeft: 8 }}>
                <T variant="legendName" color={ls.muted} style={{ height: type.legendName.line }}>
                  {l.name}
                </T>
                <T variant="legendValue" color={ls.ink} style={{ height: type.legendValue.line }}>
                  {l.value}
                </T>
              </View>
            </View>
          ))}
        </View>
*/}
      </View>
    </View>
  );
}
