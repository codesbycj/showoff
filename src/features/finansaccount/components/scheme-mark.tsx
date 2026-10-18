import { View } from 'react-native';

import { T } from './text';

/**
 * The scheme mark on a card.
 *
 * It stands in for the real one, which is a trademark and not redistributable,
 * and it is set in the screen's own heaviest face and **sheared** rather than
 * italicised. React Native has no synthetic italic and Plus Jakarta Sans ships
 * none, so a `fontStyle: 'italic'` would render upright on Android and faked
 * on web — exactly the difference the harness cannot see. A `skewX` is the
 * same transform a synthetic italic is, applied where both platforms agree.
 */
export function SchemeMark({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <View style={{ transform: [{ skewX: '-12deg' }] }}>
      <T
        variant="cardKind"
        color={color}
        style={{ fontSize: size, lineHeight: size * 1.2, letterSpacing: -0.3 }}
      >
        VISA
      </T>
    </View>
  );
}
