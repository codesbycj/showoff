import { Image, Pressable, View } from 'react-native';

import { leaderStats, pts, ranked, screen, tabs } from '../data/stats';
import { T } from './text';

import { BlockProps } from './_stats-parts-shared';

/** The headline. Two lines, serif, centred — the dominant element (R8). The
 *  board's own line ends in an exclamation mark it does not need (R5). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {screen.headline.map((line) => (
        <T key={line} variant="display" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}
