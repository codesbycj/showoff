import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { BlockProps } from './_home-parts-shared';

/** The greeting. The board sets an emoji here; drawn instead (§4.4). */
export function Greeting({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <T variant="greeting">{greeting.hello}</T>
      <Glyph name="wave" size={22} color={ct.star} strokeWidth={1.9} />
    </View>
  );
}
