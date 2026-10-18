import { View } from 'react-native';

import { CARD_BADGE } from '../layout';
import { radius } from '../theme';
import { Icon } from './icon';

/**
 * The round "more" badge in a stat card's top-right corner.
 *
 * Its fill and its ink are props because the two cards invert each other —
 * black on lime, lime on black — and a component that decided that for itself
 * would need to know which card it was in.
 */
export function CardBadge({ fill, ink }: { fill: string; ink: string }) {
  return (
    <View
      style={{
        width: CARD_BADGE,
        height: CARD_BADGE,
        borderRadius: radius.full,
        backgroundColor: fill,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="more" size={13} color={ink} strokeWidth={2.4} />
    </View>
  );
}
