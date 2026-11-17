import { View } from 'react-native';

import { facts } from '../data/ring';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Size, price and metal, as the board sets them: three discs in a row.
 *
 * Each disc is sized by its own content rather than `flex: 1`, so "18K" does
 * not stretch to the width of "$2,450" beside it.
 */
export function FactDiscs({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {facts.map((fact) => (
        <View
          key={fact.id}
          style={{
            paddingHorizontal: 20,
            height: height - 14,
            borderRadius: (height - 14) / 2,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="factValue">{fact.value}</T>
          <T variant="factLabel">{fact.label}</T>
        </View>
      ))}
    </View>
  );
}
