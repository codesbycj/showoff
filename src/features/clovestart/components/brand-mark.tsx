import Svg, { Path } from 'react-native-svg';

import { MARK } from '../layout';
import { ct } from '../theme';

/**
 * The Clove mark: two rounded squares stepped on the diagonal, the shape the
 * reference puts in the top-left corner.
 *
 * Drawn rather than bitmapped — a wordmark is interface, and interface is
 * vectors in every real app. One path with `evenodd` so the step between the
 * two squares keeps its corner instead of filling in.
 */
export function BrandMark({ size = MARK, tint = ct.ink }: { size?: number; tint?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        fillRule="evenodd"
        fill={tint}
        d="M6 11.5A5.5 5.5 0 0 1 11.5 6h7A5.5 5.5 0 0 1 24 11.5V16h-5.5A2.5 2.5 0 0 0 16 18.5V24h-4.5A5.5 5.5 0 0 1 6 18.5v-7Zm14 10A1.5 1.5 0 0 1 21.5 20H28a6 6 0 0 1 6 6v2.5A5.5 5.5 0 0 1 28.5 34h-7A5.5 5.5 0 0 1 16 28.5V28h6a2 2 0 0 0 2-2v-4.5Z"
      />
    </Svg>
  );
}
