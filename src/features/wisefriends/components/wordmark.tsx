import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand } from '../data/trip';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number };

/**
 * The app's name, with the board's palm mark above it.
 *
 * The mark is drawn: a palm is a silhouette, which is an idea rather than a
 * specific arrangement, and that is what I4 puts in range.
 */
export function Wordmark({ height }: Props) {
  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      {/* STEP 1.02 path
      <Svg width={26} height={20} viewBox="0 0 26 20">
        <Path
          d="M13.4 19V9.6M13.4 9.6c-2.6-3-5.8-4.2-9.6-3.2 1.2 3 4 4.4 9.6 3.2ZM13.4 9.6c1-3.8 3.6-6 7.8-6.6-.2 3.4-2.6 5.6-7.8 6.6ZM13.4 9.6c-1.4-3.2-.8-6 1.8-8.6 2 2.6 2 5.6-1.8 8.6Z"
          stroke={ct.orange}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
      */}
      {/* STEP 1.03 name
      <T variant="wordmark">{brand.name}</T>
      */}
    </View>
  );
}
