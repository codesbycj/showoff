import { View } from 'react-native';

import { T } from './text';

/**
 * The scheme mark on the card.
 *
 * It stands in for the real one, which is a trademark and not redistributable.
 * A first pass drew it as paths and it came out as four wonky quadrilaterals:
 * a scheme mark is a specific set of letterforms, and hand-plotting them
 * without the original outlines produces something worse than an honest
 * substitute.
 *
 * So it is set in the screen's own heaviest face, in caps, tracked tight and
 * **sheared rather than italicised**. React Native has no synthetic italic,
 * and Plus Jakarta Sans ships none — a `fontStyle: 'italic'` would silently
 * render upright on Android and faked on web, which is exactly the difference
 * the harness cannot see. A `skewX` is the same transform a synthetic italic
 * is, applied where both platforms agree on it.
 */
export function VisaMark({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <View style={{ transform: [{ skewX: '-12deg' }] }}>
      <T
        variant="greeting"
        color={color}
        style={{ fontSize: size, lineHeight: size * 1.2, letterSpacing: -0.4 }}
      >
        VISA
      </T>
    </View>
  );
}
