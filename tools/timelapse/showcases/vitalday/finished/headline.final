import { View } from 'react-native';
import {
  average,
  avatar,
  followingTitle,
  follows,
  headline,
  months,
  pct,
  peak,
  rings,
  today,
} from '../data/day';
import { T } from './text';

import { BlockProps } from './_day-parts-shared';

/** The headline. The board's own line — "By tracking these area consistently
 *  score" — is not a sentence; rewritten (I1, R5). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}
    >
      {headline.map((line) => (
        <T key={line} variant="display" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}
