import { View } from 'react-native';

import { headline } from '../data/performance';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The return - the dominant element on the screen (R8).
 *
 * The caret is a drawn mark beside the figure, not a glyph typed after it, so
 * it keeps its weight at any size (I4).
 */
export function ReturnFigure({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', alignItems: 'center' }}>
      <T variant="display">{headline.figure}</T>
      <View style={{ marginLeft: 6, marginTop: -14 }}>
        <Glyph name="caretUp" size={28} color={ct.ink} strokeWidth={2.2} />
      </View>
      <View style={{ marginLeft: 14, marginTop: 14 }}>
        {/* STEP 1.11 compare
        <T variant="compare">{headline.compare}</T>
        */}
      </View>
    </View>
  );
}
