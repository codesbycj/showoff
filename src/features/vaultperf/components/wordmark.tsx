import { View } from 'react-native';

import { brand } from '../data/performance';
import { T } from './text';

type Props = { height: number };

/**
 * The app's name.
 *
 * Mounted from the screen beside the menu rather than wrapped with it in one
 * header component: `stage.js` stages what the screen mounts, so two marks in
 * one wrapper reveal as one step and two mounted side by side reveal as two
 * (I5).
 */
export function Wordmark({ height }: Props) {
  return (
    <View style={{ height, justifyContent: 'center' }}>
      <T variant="wordmark">{brand.wordmark}</T>
    </View>
  );
}
