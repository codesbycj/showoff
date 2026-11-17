import { View } from 'react-native';

import {
  categories,
  collection,
  collectionLine,
  greeting,
  playlist,
  popular,
  songs,
  tabs,
  tracks,
} from '../data/home';
import { T } from './text';

import { BlockProps } from './_home-parts-shared';

/** "Select Categories". */
export function CategoryLabel({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {/* STEP 1.15 title
      <T variant="sectionLabel">{categories.title}</T>
      */}
    </View>
  );
}
