import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand, headline, hero, slide, step, steps, subline } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type HeroProps = { width: number; height: number; scrimH: number };

/**
 * The photograph, and the scrim that makes the copy readable on it.
 *
 * **This is the page's own ground** (§5.5), so it may paint in frame one.
 * Everything else is staged over it.
 *
 * A coastline is a **photograph** (I4) — a picture *of* somewhere, which
 * drawing would only trace.
 *
 * The scrim runs top to bottom, which `expo-linear-gradient` handles; only a
 * *diagonal* is mirrored on web (Part 7). Without it the subline sits at about
 * 3:1 on the water and fails R4.
 */
export function HeroFrame({ width, height, scrimH }: HeroProps) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width, height }}>
      <Image source={hero} style={{ width, height }} resizeMode="cover" />
      <LinearGradient
        colors={[ct.scrimTop, ct.scrimMid, ct.scrimBottom]}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: scrimH }}
        pointerEvents="none"
      />
    </View>
  );
}

type StepProps = { margin: number; height: number };

/** The progress segments. The count is `steps`, not a typed number (R9). */
export function StepBar({ margin, height }: StepProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {Array.from({ length: steps }, (_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            backgroundColor: i <= step ? ct.stepOn : ct.step,
          }}
        />
      ))}
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** The wordmark. */
export function Wordmark({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="wordmark">{brand.name}</T>
    </View>
  );
}

/** The headline. Two lines — the dominant element on the screen (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}

/** One line, 27 characters (R5). */
export function Subline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="subline">{subline}</T>
    </View>
  );
}

type SlideProps = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The slide bar.
 *
 * The chip is a **child of the track**, not a floating sibling, so it can
 * never straddle the track's edge (R3) however the bar is sized — and the hint
 * is centred in what is left, so a wider chip moves the hint rather than being
 * painted over it.
 *
 * The track's fill and its shadow sit in one style object: a `Platform.select`
 * for a shadow is exactly what the web render cannot check (§4.4).
 */
export function SlideBar({ margin, height, radius, onPress }: SlideProps) {
  const inset = 6;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={slide.label}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: inset,
            backgroundColor: ct.track,
            borderWidth: 1,
            borderColor: ct.trackEdge,
            opacity: pressed ? 0.88 : 1,
            shadowColor: '#000000',
            shadowOpacity: 0.35,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 7,
          }}
        >
          <View
            style={{
              height: height - inset * 2,
              paddingHorizontal: 22,
              borderRadius: (height - inset * 2) / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.chip,
            }}
          >
            <T variant="chip">{slide.label}</T>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <T variant="hint">{slide.hint}</T>
            <Svg width={18} height={18} viewBox="0 0 24 24">
              <Path
                d="M4.6 12h14m0 0-4.8-4.8M18.6 12l-4.8 4.8"
                stroke={ct.ink}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </View>
      )}
    </Pressable>
  );
}
