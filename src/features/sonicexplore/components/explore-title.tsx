import { View } from 'react-native';

import { explore } from '../data/explore';
import { T } from './text';

import { TitleProps } from './_explore-parts-shared';

/** FIX: the board names a real service in this heading. */
export function ExploreTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{explore.title}</T>
    </View>
  );
}
