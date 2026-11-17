import { View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { width: number; height: number };

/**
 * The two ends of the route.
 *
 * `@not-a-ground` - this component is full-bleed and `pointerEvents="none"`,
 * which is the shape of a page ground, but it paints two discs. Left as a
 * ground the stager keeps it live and the reveal opens on them, which is what
 * `blank.js` reported (I9 / SS5.5).
 *
 * The pickup is the green disc the board puts at the top of its route; the
 * destination is the dark one at the end of it. Both are positioned off the
 * same fractions `MapGround` draws the route between, so the markers sit on
 * the line at any window size (I2).
 */
export function MapPins({ width, height }: Props) {
  const pick = { x: width * 0.3, y: height * 0.34 };
  const drop = { x: width * 0.74, y: height * 0.72 };

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width, height }} pointerEvents="none">
      <View
        style={{
          position: 'absolute',
          left: pick.x - 24,
          top: pick.y - 24,
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: ct.green,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: ct.white,
        }}
      >
        <Glyph name="box" size={20} color={ct.onGreen} strokeWidth={1.7} />
      </View>

      <View
        style={{
          position: 'absolute',
          left: drop.x - 22,
          top: drop.y - 22,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: ct.dark,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: ct.white,
        }}
      >
        <Glyph name="home" size={18} color={ct.onDark} strokeWidth={1.7} />
      </View>
    </View>
  );
}
