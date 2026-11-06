import { Image } from 'expo-image';
import { useId, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { DISC, MARGIN, THUMB } from '../layout';
import { ct, type } from '../theme';
import { hero, morePhotos, thumbs } from '../data/stay';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The photograph, the two controls over it, and the strip of the others.
 *
 * Every control here is a sibling of every other one — none is nested inside
 * another `Pressable`, because a `<button>` inside a `<button>` is torn out
 * by the web build's parser and takes the rest of the subtree with it.
 *
 * The "+8" is computed from `morePhotos`, not typed beside three thumbnails.
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
  const id = `wanderHero-${useId()}`;
  const [saved, setSaved] = useState(false);

  const disc = {
    width: DISC,
    height: DISC,
    borderRadius: 14,
    backgroundColor: 'rgba(22,22,26,0.44)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ height }}>
      <Image
        source={hero}
        style={{ position: 'absolute', width: '100%', height }}
        contentFit="cover"
      />
      <Svg width="100%" height={height} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#05060A" stopOpacity="0.3" />
            <Stop offset="0.35" stopColor="#05060A" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={height} fill={`url(#${id})`} />
      </Svg>

      <View
        style={{
          position: 'absolute',
          top: insetTop + 4,
          left: MARGIN,
          right: MARGIN,
          flexDirection: 'row',
          zIndex: 2,
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
          <View style={disc}>
            <Glyph name="back" size={20} tint={ct.onPage} strokeWidth={2} />
          </View>
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Saved' : 'Save this stay'}
          onPress={() => setSaved((v) => !v)}
        >
          <View style={disc}>
            <Glyph name="heart" size={21} tint={ct.onPage} filled={saved} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 44,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            padding: 6,
            borderRadius: 16,
            backgroundColor: 'rgba(22,22,26,0.44)',
          }}
        >
          {thumbs.map((t, i) => (
            <View
              key={i}
              style={{
                width: THUMB,
                height: THUMB,
                borderRadius: 11,
                overflow: 'hidden',
                marginLeft: i === 0 ? 0 : 6,
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.88)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={t}
                style={{ position: 'absolute', width: THUMB, height: THUMB }}
                contentFit="cover"
              />
              {i === thumbs.length - 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    width: THUMB,
                    height: THUMB,
                    backgroundColor: 'rgba(10,10,14,0.52)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T variant="plus" color={ct.onPage} style={{ height: type.plus.line }}>
                    {`+${morePhotos}`}
                  </T>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
