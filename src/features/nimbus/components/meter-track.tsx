import { useWindowDimensions, View } from 'react-native';

import { MARGIN, METER_BAR, METER_PAD } from '../layout';
import { nb } from '../theme';

/**
 * The spend meter's bar: a ticked track with a green fill over it.
 *
 * The track is not a flat grey rail. The reference draws it as upright ticks —
 * 4.2dp wide on a 7.55dp pitch, #ededed on the card's #fbfbfb, 14dp tall
 * inside a 16dp bar — and that texture is most of what the bar looks like.
 * The count comes from the window width rather than a fixed number, so the
 * pitch stays put and the row simply holds more ticks on a wider screen.
 *
 * The fill is 51% rather than the 42% its own caption claims: 51% is what the
 * reference draws, and this is a rebuild of the drawing. See the note in
 * `data/cards.ts`.
 */
const TICK = 4.2;
const PITCH = 7.55;

export function MeterTrack({ fraction }: { fraction: number }) {
  const { width } = useWindowDimensions();
  const trackWidth = width - MARGIN * 2 - METER_PAD * 2;
  const count = Math.ceil(trackWidth / PITCH);

  return (
    <View style={{ height: METER_BAR, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
        {Array.from({ length: count }, (_, i) => (
          <View
            key={i}
            style={{
              width: TICK,
              height: METER_BAR - 2,
              borderRadius: 1,
              backgroundColor: nb.track,
              marginRight: PITCH - TICK,
            }}
          />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: trackWidth * fraction,
          height: METER_BAR,
          borderRadius: METER_BAR / 2,
          backgroundColor: nb.green,
        }}
      />
    </View>
  );
}
