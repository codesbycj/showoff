import { Pressable, View } from 'react-native';

import { section } from '../data/browse';
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
      {/* STEP 1.14 title
      <T variant="sectionTitle">{section.title}</T>
      */}
      {/* STEP 1.15 more
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
      */}
    </View>
  );
}
