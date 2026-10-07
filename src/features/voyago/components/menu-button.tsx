import { Text } from 'react-native';

import { FONT, vy } from '../theme';

import { RoundButton } from './round-button';

/**
 * The `//` overflow control, top-right on home and on hotels.
 *
 * The export sets it as two literal slashes in the UI face, tracked tight and
 * rotated -12deg — not an icon — so it is kept as text. React Native rotates
 * about an element's centre, which is what is wanted here: the glyph sits in
 * the middle of the circle and stays there.
 *
 * `font-light` has no Plus Jakarta weight registered below 400, so the regular
 * carries it. At 14dp inside a 40dp circle the difference is not resolvable.
 */
export function MenuButton({
  size = 44,
  borderOpacity = 0.1,
  onPress,
}: {
  size?: number;
  borderOpacity?: number;
  onPress?: () => void;
}) {
  return (
    <RoundButton
      size={size}
      borderOpacity={borderOpacity}
      onPress={onPress}
      accessibilityLabel="Options"
    >
      <Text
        style={{
          fontFamily: FONT.regular,
          fontSize: 14,
          lineHeight: 18,
          letterSpacing: -0.5,
          color: vy.ink,
          transform: [{ rotate: '-12deg' }],
        }}
      >
        //
      </Text>
    </RoundButton>
  );
}
