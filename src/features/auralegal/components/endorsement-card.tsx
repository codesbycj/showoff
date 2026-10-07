import { Text, View } from 'react-native';

import { R, SP, TYPE, al, alpha } from '../theme';

import { Symbol } from './symbol';

/**
 * The "Elite Tier Counsel" teaser under the biography.
 *
 * Its shield is the one icon on this screen tinted lavender rather than
 * emerald — the design system reserves emerald for verified metrics and keeps
 * ranking claims in the primary tone.
 */
export function EndorsementCard({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: al.surfaceContainer,
        borderRadius: SP.md,
        padding: 14,
        marginTop: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md - 4, flexShrink: 1 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: R.full,
            backgroundColor: alpha(al.primary, 0.2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="verifiedUser" size={18} color={al.primary} />
        </View>

        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...TYPE.titleMd, color: al.onSurface }}>{title}</Text>
          <Text style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>{subtitle}</Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: alpha(al.secondary, 0.15),
        }}
      >
        <Text style={{ ...TYPE.labelSm, color: al.secondary }}>{badge}</Text>
      </View>
    </View>
  );
}
