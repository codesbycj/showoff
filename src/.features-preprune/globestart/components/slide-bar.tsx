import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand, headline, hero, slide, step, steps, subline } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

import { SlideProps } from './_start-parts-shared';

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
