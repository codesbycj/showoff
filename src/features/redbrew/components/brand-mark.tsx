import { Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { FONT, rb } from '../theme';

/**
 * The Red Brew mark — a crimson rounded square holding a cream `R`.
 *
 * The export ships this as its own screen, an SVG of a `rect` plus two `path`s.
 * Both paths are carried across; they overlap deliberately, the first laying
 * down the stem and bowl and the second cutting the leg, which together read as
 * a squared-off R with a chunk taken out of its counter.
 *
 * Drawn on the export's own 40-unit box and scaled by the caller.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Rect width={40} height={40} rx={10} fill={rb.crimson} />
      <Path d="M12 10H28V15H22V20H27V25H22V30H16V10Z" fill={rb.bg} />
      <Path
        d="M22 20L28 30H23L18.5 22.5H16V30H12V10H23C26 10 28 12 28 15C28 17.5 26 19.5 23 20H22Z"
        fill={rb.bg}
      />
    </Svg>
  );
}

/**
 * The full lockup: the mark beside "RED" in charcoal and "BREW" in crimson.
 *
 * The wordmark is real `Text`, not paths, so it picks up the loaded Space
 * Grotesk rather than baking letterforms into the bundle. The export asks for
 * weight 900 and Space Grotesk stops at 700, so it is set Bold and tracked in
 * by 0.5 — the single place the type is not literally what the spec says.
 */
export function BrandLockup({
  size = 20,
  markSize = 28,
  showMark = true,
}: {
  size?: number;
  markSize?: number;
  showMark?: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {showMark ? <BrandMark size={markSize} /> : null}

      <Text
        style={{
          fontFamily: FONT.displayBold,
          fontSize: size,
          lineHeight: size * 1.15,
          letterSpacing: -0.5,
          color: rb.ink,
        }}
      >
        RED<Text style={{ color: rb.crimson }}>BREW</Text>
      </Text>
    </View>
  );
}
