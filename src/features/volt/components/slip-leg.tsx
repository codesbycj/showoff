import { Pressable, Text, View } from 'react-native';

import { type Leg } from '../data/slip';
import { R, SP, TYPE, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * One leg of the parlay.
 *
 * The state badge and the tracker bar move together: a winning leg takes a lime
 * disc with a tick and a lime bar, a pending one a neutral disc with an
 * hourglass and a sage bar. Both read off the same `state`, so they cannot
 * disagree — in the export they are two independently-written class strings.
 *
 * The tick glyph comes from the icon font rather than the filled path set: the
 * export leaves `check` outlined here and only fills `check_circle` elsewhere.
 */
export function SlipLeg({ leg, onRemove }: { leg: Leg; onRemove?: () => void }) {
  const winning = leg.state === 'winning';

  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainer,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flexShrink: 1 }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerHighest,
            }}
          >
            <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: vt.secondary }}>
              {leg.league}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, marginLeft: SP.xs }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: R.full,
                backgroundColor: leg.live ? vt.primaryFixed : vt.secondary,
              }}
            />
            <Text style={{ ...TYPE.labelSm, color: leg.live ? vt.primaryFixed : vt.secondary }}>
              {leg.minute}
            </Text>
          </View>
        </View>

        <Pressable onPress={onRemove} hitSlop={8} accessibilityLabel="Remove leg">
          <Symbol name="close" size={18} color={vt.secondary} />
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexShrink: 1, paddingRight: SP.sm, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ ...TYPE.bodyMd, fontFamily: TYPE.bodyLg.fontFamily, color: vt.onSurface }}
          >
            {leg.fixture}
          </Text>
          <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{leg.market}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View
            style={{
              paddingHorizontal: SP.md,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerHighest,
            }}
          >
            <Text style={{ ...TYPE.labelLg, color: vt.primary }}>{leg.odds}</Text>
          </View>

          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: R.full,
              backgroundColor: winning ? vt.primaryFixed : vt.surfaceContainerHighest,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: vt.primaryFixed,
              shadowOpacity: winning ? 0.6 : 0,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 0 },
            }}
          >
            <Symbol
              name={winning ? 'check' : 'hourglassTop'}
              size={16}
              color={winning ? vt.onPrimaryFixed : vt.secondary}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          height: 4,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerHighest,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${leg.progress * 100}%`,
            height: 4,
            borderRadius: R.full,
            backgroundColor: winning ? vt.primaryFixed : vt.secondary,
          }}
        />
      </View>
    </View>
  );
}
