import { View } from 'react-native';

import { facts } from '../data/item';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; gap: number; radius: number };

/**
 * The nutrition panel.
 *
 * Four outlined tiles, each a label over its own value. The row's width comes
 * from the window (I2), so the tiles stay even at any phone width rather than
 * carrying an offset measured off one device.
 */
export function FactTiles({ margin, width, height, gap, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {facts.map((fact) => (
        <View
          key={fact.id}
          style={{
            width,
            height,
            borderRadius: radius,
            borderWidth: 1,
            borderColor: ct.line,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <T variant="factLabel">{fact.label}</T>
          <T variant="factValue">{fact.value}</T>
        </View>
      ))}
    </View>
  );
}
