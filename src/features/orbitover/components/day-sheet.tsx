import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { copy, daySpend, money, rows } from '../data/start';
import { ROW_DISC, ROW_HEIGHT, SHEET_PAD } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

const TONES: Record<string, string> = {
  rose: '#F2A8B8',
  amber: '#F7C9A8',
  mint: '#B9F5CF',
  lilac: '#C9BBF7',
};

/**
 * One merchant's mark, drawn.
 *
 * Four small flat shapes — a ring, three dots, a chevron, a turned square.
 * That is the side of the drawing-range rule that *is* vectors: a mark is an
 * idea, not a picture of a specific thing (AGENTS.md).
 */
function Mark({ tone }: { tone: string }) {
  const ink = ob.onPanel;
  if (tone === 'rose') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={7.4} stroke={ink} strokeWidth={2.6} fill="none" />
      </Svg>
    );
  }
  if (tone === 'amber') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Circle cx={12} cy={6.6} r={3.4} fill={ink} />
        <Circle cx={6.8} cy={15.6} r={3.4} fill={ink} />
        <Circle cx={17.2} cy={15.6} r={3.4} fill={ink} />
      </Svg>
    );
  }
  if (tone === 'mint') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M5 15.4 12 7l7 8.4"
          stroke={ink}
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Rect x={6} y={6} width={12} height={12} rx={2.4} fill={ink} transform="rotate(45 12 12)" />
    </Svg>
  );
}

/**
 * The day the overview opens on, and what was spent in it.
 *
 * The figure beside the date is the rows added up, not a number typed next to
 * them — which is the only way a list and its total stay honest once a row is
 * added.
 *
 * The sheet takes `flex: 1` and runs off the bottom edge: a day's
 * transactions are a list, and a list that stops short with a band of canvas
 * under it reads as a screen that failed to load.
 */
export function DaySheet() {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        backgroundColor: ob.sheet,
        paddingHorizontal: SHEET_PAD,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          width: 38,
          height: 4,
          borderRadius: radius.pill,
          backgroundColor: ob.cardEdge,
          alignSelf: 'center',
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
        <T
          variant="sectionTitle"
          color={ob.ink}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.day}
        </T>
        <T variant="rowSub" color={ob.body} style={{ height: type.rowSub.line }}>
          {money(daySpend)}
        </T>
      </View>

      {rows.map((r) => (
        <Pressable key={r.id} accessibilityRole="button" accessibilityLabel={r.name}>
          <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: ROW_DISC,
                height: ROW_DISC,
                borderRadius: radius.pill,
                backgroundColor: TONES[r.tone],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mark tone={r.tone} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <T variant="rowName" color={ob.ink} style={{ height: type.rowName.line }}>
                {r.name}
              </T>
              <T variant="rowSub" color={ob.muted} style={{ height: type.rowSub.line }}>
                {r.kind}
              </T>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <T variant="rowAmount" color={ob.ink} style={{ height: type.rowAmount.line }}>
                {money(r.amount)}
              </T>
              <T variant="rowSub" color={ob.muted} style={{ height: type.rowSub.line }}>
                {r.at}
              </T>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
