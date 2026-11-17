import { View } from 'react-native';

import { legal } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The small print. One run, 66 characters — R5's ceiling is 110, and the
 *  board's own line runs to 164 and names four real companies. */
export function LegalNote({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      <T variant="legal" style={{ textAlign: 'center' }}>
        {legal.text}
      </T>
    </View>
  );
}
