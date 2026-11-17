import { View } from 'react-native';

import { order } from '../data/order';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = Record<string, never>;

/**
 * How long the order has left.
 *
 * The clock and the time are one component, not two blocks in the screen: a
 * 15dp line-art glyph is sixty pixels of ink, which the step probe reads as a
 * step that painted nothing (0.0164%). A mark arrives with the thing it marks
 * (I9).
 */
export function EtaChip(_: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Glyph name="clock" size={15} color={ct.ink} strokeWidth={1.7} />
      <T variant="eta">{order.eta}</T>
    </View>
  );
}
