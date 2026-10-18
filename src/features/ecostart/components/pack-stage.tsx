import { Image, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { pack } from '../data/intro';
import { PACK_W } from '../layout';
import { ec, radius } from '../theme';
import { T } from './text';

const PACK = require('../../../../assets/images/ecostart/pack.jpg');
const BITES = require('../../../../assets/images/ecostart/bites.png');

/**
 * The product, with the brand printed on it.
 *
 * The pouch and the bites are photographs — a pack and a snack are specific
 * objects and out of drawing range (AGENTS.md). The wordmark, the leaf and the
 * badge *are* drawn and laid over the photograph, which is how the brand gets
 * onto a blank pouch without a mock-up: a wordmark is squarely in range.
 *
 * Everything on the pack is placed as a fraction of the stage, so the label
 * stays on the pouch at any screen width instead of sliding off it.
 */
export function PackStage({ width, height }: { width: number; height: number }) {
  const packW = width * PACK_W;

  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'flex-end' }}>
      <View
        style={{
          width: packW,
          height: height,
          borderRadius: radius.stage,
          overflow: 'hidden',
        }}
      >
        <Image
          source={PACK}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <View style={{ alignItems: 'center', marginTop: height * 0.3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
            <T variant="packTop" color={ec.packInk}>
              {pack.top}
            </T>
            <View style={{ marginTop: 6 }}>
              <Leaf size={20} />
            </View>
          </View>
          <T variant="packBottom" color={ec.packLeaf}>
            {pack.bottom}
          </T>
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <T variant="packFoot" color={ec.packInk}>
            {pack.foot}
          </T>
          <View
            style={{
              marginTop: 8,
              paddingHorizontal: 14,
              paddingVertical: 5,
              borderRadius: radius.pill,
              backgroundColor: ec.packLeaf,
            }}
          >
            <T variant="packBadge" color={ec.onLime}>
              {pack.strap}
            </T>
          </View>
        </View>
      </View>

      <Image
        source={BITES}
        style={{
          position: 'absolute',
          left: 0,
          bottom: height * 0.16,
          width: width * 0.42,
          height: width * 0.39,
        }}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

/** The leaf in the wordmark. A leaf is a flat mark — drawing range. */
function Leaf({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M18 2 C10 2 3 6 3 12 C3 15 4.6 17.4 7 17.4 C13 17.4 18 11 18 2 Z"
        fill={ec.packLeaf}
      />
      <Path
        d="M15 5 C11 8 8 11.6 6.6 16"
        stroke={ec.packInk}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
