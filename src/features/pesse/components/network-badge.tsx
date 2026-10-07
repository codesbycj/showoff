import { Text, View } from 'react-native';

import { type NetworkBadge as Badge } from '../data/wallet';
import { FONT, R } from '../theme';
import { Symbol } from './symbol';

/**
 * The little disc on a contact's shoulder naming their linked bank.
 *
 * It is a letter, a short acronym or an icon, and which one is decided by the
 * badge's own `kind` rather than by which field happens to be set. "BCA" is the
 * case that forces the type size down — three characters in a 16dp disc, so the
 * acronym sets at 8dp where a single letter sets at 9dp.
 */
export function NetworkBadge({ badge, size = 16 }: { badge: Badge; size?: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        right: -1,
        bottom: -1,
        width: size,
        height: size,
        borderRadius: R.full,
        backgroundColor: badge.fill,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {badge.kind === 'icon' ? (
        <Symbol name={badge.icon} size={size * 0.62} color={badge.ink} />
      ) : (
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: badge.text.length > 1 ? size * 0.5 : size * 0.56,
            lineHeight: size * 0.8,
            color: badge.ink,
          }}
        >
          {badge.text}
        </Text>
      )}
    </View>
  );
}
