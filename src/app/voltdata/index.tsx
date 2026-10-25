import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.09 the dock at the foot
// import { Dock } from '@/features/voltdata/components/dock';
// STEP 1.07 what they add up to
// import { ResultCard } from '@/features/voltdata/components/result-card';
// STEP 1.05 where they come from
// import { SourceRow } from '@/features/voltdata/components/source-row';
import { T } from '@/features/voltdata/components/text';
// STEP 1.01 the assistant and who is here
// import { TopBar } from '@/features/voltdata/components/top-bar';
import { copy, results } from '@/features/voltdata/data/data';
import {
  CARD_GAP,
  CARDS_TOP,
  DOCK_TOP,
  HEADER_TOP,
  MARGIN,
  SECTION_TOP,
  SOURCES_TOP,
} from '@/features/voltdata/layout';
import { vt, type } from '@/features/voltdata/theme';
import { useInsets } from '@/features/voltdata/use-insets';

/**
 * Volt — connect data.
 *
 * Assembly only: the assistant and who is signed in, where the numbers come
 * from, what they add up to, and the dock at the foot.
 *
 * The result cards are taller than the reference's. Built at its proportions
 * the stack ends about 120dp above the dock and leaves a band of black;
 * opening the rhythm out is the fix rather than padding the gap.
 */
export default function VoltdataScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: vt.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

{/* STEP 1.02 in place
      <TopBar />
*/}

{/* STEP 1.03 what the block is
      <T
        variant="section"
        color={vt.ink}
        style={{ marginTop: SECTION_TOP, height: type.section.line }}
      >
        {copy.connect}
      </T>
*/}

{/* STEP 1.06 three of them, and one more
      <View style={{ marginTop: SOURCES_TOP }}>
        <SourceRow />
      </View>
*/}

      <T
        variant="section"
        color={vt.ink}
        style={{ marginTop: SECTION_TOP, height: type.section.line }}
      >
        {copy.roi}
      </T>

{/* STEP 1.08 three lines of the sum
      <View style={{ marginTop: CARDS_TOP }}>
        {results.map((r, i) => (
          <View
            key={r.id}
            style={{
              marginTop: i === 0 ? 0 : CARD_GAP,
              // MISTAKE 1.10 the cards came in crushed together
              marginBottom: -34,
            }}
          >
            <ResultCard figure={r.figure} caption={r.caption} tone={r.tone} mark={r.mark} />
          </View>
        ))}
      </View>
*/}

{/* STEP 1.11 across the foot
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: DOCK_TOP }}>
        <Dock />
      </View>
*/}
    </View>
  );
}
