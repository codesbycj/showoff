import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { StatusDot } from './status-dot';
import { Symbol } from './symbol';

/**
 * The "who you are booking" banner at the top of the booking screen.
 *
 * Its verified badge is the *outlined* tick in a filled well, not the filled
 * tick the profile and the feed use. The export genuinely sets it both ways —
 * `FILL 1` on the other two screens and plain here — so this one comes from the
 * icon font while the others come from the path set.
 */
export function SubjectBanner({
  name,
  place,
  specialty,
  avatar,
}: {
  name: string;
  place: string;
  specialty: string;
  avatar: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: al.surfaceContainer,
        borderRadius: R.lg,
        padding: SP.md,
        marginBottom: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
        <Image
          source={avatar}
          style={{ width: 56, height: 56, borderRadius: R.full }}
          contentFit="cover"
        />

        <View style={{ flexShrink: 1 }}>
          <Text
            numberOfLines={1}
            style={{ ...TYPE.headlineMd, letterSpacing: -0.36, color: al.onSurface }}
          >
            {name}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <Symbol name="locationOn" size={14} color={al.outline} />
            <Text numberOfLines={1} style={{ ...TYPE.labelMd, color: al.onSurfaceVariant }}>
              {place}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: SP.xs }}>
            <StatusDot />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.35, color: al.secondary }}>
              {specialty}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: R.full,
          backgroundColor: al.surfaceContainerHigh,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="verified" size={18} color={al.onSurface} />
      </View>
    </View>
  );
}
