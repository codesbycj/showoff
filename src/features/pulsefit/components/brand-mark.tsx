import Svg, { Path, Rect } from 'react-native-svg';

import { pf, R } from '../theme';

/**
 * PulseFit's mark: a lime squircle with a white check.
 *
 * The export hotlinks it as a bitmap from `lh3.googleusercontent.com`, which a
 * recording must not depend on — so it is redrawn. The square measures 32dp in
 * the header with a ~10dp corner, and the check's stroke measures 2.9dp with
 * round caps; its elbow sits a little left and well below centre, which is
 * what gives the tick its long trailing arm.
 *
 * Drawn on a 32-unit viewBox so the geometry below reads in dp at its native
 * size, and scales from one number.
 */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Rect x={0} y={0} width={32} height={32} rx={R.mark} ry={R.mark} fill={pf.lime} />
      <Path
        d="M7.8 16.4 L13.4 21.4 L24.4 10.6"
        stroke={pf.surface}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
