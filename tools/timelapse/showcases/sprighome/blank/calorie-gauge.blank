import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { burned, copy, eaten, left, ringShare } from '../data/start';
import { GAUGE_H, GAUGE_TOP, GAUGE_W } from '../layout';
import { sg, type } from '../theme';
import { T } from './text';

/** A small drawn glyph, because an emoji differs on every platform. */
function Mark({ kind, tint }: { kind: 'apple' | 'flame'; tint: string }) {
  if (kind === 'apple') {
    // A fork and knife rather than a piece of fruit: at 14dp a drawn apple
    // reads as a blob, and cutlery is what the rest of the interface is made
    // of anyway.
    return (
      <Svg width={14} height={14} viewBox="0 0 24 24">
        <Path
          d="M7 3v6.4a2.4 2.4 0 0 0 2.4 2.4M7 3v6.4M10.4 3v6.4a2.4 2.4 0 0 1-2.4 2.4M8.7 3v6M8.7 11.8V21"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M16.4 21v-7.2m0 0c-1.6 0-2.4-1.3-2.4-3.4C14 7.6 15 4.4 16.4 3c1.4 1.4 2.4 4.6 2.4 7.4 0 2.1-.8 3.4-2.4 3.4Z"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path
        d="M13 2.6c3 3.1 4.2 5.2 4.2 7.3 0 .9-.3 1.7-.8 2.3.8-.2 1.5-.8 2-1.6 1 1.6 1.6 3.2 1.6 4.8 0 3.8-3.1 6.6-7 6.6s-7-2.8-7-6.6c0-4 2.6-7.1 5.3-10.4.6 1 .8 2.1.6 3.2 1-1.4 1.4-3.4 1.1-5.6Z"
        fill={tint}
      />
    </Svg>
  );
}

/** One of the two figures either side of the arc. */
function Side({ kind, value, label }: { kind: 'apple' | 'flame'; value: number; label: string }) {
  return (
    <View style={{ width: 70, alignItems: 'center' }}>
      <Mark kind={kind} tint={sg.limeInk} />
      <T variant="gaugeBig" color={sg.ink} style={{ marginTop: 4, height: type.gaugeBig.line }}>
        {value.toLocaleString('en-US')}
      </T>
      <T variant="gaugeLabel" color={sg.limeInk} style={{ height: type.gaugeLabel.line }}>
        {label}
      </T>
    </View>
  );
}

/**
 * What has gone in, what is left, and what has gone out.
 *
 * **The arc is the ratio of the two figures beside it**, not a decoration:
 * the reference draws it nearly full over three numbers that are all 1200.
 * `ringShare` is eaten over goal, so the sweep and the figure cannot drift
 * apart — and the centre reads *calories left*, which is the number someone
 * opening this screen actually wants.
 *
 * The arc is one path with a dash, rather than two arcs stacked: a second
 * `<Path>` at a different sweep has to recompute the same endpoints, and that
 * is the arithmetic that goes wrong when the size changes.
 */
export function CalorieGauge() {
  const stroke = 9;
  const r = (GAUGE_W - stroke) / 2;
  const cy = r + stroke / 2;
  const d = `M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${GAUGE_W - stroke / 2} ${cy}`;
  const len = Math.PI * r;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: GAUGE_TOP,
      }}
    >
{/* STEP 1.16 what went in
      <Side kind="apple" value={eaten} label={copy.eaten} />
*/}

      <View style={{ width: GAUGE_W, height: GAUGE_H, alignItems: 'center' }}>
{/* STEP 1.17 the arc it is of
        <Svg width={GAUGE_W} height={cy + stroke}>
          <Path d={d} stroke={sg.limeDeep} strokeWidth={stroke} strokeLinecap="round" fill="none" />
          <Path
            d={d}
            stroke={sg.ink}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${len * ringShare} ${len}`}
          />
        </Svg>
*/}
{/* STEP 1.18 what is left
        <T variant="gaugeBig" color={sg.ink} style={{ marginTop: -12, height: type.gaugeBig.line }}>
          {left.toLocaleString('en-US')}
        </T>
*/}
{/* STEP 1.19 in calories
        <T variant="gaugeLabel" color={sg.limeInk} style={{ height: type.gaugeLabel.line }}>
          {copy.cals}
        </T>
*/}
      </View>

{/* STEP 1.20 and what went out
      <Side kind="flame" value={burned} label={copy.burned} />
*/}
    </View>
  );
}
