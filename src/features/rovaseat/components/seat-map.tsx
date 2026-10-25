import { Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { cabin, copy } from '../data/search';
import { AISLE, MAP_PAD, SEAT_GAP, SEAT_SIZE } from '../layout';
import { radius, rv, type } from '../theme';
import { T } from './text';

/**
 * The coach, seen from above.
 *
 * A seat is drawn, not photographed: a seat plan is a diagram of an
 * arrangement rather than a picture of anything, which is squarely interface.
 *
 * Three states, and each is told apart by **shape as well as colour** — free
 * seats are open, taken ones carry a bar across them, and the chosen ones a
 * tick. A map that distinguishes "yours" from "somebody else's" by hue alone
 * is unusable to anyone who cannot separate those two hues, and this is the
 * screen where getting it wrong means sitting in a stranger's seat.
 */
function Seat({ state }: { state: 'free' | 'taken' | 'picked' }) {
  const fill = state === 'taken' ? rv.seatTaken : state === 'picked' ? rv.seatPicked : rv.seat;
  const mark = state === 'picked' ? rv.onGreen : rv.canvas;

  return (
    <View
      style={{
        width: SEAT_SIZE,
        height: SEAT_SIZE,
        borderRadius: 9,
        backgroundColor: fill,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={SEAT_SIZE} height={SEAT_SIZE} viewBox="0 0 34 34">
        {/* the backrest, on every seat */}
        <Rect x={7} y={6} width={20} height={6} rx={3} fill={mark} opacity={0.35} />
        {state === 'taken' ? (
          <Rect x={8} y={19} width={18} height={3.4} rx={1.7} fill={mark} opacity={0.75} />
        ) : null}
        {state === 'picked' ? (
          <Path
            d="m10 19.6 4 4 9.4-9.4"
            stroke={mark}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : null}
      </Svg>
    </View>
  );
}

function Row({ n, seats }: { n: number; seats: readonly { id: string; state: string }[] }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SEAT_GAP }}>
      {seats.slice(0, 2).map((s) => (
        <Pressable
          key={s.id}
          accessibilityRole="button"
          accessibilityLabel={'Seat ' + s.id}
          style={{ marginRight: SEAT_GAP }}
        >
          <Seat state={s.state as 'free'} />
        </Pressable>
      ))}
      <View style={{ width: AISLE, alignItems: 'center' }}>
        <T variant="radio" color={rv.muted} style={{ height: type.radio.line }}>
          {String(n)}
        </T>
      </View>
      {seats.slice(2).map((s) => (
        <Pressable
          key={s.id}
          accessibilityRole="button"
          accessibilityLabel={'Seat ' + s.id}
          style={{ marginLeft: SEAT_GAP }}
        >
          <Seat state={s.state as 'free'} />
        </Pressable>
      ))}
    </View>
  );
}

/** The driver's end, so the plan has a front. */
function Cab() {
  return (
    <Svg width={46} height={46} viewBox="0 0 46 46">
      <Rect
        x={11}
        y={6}
        width={24}
        height={34}
        rx={6}
        stroke={rv.body}
        strokeWidth={2}
        fill="none"
      />
      <Rect x={16} y={11} width={14} height={9} rx={2.4} fill={rv.body} opacity={0.5} />
      <Rect x={16} y={25} width={14} height={9} rx={3} fill={rv.body} opacity={0.3} />
    </Svg>
  );
}

export function SeatMap() {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: radius.card,
        backgroundColor: rv.card,
        borderWidth: 1,
        borderColor: rv.cardEdge,
        padding: MAP_PAD,
        alignItems: 'center',
      }}
    >
      <Cab />

      <T variant="radio" color={rv.body} style={{ marginTop: 8, height: type.radio.line }}>
        {copy.business}
      </T>
      {cabin.business.map((r) => (
        <Row key={r.n} n={r.n} seats={r.seats} />
      ))}

      <View
        style={{
          height: 1,
          alignSelf: 'stretch',
          marginVertical: 14,
          backgroundColor: rv.cardEdge,
        }}
      />

      {cabin.economy.map((r) => (
        <Row key={r.n} n={r.n} seats={r.seats} />
      ))}
      <T variant="radio" color={rv.body} style={{ marginTop: 12, height: type.radio.line }}>
        {copy.economy}
      </T>
    </View>
  );
}
