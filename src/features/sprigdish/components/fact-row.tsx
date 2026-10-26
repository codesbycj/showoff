import { View } from 'react-native';

import { facts } from '../data/start';
import { FACTS_TOP } from '../layout';
import { sg, type } from '../theme';
import { T } from './text';

/** One of the four. Written out in `FactRow` so the reveal lands them singly. */
function Fact({ i }: { i: number }) {
  const f = facts[i];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <T variant="factValue" color={sg.ink} style={{ height: type.factValue.line }}>
          {f.value}
        </T>
        <T
          variant="factLabel"
          color={sg.ink}
          style={{ marginLeft: 2, marginBottom: 2, height: type.factLabel.line }}
        >
          {f.unit}
        </T>
      </View>
      <T variant="factLabel" color={sg.muted} style={{ height: type.factLabel.line }}>
        {f.label}
      </T>
    </View>
  );
}

/**
 * Calories, carbs, protein and fat.
 *
 * All four read from `facts`, which is computed from one set of grams — so
 * the calorie figure is the macros rather than a number beside them.
 */
export function FactRow() {
  return (
    <View style={{ flexDirection: 'row', marginTop: FACTS_TOP }}>
{/* STEP 1.10 the calories
      <Fact i={0} />
*/}
{/* STEP 1.11 the carbs
      <Fact i={1} />
*/}
{/* STEP 1.12 the protein
      <Fact i={2} />
*/}
{/* STEP 1.13 and the fat
      <Fact i={3} />
*/}
    </View>
  );
}
