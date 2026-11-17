import { View } from 'react-native';
import {
  kg,
  prediction,
  projected,
  screen,
  series,
  stats,
  unit,
} from '../data/weight';
import { T } from './text';

import { TitleProps } from './_weight-parts-shared';

/** "Weight Breakdown". */
export function BreakdownTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{screen.title}</T>
    </View>
  );
}
