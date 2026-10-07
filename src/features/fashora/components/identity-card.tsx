import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The portrait, name, email and membership pill.
 *
 * The `verified` check beside the name is the one mark here the reference draws
 * filled, so it comes from `filled-icon.tsx` as a path. The `stars` badge in
 * the membership pill asks for the same fill in the markup and renders
 * outlined, a ring with a solid star in it, so it comes from the icon subset —
 * see `filled-icon.tsx` for why the export's own renders disagree with itself.
 *
 * The edit button straddles the portrait's lower-right corner, so the portrait
 * is rounded by its own `borderRadius` rather than by a clipping parent — a
 * clip on the path to the button would take the button with it, and Android
 * clips more eagerly than the web.
 *
 * The membership pill is the only place `tertiary-fixed` and
 * `on-tertiary-fixed` are used: a pale apricot with its own deep-brown ink,
 * which is neither of the two oranges the rest of the design runs on.
 */
export function IdentityCard({
  name,
  email,
  tier,
  portrait,
  onEdit,
}: {
  name: string;
  email: string;
  tier: string;
  portrait: number;
  onEdit?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderRadius: R.lg,
        padding: SP.md,
        alignItems: 'center',
        ...ELEV.card,
      }}
    >
      <View style={{ marginBottom: SP.gutterMobile }}>
        <Image
          source={portrait}
          style={{
            width: 96,
            height: 96,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerHigh,
            ...ELEV.raised,
          }}
          contentFit="cover"
        />

        <Pressable
          onPress={onEdit}
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: fa.primaryContainer,
              alignItems: 'center',
              justifyContent: 'center',
              ...ELEV.glow,
              shadowOpacity: 0.35,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Symbol name="edit" size={16} color={fa.onPrimary} />
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SP.xs }}>
        <Text style={{ ...TYPE.headlineSm, color: fa.onSurface }}>{name}</Text>
        <FilledIcon name="verified" size={18} color={fa.primaryContainer} />
      </View>

      <Text style={{ ...TYPE.bodySm, color: fa.secondary, marginBottom: SP.gutterMobile }}>
        {email}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: SP.gutterMobile,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: fa.tertiaryFixed,
          ...ELEV.card,
        }}
      >
        <Symbol name="stars" size={15} color={fa.onTertiaryFixed} />
        <Text
          style={{
            ...TYPE.labelSm,
            fontFamily: FONT.bold,
            letterSpacing: 0.275,
            color: fa.onTertiaryFixed,
          }}
        >
          {tier.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
