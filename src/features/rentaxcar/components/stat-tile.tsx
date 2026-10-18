import { View } from 'react-native';

import type { StatName } from '../data/car';
import { TILE_HEIGHT } from '../layout';
import { radius, rx } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * One of the three numbers under the description.
 *
 * The value and its unit sit on a shared baseline rather than being one
 * string: the reference sets the unit small, and one string at one size would
 * read as a different number.
 */
export function StatTile({ name, value, unit }: { name: StatName; value: string; unit: string }) {
  return (
    <View
      style={{
        flex: 1,
        height: TILE_HEIGHT,
        borderRadius: radius.tile,
        backgroundColor: rx.raised,
        borderWidth: 1,
        borderColor: rx.raisedEdge,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
      }}
    >
      <Icon name={name} size={15} color={rx.onDarkMuted} />
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <T variant="statValue" color={rx.onDark}>
          {value}
        </T>
        <T variant="statUnit" color={rx.onDarkMuted}>
          {unit}
        </T>
      </View>
    </View>
  );
}
