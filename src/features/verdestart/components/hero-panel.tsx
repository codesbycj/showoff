import { Image, View } from 'react-native';

import { badges, hero } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { width: number; height: number; radius: number; insetTop: number };

/**
 * The welcome hero — the dominant element on the screen (R8).
 *
 * **The food is a photograph** (I4). A cut-out was tried and abandoned:
 * `cutout.py --report` measured the sky's border deviation at 70 on the red
 * channel, far above the 12 that cuts cleanly, and the honest answer there is
 * a different treatment rather than a cleverer threshold — so the frame fills
 * the panel instead.
 *
 * The two badges float over it on solid white pills, because a label straight
 * on a photograph is the contrast failure R4 exists for.
 */
export function HeroPanel({ width, height, radius, insetTop }: Props) {
  return (
    <View
      style={{
        height,
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        overflow: 'hidden',
        backgroundColor: ct.greenDeep,
      }}
    >
      {/* STEP 1.02 image
      <Image source={hero.image} style={{ width, height }} resizeMode="cover" />
      */}

      {/* STEP 1.03 label
      {badges.map((badge, i) => (
        <View
          key={badge.id}
          style={{
            position: 'absolute',
            top: insetTop + 40 + i * 54,
            left: badge.side === 'left' ? 18 : undefined,
            right: badge.side === 'right' ? 18 : undefined,
          }}
        >
          <View
            style={{
              height: 32,
              paddingHorizontal: 13,
              borderRadius: 16,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="chipOff" style={{ fontSize: 12.5 }}>
              {badge.label}
            </T>
          </View>
        </View>
      ))}
      */}
    </View>
  );
}
