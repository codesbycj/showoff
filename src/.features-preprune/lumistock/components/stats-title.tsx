import { Pressable, View } from 'react-native';

import { screen, stats } from '../data/stock';
import { T } from './text';

import { TitleProps } from './_stat-list-shared';

/** "Stats". */
export function StatsTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{screen.statsTitle}</T>
    </View>
  );
}
