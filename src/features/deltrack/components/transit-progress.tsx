import { View } from 'react-native';

import { dt } from '../theme';

/**
 * The amber progress line across the in-transit card.
 *
 * Measured off the reference: a 3dp rule centred on y=328, running the card's
 * full 280dp inner width. Solid amber up to the parcel's current position at
 * 60.2%, where a 15dp ring sits; dashed from there to the end on an 8dp pitch,
 * which is 13 dashes.
 *
 * Positions come in as fractions rather than dp, so the line stretches with
 * the card instead of being pinned to one phone's width.
 */

const RULE = 3;
const RING = 15;
const DASHES = 13;

export function TransitProgress({
  done,
  at,
}: {
  /** Where the stops behind the parcel sit, as fractions of the track. */
  done: readonly number[];
  /** Where the parcel is now. */
  at: number;
}) {
  return (
    <View style={{ height: RING, justifyContent: 'center' }}>
      {/* The dashed remainder, laid out first so the solid rule paints over
          its left end rather than under it. */}
      <View
        style={{
          position: 'absolute',
          left: `${at * 100}%`,
          right: 0,
          height: RULE - 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 5,
        }}
      >
        {Array.from({ length: DASHES }, (_, i) => (
          <View
            key={i}
            style={{
              width: 4,
              height: RULE - 1,
              borderRadius: 1,
              backgroundColor: dt.onDarkMuted,
              opacity: 0.5,
            }}
          />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          width: `${at * 100}%`,
          height: RULE,
          borderRadius: RULE / 2,
          backgroundColor: dt.amber,
        }}
      />

      {done.map((f) => (
        <View
          key={f}
          style={{
            position: 'absolute',
            left: `${f * 100}%`,
            width: 7,
            height: 7,
            marginLeft: -3.5,
            borderRadius: 3.5,
            backgroundColor: dt.amber,
          }}
        />
      ))}

      {/* The parcel's own stop: an amber ring with the card showing through. */}
      <View
        style={{
          position: 'absolute',
          left: `${at * 100}%`,
          width: RING,
          height: RING,
          marginLeft: -RING / 2,
          borderRadius: RING / 2,
          borderWidth: 3.5,
          borderColor: dt.amber,
          backgroundColor: dt.transitD,
        }}
      />
    </View>
  );
}
