import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';
import { brand, headline, hero, slide, step, steps, subline } from '../data/start';
import { ct } from '../theme';
import { HeroProps } from './_start-parts-shared';

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
