import { Image, Pressable, View } from 'react-native';

import { leaderStats, pts, ranked, screen, tabs } from '../data/stats';
import { T } from './text';

import { BlockProps } from './_stats-parts-shared';

/** "Stats", above the headline. */
export function Kicker({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="kicker">{screen.kicker}</T>
    </View>
  );
}
