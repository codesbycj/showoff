import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { R, SP, TYPE, al, alpha } from '../theme';

import { StatusDot } from './status-dot';

/** How far the specialty badge hangs below the card, which is half its height. */
const BADGE_DROP = 16;

/**
 * The lavender portrait block, with the specialty badge straddling its lower
 * edge.
 *
 * The badge is the awkward part. The export hangs it outside the card with
 * `-bottom-0 translate-y-1/2`, and the card itself is `overflow-hidden` so the
 * photograph can be cut to a 32dp radius — which on Android would clip the
 * badge away with it. So the clip is kept on an inner view that holds only the
 * photo, and the badge is a sibling of that view, positioned over its edge.
 * Nothing on the path to the badge clips.
 *
 * The screen below has to reserve `BADGE_DROP` of space for the overhang; it
 * does that with its own spacer, as the export does.
 */
export function PortraitCard({ portrait, specialty }: { portrait: number; specialty: string }) {
  return (
    <View>
      <View
        style={{
          minHeight: 300,
          borderRadius: R.lg,
          overflow: 'hidden',
          backgroundColor: alpha(al.primaryContainer, 0.9),
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: SP.md,
        }}
      >
        <Image
          source={portrait}
          style={{ width: '100%', maxWidth: 270, height: 290 }}
          contentFit="cover"
          contentPosition="top"
        />

        <LinearGradient
          colors={[alpha(al.white, 0.2), 'transparent', alpha(al.surfaceContainerLowest, 0.3)]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: -BADGE_DROP,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: SP.md + 4,
            paddingVertical: 6,
            borderRadius: R.full,
            backgroundColor: alpha(al.surfaceContainerLowest, 0.9),
            shadowColor: '#000000',
            shadowOpacity: 0.4,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <StatusDot size={8} />
          <Text style={{ ...TYPE.labelLg, letterSpacing: 0.35, color: al.secondary }}>
            {specialty}
          </Text>
        </View>
      </View>
    </View>
  );
}
