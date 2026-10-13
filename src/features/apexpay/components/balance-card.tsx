import { Pressable, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { BALANCE, QUICK_ACTIONS } from '../data/home';
import { ax, radius, type as t } from '../theme';
import { QuickActions } from './quick-actions';
import { Symbol } from './symbol';

/**
 * The balance card: label and a glass chip, the figure, the delta, the
 * actions.
 *
 * The chartreuse bloom in the top-right corner is a 160dp disc of
 * `primary-container` at 10% which the export blurs with `blur-3xl`. React
 * Native has no blur filter, and a plain disc at low alpha is not a substitute
 * — a hard circular edge across the card is immediately visible, and reading
 * it as a glow is exactly what the blur was doing. So it is drawn as an SVG
 * radial gradient instead, which is what a Gaussian-blurred disc converges to
 * and costs nothing to rasterise.
 *
 * The cents are a separate span in a muted ink. Setting the whole string one
 * colour is the single most visible way to get this card wrong.
 */
export function BalanceCard() {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: ax.surfaceLow,
        padding: 20,
        gap: 16,
        overflow: 'hidden',
      }}
    >
      <View pointerEvents="none" style={{ position: 'absolute', top: -48, right: -48 }}>
        <Svg width={160} height={160}>
          <Defs>
            <RadialGradient id="bloom" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={ax.signal} stopOpacity={0.16} />
              <Stop offset="0.55" stopColor={ax.signal} stopOpacity={0.07} />
              <Stop offset="1" stopColor={ax.signal} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect width={160} height={160} fill="url(#bloom)" />
        </Svg>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[t.labelMd, { color: ax.inkMuted }]}>{BALANCE.label}</Text>
        <Pressable
          accessibilityRole="button"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: radius.full,
            backgroundColor: ax.surfaceHigh,
          }}
        >
          <Text style={[t.labelSm, { color: ax.ink }]}>{BALANCE.action}</Text>
          <Symbol name="northEast" size={13} color={ax.ink} />
        </Pressable>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={[t.headlineXlMobile, { color: ax.ink }]}>
          {BALANCE.whole}
          <Text style={{ color: ax.inkMuted70 }}>{BALANCE.cents}</Text>
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 2 }}>
          <Text style={[t.labelMd, { fontFamily: t.labelLg.fontFamily, color: ax.signal }]}>
            {BALANCE.delta}
          </Text>
          <Text style={[t.bodySm, { color: ax.inkMuted }]}>{BALANCE.deltaNote}</Text>
        </View>
      </View>

      <View style={{ paddingTop: 4 }}>
        <QuickActions actions={QUICK_ACTIONS} />
      </View>
    </View>
  );
}
