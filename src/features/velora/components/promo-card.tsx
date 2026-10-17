import { Image, Pressable, View, type ImageSourcePropType } from 'react-native';

import { CarouselDots } from './carousel-dots';
import { Icon } from './icon';
import { T } from './text';
import { PROMO_HEIGHT, PROMO_PANEL } from '../layout';
import { radius, vl } from '../theme';

/** Half the dots pill's height — how far it straddles the card's bottom edge. */
const DOTS_OVERHANG = 11;

/**
 * The promotion: a lime card, a badge, two lines of headline, a dark CTA, a
 * photograph filling its right end, and the carousel's position notched into
 * its bottom edge.
 */
export function PromoCard({
  badge,
  headline,
  cta,
  image,
  slides,
  activeSlide = 0,
  onPress,
}: {
  badge: string;
  headline: readonly string[];
  cta: string;
  image: ImageSourcePropType;
  slides: number;
  activeSlide?: number;
  onPress?: () => void;
}) {
  return (
    <View style={{ paddingBottom: DOTS_OVERHANG }}>
      <View
        style={{
          height: PROMO_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: vl.lime,
          // MISTAKE 1.16 the card came out of the wash, not the paint shop
          opacity: 0.45,
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        {/* STEP 1.11 give the green something to catch the light
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: -70,
            top: -120,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: vl.limeShade,
          }}
        />
        */}

        <View
          style={{
            flex: 1,
            paddingLeft: 18,
            paddingVertical: 18,
            justifyContent: 'space-between',
          }}
        >
          {/* STEP 1.12 say it is not forever
          <View
            style={{
              alignSelf: 'flex-start',
              borderRadius: radius.full,
              backgroundColor: vl.pill,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <T variant="badge" color={vl.onPill}>
              {badge}
            </T>
          </View>
          */}

          {/* STEP 1.13 then say what it is
          <View>
            {headline.map((line) => (
              <T key={line} variant="promo" color={vl.ink}>
                {line}
              </T>
            ))}
          </View>
          */}

          {/* STEP 1.14 and give them somewhere to go
          <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={cta}>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                borderRadius: radius.full,
                backgroundColor: vl.pill,
                paddingLeft: 16,
                paddingRight: 6,
                paddingVertical: 6,
              }}
            >
              <T variant="cta" color={vl.onPill}>
                {cta}
              </T>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: radius.full,
                  backgroundColor: vl.onPill,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="arrow" size={14} color={vl.pill} strokeWidth={2.2} />
              </View>
            </View>
          </Pressable>
          */}
        </View>

        {/* STEP 1.15 fill the other end with the shop
        <Image
          source={image}
          style={{ width: PROMO_PANEL, height: '100%' }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        */}
      </View>

      {/* STEP 1.17 notch the carousel into its bottom edge
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
        pointerEvents="none"
      >
        <View
          style={{
            backgroundColor: vl.canvas,
            borderRadius: radius.full,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <CarouselDots count={slides} active={activeSlide} />
        </View>
      </View>
      */}
    </View>
  );
}
