import { Pressable, View } from 'react-native';

import { section } from '../data/shop';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; margin: number };

/** "Special For You" and the way to the rest of it. */
export function SectionHead({ height, margin }: Props) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sectionTitle">{section.title}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${section.more}, ${section.title}`}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore" style={{ color: ct.sub }}>
              {section.more}
            </T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
