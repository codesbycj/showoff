import { View } from 'react-native';

import { copy, rows } from '../data/start';
import { ROW_HEIGHT, SECTION_TOP } from '../layout';
import { sg, type } from '../theme';
import { T } from './text';

/** One line of the table. */
function Row({ i, last }: { i: number; last?: boolean }) {
  const r = rows[i];
  return (
    <View
      style={{
        height: ROW_HEIGHT,
        // MISTAKE 1.31 the table came in with its rows squashed
        maxHeight: 26,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: sg.hairline,
      }}
    >
      <T variant="rowName" color={sg.muted} style={{ flex: 1, height: type.rowName.line }}>
        {r.name}
      </T>
      <T variant="rowValue" color={sg.ink} style={{ height: type.rowValue.line }}>
        {r.value}
      </T>
    </View>
  );
}

/**
 * The full table.
 *
 * Six rows rather than the reference's two, so the list has somewhere to go:
 * a table that stops after Calories and Protein is the thing that leaves a
 * band of empty canvas under it. The first four read off the same grams as
 * the row of figures above.
 */
export function FactsList() {
  return (
    <View style={{ marginTop: SECTION_TOP }}>
{/* STEP 1.24 the heading
      <T variant="section" color={sg.ink} style={{ height: type.section.line }}>
        {copy.facts}
      </T>
*/}

{/* STEP 1.25 calories
      <Row i={0} />
*/}
{/* STEP 1.26 carbohydrate
      <Row i={1} />
*/}
{/* STEP 1.27 protein
      <Row i={2} />
*/}
{/* STEP 1.28 fat
      <Row i={3} />
*/}
{/* STEP 1.29 fibre and sodium
      <Row i={4} />
      <Row i={5} last />
*/}
    </View>
  );
}
