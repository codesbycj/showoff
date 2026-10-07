import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Contact } from '../data/wallet';
import { R, TYPE, ps } from '../theme';
import { NetworkBadge } from './network-badge';
import { Symbol } from './symbol';

/**
 * One node on the Send-again rail: a 56dp portrait with a network badge, and a
 * name under it.
 *
 * The badge overhangs the portrait, so the portrait is clipped by its own
 * `borderRadius` and nothing above it clips — an `overflow: 'hidden'` wrapper
 * would take the badge off with the corner.
 */
export function ContactNode({ contact, onPress }: { contact: Contact; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={{ alignItems: 'center', gap: 6, width: 62 }}>
        <View>
          <Image
            source={contact.photo}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: ps.surfaceContainer,
            }}
            contentFit="cover"
            transition={0}
          />
          <NetworkBadge badge={contact.badge} />
        </View>
        <Text style={[TYPE.labelSm, { color: ps.onSurface }]} numberOfLines={1}>
          {contact.name}
        </Text>
      </View>
    </Pressable>
  );
}

/** The dashed-feeling "+" node that closes the rail. */
export function InviteNode({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={{ alignItems: 'center', gap: 6, width: 62 }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: R.full,
            backgroundColor: ps.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="personAdd" size={24} color={ps.secondary} />
        </View>
        <Text style={[TYPE.labelSm, { color: ps.secondary }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
