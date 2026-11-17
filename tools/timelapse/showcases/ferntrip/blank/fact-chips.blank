import { View } from 'react-native';

import { facts } from '../data/trip';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * What the trip costs in days, distance and places.
 *
 * Three chips sized by their own content and centred, as the board sets them —
 * `flex: 1` would stretch "10 km" to the width of the date range beside it.
 */
export function FactChips({ margin, height, radius }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {facts.map((fact) => (
        <View
          key={fact.id}
          style={{
            height,
            paddingHorizontal: 14,
            borderRadius: radius,
            backgroundColor: ct.white,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <Glyph name={fact.glyph} size={16} color={ct.ink} strokeWidth={1.7} />
          <T variant="chip">{fact.label}</T>
        </View>
      ))}
    </View>
  );
}
