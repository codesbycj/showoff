import { View } from 'react-native';

import { welcome } from '../data/start';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The line under the headline.
 *
 * The board's own sub-line sells restaurant delivery on a pet-food app; this
 * one is about what the app actually sells, and it is one line of 63
 * characters rather than the board's two sentences (R5 / I1).
 */
export function WelcomeBody({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="body" style={{ textAlign: 'center' }}>
        {welcome.body}
      </T>
    </View>
  );
}
