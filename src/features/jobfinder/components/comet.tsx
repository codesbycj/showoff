import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

/**
 * The comet between "dream" and "job".
 *
 * The reference sets this as the 💫 emoji, rotated -12°. It is drawn here
 * instead, because an emoji is the one glyph class that is guaranteed to differ
 * across the machine this is built on and the device it is recorded on — Windows
 * and Android do not ship the same dizzy star, and the web harness would happily
 * confirm a glyph that never reaches the emulator.
 *
 * Geometry and gradient are measured off the reference render: the glyph
 * occupies 30x24dp, runs `#FFD42E` at its upper-left to `#F78C1B` at the tail's
 * thick end, and the star's points are rounded rather than sharp.
 */
export function Comet({ size = 30 }: { size?: number }) {
  return (
    // The viewBox is cropped to the ink, not to the grid the paths were drawn
    // on, so `size` is the glyph's measured width rather than a box it floats in.
    <Svg width={size} height={(size * 43) / 48} viewBox="6 1 48 43">
      <Defs>
        <LinearGradient id="cometInk" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD42E" />
          <Stop offset="0.55" stopColor="#FCB524" />
          <Stop offset="1" stopColor="#F78C1B" />
        </LinearGradient>
      </Defs>

      {/* The swoosh: one filled shape, thin at the upper-left tip, thick where
          it passes behind the star. */}
      <Path
        fill="url(#cometInk)"
        d="M8 21C11 7 30 1 44 9c12 7 12 25-4 34-1.3.7-2.4-1-1.2-1.9 9.2-6.6 9.4-19.4.2-25.9C28 8 14.2 11.5 11 22.4c-.4 1.4-3.3.9-3-1.4z"
      />

      {/* The star, its five points rounded the way the emoji draws them: each
          vertex is a quadratic through the point rather than a corner. */}
      <Path
        fill="url(#cometInk)"
        d="M 18.5 21.7 Q 18.9 19.4 20.2 21.3 L 22.6 24.5 Q 24.2 26.6 26.8 26.2 L 30.7 25.5 Q 33.0 25.1 31.7 27.0 L 29.4 30.2 Q 27.8 32.4 29.0 34.8 L 30.9 38.3 Q 32.0 40.4 29.7 39.6 L 26.0 38.4 Q 23.4 37.6 21.5 39.6 L 18.8 42.4 Q 17.1 44.1 17.1 41.7 L 17.1 37.8 Q 17.1 35.1 14.7 33.9 L 11.1 32.1 Q 9.0 31.1 11.2 30.4 L 15.0 29.1 Q 17.6 28.3 17.9 25.6 L 18.5 21.7 Z"
      />
    </Svg>
  );
}
