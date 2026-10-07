import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * The bespoke-itinerary prompt that closes the discovery screen.
 *
 * Centred, on the plain container tone with no photograph — the one block on
 * this screen that is all type. Its sparkle glyph is `auto_awesome`, which is
 * what the export uses to mark the concierge as the "crafted" option.
 */
export function ConciergeCard({
  title,
  blurb,
  cta,
  onPress,
}: {
  title: string;
  blurb: string;
  cta: string;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        marginHorizontal: SP.margin,
        borderRadius: R.DEFAULT,
        backgroundColor: tx.surfaceContainer,
        padding: SP.lg,
        alignItems: 'center',
        gap: SP.sm,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: R.full,
          backgroundColor: tx.surfaceContainerLowest,
          alignItems: 'center',
          justifyContent: 'center',
          ...ELEV.card,
        }}
      >
        <Symbol name="travelExplore" size={24} color={tx.primary} />
      </View>

      <Text style={{ ...TYPE.headlineSm, textAlign: 'center', color: tx.onSurface }}>{title}</Text>

      <Text
        style={{
          ...TYPE.bodySm,
          textAlign: 'center',
          maxWidth: 280,
          color: tx.onSurfaceVariant,
        }}
      >
        {blurb}
      </Text>

      <Pressable onPress={onPress} style={{ marginTop: SP.xs }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.sm,
            height: 44,
            paddingHorizontal: SP.lg,
            borderRadius: R.full,
            backgroundColor: tx.primary,
          }}
        >
          <Text style={{ ...TYPE.labelMd, color: tx.onPrimary }}>{cta}</Text>
          <Symbol name="autoAwesome" size={18} color={tx.onPrimary} />
        </View>
      </Pressable>
    </View>
  );
}
