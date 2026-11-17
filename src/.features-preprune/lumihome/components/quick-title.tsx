import { Pressable, ScrollView, View } from 'react-native';

import { quick } from '../data/wallet';
import { T } from './text';

import { TitleProps } from './_quick-rail-shared';

/** "Quick Actions". */
export function QuickTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{quick.title}</T>
    </View>
  );
}
