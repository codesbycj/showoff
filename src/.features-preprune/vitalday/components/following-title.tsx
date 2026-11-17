import { Image, Pressable, View } from 'react-native';
import {
  average,
  avatar,
  followingTitle,
  follows,
  headline,
  months,
  pct,
  peak,
  rings,
  today,
} from '../data/day';
import { T } from './text';

import { BlockProps } from './_day-parts-shared';

/** "Following". */
export function FollowingTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{followingTitle}</T>
    </View>
  );
}
