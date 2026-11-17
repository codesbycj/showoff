import { Pressable, View } from 'react-native';

import { body, brand, cta, headline } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type WordmarkProps = { height: number; margin: number };

/**
 * The mark.
 *
 * **The board's Arabic lockup is dropped.** Plus Jakarta Sans carries no Arabic
 * glyphs, so rendering it would come out as tofu on Android — the exact class
 * of failure §4.4 says has to be designed out rather than caught by running the
 * app. The latin wordmark and the runner carry the brand instead. Named in the
 * handover.
 */
export function Wordmark({ height, margin }: WordmarkProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Glyph name="runner" size={26} color={ct.ink} />
      <T variant="wordmark">{brand.name}</T>
    </View>
  );
}

type BlockProps = { height: number; margin: number };

/** The headline. Two lines, as the board sets them — 29dp against 14dp body,
 *  so one thing is visibly the biggest thing (R8). */
export function Headline({ height, margin }: BlockProps) {
  return (
    <View style={{ height, marginHorizontal: margin, justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}

/** The body. One run, 77 characters — R5's ceiling is 110 and the board's own
 *  run is 127. */
export function Body({ height, margin }: BlockProps) {
  return (
    <View style={{ height, marginHorizontal: margin }}>
      <T variant="body">{body}</T>
    </View>
  );
}

type CtaProps = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The primary action — 56dp, so it clears R7 on its own.
 *
 * Its fill and shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function StartCta({ margin, height, radius, onPress }: CtaProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={cta.primary}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.accent,
            opacity: pressed ? 0.88 : 1,
            shadowColor: '#07160B',
            shadowOpacity: 0.4,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 8,
          }}
        >
          <T variant="cta">{cta.primary}</T>
        </View>
      )}
    </Pressable>
  );
}

type AsideProps = { margin: number; height: number; onPress: () => void };

/**
 * "I already have an account →".
 *
 * **The link's tap target is its line height**, which is 18dp and under R7's
 * 44 — so the anchor carries `hitSlop` that takes the real target past it,
 * rather than the row being inflated to 44dp of empty space.
 */
export function StartAside({ margin, height, onPress }: AsideProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 16, right: 16 }}
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={cta.aside}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              opacity: pressed ? 0.65 : 1,
            }}
          >
            <T variant="aside">{cta.aside}</T>
            <Glyph name="arrowRight" size={17} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
