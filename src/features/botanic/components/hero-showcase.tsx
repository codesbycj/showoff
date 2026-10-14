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
 *
 * The watermark is the piece worth reading twice. Two lines of 44px Oswald at
 * `-rotate-2 scale-125` and `rotate-1 scale-110`, both at 20% opacity, centred
 * on the panel and clipped by it — the scale is what pushes "STICKY SESAME"
 * past the panel's edges so it reads as set *under* the dish rather than
 * behind it. Both transforms turn about the element's own centre, which is
 * what CSS does by default and what React Native does regardless, so the two
 * agree here without any `transformOrigin` work.
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
        // `pt-4 pb-8`. Not decoration: the panel's 310 minimum leaves 6dp of
        // slack around the 256 dish, and the uneven padding is what puts 3 of
        // it above and 3 below rather than splitting it evenly. Centring
        // without this drops the dish — and both badges with it — 8dp.
        paddingTop: 16,
        paddingBottom: 32,
      }}
    >
      {/* `-top-12 -left-12 w-48 h-48 bg-primary/20 blur-3xl`: a 96dp circle
          whose centre sits 48dp in from the panel's top-left corner. The drawn
          box is far wider than the circle, so it is placed by that centre. */}
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
      {/* `-bottom-10 -right-10 w-44 h-44 bg-secondary/15 blur-2xl` — an 88dp
          circle centred 48dp in from the bottom-right. */}
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

      <View style={{ width: DISH, height: DISH, alignItems: 'center', justifyContent: 'center' }}>
        {/* `inset-4 bg-primary/25 blur-xl translate-y-3` — the glow the dish
            casts onto the panel, offset down so it reads as a contact shadow
            rather than a halo. */}
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
        <Image
          source={bowl}
          style={{ width: DISH, height: DISH, borderRadius: radius.dish }}
          resizeMode="cover"
          accessibilityLabel={PRODUCT.title}
        />

        {/* Both hang off the dish's corners rather than the panel's, by 8dp —
            `-bottom-2 -left-2` and `top-2 right-2`. One sits outside the
            photograph and one inside it, which is the export's own asymmetry. */}
        <DietaryBadge
          {...BADGES[0]}
          gap={6}
          style={{ position: 'absolute', left: -8, bottom: -8 }}
        />
        <DietaryBadge {...BADGES[1]} gap={4} style={{ position: 'absolute', right: 8, top: 8 }} />
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
