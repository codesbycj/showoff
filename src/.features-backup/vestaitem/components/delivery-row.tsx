import { View } from 'react-native';

import { delivery } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * When it arrives.
 *
 * **Mine, not the board's.** The board ends this screen on its button with a
 * band of empty canvas above it. I3's lever is the row the board cut, and
 * delivery is the row a product page genuinely has there — a label and a date,
 * not prose (R5).
 */
export function DeliveryRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        borderRadius: height / 2,
        backgroundColor: ct.field,
      }}
    >
      <Glyph name="bag" size={16} color={ct.ink} strokeWidth={1.7} />
      <T variant="deliveryLabel">{delivery.label}</T>
      <View style={{ flex: 1 }} />
      <T variant="sectionMore">{delivery.when}</T>
    </View>
  );
}
