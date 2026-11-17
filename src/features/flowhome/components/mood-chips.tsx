import { Pressable, ScrollView, View } from 'react-native';

import { moods } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * How the day feels.
 *
 * Each chip carries a dot in its own colour *and* a border weight, so the
 * chosen one survives a greyscale render rather than relying on colour alone.
 * A horizontal scroller, not a wrap: the board crops its last chip at the
 * frame (R2).
 */
export function MoodChips({ margin, height, radius }: Props) {
  const tone = { rose: ct.rose, lilac: ct.lilac, amber: ct.amber, mint: ct.mint } as const;

  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 8 }}
      >
        {moods.map((entry) => (
          <Pressable
            key={entry.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!entry.on }}
            accessibilityLabel={entry.label}
          >
            <View
              style={{
                height,
                paddingHorizontal: 14,
                borderRadius: radius,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: entry.on ? ct.surface : 'transparent',
                borderWidth: entry.on ? 1.8 : 1.2,
                borderColor: entry.on ? ct.ink : ct.line,
              }}
            >
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  backgroundColor: tone[entry.colour],
                }}
              />
              <T variant="mood">{entry.label}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
