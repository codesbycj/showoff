import { View } from 'react-native';

import {
  PRICE,
  about,
  amenities,
  facts,
  pricing,
  usd,
  venue,
  yearSaving,
  yearly,
} from '../data/gym';
import { T } from './text';

import { BlockProps } from './_gym-body-shared';

/** What the place is. One run, 95 characters — R5's ceiling is 110, and the
 *  board's own paragraph runs to 243 and is cut off mid-word by the screen. */
export function AboutBlock({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="about">{about}</T>
    </View>
  );
}
