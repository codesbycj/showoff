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
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { TINT, TileProps } from './_day-parts-shared';

/** The three things being followed. Labels and units (R5). */
export function FollowTiles({ margin, height, radius, gap }: TileProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {follows.map((f) => (
        <View
          key={f.id}
          style={{
            flex: 1,
            borderRadius: radius,
            backgroundColor: ct.white,
            padding: 12,
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: TINT[f.tint],
            }}
          >
            <Glyph name={f.glyph} size={16} color={ct.accentDeep} strokeWidth={1.8} />
          </View>
          <T variant="tileLabel">{f.label}</T>
          <T variant="tileValue">{f.value}</T>
        </View>
      ))}
    </View>
  );
}
