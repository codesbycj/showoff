import { Pressable, Text, View } from 'react-native';

import { VERIFIED } from '../data/product';
import { bt, radius, type as t } from '../theme';
import { Symbol } from './symbol';

/**
 * The dietary assurance row, with a chevron that would open it.
 *
 * The one block on the screen filled with `surface-container-low` rather than
 * `surface-container` — a step *down* from the pods above it, so it reads as
 * secondary to them despite being the larger shape.
 */
export function VerifiedRow({ onPress }: { onPress?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: radius.lg,
        backgroundColor: bt.containerLow,
      }}
    >
{/* STEP 1.41 the badge, and what it certifies
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.full,
            backgroundColor: bt.containerHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="verifiedUser" size={20} color={bt.accent} />
        </View>
        <View>
          <Text
            style={{
              fontFamily: t.labelMd.family,
              fontSize: t.labelMd.size,
              lineHeight: t.labelMd.line,
              color: bt.ink,
            }}
          >
            {VERIFIED.title}
          </Text>
          <Text
            style={{
              fontFamily: t.bodySm.family,
              fontSize: t.bodySm.size,
              lineHeight: t.bodySm.line,
              color: bt.muted,
            }}
          >
            {VERIFIED.subtitle}
          </Text>
        </View>
      </View>
*/}

{/* STEP 1.42 and a way into the detail
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="More details">
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: radius.full,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="chevronRight" size={20} color={bt.muted} />
        </View>
      </Pressable>
*/}
    </View>
  );
}
