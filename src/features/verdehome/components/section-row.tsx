import { Pressable, View } from 'react-native';

import { sections } from '../data/home';
import { T } from './text';

type Props = { margin: number; height: number; label: string };

/**
 * A section heading and its link.
 *
 * The link's own box is only its line height, so the tap target is made by hit
 * slop rather than by inflating the row (R7).
 */
export function SectionRow({ margin, height, label }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.12 t
      <T variant="section">{label}</T>
      */}

      {/* STEP 1.13 see all
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${sections.seeAll} ${label}`}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 10 }}
      >
        <T variant="seeAll">{sections.seeAll}</T>
      </Pressable>
      */}
    </View>
  );
}
