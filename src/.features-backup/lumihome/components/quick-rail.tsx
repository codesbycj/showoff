import { Pressable, ScrollView, View } from 'react-native';

import { quick } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type TitleProps = { margin: number; height: number };

/** "Quick Actions". */
export function QuickTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{quick.title}</T>
    </View>
  );
}

type Props = { margin: number; height: number; width: number; radius: number; disc: number };

/**
 * The quick-action tiles.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third tile cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The rail is pinned to its own height so it cannot absorb the screen's slack —
 * a `ScrollView` carries `flexGrow: 1` and will happily eat every spare dp.
 */
export function QuickRail({ margin, height, width, radius, disc }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {quick.items.map((q) => (
          <Pressable key={q.id} accessibilityRole="button" accessibilityLabel={q.label}>
            {({ pressed }) => (
              <View
                style={{
                  width,
                  height,
                  borderRadius: radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderWidth: 1,
                  borderColor: ct.tileEdge,
                  backgroundColor: ct.tile,
                  opacity: pressed ? 0.75 : 1,
                }}
              >
                <View
                  style={{
                    width: disc,
                    height: disc,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: ct.white,
                  }}
                >
                  <Glyph name={q.glyph} size={19} color={ct.deep} />
                </View>
                <T variant="tileLabel" numberOfLines={1}>
                  {q.label}
                </T>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
