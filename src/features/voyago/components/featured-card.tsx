import { Image } from 'expo-image';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, alpha, vy } from '../theme';

/**
 * The 290dp hero — UAE / Dubai, a starting price and the carousel arrows.
 *
 * The background is a single baked image, not a stack of views. The export
 * builds it from an orange gradient, a photo at `contrast-125 opacity-70
 * translate-y-2 scale-105`, and a `mix-blend-multiply` overlay; `contrast()` is
 * a CSS filter and `multiply` is a blend mode, and React Native has neither. All
 * four layers are composited into `hero-dubai.jpg` instead — see
 * `tools/bake/voyago-hero.py` — so what ships is one flat
 * asset and nothing unimplementable.
 *
 * The shadow and the clip are on two different views on purpose:
 * `overflow: 'hidden'` together with `elevation` on one View is unreliable on
 * Android, and this card needs both — the image has to be cut to the 36dp
 * radius, and the card has to cast `shadow-lg`.
 *
 * `backdrop-blur-md` on the two arrow buttons is dropped. There is no RN
 * equivalent, and over a photograph this dark the 20% white fill alone lands on
 * the same colour.
 */
export function FeaturedCard({
  country,
  city,
  priceLabel,
  price,
  image,
  onPrev,
  onNext,
}: {
  country: string;
  city: string;
  priceLabel: string;
  price: string;
  image: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.hero,
        shadowColor: vy.ink,
        shadowOpacity: 0.18,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
      }}
    >
      <View style={{ height: 290, borderRadius: R.hero, overflow: 'hidden' }}>
        <Image
          source={image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <View style={{ flex: 1, padding: SP.xl, justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                fontFamily: FONT.semibold,
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: 0.3,
                color: alpha(vy.white, 0.9),
              }}
            >
              {country.toUpperCase()}
            </Text>
            <Text
              style={{
                marginTop: -4,
                fontFamily: FONT.black,
                fontSize: 52,
                lineHeight: 52,
                letterSpacing: -2.6,
                color: vy.white,
              }}
            >
              {city}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 10,
                  lineHeight: 14,
                  color: alpha(vy.white, 0.9),
                }}
              >
                {priceLabel}
              </Text>
              <Text
                style={{
                  marginTop: -2,
                  fontFamily: FONT.black,
                  fontSize: 24,
                  lineHeight: 30,
                  letterSpacing: -0.6,
                  color: vy.white,
                }}
              >
                {price}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: SP.sm }}>
              <CarouselButton onPress={onPrev} label="Previous destination">
                <ArrowLeft size={14} color={vy.white} strokeWidth={2.5} />
              </CarouselButton>
              <CarouselButton onPress={onNext} label="Next destination">
                <ArrowRight size={14} color={vy.white} strokeWidth={2.5} />
              </CarouselButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/** One 40dp translucent disc. Local because it exists only on this card. */
function CarouselButton({
  onPress,
  label,
  children,
}: {
  onPress?: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: R.full,
          backgroundColor: alpha(vy.white, 0.2),
          borderWidth: 1,
          borderColor: alpha(vy.white, 0.2),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
