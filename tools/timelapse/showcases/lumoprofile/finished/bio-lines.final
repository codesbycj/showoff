import { View } from 'react-native';

import { bio } from '../data/profile';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The account's own three lines.
 *
 * **R5: labels, not prose** - each is one line of the poster's words. The
 * board names a real company and a real-looking URL; both are invented (I1).
 */
export function BioLines({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center', gap: 2 }}>
      {bio.map((line) => (
        <T key={line.id} variant={line.link ? 'bioLink' : 'bio'} numberOfLines={1}>
          {line.text}
        </T>
      ))}
    </View>
  );
}
