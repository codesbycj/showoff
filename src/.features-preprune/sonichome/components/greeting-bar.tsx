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
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { BarProps, Round } from './_home-parts-shared';

/** The greeting and the two corner controls. The board sets a sparkle emoji
 *  beside the name; drawn instead, because emoji differ across platforms and
 *  the web render cannot see that (§4.4). */
export function GreetingBar({ margin, height, control }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <T variant="hello">{greeting.hello}</T>
        <T variant="name">{greeting.name}</T>
        <Glyph name="sparkle" size={14} color={ct.lime} />
      </View>
      <Round glyph="bell" label="Notifications" size={control} />
      <Round glyph="mail" label="Messages" size={control} filled />
    </View>
  );
}
