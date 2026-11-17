import { View } from 'react-native';

import { dots } from '../data/onboarding';
import { ct } from '../theme';

type Props = { height: number; margin: number };

/**
 * Which onboarding page this is.
 *
 * Rendered from the `dots` array, one entry per page, so the reveal paints a
 * dot at a time rather than the whole pager in one beat (I9) - and so the
 * control cannot claim a position the flow does not have (R9).
 */
export function PageDots({ height, margin }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
      }}
    >
      {dots.map((dot) => (
        <View
          key={dot.id}
          accessibilityLabel={dot.label}
          style={{
            width: dot.on ? 30 : 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: dot.on ? ct.onDark : 'rgba(255,255,255,0.42)',
          }}
        />
      ))}
    </View>
  );
}
