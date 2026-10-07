import { Pressable, Text, View } from 'react-native';

import { SETTINGS } from '../data/settings';
import { FONT, LEVEL, R, TYPE, ps } from '../theme';
import { Glow } from './glow';
import { Symbol } from './symbol';

/**
 * The referral block: an obsidian card with a rewards eyebrow, the offer, and a
 * code row with a Copy button.
 *
 * The code row is a sunk strip inside the card rather than another card on top
 * of it — a lighter fill at the same radius family, which is how the design
 * shows "this is a field you take something out of" without a border.
 */
export function ReferralCard({ onCopy }: { onCopy?: () => void }) {
  const r = SETTINGS.referral;
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
      <View
        style={{
          borderRadius: R.lg,
          backgroundColor: ps.inverse,
          padding: 16,
          overflow: 'hidden',
        }}
      >
        <Glow color="196,240,0" opacity={0.22} corner="bottom-right" reach={0.85} />

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: R.full,
                backgroundColor: ps.lime,
              }}
            >
              <Symbol name="stars" size={12} color={ps.onLime} />
              <Text style={[TYPE.labelSm, { color: ps.onLime }]}>{r.eyebrow}</Text>
            </View>

            <Text style={[TYPE.headlineSm, { color: ps.onInverse, marginTop: 10 }]}>{r.title}</Text>
            <Text style={[TYPE.bodySm, { color: ps.surfaceDim, marginTop: 4 }]}>{r.body}</Text>
          </View>

          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: 'rgba(240,240,242,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="redeem" size={22} color={ps.lime} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingLeft: 14,
            paddingRight: 6,
            paddingVertical: 6,
            borderRadius: R.full,
            backgroundColor: 'rgba(240,240,242,0.10)',
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={[TYPE.labelSm, { color: ps.surfaceDim }]}>
              {r.codeLabel.toUpperCase()}
            </Text>
            <Text
              style={{
                fontFamily: FONT.extrabold,
                fontSize: 15,
                lineHeight: 20,
                letterSpacing: 0.4,
                color: ps.onInverse,
              }}
            >
              {r.code}
            </Text>
          </View>

          <Pressable onPress={onCopy} accessibilityRole="button">
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
              <Symbol name="contentCopy" size={15} color={ps.onLime} />
              <Text style={[TYPE.labelMd, { color: ps.onLime }]}>{r.copy}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
