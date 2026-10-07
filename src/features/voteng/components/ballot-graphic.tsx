import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { EM, FONT, R, alpha, vt } from '../theme';

/**
 * The glassy ballot box that sits behind the results hero's copy.
 *
 * It is drawn in views rather than as an SVG because that is how the export
 * draws it, and because what makes it read as glass is a translucent gradient
 * over whatever is behind it — which an inline SVG would have to be given as a
 * fill rather than inherit.
 *
 * The whole thing is decorative: it carries `pointerEvents="none"` and the copy
 * sits above it, because at this width the two genuinely overlap. The export
 * overlaps them too — the box is at 75% opacity for exactly that reason.
 */
export function BallotGraphic() {
  return (
    <View
      pointerEvents="none"
      style={{ width: 112, height: 128, alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          width: 112,
          height: 128,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 12,
        }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* the federal "unity" seal stencilled on the box front */}
        <View
          style={{
            width: 44,
            height: 36,
            borderRadius: R.sm + 2,
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.4)',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={{ fontFamily: FONT.black, fontSize: 6, color: '#DC2626' }}>★</Text>
            <Text style={{ fontFamily: FONT.bold, fontSize: 6, color: vt.inkSoft }}>UNITY</Text>
            <Text style={{ fontFamily: FONT.black, fontSize: 6, color: EM[600] }}>★</Text>
          </View>
          <View style={{ width: 20, height: 1, backgroundColor: '#000000', marginVertical: 2 }} />
          <Text
            style={{
              fontFamily: FONT.semibold,
              fontSize: 5,
              lineHeight: 7,
              letterSpacing: -0.15,
              color: vt.muted,
            }}
          >
            NIGERIA
          </Text>
        </View>
      </View>

      {/* the slot, cut across the lid */}
      <View
        style={{
          position: 'absolute',
          top: -4,
          width: 56,
          height: 4,
          borderRadius: R.full,
          backgroundColor: alpha(EM[950], 0.7),
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
        }}
      />

      {/* a marked ballot, half in */}
      <View
        style={{
          position: 'absolute',
          top: -20,
          width: 48,
          height: 40,
          backgroundColor: vt.card,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          borderWidth: 1,
          borderColor: vt.lineStrong,
          alignItems: 'center',
          paddingTop: 6,
          transform: [{ rotate: '-5deg' }],
        }}
      >
        <View
          style={{
            width: 28,
            height: 4,
            borderRadius: R.full,
            backgroundColor: EM[600],
            marginBottom: 4,
          }}
        />
        <View style={{ width: 20, height: 2, backgroundColor: vt.ghost }} />
      </View>
    </View>
  );
}
