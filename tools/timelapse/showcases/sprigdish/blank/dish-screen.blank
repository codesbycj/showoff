import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.18 a way to log it
// import { AddBar } from '@/features/sprigdish/components/add-bar';
// STEP 1.08 what is in it
// import { FactRow } from '@/features/sprigdish/components/fact-row';
// STEP 1.22 and the full table
// import { FactsList } from '@/features/sprigdish/components/facts-list';
// STEP 1.01 the plate
// import { Hero } from '@/features/sprigdish/components/hero';
// STEP 1.14 how much of it
// import { PortionFields } from '@/features/sprigdish/components/portion-fields';
import { T } from '@/features/sprigdish/components/text';
import { copy, qty as startQty } from '@/features/sprigdish/data/start';
import { SHEET_LIFT, SHEET_PAD } from '@/features/sprigdish/layout';
import { radius, sg, type } from '@/features/sprigdish/theme';
import { useInsets } from '@/features/sprigdish/use-insets';

/**
 * Sprig — one dish.
 *
 * Assembly only: the plate, its name, what is in it, how much of it, a way to
 * log it, and the full table.
 *
 * The sheet rides up over the hero's bottom edge, so the two overlap the way
 * they do in the reference rather than meeting on a seam. Everything below
 * the hero scrolls, and the table runs off the bottom edge rather than
 * stopping short of it.
 */
export default function SprigdishScreen() {
  const insets = useInsets();
  const [qty, setQty] = useState(startQty);

  return (
    <View style={{ flex: 1, backgroundColor: sg.canvas }}>
      <StatusBar style="dark" />

      {/*
        The lime reaches under the status bar from inside `Hero`, not from a
        wrapper here. A wrapper with its own fill is painted from step one of
        the reveal, so the first frame of the recording would open on a lime
        bar across the top with nothing in it.
      */}
{/* STEP 1.02 on lime
      <Hero top={insets.top} onBack={() => router.back()} />
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -SHEET_LIFT }}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        <View
          style={{
            borderTopLeftRadius: radius.sheet,
            borderTopRightRadius: radius.sheet,
            backgroundColor: sg.canvas,
            // MISTAKE 1.30 the sheet came in sitting below the plate
            marginTop: 22,
            paddingHorizontal: SHEET_PAD,
            paddingTop: SHEET_PAD,
          }}
        >
{/* STEP 1.07 what it is
          <T variant="title" color={sg.ink} style={{ height: type.title.line }}>
            {copy.name}
          </T>
*/}

{/* STEP 1.09 the four figures
          <FactRow />
*/}

{/* STEP 1.15 the portion
          <PortionFields qty={qty} onQty={setQty} />
*/}

{/* STEP 1.19 the button
          <AddBar onAdd={() => router.push('/sprighome')} />
*/}

{/* STEP 1.23 and the table
          <FactsList />
*/}
        </View>
      </ScrollView>
    </View>
  );
}
