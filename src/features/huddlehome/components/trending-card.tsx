import { Image } from 'expo-image';
import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { HERO_H } from '../layout';
import { ct, radius, type } from '../theme';
import { hero } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The one hangout the app is pushing, on the gradient the brand is built on.
 *
 * The gradient is drawn in `react-native-svg` user space rather than with
 * `expo-linear-gradient`: a diagonal comes out mirrored on the web render,
 * which puts the warm end in the wrong corner and is invisible until the
 * reference is next to it.
 *
 * The spectrum strip along the top edge is the reference's, and it is a
 * second gradient rather than a stack of coloured Views — a row of divs makes
 * visible seams at this height.
 */
export function TrendingCard({ onPress }: { onPress?: () => void }) {
  const id = useId();
  const body = `huddleBody-${id}`;
  const strip = `huddleStrip-${id}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={hero.title.replace('\n', ' ')}
      onPress={onPress}
    >
      <View
        style={{
          height: HERO_H,
          borderRadius: radius.card,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
        }}
      >
        <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <Defs>
            <LinearGradient id={body} x1="0" y1="0" x2="1" y2="0.7">
              <Stop offset="0" stopColor={ct.warm} />
              <Stop offset="1" stopColor={ct.hot} />
            </LinearGradient>
            <LinearGradient id={strip} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FFD166" />
              <Stop offset="0.3" stopColor="#5BD6A8" />
              <Stop offset="0.62" stopColor="#5AA9F5" />
              <Stop offset="1" stopColor="#C46BF0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${body})`} />
          <Rect x="0" y="0" width="100%" height="5" fill={`url(#${strip})`} />
        </Svg>

        <View
          style={{
            width: 124,
            height: HERO_H - 24,
            borderRadius: radius.photo,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <Image
            source={hero.photo}
            style={{ width: 124, height: HERO_H - 24 }}
            contentFit="cover"
          />
        </View>

        <View style={{ flex: 1, marginLeft: 14, zIndex: 1 }}>
          <T variant="heroTitle" color={ct.onGradient}>
            {hero.title}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Glyph name="calendar" size={15} tint={ct.onGradient} strokeWidth={1.8} />
            <T
              variant="heroMeta"
              color={ct.onGradient}
              style={{ height: type.heroMeta.line, marginLeft: 7 }}
            >
              {hero.when}
            </T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Glyph name="pin" size={15} tint={ct.onGradient} strokeWidth={1.8} />
            <T
              variant="heroMeta"
              color={ct.onGradient}
              style={{ flex: 1, height: type.heroMeta.line, marginLeft: 7 }}
              numberOfLines={1}
            >
              {hero.where}
            </T>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
