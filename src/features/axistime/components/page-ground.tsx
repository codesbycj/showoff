import { useId } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The page's gradient.
 *
 * It is drawn in `react-native-svg` user space rather than with
 * `expo-linear-gradient`, which flips a diagonal on web, and its id comes from
 * `useId` because gradient ids are document-global there - everything else
 * would render in the first colour (I8).
 *
 * A full-bleed ground is allowed to paint in frame one of a reveal (I9).
 */
export function PageGround({ width, height }: Props) {
  const gid = useId();

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id={gid} x1="0" y1="0" x2="0.35" y2="1">
          <Stop offset="0" stopColor={ct.pageTop} />
          <Stop offset="1" stopColor={ct.pageBottom} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} fill={`url(#${gid})`} />
    </Svg>
  );
}
