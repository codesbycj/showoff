import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ax } from '../theme';

/**
 * The ApexPay app icon: a chartreuse signal arc over a ringed dot, on a dark
 * squircle.
 *
 * The export points at a Google CDN image for this, which is not something to
 * bundle or to depend on at record time — the recording must not need the
 * network. So the mark is redrawn: an arc, a ring and a dot are three
 * primitives, and at 32dp that is the whole of it. Geometry rather than a
 * raster also means it stays sharp at whatever density the emulator runs at.
 */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Rect width={32} height={32} rx={10} fill="#1b1f26" />
      {/* The arc, open at the bottom. `round` caps match the reference's ends. */}
      <Path
        d="M8.5 15.3 A8 8 0 0 1 23.5 15.3"
        stroke={ax.signal}
        strokeWidth={3.2}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={16} cy={20.2} r={4.1} stroke="#f4f6f8" strokeWidth={1.9} fill="none" />
      <Circle cx={16} cy={18.4} r={2.4} fill={ax.signal} />
    </Svg>
  );
}
