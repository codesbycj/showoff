import { View } from 'react-native';

import { rail } from '../data/flow';
import { RAIL_BUTTON, RAIL_GAP } from '../layout';
import { radius, sc, shadow } from '../theme';
import { Icon } from './icon';

/**
 * The column of tools floating down the right-hand side.
 *
 * It is a layer over the flow rather than a column beside it: in the reference
 * it overlaps the cards, and giving it its own column would squeeze every node
 * by 50dp to make room for something that is only ever tapped.
 *
 * Presentational — each button is a round chip; the screen decides what any of
 * them does.
 */
export function ToolRail() {
  return (
    <View style={{ gap: RAIL_GAP }} pointerEvents="box-none">
      {rail.map((key) => (
        <View
          key={key}
          style={{
            width: RAIL_BUTTON,
            height: RAIL_BUTTON,
            borderRadius: radius.full,
            backgroundColor: sc.surface,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadow.rail,
          }}
        >
          <Icon name={key} size={17} color={sc.ink} />
        </View>
      ))}
    </View>
  );
}
