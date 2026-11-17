import { View } from 'react-native';

import { results, resultsLabel } from '../data/find';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * How many pieces the search found, and how they are ordered.
 *
 * **The count is read off the grid's own array** (R9), so it cannot claim a
 * number the grid does not hold, and it survives that array being empty while
 * the reveal fills it (I7).
 *
 * The board crops this row; inventing the row a board cuts is the sanctioned
 * fix for a short screen (I3).
 */
export function ResultHeader({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="resultCount">{`${results.length} pieces`}</T>
      {/* STEP 1.06 sort
      <T variant="resultSort">{resultsLabel.sort}</T>
      */}
    </View>
  );
}
