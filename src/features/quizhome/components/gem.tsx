import Svg, { Path } from 'react-native-svg';

import { qz } from '../theme';

/**
 * The diamond the gem count sits beside.
 *
 * Drawn rather than taken from an icon set, and emphatically not an emoji: a
 * gem renders differently on Windows, Android and iOS, and the web harness
 * would show one face while the emulator shows another (AGENTS.md, "The web
 * render is a proxy, not proof").
 *
 * Two tones, because the reference's gem is lit from the left — a flat one
 * reads as a blue triangle at 20dp.
 */
export function Gem({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.86} viewBox="0 0 28 24">
      <Path d="M7 2 H21 L27 9 L14 23 L1 9 Z" fill={qz.gem} />
      <Path d="M14 23 L27 9 H19 Z" fill={qz.gemDark} />
      <Path d="M7 2 L10 9 H1 Z" fill={qz.gemDark} opacity={0.45} />
    </Svg>
  );
}
