import { Pressable, View } from 'react-native';

import { copy } from '../data/signin';
import { tb, type } from '../theme';
import { T } from './text';

/**
 * The line for people who have been here before.
 *
 * The link is its own `Pressable` with padding rather than a bold run inside
 * the sentence: a text link is only as tall as its own line box — 16dp here —
 * which is nowhere near a thumb. The padding gives it a 44dp target without
 * moving the baseline, because the row is centred on the text's line box and
 * the padding grows symmetrically around it.
 */
export function FootNote({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <T variant="foot" color={tb.muted} style={{ height: type.foot.line }}>
        {copy.foot}
      </T>
      <Pressable
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={copy.footLink}
        style={{ paddingVertical: 14, paddingHorizontal: 6 }}
      >
        <T variant="footLink" color={tb.ink} style={{ height: type.footLink.line }}>
          {copy.footLink}
        </T>
      </Pressable>
    </View>
  );
}
