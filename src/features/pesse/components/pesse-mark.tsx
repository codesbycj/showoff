import { Text, View } from 'react-native';

import { FONT, LEVEL, R, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The app tile: a white rounded square with a lime disc bleeding out of its
 * bottom-right corner, a heavy `P.` set over it, and an obsidian bolt badge
 * hanging off the corner.
 *
 * Two things are clipped against each other here and they are deliberately on
 * separate Views. The lime disc has to be cut off by the tile, so the tile
 * clips; the bolt badge has to hang *outside* it, so it is a sibling of the
 * tile rather than a child. Putting both on one View would either square off
 * the disc or swallow the badge — and the clipping View carries no elevation,
 * because a clip and an elevation together is what Android renders unreliably.
 */
export function PesseMark({ size = 96 }: { size?: number }) {
  const badge = Math.round(size * 0.26);

  return (
    <View>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: R.lg,
            backgroundColor: ps.surfaceLowest,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={{
            position: 'absolute',
            right: -size * 0.17,
            bottom: -size * 0.17,
            width: size * 0.58,
            height: size * 0.58,
            borderRadius: size * 0.29,
            backgroundColor: ps.lime,
          }}
        />
        <Text
          style={{
            fontFamily: FONT.extrabold,
            fontSize: size * 0.5,
            lineHeight: size * 0.58,
            letterSpacing: -size * 0.03,
            color: ps.onSurface,
            marginLeft: size * 0.04,
          }}
        >
          P<Text style={{ color: ps.olive }}>.</Text>
        </Text>
      </View>

      {/* Outside the clip, so it keeps its overhang. */}
      <View
        style={[
          {
            position: 'absolute',
            right: -badge * 0.18,
            bottom: -badge * 0.18,
            width: badge,
            height: badge,
            borderRadius: R.full,
            backgroundColor: ps.onSurface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          LEVEL.container,
        ]}
      >
        <Symbol name="bolt" size={badge * 0.58} color={ps.surfaceLowest} />
      </View>
    </View>
  );
}

/**
 * The wordmark — "Pesse" with a lime dot sitting on the baseline after it.
 *
 * The dot is aligned to the bottom of the text box rather than centred on it,
 * which is what puts it level with the foot of the final `e` instead of halfway
 * up the x-height.
 */
export function Wordmark({ size = 30, tone = ps.onSurface }: { size?: number; tone?: string }) {
  // The reference sets a 10dp dot against a 30dp wordmark; it is a third of
  // the cap height, not a punctuation-sized mark.
  const dot = Math.round(size * 0.33);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.05 }}>
      <Text
        style={{
          fontFamily: FONT.extrabold,
          fontSize: size,
          lineHeight: size * 1.2,
          letterSpacing: -size * 0.02,
          color: tone,
        }}
      >
        Pesse
      </Text>
      <View
        style={{
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: ps.lime,
          marginBottom: size * 0.2,
        }}
      />
    </View>
  );
}
