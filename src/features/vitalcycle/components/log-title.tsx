import { View } from 'react-native';

import { logTitle } from '../data/cycle';
import { T } from './text';

import { BlockProps } from './_cycle-parts-shared';

/** "Cycling Log". */
export function LogTitle({ margin, height }: BlockProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}
    >
      <T variant="section">{logTitle}</T>
    </View>
  );
}
