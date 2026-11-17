import { View } from 'react-native';

import { tags } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * What the drink is.
 *
 * The board sets these with **emoji**, which differ across Windows, Android
 * and iOS and are missing outright on some of them (I8). They are drawn here.
 *
 * These are labels, not controls, so they carry no role and no tap target.
 */
export function TagRow({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 8 }}>
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={{
            height,
            borderRadius: radius,
            paddingHorizontal: 13,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            borderWidth: 1,
            borderColor: ct.line,
            backgroundColor: ct.white,
          }}
        >
          <Glyph name={tag.icon} size={14} color={ct.ink} strokeWidth={1.6} />
          <T variant="tag">{tag.label}</T>
        </View>
      ))}
    </View>
  );
}
