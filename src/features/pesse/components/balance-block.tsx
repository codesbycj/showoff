import { Pressable, Text, View } from 'react-native';

import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The balance: a card-selector pill, the figure itself, and a money-hold badge.
 *
 * The figure is `display` — 44dp ExtraBold at -1.32 tracking — and it is the
 * one piece of type on the screen that is allowed to set its own width. Nothing
 * else on this screen is near it in weight, which is the whole point of the
 * spec's "visual gravity" note.
 */
export function BalanceBlock({
  label,
  balance,
  holdLabel,
  hold,
  onSelectCard,
}: {
  label: string;
  balance: string;
  holdLabel: string;
  hold: string;
  onSelectCard?: () => void;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onSelectCard} accessibilityRole="button">
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: ps.surfaceLow,
            },
            LEVEL.container,
          ]}
        >
          <Text style={[TYPE.labelMd, { color: ps.secondary }]}>{label}</Text>
          {/* The card's own colour, as a chip — a swatch, not an icon. */}
          <View style={{ width: 14, height: 10, borderRadius: 3, backgroundColor: ps.lime }} />
          <Symbol name="expandMore" size={16} color={ps.secondary} />
        </View>
      </Pressable>

      <Text style={[TYPE.display, { color: ps.onSurface, marginTop: 8 }]}>{balance}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 4,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: R.full,
          backgroundColor: ps.surfaceContainer,
        }}
      >
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ps.secondary }} />
        <Text style={[TYPE.labelSm, { color: ps.secondary }]}>
          {holdLabel} <Text style={{ color: ps.onSurface }}>{hold}</Text>
        </Text>
      </View>
    </View>
  );
}
