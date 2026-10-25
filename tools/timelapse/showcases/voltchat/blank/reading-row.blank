import { View } from 'react-native';

import { ROW_HEIGHT } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One figure the assistant has to hand.
 *
 * The change chip takes its sign *and* its fill from `up`, so a figure that
 * fell can never be printed in the colour of one that rose. The reference does
 * exactly that — an acid chip on a number that went down — because its chips
 * were placed for balance rather than read.
 */
export function ReadingRow({
  label,
  value,
  change,
  up,
  mark,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  mark: 'box' | 'folder' | 'target';
}) {
  return (
    <View
      style={{
        height: ROW_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: vt.slab,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 10,
      }}
    >
      <View style={{ flex: 1 }}>
{/* STEP 1.10 what it is
        <T variant="rowTitle" color={vt.ink} style={{ height: type.rowTitle.line }}>
          {label}
        </T>
*/}
{/* STEP 1.11 the figure and the move
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <T variant="figure" color={vt.body} style={{ height: type.figure.line }}>
            {value}
          </T>
          <View
            style={{
              marginLeft: 7,
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: radius.control,
              backgroundColor: up ? vt.acid : vt.down,
            }}
          >
            <T variant="caption" color={vt.onCard} style={{ height: type.caption.line }}>
              {`${up ? '+' : '-'}${change}`}
            </T>
          </View>
        </View>
*/}
      </View>

{/* STEP 1.12 and its mark
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: radius.control,
          backgroundColor: vt.canvas === '#FFFFFF' ? '#262627' : vt.slab,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name={mark} size={18} tint={vt.body} />
      </View>
*/}
    </View>
  );
}
