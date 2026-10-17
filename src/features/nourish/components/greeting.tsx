import { View } from 'react-native';

import { nr } from '../theme';
import { T } from './text';

/**
 * The one serif line on the screen.
 *
 * Centred on the page rather than ranged left with everything else, which is
 * what makes it read as a greeting rather than as a section heading — and it
 * is why the two figures flanking the gauge below can sit at the margins
 * without the top of the screen feeling lopsided.
 */
export function Greeting({ children }: { children: string }) {
  return (
    <View accessibilityRole="header" style={{ alignItems: 'center' }}>
      <T variant="greeting" color={nr.ink}>
        {children}
      </T>
    </View>
  );
}
