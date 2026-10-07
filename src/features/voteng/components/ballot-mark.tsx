import Svg, { Circle, Path } from 'react-native-svg';

import { vt } from '../theme';

/**
 * The app mark: the splash's ballot box, flattened for use at 40dp.
 *
 * It is not the same drawing as `BootEmblem`. The splash version carries a neon
 * outline, a darker body and a slip that animates; this one drops all three,
 * lightens the faces so it holds up on a white header, and puts a white slot
 * and a green dot where the slip would land. That is how the export draws it,
 * and it is the right call — the outline and the slip both disappear into mush
 * at this size.
 */
export function BallotMark({ size = 40 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" fill={vt.cubeLeft} />
      <Path d="M24 4L42 14L24 24L6 14L24 4Z" fill={vt.cubeTop} />
      <Path d="M24 24L42 14V34L24 44V24Z" fill={vt.cubeRight} />
      <Path
        d="M17 14L24 18L31 14"
        stroke={vt.card}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={24} cy={24} r={3.5} fill={vt.cubeDot} />
    </Svg>
  );
}
