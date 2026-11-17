import { View } from 'react-native';

import { facts } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; gap: number };

/**
 * The specification.
 *
 * **This replaces the board's paragraph** (R5). Its detail page runs three
 * lines of marketing copy and ends them in "Read more"; a spec is a list of
 * facts, and each of these is a unit or a state rather than a sentence.
 */
export function FactRows({ margin, height, gap }: Props) {
  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {facts.map((fact) => (
        <View key={fact.id} style={{ height, flexDirection: 'row', alignItems: 'center', gap: 11 }}>
          <Glyph name={fact.glyph} size={19} color={ct.ink} strokeWidth={1.7} />
          <T variant="fact">{fact.label}</T>
        </View>
      ))}
    </View>
  );
}
