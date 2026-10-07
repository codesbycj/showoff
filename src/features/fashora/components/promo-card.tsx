import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

/**
 * The sale banner.
 *
 * The card is split seven-twelfths to five: an orange text column and a photo
 * panel that runs the full height on the right. The split is proportional in
 * the export (`w-7/12` / `w-5/12`) and stays proportional here, so the headline
 * wraps to the reference's three lines at any screen width.
 *
 * The headline stacks three utilities on top of the type style —
 * `font-extrabold`, `leading-tight`, `tracking-tight` — and in React Native the
 * first of those is a family swap, not a weight. So it is Plus Jakarta Sans 800
 * with -0.6 tracking, rather than `headlineLg`'s 700 and -0.48.
 *
 * Its leading is 28, which is not what `leading-tight` computes to. That
 * utility is 1.25, so the three lines should stack to 90dp and the card to 178.
 * The reference's three-line block measures 85-86dp and its card 172, and 28 is
 * what reproduces both — line for line, to within a dp. The number is measured
 * rather than derived, and it matters beyond this card: the promo is the
 * tallest thing above the fold, so six dp here moves every section below it.
 *
 * The export's decorative glow — a blurred white disc at `-right-10 -bottom-10`
 * — is left out. It sits in the card's bottom-right corner, which is exactly
 * where the photo panel sits, and the panel is painted after it, so it never
 * reaches a pixel of the reference. React Native has no blur filter either, so
 * rebuilding it would mean faking something invisible.
 */
export function PromoCard({
  headline,
  cta,
  model,
  onPress,
}: {
  headline: string;
  cta: string;
  model: number;
  onPress?: () => void;
}) {
  return (
    <View style={{ paddingHorizontal: SP.marginMobile, paddingVertical: SP.gutterMobile }}>
      {/*
        The orange halo and the corner clip are on two different Views on
        purpose: `overflow: 'hidden'` and `elevation` on one View is unreliable
        on Android, and this card needs both — the clip to round the photo
        panel's outer corners, the elevation to cast `shadow-primary-container/25`.
      */}
      <View style={{ borderRadius: R.xl2, ...ELEV.glow, shadowOpacity: 0.25, shadowRadius: 15 }}>
        <View
          style={{
            borderRadius: R.xl2,
            backgroundColor: fa.primaryContainer,
            overflow: 'hidden',
            minHeight: 170,
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          {/*
            The split is given as a width rather than as `flex: 7` / `flex: 5`.
            A flex ratio is only a ratio of the *free* space, so the text column
            — which has the longer content — came out 227dp against the
            reference's 208, and the headline then wrapped a word early.
          */}
          <View
            style={{
              width: '58.3333%',
              padding: 20,
              alignItems: 'flex-start',
              gap: SP.gutterMobile,
            }}
          >
            <Text
              style={{
                ...TYPE.headlineLg,
                fontFamily: FONT.extrabold,
                letterSpacing: -0.6,
                lineHeight: 28,

                color: fa.onPrimary,
              }}
            >
              {headline}
            </Text>

            <Pressable onPress={onPress} accessibilityRole="button">
              <View
                style={{
                  height: 36,
                  paddingHorizontal: 20,
                  borderRadius: R.full,
                  backgroundColor: fa.surfaceContainerLowest,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...ELEV.raised,
                }}
              >
                <Text style={{ ...TYPE.labelMd, color: fa.onSurface }}>{cta}</Text>
              </View>
            </Pressable>
          </View>

          {/*
            The photo is positioned absolutely, filling the panel, rather than
            sized at `width: '100%', height: '100%'`.

            The row has no height of its own — it takes one from the text
            column, through `alignItems: 'stretch'`. So a percentage height on
            the photo has nothing to resolve against, and the image falls back
            to its own aspect ratio and then *drives* the row's height instead
            of following it. At 393dp the two numbers happen to agree and the
            card looks right; at any other width the card inflates with it, to
            three or four times its height.

            An absolutely-positioned child contributes nothing to its parent's
            size, which breaks the loop: the panel is as tall as the text
            column, and the photo fills whatever that turns out to be.

            Plain `cover` with no offset — the export's 108%-tall,
            bottom-anchored overhang is already baked into the crop (see the
            asset notes in CREDITS.md), so what is left is exactly the window
            the reference shows.
          */}
          <View style={{ width: '41.6667%' }}>
            <Image
              source={model}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              contentFit="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
