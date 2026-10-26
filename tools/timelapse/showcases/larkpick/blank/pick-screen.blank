import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.19 and the way on
// import { ContinueButton } from '@/features/larkpick/components/continue-button';
// STEP 1.05 what it asks
// import { Headline } from '@/features/larkpick/components/headline';
// STEP 1.09 the languages
// import { LanguageRow } from '@/features/larkpick/components/language-row';
// STEP 1.01 the way back
// import { TopBar } from '@/features/larkpick/components/top-bar';
import { initial, languages } from '@/features/larkpick/data/start';
import { LIST_TOP, MARGIN, ROW_GAP } from '@/features/larkpick/layout';
import { lk } from '@/features/larkpick/theme';
import { useInsets } from '@/features/larkpick/use-insets';

/**
 * Lark — choosing a language.
 *
 * Assembly only: the way back, what the screen is asking, the languages, and
 * the way on.
 *
 * The rows are written out rather than mapped so the reveal can land them one
 * at a time; the selection is real state, so the list answers a tap instead of
 * showing a hard-coded highlight.
 *
 * Each row takes an equal share of what the headline and the button leave, so
 * the list reaches the button at any screen height rather than stacking at a
 * fixed pitch and leaving a band of canvas.
 */
export default function LarkpickScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState(initial);

  const row = (i: number) => ({
    label: languages[i].label,
    flag: languages[i].flag,
    selected: picked === languages[i].id,
    onPress: () => setPicked(languages[i].id),
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lk.canvas,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

{/* STEP 1.02 at the top
      <TopBar onBack={() => router.back()} />
*/}

{/* STEP 1.06 in two lines
      <Headline />
*/}

      <View style={{ flex: 1, marginTop: LIST_TOP, gap: ROW_GAP }}>
{/* STEP 1.10 the first one
        <LanguageRow {...row(0)} />
*/}
{/* STEP 1.13 the one it opens on
        <LanguageRow {...row(1)} />
*/}
{/* STEP 1.14 another
        <LanguageRow {...row(2)} />
*/}
{/* STEP 1.15 another
        <LanguageRow {...row(3)} />
*/}
{/* STEP 1.16 another
        <LanguageRow {...row(4)} />
*/}
{/* STEP 1.17 another
        <LanguageRow {...row(5)} />
*/}
{/* STEP 1.18 and the last
        <LanguageRow {...row(6)} />
*/}
      </View>

{/* STEP 1.20 full width
      <ContinueButton onPress={() => router.push('/larkhome')} />
*/}
    </View>
  );
}
