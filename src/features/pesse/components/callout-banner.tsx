import { Pressable, Text, View } from 'react-native';

import { type SymbolName } from '../symbols';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The obsidian callout with a lime button — "Tax Report Ready / Export PDF" on
 * analytics, and the same shape carries the referral block on settings.
 *
 * The icon well is lime on obsidian, which is the one place in the app where
 * the accent is used as a *container* rather than as an action. That is the
 * design's own distinction: this block is telling you something, and its button
 * is the thing you press.
 */
export function CalloutBanner({
  icon,
  title,
  body,
  cta,
  ctaIcon,
  onPress,
}: {
  icon: SymbolName;
  title: string;
  body: string;
  cta: string;
  ctaIcon?: SymbolName;
  onPress?: () => void;
}) {
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderRadius: R.lg,
          backgroundColor: ps.inverse,
          padding: 16,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: ps.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={icon} size={20} color={ps.onLime} />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[TYPE.labelLg, { color: ps.onInverse }]}>{title}</Text>
          <Text style={[TYPE.bodySm, { color: ps.surfaceDim }]}>{body}</Text>
        </View>

        <Pressable onPress={onPress} accessibilityRole="button">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: R.full,
              backgroundColor: ps.lime,
            }}
          >
            {ctaIcon ? <Symbol name={ctaIcon} size={16} color={ps.onLime} /> : null}
            <Text style={[TYPE.labelMd, { color: ps.onLime }]}>{cta}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
