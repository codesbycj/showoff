import { useWindowDimensions, View } from 'react-native';

import { scatter } from '../data/onboarding';
import { ScatterGlyph } from './scatter-glyph';

/**
 * The marks strewn round the top of the screen.
 *
 * Positions are fractions of the band, not dp, and the data holds them — so
 * moving one is a number in `data/onboarding.ts` rather than a change here,
 * and the arrangement keeps its shape on a 360dp phone as well as a 430dp one.
 *
 * The band is a layer the screen positions absolutely over its own content,
 * rather than a row in the flex stack. Two reasons, and the second is the one
 * that matters: the marks are meant to sit *beside* the illustration rather
 * than above it, and a child that hangs outside a fixed-height parent is
 * exactly what Android clips. Giving the layer the whole height it draws into
 * means nothing relies on overflow.
 */
export function Scatter({ height }: { height: number }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ height }} pointerEvents="none">
      {scatter.map((s) => (
        <View
          key={s.key}
          style={{
            position: 'absolute',
            left: width * s.x,
            top: height * s.y,
          }}
        >
          <ScatterGlyph name={s.name} size={s.size} />
        </View>
      ))}
    </View>
  );
}
