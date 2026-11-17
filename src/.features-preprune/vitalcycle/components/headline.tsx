import { Pressable, View } from 'react-native';

import { chips, dayUnit, days, headline, logTitle, notes, promo, ranges } from '../data/cycle';
import { T } from './text';

import { BlockProps } from './_cycle-parts-shared';

/** The headline. Two lines, centred, serif — the dominant element (R8).
 *  The board writes "advanceded"; a typo is not a design (I1). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="display" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}
