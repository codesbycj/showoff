import { Image, Pressable, ScrollView, View } from 'react-native';

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

export function CollectionHead({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{collection.title}</T>
    </View>
  );
}
