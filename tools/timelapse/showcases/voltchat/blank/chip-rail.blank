import { ScrollView, View } from 'react-native';

import { chips } from '../data/data';
import { CHIP_HEIGHT, SHEET_PAD } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What it offers to do next.
 *
 * A rail rather than a wrap: the reference shows a chip clipped by each edge,
 * and only a scroller can do that — a wrap would tuck the overflow onto a
 * second line and lose the "there is more this way" the clipping is for.
 */
export function ChipRail() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SHEET_PAD }}
      contentContainerStyle={{ paddingHorizontal: SHEET_PAD }}
    >
{/* STEP 1.16 chip by chip
      {chips.map((c, i) => (
        <View
          key={c.id}
          style={{
            height: CHIP_HEIGHT,
            marginLeft: i === 0 ? 0 : 8,
            paddingLeft: 12,
            paddingRight: 8,
            borderRadius: radius.control,
            backgroundColor: c.on ? vt.acid : '#1F1F20',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <T variant="chip" color={c.on ? vt.onCard : vt.body} style={{ height: type.chip.line }}>
            {c.label}
          </T>
          <View style={{ marginLeft: 6 }}>
            <Glyph name="close" size={13} tint={c.on ? vt.onCard : vt.muted} />
          </View>
        </View>
      ))}
*/}
    </ScrollView>
  );
}
