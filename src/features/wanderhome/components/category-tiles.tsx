import { Image } from 'expo-image';
import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { TILE_H } from '../layout';
import { ct, radius, type } from '../theme';
import { tiles } from '../data/home';
import { T } from './text';

/**
 * Beaches, Old towns, Fjords.
 *
 * **These are photographs, and that is the whole point of the block.** A row
 * of category tiles under a travel app's search bar is three pictures in
 * every real one of those apps; drawn as SVG they come out as a row of
 * cartoons where the design had places. The same rule once put a hand-drawn
 * burger where a delivery app had food.
 *
 * Each tile carries its own bottom-up scrim so the label is readable over
 * whatever the photograph does there — a flat tint would grey the whole
 * picture to protect one word.
 */
export function CategoryTiles({ tileW }: { tileW: number }) {
  const base = useId();

  return (
    <View style={{ flexDirection: 'row' }}>
      {tiles.map((t, i) => {
        const id = `wanderTile-${base}-${t.id}`;
        return (
          <Pressable key={t.id} accessibilityRole="button" accessibilityLabel={t.label}>
            <View
              style={{
                width: tileW,
                height: TILE_H,
                borderRadius: radius.tile,
                overflow: 'hidden',
                marginLeft: i === 0 ? 0 : 8,
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.9)',
                justifyContent: 'flex-end',
              }}
            >
              <Image
                source={t.photo}
                style={{ position: 'absolute', width: tileW, height: TILE_H }}
                contentFit="cover"
              />
              <Svg width={tileW} height={TILE_H} style={{ position: 'absolute' }}>
                <Defs>
                  <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0.4" stopColor="#05060A" stopOpacity="0" />
                    <Stop offset="1" stopColor="#05060A" stopOpacity="0.72" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width={tileW} height={TILE_H} fill={`url(#${id})`} />
              </Svg>
              <T
                variant="tile"
                color={ct.onPage}
                numberOfLines={1}
                style={{ height: type.tile.line, margin: 10, zIndex: 1 }}
              >
                {t.label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
