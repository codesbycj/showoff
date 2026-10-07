import { Text, View } from 'react-native';

/**
 * NIKITIN Agency's mark: an italic serif N in a dark disc.
 *
 * This is the one brand mark in the set that is type rather than a drawing, so
 * it is set as type. The face is the platform serif — Noto Serif on Android, the
 * browser's default on web — because tracing a 20dp letterform off a screenshot
 * would produce a worse N than any real serif does, and no serif is registered
 * for a single glyph.
 *
 * The glyph is optically centred rather than box-centred: an italic N leans
 * right, so the box that contains it sits a point left of centre to put the
 * stroke's visual mass on the disc's axis.
 */
export function NikitinN({ size = 20, tone = '#FFFFFF' }: { size?: number; tone?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: '700',
          fontSize: size,
          lineHeight: size * 1.05,
          color: tone,
          marginLeft: -size * 0.04,
          includeFontPadding: false,
        }}
      >
        N
      </Text>
    </View>
  );
}
