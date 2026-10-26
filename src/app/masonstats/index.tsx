import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.12 how far through
// import { CompletionCard } from '@/features/masonstats/components/completion-card';
// STEP 1.30 and where else it goes
// import { Dock } from '@/features/masonstats/components/dock';
// STEP 1.18 what it will do
// import { ForecastCard } from '@/features/masonstats/components/forecast-card';
// STEP 1.07 which view
// import { Segmented } from '@/features/masonstats/components/segmented';
// STEP 1.01 the way back
// import { TopBar } from '@/features/masonstats/components/top-bar';
import { MARGIN } from '@/features/masonstats/layout';
import { ms } from '@/features/masonstats/theme';
import { useInsets } from '@/features/masonstats/use-insets';

/**
 * Mason — the statistics.
 *
 * Assembly only: the way back, which view of the project, how far through it
 * is, what it is forecast to do, and where else the app goes.
 *
 * The three controls hold real state here rather than in the components, so
 * adding a destination is a line in this file. The forecast card takes the
 * remaining height so the plot grows into whatever the phone can spare and
 * the last thing on the screen is the dock on the bottom inset — checked with
 * `tools/preview/foot.py`, not by eye.
 */
export default function MasonstatsScreen() {
  const insets = useInsets();
  const [tab, setTab] = useState('progress');
  const [chip, setChip] = useState('daily');
  const [mode, setMode] = useState('actual');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ms.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 and what this is
      <TopBar onBack={() => router.back()} onHome={() => router.push('/masonhome')} />
*/}

{/* STEP 1.08 progress, or the dates
      <Segmented tab={tab} onTab={setTab} chip={chip} onChip={setChip} />
*/}

{/* STEP 1.13 the headline
      <CompletionCard />
*/}

{/* STEP 1.19 and the forecast
      <ForecastCard mode={mode} onMode={setMode} />
*/}

{/* STEP 1.31 floating
      <View style={{ marginTop: 14 }}>
        <Dock active="docs" onSelect={(id) => id === 'home' && router.push('/masonhome')} />
      </View>
*/}
    </View>
  );
}
