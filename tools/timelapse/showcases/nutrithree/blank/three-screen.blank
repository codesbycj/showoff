import { StatusBar } from 'expo-status-bar';
import { Pressable, useWindowDimensions, View } from 'react-native';

import { Masthead, StartBar, Steps } from '@/features/nutrithree/components/onboarding-chrome';
// STEP 1.06 the plan
// import { PlanStage } from '@/features/nutrithree/components/plan-stage';
// STEP 1.11 the two numbers behind it
// import { StepperRow } from '@/features/nutrithree/components/stepper-row';
import { T } from '@/features/nutrithree/components/text';
import { closing, intro } from '@/features/nutrithree/data/plan';
import {
  BAR_BOTTOM,
  DISPLAY_TOP,
  HEADER_TOP,
  MARGIN,
  STEPS_TOP,
} from '@/features/nutrithree/layout';
import { nl } from '@/features/nutrithree/theme';
import { useInsets } from '@/features/nutrithree/use-insets';

/**
 * Nutrilens — onboarding, the last of four.
 *
 * Assembly only: the brand, how far through this is, the plan, the two numbers
 * behind it, and the way in.
 *
 * The closing sheet is a white panel with rounded top corners that runs to the
 * bottom edge — so the sand page is what the top two thirds sit on and the
 * sheet is the end of the flow, which is what the reference shows.
 */
export default function NutriThree() {
  const insets = useInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: nl.canvas }}>
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN, paddingTop: insets.top + HEADER_TOP }}>
        {/* STEP 1.01 the brand
        <Masthead />
        */}
        <View style={{ marginTop: STEPS_TOP }}>
          {/* STEP 1.02 how far through this is
          <Steps />
          */}
        </View>

        <View style={{ marginTop: DISPLAY_TOP }}>
          {/* STEP 1.07 under the header
          <PlanStage width={width - MARGIN * 2} />
          */}
        </View>

        <View style={{ marginTop: 20 }}>
          {/* STEP 1.12 side by side
          <StepperRow />
          */}
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          backgroundColor: nl.sheet,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: MARGIN,
          paddingTop: 46,
          paddingBottom: insets.bottom + BAR_BOTTOM,
        }}
      >
        {/* STEP 1.14 what it all comes to
        <T variant="closing" color={nl.ink} style={{ textAlign: 'center' }}>
          {closing.line}
        </T>
        */}

        <View style={{ marginTop: 20 }}>
          {/* STEP 1.15 the one thing it asks
          <StartBar tone="dark" label={intro.cta} />
          */}
        </View>

        {/* STEP 1.16 and a line for people who are back
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <T variant="foot" color={nl.muted}>
            {closing.footLead}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={closing.footLink}>
            <T variant="footLink" color={nl.ink}>
              {closing.footLink}
            </T>
          </Pressable>
        </View>
        */}
      </View>
    </View>
  );
}
