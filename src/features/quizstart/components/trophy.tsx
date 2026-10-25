import Svg, { Path, Rect } from 'react-native-svg';

import { qz } from '../theme';

/**
 * The trophy beside the wordmark.
 *
 * Drawn, not an emoji: Windows, Android and iOS each draw the trophy
 * differently and the harness renders whichever the build machine has, which
 * is exactly the difference a web render cannot catch. A cup is a small flat
 * object — in drawing range.
 */
export function Trophy({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 3 H17 V9 C17 12.3 14.8 14.6 12 14.6 C9.2 14.6 7 12.3 7 9 Z"
        fill={qz.blobYellow}
      />
      <Path
        d="M7 4.6 H4.4 V7 C4.4 9.2 5.8 10.6 7.6 10.8"
        fill="none"
        stroke={qz.blobYellow}
        strokeWidth={1.8}
      />
      <Path
        d="M17 4.6 H19.6 V7 C19.6 9.2 18.2 10.6 16.4 10.8"
        fill="none"
        stroke={qz.blobYellow}
        strokeWidth={1.8}
      />
      <Rect x={10.4} y={14.2} width={3.2} height={4} fill="#d99a1f" />
      <Rect x={7.4} y={17.8} width={9.2} height={3.2} rx={1.3} fill="#d99a1f" />
    </Svg>
  );
}
