import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  about,
  actions,
  gallery,
  hero,
  includes,
  overview,
  stay,
  total,
  unit,
  usd,
} from '../data/stay';
import { T } from './text';

import { BlockProps } from './_stay-parts-shared';

/** "Schedule Overview" — the board writes "Scehdule" (I1). */
export function OverviewTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{overview.title}</T>
    </View>
  );
}
