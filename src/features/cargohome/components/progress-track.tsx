import { View } from 'react-native';

import { Icon } from './icon';
import { TRACK_HEIGHT, TRACK_MARKER } from '../layout';
import { radius, cg } from '../theme';

/**
 * How far along a consignment is: a bar with a truck riding it.
 *
 * The marker is positioned with `left: '<pct>%'` and then pulled back by half
 * its own width, so the *centre* of the truck sits on the progress point. Laid
 * out any other way it is the marker's left edge that lines up, and the truck
 * reads as further along than it is — by half a marker, which at 32dp is most
 * of the difference between 40% and 45%.
 *
 * The two cards want different colours — a dark marker on the yellow card, a
 * yellow one on the white — so the tone comes in as a prop rather than being
 * decided here.
 */
export function ProgressTrack({
  progress,
  tone,
}: {
  progress: number;
  /** `onYellow` sits on the tracking card; `onWhite` on a recent one. */
  tone: 'onYellow' | 'onWhite';
}) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  const onYellow = tone === 'onYellow';

  const railIdle = onYellow ? 'rgba(20, 20, 15, 0.16)' : cg.trackIdle;
  const railDone = onYellow ? cg.onSurface : cg.trackFill;
  const markerFill = onYellow ? cg.onSurface : cg.trackFill;
  const markerGlyph = onYellow ? cg.yellow : cg.onSurface;

  return (
    <View style={{ height: TRACK_MARKER, justifyContent: 'center' }}>
      <View
        style={{
          height: TRACK_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: railIdle,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: radius.full,
            backgroundColor: railDone,
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          left: `${pct}%`,
          marginLeft: -TRACK_MARKER / 2,
          width: TRACK_MARKER,
          height: TRACK_MARKER,
          borderRadius: radius.full,
          backgroundColor: markerFill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="truck" size={17} color={markerGlyph} strokeWidth={2} />
      </View>
    </View>
  );
}
