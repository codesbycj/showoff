import { Image } from 'expo-image';
import { View } from 'react-native';

import { ELEV } from '../theme';

/** The stage is `max-w-[340px]`, which on a 393dp phone is what it gets. */
export const STAGE_W = 340;

/**
 * The hero frame.
 *
 * The export sets the photo `h-64 w-auto object-contain`, and Tailwind's
 * preflight `max-width: 100%` is what decides the result: the natural 512x279
 * would be 470dp wide at 256dp tall, so the width clamps to the 340dp stage and
 * the height follows it down to 185. The 288dp box it sits in keeps its own
 * height, which is why there is more air above and below the jacket than the
 * photo itself accounts for.
 *
 * The frame's own pale studio backdrop is part of the picture — the export
 * draws the whole frame rather than a cutout, and the reference renders its
 * hard edges against the canvas. So it is not masked out here.
 *
 * The export's `blur-3xl` glow pod behind the jacket is left out: React Native
 * has no blur filter, and at `bg-primary/10` under an opaque photo the
 * reference shows no trace of it to match.
 */
export function ProductStage({ hero }: { hero: number }) {
  return (
    <View style={{ height: 288, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={hero}
        style={{
          width: STAGE_W,
          height: Math.round((STAGE_W * 279) / 512),
          ...ELEV.raised,
        }}
        contentFit="cover"
      />
    </View>
  );
}
