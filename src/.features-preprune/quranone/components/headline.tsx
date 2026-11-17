import { Pressable, View } from 'react-native';
import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { T } from './text';

import { BlockProps } from './_onboard-parts-shared';

/** The headline. Two lines, centred — the dominant element (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}
