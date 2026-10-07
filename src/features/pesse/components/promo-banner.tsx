import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { LEVEL, R, TYPE, ps } from '../theme';
import { Glow } from './glow';
import { Symbol } from './symbol';

/**
 * The obsidian promo banner, with a lime glow bleeding out of its bottom-right
 * corner and a 3D coin sitting over it.
 *
 * The glow is clipped by the banner, so the banner clips — and therefore
 * carries no elevation of its own. The shadow is on a wrapper instead, because
 * a clip and an elevation on one View is the pairing Android renders
 * unreliably.
 */
export function PromoBanner({
  eyebrow,
  title,
  body,
  coin,
}: {
  eyebrow: string;
  title: string;
  body: string;
  coin: number;
}) {
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
        <Glow color="196,240,0" opacity={0.26} corner="bottom-right" reach={0.8} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <Symbol name="bolt" size={14} color={ps.limeBright} />
              <Text
                style={[
                  TYPE.labelSm,
                  { color: ps.limeBright, letterSpacing: 0.8, textTransform: 'uppercase' },
                ]}
              >
                {eyebrow}
              </Text>
            </View>

            <Text style={[TYPE.headlineSm, { color: ps.surface }]}>{title}</Text>
            <Text style={[TYPE.bodySm, { color: ps.surfaceDim, marginTop: 4 }]} numberOfLines={2}>
              {body}
            </Text>
          </View>

          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: ps.surfaceDim,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={coin}
              style={{ width: 56, height: 56, borderRadius: 28 }}
              contentFit="cover"
              transition={0}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
