import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { charges, copy, money } from '../data/start';
import { ROW_DISC, ROW_HEIGHT } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * A merchant's mark, drawn.
 *
 * Three small flat shapes — a play triangle, a signal, a cloud. The
 * reference's rows carry two real companies' logos; a mark is theirs, and a
 * showcase that borrows one is copying rather than building. These say the
 * same thing about what the charge was for without wearing anyone's.
 */
function Mark({ kind }: { kind: string }) {
  if (kind === 'play') {
    return (
      <Svg width={17} height={17} viewBox="0 0 24 24">
        <Path d="M9 6.8 17.6 12 9 17.2Z" fill={kt.onCanvas} />
      </Svg>
    );
  }
  if (kind === 'wave') {
    return (
      <Svg width={17} height={17} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={2.6} fill={kt.onCanvas} />
        <Path
          d="M7.4 7.4a6.6 6.6 0 0 0 0 9.2M16.6 7.4a6.6 6.6 0 0 1 0 9.2"
          stroke={kt.onCanvas}
          strokeWidth={1.9}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={17} height={17} viewBox="0 0 24 24">
      <Path
        d="M7.4 17.6a3.9 3.9 0 0 1-.3-7.8 5 5 0 0 1 9.6-1 3.4 3.4 0 0 1 .5 6.7Z"
        fill={kt.onCanvas}
      />
    </Svg>
  );
}

/**
 * What the card has been charged.
 *
 * Each row takes an equal share of what the panel and the tab bar leave, so
 * the list fills the gap between them at any screen height rather than
 * stacking at fixed heights and leaving a band of canvas above the bar.
 *
 * Every charge is negative in the data and shown signed, so a row cannot read
 * as money arriving. The reference prints "$1,090.00" unsigned under a green
 * "Successful", which says the charge succeeded but not which way it went.
 */
export function ChargeList() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T
          variant="sectionTitle"
          color={kt.onCanvas}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.history}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.seeAll}>
          <T variant="seeAll" color={kt.coral} style={{ height: type.seeAll.line }}>
            {copy.seeAll}
          </T>
        </Pressable>
      </View>

      {charges.map((c) => (
        <Pressable
          key={c.id}
          style={{ flex: 1 }}
          accessibilityRole="button"
          accessibilityLabel={c.name}
        >
          <View
            style={{
              flex: 1,
              minHeight: ROW_HEIGHT,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: ROW_DISC,
                height: ROW_DISC,
                borderRadius: radius.pill,
                backgroundColor: kt.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mark kind={c.mark} />
            </View>
            <View style={{ flex: 1, marginLeft: 11 }}>
              <T variant="rowName" color={kt.onCanvas} style={{ height: type.rowName.line }}>
                {c.name}
              </T>
              <T variant="rowSub" color={kt.onCanvasDim} style={{ height: type.rowSub.line }}>
                {c.on}
              </T>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <T variant="rowAmount" color={kt.onCanvas} style={{ height: type.rowAmount.line }}>
                {'-' + money(c.amount)}
              </T>
              <T variant="rowState" color={kt.green} style={{ height: type.rowState.line }}>
                {copy.state}
              </T>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
