import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al, alpha } from '../theme';

import { Symbol } from './symbol';

/**
 * The confirmation toast.
 *
 * The export ships it in the markup but parks it off-screen
 * (`translate-y-32 opacity-0 pointer-events-none`) until its script fires, so
 * it appears in no reference render — it is rebuilt from the markup rather than
 * from a picture. The screen mounts it only once a booking is confirmed, which
 * is what the export's handler does, and it gives the recording somewhere to
 * finish.
 */
export function BookingToast({
  title,
  detail,
  inset,
  onClose,
}: {
  title: string;
  detail: string;
  inset: number;
  onClose?: () => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: SP.margin,
        right: SP.margin,
        bottom: inset + SP.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SP.md,
        backgroundColor: al.surfaceContainerHighest,
        borderRadius: R.lg,
        padding: SP.md,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 16,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: alpha(al.secondary, 0.2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="checkCircle" size={22} color={al.secondary} />
        </View>

        <View style={{ flexShrink: 1 }}>
          <Text numberOfLines={1} style={{ ...TYPE.titleMd, color: al.onSurface }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: al.onSurfaceVariant }}>
            {detail}
          </Text>
        </View>
      </View>

      <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Dismiss">
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: al.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="close" size={16} color={al.onSurface} />
        </View>
      </Pressable>
    </View>
  );
}
