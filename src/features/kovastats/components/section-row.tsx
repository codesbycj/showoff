import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; label: string; link: string };

/**
 * A section heading and its link.
 *
 * The link's own box is only its line height, so the tap target is made by hit
 * slop rather than by inflating the row (R7).
 */
export function SectionRow({ margin, height, label, link }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="section">{label}</T>

      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${link} ${label}`}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 10 }}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
      >
        <T variant="link">{link}</T>
        <View
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="chevron" size={11} color={ct.onDark} strokeWidth={2.4} />
        </View>
      </Pressable>
    </View>
  );
}
