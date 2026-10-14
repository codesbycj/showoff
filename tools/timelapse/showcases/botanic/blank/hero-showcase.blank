import { Image, Text, View } from 'react-native';

import { BADGES, PRODUCT } from '../data/product';
import { DISH, SHOWCASE_HEIGHT } from '../layout';
import { alpha, bt, radius, type as t } from '../theme';
import { AmbientGlow, glowBox } from './ambient-glow';
import { DietaryBadge } from './dietary-badge';

const bowl = require('../../../../assets/images/botanic/bowl.jpg');

/**
 * The panel the dish sits in: a green wash, two ambient glows, the editorial
 * watermark, and the photograph over all of it.
 *
 * Height is pinned at 310 rather than derived. The export says
 * `min-h-[310px]`, and the contents — a 256 dish inside `pt-4 pb-8` — come to
 * 304, so the minimum is what is actually in charge. Laying it out as content
 * plus padding would lose the 6dp of slack the reference distributes above and
 * below the dish.
 */
export function HeroShowcase() {
  return (
    <View
      style={{
        height: SHOWCASE_HEIGHT,
        backgroundColor: alpha.showcase,
        borderBottomLeftRadius: radius.showcase,
        borderBottomRightRadius: radius.showcase,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 32,
      }}
    >
{/* STEP 1.09 light coming in at two corners
      <AmbientGlow
        radius={96}
        sigma={64}
        color={bt.accent}
        opacity={0.2}
        style={{
          position: 'absolute',
          left: 48 - glowBox(96, 64) / 2,
          top: 48 - glowBox(96, 64) / 2,
        }}
      />
      <AmbientGlow
        radius={88}
        sigma={40}
        color={bt.gold}
        opacity={0.15}
        style={{
          position: 'absolute',
          right: 48 - glowBox(88, 40) / 2,
          bottom: 48 - glowBox(88, 40) / 2,
        }}
      />
*/}

{/* STEP 1.10 the name of the thing, set huge and half-hidden
      <View
        pointerEvents="none"
        style={{
          ...StyleSheetAbsolute,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.2,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: t.headlineXl.family,
            fontSize: t.headlineXl.size,
            lineHeight: t.headlineXl.line,
            letterSpacing: t.headlineXl.tracking,
            color: bt.ink,
            transform: [{ rotate: '-2deg' }, { scale: 1.25 }],
          }}
        >
          {PRODUCT.watermark[0]}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 4,
            fontFamily: t.headlineXl.family,
            fontSize: t.headlineXl.size,
            lineHeight: t.headlineXl.line,
            letterSpacing: t.headlineXl.tracking,
            color: bt.ink,
            transform: [{ rotate: '1deg' }, { scale: 1.1 }],
          }}
        >
          {PRODUCT.watermark[1]}
        </Text>
      </View>
*/}

      <View style={{ width: DISH, height: DISH, alignItems: 'center', justifyContent: 'center' }}>
{/* STEP 1.11 and something for the bowl to cast onto
        <AmbientGlow
          radius={112}
          sigma={24}
          color={bt.accent}
          opacity={0.25}
          style={{
            position: 'absolute',
            left: (DISH - glowBox(112, 24)) / 2,
            top: (DISH - glowBox(112, 24)) / 2 + 12,
          }}
        />
*/}

{/* STEP 1.12 the dish itself
        <Image
          source={bowl}
          style={{
            width: DISH,
            height: DISH,
            borderRadius: radius.dish,
            // MISTAKE 1.13 the photograph came out washed into the panel
            opacity: 0.35,
          }}
          resizeMode="cover"
          accessibilityLabel={PRODUCT.title}
        />
*/}

{/* STEP 1.14 what it is free of
        <DietaryBadge
          {...BADGES[0]}
          gap={6}
          style={{ position: 'absolute', left: -8, bottom: -8 }}
        />
*/}
{/* STEP 1.15 and how hot it runs
        <DietaryBadge
          {...BADGES[1]}
          gap={4}
          style={{ position: 'absolute', right: 8, top: 8 }}
        />
*/}
      </View>
    </View>
  );
}

/** `absolute inset-0`, spelled once rather than four times. */
const StyleSheetAbsolute = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
} as const;
