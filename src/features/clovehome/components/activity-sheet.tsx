import { Pressable, View } from 'react-native';

import { GAP_HEAD_ROWS, MARGIN, SHEET_PAD } from '../layout';
import { ct, radius, type } from '../theme';
import { activity, copy } from '../data/home';
import { ActivityRow } from './activity-row';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The ledger, in a sheet that runs from the buttons to the dock.
 *
 * The sheet's height comes from the screen and the row height comes from the
 * sheet, so the list ends where the sheet ends. The alternative — a fixed row
 * height and whatever is left over — is the hole that put a quarter of a
 * screen of white into the batch this bar replaced.
 */
export function ActivitySheet({ height, rowH }: { height: number; rowH: number }) {
  return (
    <View
      style={{
        height,
        backgroundColor: ct.sheet,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        paddingHorizontal: MARGIN,
        paddingTop: SHEET_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
          {copy.activity}
        </T>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.seeDetails}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 13,
            paddingLeft: 10,
          }}
        >
          <T variant="link" color={ct.muted} style={{ height: type.link.line }}>
            {copy.seeDetails}
          </T>
          <View style={{ marginLeft: 4 }}>
            <Glyph name="chevron" size={15} tint={ct.muted} strokeWidth={2} />
          </View>
        </Pressable>
      </View>

      <View style={{ marginTop: GAP_HEAD_ROWS }}>
        {activity.map((item) => (
          <ActivityRow key={item.id} item={item} height={rowH} />
        ))}
      </View>
    </View>
  );
}
