import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';

import { actions, banner, burger, headline, legal } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type BlockProps = { margin: number; height: number };

/** The rewards banner. A pill, not a brush stroke: the board's is a painted
 *  shape in its artboard, and tracing it would be copying an arrangement
 *  rather than expressing an idea (§2.5). */
export function JoinBanner({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      <Pressable
        hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={banner.label}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              height,
              paddingHorizontal: 16,
              borderRadius: height / 2,
              backgroundColor: ct.pill,
              opacity: pressed ? 0.75 : 1,
            }}
          >
            <Glyph name="crown" size={15} color={ct.ink} />
            <T variant="banner">{banner.label}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}

/** The headline. Two lines, as the board sets them — 36dp, so one thing is
 *  visibly the biggest thing (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}

type HeroProps = { width: number; height: number };

/**
 * The burger.
 *
 * **A photograph, because a burger is a picture *of* something** (I4). The
 * board floats a cut-out on red; a cut-out of a photographed burger against a
 * brand red is a soft-edge job that goes wrong more often than it goes right,
 * so this sits in the red as a bled frame with the page's own colour fading
 * into it from both ends — the same idea, built as a gradient rather than as a
 * bad mask.
 *
 * **This is the page's ground for its region** (§5.5), so it may paint before
 * the chrome above and below it is staged.
 *
 * The gradients run top to bottom, which `expo-linear-gradient` handles; only
 * a *diagonal* is mirrored on web (Part 7).
 */
export function BurgerHero({ width, height }: HeroProps) {
  return (
    <View style={{ width, height }}>
      <Image source={burger} style={{ width, height }} resizeMode="cover" />
      <LinearGradient
        colors={[ct.page, 'rgba(224,41,29,0)']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: height * 0.3 }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['rgba(224,41,29,0)', ct.page]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height * 0.32 }}
        pointerEvents="none"
      />
    </View>
  );
}

type ActionProps = { margin: number; height: number; radius: number; gap: number; onPress: () => void };

/**
 * The two ways in.
 *
 * Both 54dp, so each clears R7 on its own. Each fill and shadow sit in one
 * style object — a `Platform.select` for a shadow is exactly what the web
 * render cannot check (§4.4).
 */
export function StartActions({ margin, height, radius, gap, onPress }: ActionProps) {
  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {actions.map((a) => {
        const solid = a.tone === 'solid';
        return (
          <Pressable
            key={a.id}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={a.label}
          >
            {({ pressed }) => (
              <View
                style={{
                  height,
                  borderRadius: radius,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  backgroundColor: solid ? ct.cta : 'transparent',
                  borderWidth: solid ? 0 : 1.5,
                  borderColor: ct.outline,
                  opacity: pressed ? 0.85 : 1,
                  shadowColor: '#5C0A04',
                  shadowOpacity: solid ? 0.3 : 0,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: solid ? 5 : 0,
                }}
              >
                <Glyph name={a.glyph} size={19} color={solid ? ct.ctaInk : ct.ink} />
                <T variant={solid ? 'action' : 'actionOutline'}>{a.label}</T>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

/** The small print. One run, 66 characters — R5's ceiling is 110, and the
 *  board's own line runs to 164 and names four real companies. */
export function LegalNote({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      <T variant="legal" style={{ textAlign: 'center' }}>
        {legal.text}
      </T>
    </View>
  );
}
