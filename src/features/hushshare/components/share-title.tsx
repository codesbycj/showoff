import { View } from 'react-native';

import { header } from '../data/share';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The screen's name - the dominant line above the artwork (R8).
 */
export function ShareTitle({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="title">{header.title}</T>
    </View>
  );
}
