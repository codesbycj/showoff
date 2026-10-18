import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { FlagName } from '../data/account';
import { fn } from '../theme';

/**
 * A currency's flag, drawn rather than set as an emoji.
 *
 * Flag emoji are the worst case of the emoji problem this project has already
 * been bitten by: Windows ships no flag glyphs at all, so a harness render on
 * this machine would show two letters where a device shows a flag.
 *
 * Each is a *suggestion* of the flag — at 20dp that is all that survives
 * anyway, and it is the same mark on every platform.
 */
export function FlagDisc({ name, size }: { name: FlagName; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={11} fill="#ffffff" />
      {name === 'us' ? (
        <>
          <Path d="M1.6 8.6 H22.4" stroke={fn.flagRed} strokeWidth={3.2} />
          <Path d="M1 15.4 H23" stroke={fn.flagRed} strokeWidth={3.2} />
          <Path d="M3.2 20.4 H20.8" stroke={fn.flagRed} strokeWidth={3} />
          <Rect x={1} y={1} width={11} height={10} rx={1} fill={fn.flagBlue} />
        </>
      ) : (
        <Path d="M1 12 A11 11 0 0 1 23 12 Z" fill={fn.flagRed} />
      )}
      <Circle cx={12} cy={12} r={11} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
    </Svg>
  );
}
