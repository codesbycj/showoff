import { Pressable, Text, View } from 'react-native';

import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/**
 * The "Let Us Help!" pill under the headline.
 *
 * Its padding is deliberately lopsided — `pl-space-md pr-space-xs` — so the
 * trailing disc sits tight against the right edge while the label keeps its
 * full inset. Reading that as one symmetric value is the sort of thing that
 * looks fine and measures 12dp wrong, so both sides are explicit.
 */
export function HelpPill({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.sm,
          paddingLeft: SP.md,
          paddingRight: SP.xs,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: mp.surfaceHigh,
          alignSelf: 'center',
          ...LEVEL.card,
        }}
      >
        <Text style={[TYPE.labelMd, { fontFamily: TYPE.labelMd.fontFamily, color: mp.ink }]}>
          {label}
        </Text>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: mp.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="arrowForward" size={18} color={mp.onPrimary} />
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The feedback pill between the cluster and the CTA.
 *
 * It reserves a 34dp minimum height because its copy changes on tap — from
 * "Tap any character to reflect" to whichever mood was chosen — and the longest
 * of those ("Working Through Frustration") wraps to two lines on a 393dp screen.
 * Without the reservation the cluster above it would shift as the label grew.
 */
export function HintPill({ label, dot }: { label: string; dot: string }) {
  return (
    <View style={{ minHeight: 34, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          paddingHorizontal: SP.md,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: mp.surfaceContainer,
          ...LEVEL.card,
        }}
      >
        <View style={{ width: 10, height: 10, borderRadius: R.full, backgroundColor: dot }} />
        <Text style={[TYPE.labelMd, { fontFamily: TYPE.labelMd.fontFamily, color: mp.variant }]}>
          {label}
        </Text>
      </View>
    </View>
  );
}
