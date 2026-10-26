import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy } from '../data/start';
import { SEARCH_TOP } from '../layout';
import { type, vg } from '../theme';
import { T } from './text';

/**
 * The way in to the catalogue.
 *
 * It is a line on the page rather than a field in a box, which is the
 * reference's treatment — and it is a real `Pressable` with a name, so it
 * answers a tap and a screen reader rather than only looking like a control.
 */
export function SearchLine({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="search"
      accessibilityLabel="Find a category"
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SEARCH_TOP }}>
{/* STEP 1.12 a lens
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx={10.8} cy={10.8} r={6.4} stroke={vg.onBlue} strokeWidth={2} fill="none" />
          <Path d="m15.6 15.6 4 4" stroke={vg.onBlue} strokeWidth={2} strokeLinecap="round" />
        </Svg>
*/}

{/* STEP 1.13 what it does
        <T variant="search" color={vg.onBlue} style={{ marginLeft: 12, height: type.search.line }}>
          {copy.searchStrong}
        </T>
*/}
{/* STEP 1.14 and what it looks through
        <T variant="search" color={vg.onBlueDim} style={{ height: type.search.line }}>
          {copy.searchDim}
        </T>
*/}
      </View>
    </Pressable>
  );
}
