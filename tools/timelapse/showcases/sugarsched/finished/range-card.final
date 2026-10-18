import { Image, View } from 'react-native';

import { picker } from '../data/schedule';
import { CONFIRM, DAY_GAP, DAY_SIZE, SHEET_AVATAR, SHEET_PAD } from '../layout';
import { radius, shadow, ss } from '../theme';
import { FACES } from './faces';
import { Icon } from './icon';
import { T } from './text';

/**
 * The dark card the assignment's dates are chosen on.
 *
 * The grid is built by chunking the month into sevens and then **spilling**
 * into the next one: October 2023 ends on a Tuesday, and a calendar that stops
 * dead on the 31st leaves a ragged hole where the reference shows the 1st to
 * the 4th of November greyed back. The spill days come from the data rather
 * than being computed, because a design shot is not a date library and this
 * screen is a picture of one month.
 *
 * The range is three contiguous days drawn as one bar: the ends are rounded
 * and the middle is square, which is what makes it read as a range rather than
 * as three selected days.
 */
export function RangeCard() {
  const weeks: number[][] = [];
  const all = [...Array.from({ length: picker.days }, (_, i) => i + 1), ...picker.spill.map((d) => -d)];
  for (let i = 0; i < all.length; i += 7) {
    weeks.push(all.slice(i, i + 7));
  }

  return (
    <View
      style={{
        borderRadius: radius.sheet,
        backgroundColor: ss.sheet,
        padding: SHEET_PAD,
        ...shadow.sheet,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <T variant="sheetTitle" color={ss.onSheet} style={{ flex: 1, marginRight: 12 }}>
          {picker.title}
        </T>
        <Image
          source={FACES[picker.face % FACES.length]}
          style={{ width: SHEET_AVATAR, height: SHEET_AVATAR, borderRadius: radius.full }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <T variant="month" color={ss.onSheet} style={{ flex: 1 }}>
          {picker.month}
        </T>
        <T variant="month" color={ss.onSheetMuted}>
          {picker.nextMonth}
        </T>
      </View>

      <View style={{ marginTop: 10, gap: DAY_GAP }}>
        {weeks.map((week, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: DAY_GAP }}>
            {week.map((day, k) => (
              <Day key={`${i}-${k}`} day={day} />
            ))}
            {week.length < 7
              ? Array.from({ length: 7 - week.length }, (_, p) => (
                  <View key={`pad-${p}`} style={{ flex: 1 }} />
                ))
              : null}
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <T variant="fieldLabel" color={ss.onSheetMuted}>
            {picker.startLabel}
          </T>
          <T variant="fieldValue" color={ss.onSheet}>
            {picker.start}
          </T>
        </View>

        <View style={{ flex: 1 }}>
          <T variant="fieldLabel" color={ss.onSheetMuted}>
            {picker.endLabel}
          </T>
          <T variant="fieldValue" color={ss.onSheet}>
            {picker.end}
          </T>
        </View>

        <View
          style={{
            width: CONFIRM,
            height: CONFIRM,
            borderRadius: radius.full,
            backgroundColor: ss.confirm,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="check" size={22} color={ss.onConfirm} strokeWidth={2.4} />
        </View>
      </View>
    </View>
  );
}

/** One date. Negative means it belongs to the next month. */
function Day({ day }: { day: number }) {
  const out = day < 0;
  const n = Math.abs(day);
  const inRange = !out && n >= picker.range.from && n <= picker.range.to;
  const first = n === picker.range.from;
  const last = n === picker.range.to;

  return (
    <View
      style={{
        flex: 1,
        height: DAY_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: inRange ? ss.range : out ? 'transparent' : ss.day,
        borderTopLeftRadius: inRange ? (first ? radius.full : 0) : radius.day,
        borderBottomLeftRadius: inRange ? (first ? radius.full : 0) : radius.day,
        borderTopRightRadius: inRange ? (last ? radius.full : 0) : radius.day,
        borderBottomRightRadius: inRange ? (last ? radius.full : 0) : radius.day,
      }}
    >
      <T variant="day" color={inRange ? ss.onRange : out ? ss.dayOut : ss.onSheet}>
        {String(n)}
      </T>
    </View>
  );
}
