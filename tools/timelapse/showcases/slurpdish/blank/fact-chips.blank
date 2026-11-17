import { View } from 'react-native';

import { facts } from '../data/dish';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number };

/**
 * Who cooks it, how long it takes and what it scores.
 *
 * The board's first chip names a real fast-food chain; the kitchen here is
 * invented, like every other brand on these screens (I1). These are labels,
 * not controls, so they carry no role and no tap target.
 */
export function FactChips({ height }: Props) {
  return (
    <View style={{ height, flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
      {facts.map((fact) => (
        <View
          key={fact.id}
          style={{
            height,
            borderRadius: height / 2,
            paddingHorizontal: 11,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: ct.card,
          }}
        >
          <Glyph
            name={fact.icon}
            size={13}
            color={fact.icon === 'star' ? ct.accent : ct.ink}
            strokeWidth={1.6}
          />
          <T variant="chip">{fact.label}</T>
        </View>
      ))}
    </View>
  );
}
