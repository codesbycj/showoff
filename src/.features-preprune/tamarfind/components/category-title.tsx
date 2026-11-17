import { Pressable, View } from 'react-native';

import { brand, categories, search } from '../data/find';
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
      <Glyph name="layers" size={15} color={ct.accent} />
      <T variant="sectionTitle">{categories.title}</T>
    </View>
  );
}
