import { View } from 'react-native';

import { DOT_GAP, DOT_SIZE } from '../layout';
import { nr, radius } from '../theme';

/**
 * The dots under the hero, saying the whole block is one page of several.
 *
 * Presentational only — which page is live comes from the screen, because the
 * screen is what will own the carousel's scroll position.
 */
export function CarouselDots({ count, active }: { count: number; active: number }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: DOT_GAP }}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: radius.full,
            backgroundColor: i === active ? nr.ink : nr.track,
          }}
        />
      ))}
    </View>
  );
}
