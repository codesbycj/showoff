import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import { dt } from '../theme';

/**
 * The lilac wash behind the top of the page.
 *
 * Measured down the reference's left edge: #EAEDF9 from the status bar to
 * about 180dp, washed out to white by ~300dp and white from there to the dock.
 * It is a layer rather than the screen's background colour because everything
 * below the hero sits on plain white, and a single flat fill cannot do both.
 */
export function PageWash() {
  return (
    <LinearGradient
      colors={[dt.washTop, dt.washMid, dt.bg]}
      locations={[0, 0.21, 0.37]}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    />
  );
}
