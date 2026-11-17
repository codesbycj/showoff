import { Pressable, View } from 'react-native';

import { header } from '../data/ticket';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onBack?: () => void };

/**
 * Back and the page title.
 *
 * The title is centred on the screen rather than on the space left beside the
 * button, so a 44dp spacer balances the row — §4.2: check what a group is
 * aligned to before centring it.
 */
export function TicketHeader({ margin, height, onBack }: Props) {
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
      {/* STEP 1.02 "Back"
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.03 title
      <T variant="title">{header.title}</T>
      */}

      <View style={{ width: 44 }} />
    </View>
  );
}
