import { Image } from 'expo-image';
import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { BACK, MARGIN } from '../layout';
import { ct, radius, type } from '../theme';
import { copy, hero } from '../data/event';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The photograph, the title over it, and the way back.
 *
 * **The scrim is a drawn gradient, not a flat tint.** The title sits on a
 * busy frame — a crowd at dusk — and a flat overlay either greys the whole
 * photograph or leaves the type sitting on a light patch. A bottom-up ramp
 * darkens only what is under the words.
 *
 * **The back control is not in the reference.** A detail screen reached by
 * tapping a card needs a way out, and the recording should never need faked
 * navigation.
 */
export function HeroImage({
  height,
  insetTop,
  onBack,
}: {
  height: number;
  insetTop: number;
  onBack?: () => void;
}) {
  const scrim = `huddleScrim-${useId()}`;

  return (
    <View style={{ height, width: '100%' }}>
      <Image
        source={hero}
        style={{ position: 'absolute', width: '100%', height }}
        contentFit="cover"
      />

      <Svg width="100%" height={height} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={scrim} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0B0B10" stopOpacity="0.34" />
            <Stop offset="0.42" stopColor="#0B0B10" stopOpacity="0.05" />
            <Stop offset="1" stopColor="#0B0B10" stopOpacity="0.76" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={height} fill={`url(#${scrim})`} />
      </Svg>

      <View style={{ flex: 1, paddingTop: insetTop + 6, paddingHorizontal: MARGIN, zIndex: 1 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          style={{ alignSelf: 'flex-start' }}
        >
          <View
            style={{
              width: BACK,
              height: BACK,
              borderRadius: BACK / 2,
              backgroundColor: 'rgba(255,255,255,0.92)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <Glyph name="chevron" size={18} tint={ct.ink} strokeWidth={2.2} />
            </View>
          </View>
        </Pressable>

        <View style={{ flex: 1 }} />

        <T variant="hero" color={ct.onPhoto} style={{ marginBottom: 12 }}>
          {copy.title}
        </T>

        <View style={{ flexDirection: 'row', marginBottom: 34 }}>
          {copy.chips.map((c) => (
            <View
              key={c.id}
              style={{
                height: 32,
                paddingHorizontal: 14,
                borderRadius: radius.chip,
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: c.id === 'state' ? ct.upcomingBg : ct.musicBg,
              }}
            >
              <T
                variant="chip"
                color={c.id === 'state' ? ct.upcomingInk : ct.musicInk}
                style={{ height: type.chip.line }}
              >
                {c.label}
              </T>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
