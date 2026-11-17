import { View } from 'react-native';

import { clock, progress, track } from '../data/player';
import { ct } from '../theme';
import { T } from './text';

import { ScrubProps } from './_player-parts-shared';

/**
 * The scrubber.
 *
 * **The filled width is computed from the two clocks** (R9) — the board's bar
 * sits at about a quarter while its own times read 1:37 of 4:21, which is 37%.
 *
 * The knob is a child of the filled track rather than a floating sibling, so
 * it cannot straddle the bar's edge however the bar is sized (R3).
 */
export function Scrubber({ margin, height }: ScrubProps) {
  const pos = progress();

  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {/* STEP 1.14 view
      <View style={{ height: 4, borderRadius: 2, backgroundColor: ct.cardEdge }}>
        <View
          style={{
            width: `${pos * 100}%`,
            height: 4,
            borderRadius: 2,
            backgroundColor: ct.lime,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 11,
              height: 11,
              borderRadius: 5.5,
              backgroundColor: ct.lime,
              marginRight: -1,
            }}
          />
        </View>
      </View>
      */}

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.15 t
        <T variant="clock">{clock(track.elapsed)}</T>
        */}
        {/* STEP 1.16 t
        <T variant="clock">{clock(track.duration)}</T>
        */}
      </View>
    </View>
  );
}
