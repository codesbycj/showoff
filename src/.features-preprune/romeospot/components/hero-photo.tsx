import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const HERO = require('../../../../assets/images/romeospot/hero.jpg');

type Props = { width: number; height: number };

/**
 * The restaurant photograph and the scrim that makes the caption legible.
 *
 * A picture of a place, so a photograph (INSPO-RULES I4) — not a drawn room.
 *
 * **The image carries explicit numeric width and height.** Absolute insets
 * alone make an `Image` paint nothing on Android, silently (RULES Part 7), and
 * a percentage height inside a stretch-sized row inflates the row instead.
 *
 * The scrim is drawn here rather than baked into the JPEG so the photograph
 * survives a change of hero height. It is a straight vertical gradient: a
 * *diagonal* one is what `expo-linear-gradient` mirrors on web.
 */
export function HeroPhoto({ width, height }: Props) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width, height }}>
      <Image
        source={HERO}
        style={{ width, height }}
        contentFit="cover"
        transition={0}
        accessibilityLabel="Dining room at Romeo Lane"
      />
      <LinearGradient
        colors={['rgba(8,10,12,0.55)', 'rgba(8,10,12,0.05)', 'rgba(8,10,12,0.78)']}
        locations={[0, 0.42, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height }}
        pointerEvents="none"
      />
    </View>
  );
}
