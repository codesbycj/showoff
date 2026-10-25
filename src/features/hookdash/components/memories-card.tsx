import { Image, Pressable, View } from 'react-native';

import { memories } from '../data/dash';
import { MEMORIES_H } from '../layout';
import { hk, radius } from '../theme';
import { T } from './text';

const MEMORIES = require('../../../../assets/images/hookdash/memories.jpg');

/**
 * Last year's picture, on the one coloured card of the screen.
 *
 * The photograph sits to the right of the type rather than behind it, because
 * the reference's does — the blue is the card and the picture is an object on
 * it, which is what stops this reading as a fifth dark tile.
 *
 * Only the top corners are rounded: the card runs off the bottom edge, and
 * rounding its foot would tell the eye the page had ended.
 */
export function MemoriesCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={memories.title}>
      <View
        style={{
          height: MEMORIES_H,
          borderTopLeftRadius: radius.card,
          borderTopRightRadius: radius.card,
          backgroundColor: hk.memories,
          overflow: 'hidden',
        }}
      >
        {/* STEP 1.24 the picture
        <Image
          source={MEMORIES}
          style={{ position: 'absolute', right: 0, top: 0, width: '62%', height: MEMORIES_H }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        */}

        {/* STEP 1.25 and when it was
        <View style={{ padding: 14 }}>
          <T variant="section" color={hk.ink}>
            {memories.title}
          </T>
          <T variant="date" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>
            {memories.date}
          </T>
        </View>
        */}
      </View>
    </Pressable>
  );
}
