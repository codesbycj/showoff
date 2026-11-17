import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { ct } from '../theme';
import { T } from './text';

type BarProps = { margin: number; height: number };

/** The wordmark and Skip. */
export function BrandBar({ margin, height, onSkip }: BarProps & { onSkip: () => void }) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="wordmark">{brand.name}</T>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        onPress={onSkip}
        accessibilityRole="button"
        accessibilityLabel={brand.skip}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="skip">{brand.skip}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}

type PagerProps = { height: number };

/**
 * The pager.
 *
 * **The dot count is `steps`**, not a typed number, so it cannot disagree with
 * the flow it belongs to (R9) — the board's own pagers do not always match.
 */
export function Pager({ height }: PagerProps) {
  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
      }}
    >
      {Array.from({ length: steps }, (_, i) => (
        <View
          key={i}
          style={{
            width: i === step ? 18 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: i === step ? ct.pagerOn : ct.pager,
          }}
        />
      ))}
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** The headline. Two lines, centred — the dominant element (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}

/** The body. One run, 66 characters — R5's ceiling is 110, and the board's own
 *  line runs the same list together with no commas at all. */
export function Body({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="body" style={{ textAlign: 'center' }}>
        {body}
      </T>
    </View>
  );
}

type CtaProps = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The primary action — 56dp, so it clears R7 on its own.
 *
 * Its fill, border and shadow sit in one style object: a `Platform.select`
 * for a shadow is exactly what the web render cannot check (§4.4).
 */
export function PrimaryCta({ margin, height, radius, onPress }: CtaProps) {
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
            backgroundColor: ct.cta,
            borderWidth: 1,
            borderColor: ct.ctaEdge,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#000814',
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

type BackProps = { size: number; onPress: () => void };

/** The back control on screens two and three of the flow. */
export function BackDisc({ size, onPress }: BackProps) {
  return (
    <Pressable hitSlop={6} onPress={onPress} accessibilityRole="button" accessibilityLabel="Back">
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.control,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="m14.4 6-6 6 6 6"
              stroke={ct.ink}
              strokeWidth={2.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      )}
    </Pressable>
  );
}
