import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import {
  AboutBlock,
  HostBlock,
  JoinedBlock,
  RewardBlock,
} from '@/features/volleyevent/components/event-body';
// STEP 1.01 the court
// import { EventHero } from '@/features/volleyevent/components/event-hero';
// STEP 1.20 and the way in
// import { JoinButton } from '@/features/volleyevent/components/join-button';
import { MARGIN, SHEET_LIFT, SHEET_PAD, SHEET_RADIUS } from '@/features/volleyevent/layout';
import { vl } from '@/features/volleyevent/theme';
import { useInsets } from '@/features/volleyevent/use-insets';

/**
 * Volley - one event.
 *
 * Assembly only: the court, how full it is, what the event is, what it pays,
 * and the way in.
 *
 * The sheet rides up over the hero's bottom edge and scrolls, so the rewards
 * run under the Join button rather than stopping short of it. The button sits
 * on the bottom inset.
 */
export default function VolleyeventScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: vl.canvas }}>
      <StatusBar style="light" />

{/* STEP 1.02 full bleed
      <EventHero top={insets.top} onClose={() => router.back()} />
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: -SHEET_LIFT }}
        contentContainerStyle={{
          borderTopLeftRadius: SHEET_RADIUS,
          borderTopRightRadius: SHEET_RADIUS,
          backgroundColor: vl.canvas,
          paddingHorizontal: SHEET_PAD,
          paddingTop: SHEET_PAD,
          paddingBottom: 16,
        }}
      >
{/* STEP 1.09 how full it is
        <JoinedBlock />
*/}

{/* STEP 1.13 what it is
        <AboutBlock />
*/}

        {/*
          The organiser sits above the rewards so that what the fold cuts is a
          row of tiles rather than a heading. A heading with nothing under it
          reads as a bug; a row of tiles half in view reads as "there is more",
          which is what it is.
        */}
{/* STEP 1.14 who runs it
        <HostBlock onPress={() => router.push('/volleyhome')} />
*/}

{/* STEP 1.15 and what it pays
        <RewardBlock />
*/}
      </ScrollView>

{/* STEP 1.21 along the foot
      <View style={{ paddingHorizontal: MARGIN, paddingBottom: insets.bottom, paddingTop: 10 }}>
        <JoinButton onPress={() => router.push('/volleyrank')} />
      </View>
*/}
    </View>
  );
}
