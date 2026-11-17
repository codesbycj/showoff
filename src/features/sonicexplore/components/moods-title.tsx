import { View } from 'react-native';

import { moods } from '../data/explore';
import { T } from './text';

import { TitleProps } from './_explore-parts-shared';

export function MoodsTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{moods.title}</T>
    </View>
  );
}
