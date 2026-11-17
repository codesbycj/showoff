import { View } from 'react-native';

import { categories } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { TitleProps } from './_find-header-shared';

/** "Category". */
export function CategoryTitle({ height, margin }: TitleProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {/* STEP 1.10 glyph
      <Glyph name="layers" size={15} color={ct.accent} />
      */}
      {/* STEP 1.11 title
      <T variant="sectionTitle">{categories.title}</T>
      */}
    </View>
  );
}
