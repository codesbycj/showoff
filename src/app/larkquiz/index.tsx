import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.15 the four answers
// import { AnswerGrid } from '@/features/larkquiz/components/answer-grid';
// STEP 1.09 the dialog
// import { DialogCard } from '@/features/larkquiz/components/dialog-card';
// STEP 1.05 what it asks
// import { Headline } from '@/features/larkquiz/components/headline';
// STEP 1.21 and the way on
// import { NextButton } from '@/features/larkquiz/components/next-button';
// STEP 1.01 the way back
// import { TopBar } from '@/features/larkquiz/components/top-bar';
import { CARD_TOP, MARGIN } from '@/features/larkquiz/layout';
import { lk } from '@/features/larkquiz/theme';
import { useInsets } from '@/features/larkquiz/use-insets';

/**
 * Lark — the exercise.
 *
 * Assembly only: the way back and the lives left, what the exercise asks, the
 * dialog, the four answers, and the way on.
 *
 * The chosen answer is state held here rather than baked into the data, so
 * the screen answers a tap and the Next button lights when there is something
 * to go on with.
 */
export default function LarkquizScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState<string | null>(null);

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

{/* STEP 1.02 and the lives left
      <TopBar onBack={() => router.back()} />
*/}

{/* STEP 1.06 in two lines
      <Headline />
*/}

{/* STEP 1.10 on its pink card
      <View style={{ flex: 1, marginTop: CARD_TOP }}>
        <DialogCard />
      </View>
*/}

{/* STEP 1.16 two by two
      <AnswerGrid picked={picked} onPick={setPicked} />
*/}

{/* STEP 1.22 waiting for an answer
      <NextButton ready={picked !== null} onPress={() => router.push('/larkhome')} />
*/}
    </View>
  );
}
