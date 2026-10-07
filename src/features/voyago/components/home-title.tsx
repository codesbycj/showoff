import { Text, View } from 'react-native';

import { FONT, vy } from '../theme';

import { MenuButton } from './menu-button';

/**
 * Home's masthead — "Discover the World with us!" against the `//` control.
 *
 * Two deliberate choices about the type:
 *
 * The export breaks the line itself (`Discover the<br>World …`), so the two
 * lines are two `Text` elements rather than one that wraps. That keeps the
 * break where the design put it at any width, and it lets the second line carry
 * its own `lineHeight` — it has to, because the accent words are set 7dp larger
 * than the rest of the line and a single shared line box clips them on Android.
 *
 * "with us!" is Instrument Serif Italic at 34dp with tracking reset to zero,
 * nested inside the 27dp bold so the two baselines align. React Native
 * baseline-aligns nested `Text` by default, which is exactly the reference.
 */
export function HomeTitle({ onMenu }: { onMenu?: () => void }) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
    >
      <View>
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 27,
            lineHeight: 34,
            letterSpacing: -0.675,
            color: vy.ink,
          }}
        >
          Discover the
        </Text>
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 27,
            lineHeight: 36,
            letterSpacing: -0.675,
            color: vy.ink,
          }}
        >
          World{' '}
          <Text style={{ fontFamily: FONT.serif, fontSize: 34, letterSpacing: 0 }}>with us!</Text>
        </Text>
      </View>

      <MenuButton size={40} borderOpacity={0.3} onPress={onMenu} />
    </View>
  );
}
