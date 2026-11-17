import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; domeH: number };

/**
 * The white sheet's ground, with the arc the board cuts across its top.
 *
 * `@not-a-ground` - it is full-bleed across the width, which is the shape of a
 * page ground, but it paints a visible arc. Left as a ground the stager keeps
 * it live and the reveal opens on it, which is what `blank.js` reported
 * (I9 / SS5.5).
 *
 * **It is an `<svg>`, not a border radius.** Two corner radii leave a flat run
 * between them; the board's edge is one continuous curve across the whole
 * width, which is a quadratic and nothing else.
 *
 * It draws the arc band **only**. The sheet's own ground is a real `View`
 * underneath it, because an `<svg>` carries no `backgroundColor` for a hit
 * stack to resolve - `audit.js` walks that stack to find the real ground
 * behind a string, and over an svg it finds the dark page and calls every
 * line on the sheet a 1:1 CONTRAST failure.
 *
 * A full-bleed ground is allowed to paint in frame one of a reveal (I9), and
 * with its one shape staged out it paints nothing at all.
 */
export function SheetDome({ width, domeH }: Props) {
  return (
    <Svg
      width={width}
      height={domeH}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Path d={`M0 ${domeH} Q ${width / 2} ${-domeH}, ${width} ${domeH} Z`} fill={ct.white} />
    </Svg>
  );
}
