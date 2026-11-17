import { Pressable, View } from 'react-native';

import { header } from '../data/timeline';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onBack: () => void };

/**
 * The way back, and the board's grid control with its count.
 *
 * The count sits beside the grid rather than on its shoulder: a mark that
 * straddles the edge of what it covers is what `audit.js` reports as COVERED,
 * and the fix is to inset the content, never to nudge the control one dp (R3).
 */
export function TopBar({ margin, height, onBack }: Props) {
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
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="back" size={18} color={ct.ink} strokeWidth={1.9} />
        </View>
      </Pressable>

      <Pressable accessibilityRole="button" accessibilityLabel={`Boards, ${header.badge}`}>
        <View
          style={{
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.white,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 14,
          }}
        >
          <Glyph name="grid" size={18} color={ct.ink} strokeWidth={1.7} />
          {/* STEP 1.02 badge
          <View
            style={{
              minWidth: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: ct.lavenderTile,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="count">{header.badge}</T>
          </View>
          */}
        </View>
      </Pressable>
    </View>
  );
}
