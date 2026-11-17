import { Image, Pressable, View } from 'react-native';

import { banner, delivery, offers, place, reviews, usd } from '../data/menu';
import { T } from './text';

import { BlockProps } from './_menu-head-shared';

/** The restaurant's name, rating and distance. */
export function PlaceTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="place">{place.name}</T>
    </View>
  );
}
