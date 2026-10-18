import { View } from 'react-native';

import { schedule } from '../data/customer';
import { CARD_BUTTON, CARD_PAD, DAY_GAP, DAY_SIZE } from '../layout';
import { cc, radius } from '../theme';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { T } from './text';

/**
 * The customer's month, as a grid of days.
 *
 * Seven columns because a week has seven days — the grid is built by chunking
 * the dates rather than by wrapping them, so a row is always a week and a
 * short last row stays left-aligned instead of spreading.
 *
 * A booked day carries the person's photograph rather than a dot, which is the
 * reference's own idea and a good one: the calendar answers "who" at the same
 * glance as "when".
 */
export function ScheduleCard() {
  // Seven per row, and the last row is padded with zeroes rather than run on
  // past the end of the month: a fixed `length: 7` printed the 32nd to the
  // 35th of October, which is the kind of thing nobody notices until it is on
  // camera.
  const weeks: number[][] = [];
  for (let i = 1; i <= schedule.days; i += 7) {
    weeks.push(Array.from({ length: 7 }, (_, k) => (i + k <= schedule.days ? i + k : 0)));
  }

  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: cc.accent,
        padding: CARD_PAD,
      }}
    >
      {/* STEP 1.15 name the card
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="cardTitle" color={cc.onAccent} style={{ flex: 1 }}>
          {schedule.title}
        </T>
        <View style={{ marginRight: 8 }}>
          <Icon name="open" size={16} color={cc.onAccent} />
        </View>
        <View
          style={{
            width: CARD_BUTTON,
            height: CARD_BUTTON,
            borderRadius: radius.full,
            backgroundColor: cc.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="go" size={15} color={cc.onInk} strokeWidth={2.2} />
        </View>
      </View>
      */}

      {/* STEP 1.16 which month
      <T variant="month" color={cc.onAccent} style={{ marginTop: 10 }}>
        {schedule.month}
      </T>
      */}

      <View style={{ marginTop: 10, gap: DAY_GAP }}>
        {/* STEP 1.17 and three weeks of it
        {weeks.map((week, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: DAY_GAP }}>
            {week.map((day, k) =>
              day === 0 ? (
                <View key={`pad-${k}`} style={{ flex: 1 }} />
              ) : (
                <Day key={day} day={day} />
              ),
            )}
          </View>
        ))}
        */}
      </View>
    </View>
  );
}

function Day({ day }: { day: number }) {
  const bookedAt = schedule.booked.indexOf(day as (typeof schedule.booked)[number]);
  const live = day === schedule.live;

  if (bookedAt >= 0) {
    return (
      <View
        style={{
          flex: 1,
          height: DAY_SIZE,
          borderRadius: radius.day,
          backgroundColor: cc.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar face={schedule.bookedFaces[bookedAt]} size={DAY_SIZE - 10} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        height: DAY_SIZE,
        borderRadius: radius.day,
        backgroundColor: live ? cc.dayLive : cc.dayFree,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T variant="day" color={live ? cc.onInk : cc.onAccent}>
        {String(day)}
      </T>
    </View>
  );
}
