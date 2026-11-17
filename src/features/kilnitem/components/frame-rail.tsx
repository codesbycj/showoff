import { Image, Pressable, ScrollView, View } from 'react-native';

import { frames } from '../data/item';
import { ct } from '../theme';

type Props = { margin: number; height: number; width: number };

/**
 * The other frames of the piece.
 *
 * A horizontal scroller, not a wrap, so the rail crops at the edge the way the
 * board's does (R2); `flexGrow: 0` keeps it from eating the column's slack.
 */
export function FrameRail({ margin, height, width }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
    >
      {frames.map((frame) => (
        <Pressable key={frame.id} accessibilityRole="button" accessibilityLabel={frame.label}>
          <Image
            source={frame.image}
            style={{
              width,
              height: height - 16,
              borderRadius: 8,
              borderWidth: frame.on ? 2 : 0,
              borderColor: ct.ink,
            }}
            resizeMode="cover"
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}
