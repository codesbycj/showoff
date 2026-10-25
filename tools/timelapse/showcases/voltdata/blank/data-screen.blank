import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 and where else it goes
// import { Dock } from '@/features/voltdata/components/dock';
// STEP 1.12 what it found
// import { ResultCard } from '@/features/voltdata/components/result-card';
// STEP 1.07 what it reads from
// import { SourceRow } from '@/features/voltdata/components/source-row';
import { T } from '@/features/voltdata/components/text';
// STEP 1.01 the controls
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

{/* STEP 1.02 along the top
      <TopBar />
*/}

{/* STEP 1.06 what to connect
      <T
        variant="section"
        color={vt.ink}
        style={{ marginTop: SECTION_TOP, height: type.section.line }}
      >
        {copy.connect}
      </T>
*/}

{/* STEP 1.08 the sources
      <View style={{ marginTop: SOURCES_TOP }}>
        <SourceRow />
      </View>
*/}

{/* STEP 1.11 what it is worth
      <T
        variant="section"
        color={vt.ink}
        style={{ marginTop: SECTION_TOP, height: type.section.line }}
      >
        {copy.roi}
      </T>
*/}

{/* STEP 1.13 card by card
      <View
        style={{
          marginTop: CARDS_TOP,
          // MISTAKE 1.14 the cards came in half-faded
          opacity: 0.4,
        }}
      >
        {results.map((r, i) => (
          <View key={r.id} style={{ marginTop: i === 0 ? 0 : CARD_GAP }}>
            <ResultCard figure={r.figure} caption={r.caption} tone={r.tone} mark={r.mark} />
          </View>
        ))}
      </View>
*/}

{/* STEP 1.19 the dock
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: DOCK_TOP }}>
        <Dock />
      </View>
*/}
    </View>
  );
}
