import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FONT, R, ps } from '../theme';

/**
 * The 44x28dp card thumbnail on the Send Money source row.
 *
 * It is drawn rather than photographed: a two-stop olive-to-lime gradient, a
 * chip, a VISA mark and the last four digits, all at 6dp. Everything on it is
 * sized as a fraction of the thumbnail so it survives being drawn larger
 * somewhere else, but nothing here is legible as type — it reads as the idea of
 * a card, which is what the reference draws too.
 */
export function MiniCard({ last4, width = 44 }: { last4: string; width?: number }) {
  const height = width * 0.64;
  const micro = {
    fontFamily: FONT.extrabold,
    fontSize: Math.max(5, width * 0.14),
    lineHeight: Math.max(6, width * 0.17),
    color: ps.onLime,
  };

  return (
    <LinearGradient
      colors={[ps.olive, ps.lime]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        width,
        height,
        borderRadius: R.sm * 0.6,
        padding: width * 0.09,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View
          style={{
            width: width * 0.18,
            height: width * 0.11,
            borderRadius: width * 0.055,
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
        />
        <Text style={micro}>VISA</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
        <Dot size={width * 0.045} />
        <Dot size={width * 0.045} />
        <Text style={[micro, { fontFamily: FONT.bold }]}>{last4}</Text>
      </View>
    </LinearGradient>
  );
}

function Dot({ size }: { size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: ps.onLime,
      }}
    />
  );
}
