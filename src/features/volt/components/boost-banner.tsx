import { Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Glow } from './glow';

/**
 * The acca-boost banner.
 *
 * The struck-through old multiplier is a real `textDecorationLine`, not a drawn
 * rule: React Native supports line-through on `Text` on both platforms, and a
 * hairline View over the digits would not follow the glyphs if the number
 * changed length.
 */
export function BoostBanner({
  title,
  badge,
  blurb,
  was,
  now,
}: {
  title: string;
  badge: string;
  blurb: string;
  was: string;
  now: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: R.lg,
        overflow: 'hidden',
        backgroundColor: vt.surfaceContainerHigh,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <Glow color={vt.primaryFixed} size={96} opacity={0.1} right={-16} bottom={-16} />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: alpha(vt.primaryFixed, 0.2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FilledIcon name="bolt" size={24} color={vt.primaryFixed} />
        </View>

        <View style={{ flexShrink: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.primaryFixed }}>
              {title.toUpperCase()}
            </Text>
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
              }}
            >
              <Text style={{ ...TYPE.labelSm, fontSize: 9, color: vt.onPrimaryFixed }}>
                {badge}
              </Text>
            </View>
          </View>
          <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.onSurface }}>
            {blurb}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ ...TYPE.labelSm, color: vt.secondary, textDecorationLine: 'line-through' }}>
          {was}
        </Text>
        <Text style={{ ...TYPE.headlineMd, color: vt.primaryFixed }}>{now}</Text>
      </View>
    </View>
  );
}
