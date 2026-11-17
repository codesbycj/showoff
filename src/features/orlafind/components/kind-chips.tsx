import { Pressable, ScrollView, View } from 'react-native';

import { kinds } from '../data/find';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The collection's cuts.
 *
 * **A horizontal scroller, not a wrap** (R2): the row runs past the screen
 * edge, and a wrap layout physically cannot reproduce that. `flexGrow: 0`
 * keeps it from eating the column's slack.
 *
 * The active chip carries the deep sage, which reads 7.8:1 under white - the
 * board's own sage lands at 2.9:1 and is unreadable (R4).
 */
export function KindChips({ margin, height }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
    >
      {kinds.map((kind) => (
        <Pressable key={kind.id} accessibilityRole="button" accessibilityLabel={kind.label}>
          <View
            style={{
              height,
              borderRadius: height / 2,
              paddingHorizontal: 18,
              justifyContent: 'center',
              backgroundColor: kind.on ? ct.sageDeep : 'transparent',
              borderWidth: kind.on ? 0 : 1,
              borderColor: ct.line,
            }}
          >
            <T variant={kind.on ? 'chipOn' : 'chip'}>{kind.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
