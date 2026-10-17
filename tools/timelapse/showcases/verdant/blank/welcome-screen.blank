import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 the lit page everything sits on
// import { Backdrop } from '@/features/verdant/components/backdrop';
// STEP 1.12 what the screen is for
// import { Headline } from '@/features/verdant/components/headline';
// STEP 1.18 and the sentence under it
// import { Lede } from '@/features/verdant/components/lede';
// STEP 1.38 the one thing it asks
// import { PrimaryButton } from '@/features/verdant/components/primary-button';
// STEP 1.20 the hero
// import { Stage } from '@/features/verdant/components/stage';
// STEP 1.06 how far through you are
// import { StepRail } from '@/features/verdant/components/step-rail';
import { onboarding } from '@/features/verdant/data/onboarding';
import {
  BUTTON_BOTTOM,
  HEADLINE_TOP,
  LEDE_TOP,
  MARGIN,
  RAIL_TOP,
  STAGE_BOTTOM,
} from '@/features/verdant/layout';
import { vd } from '@/features/verdant/theme';
import { useInsets } from '@/features/verdant/use-insets';

/**
 * Verdant — onboarding, screen 1 of 3.
 *
 * Assembly only: a lit backdrop, the progress rail, the copy, the stage the
 * wallet stands on, and the button that moves on.
 *
 * The column between the rail and the button is a plain flex stack, and the
 * stage takes whatever height the copy leaves — which is why this screen holds
 * together on a 360dp phone and on a 430dp one. Nothing is positioned off the
 * top of the screen.
 *
 * The stage is the one block that escapes the page margin: its pool of light
 * is wider than the disc, and on a narrow phone it would otherwise be clipped
 * — and relying on overflow is exactly what Android does not forgive.
 *
 * Both handlers are deliberately empty. Screens 2 and 3 of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the destination is decided *here* and the
 * components only report that they were pressed.
 */
export default function VerdantWelcome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: vd.canvasMid }}>
      <StatusBar style="light" />
      {/* STEP 1.02 put it down
      <Backdrop />
      */}

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + RAIL_TOP,
          paddingBottom: insets.bottom + BUTTON_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.07 across the top
        <StepRail step={onboarding.step} total={onboarding.total} onSkip={() => {}} />
        */}

        {/* STEP 1.13 stand it off the rail
        <View style={{ marginTop: HEADLINE_TOP }}>
          <Headline top={onboarding.headline.top} bottom={onboarding.headline.bottom} />
        </View>
        */}

        {/* STEP 1.19 under the headline
        <View style={{ marginTop: LEDE_TOP }}>
          <Lede>{onboarding.lede}</Lede>
        </View>
        */}

        {/*
          The stage sits at the *bottom* of what is left, not centred in it.
          Centring leaves the art marooned between the copy and the button on a
          tall phone; standing it on the button's shoulder is what the
          reference does and what makes the screen read as one composition.
        */}
        {/* STEP 1.21 standing on the button
        <View
          style={{
            flex: 1,
            marginHorizontal: -MARGIN,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: STAGE_BOTTOM,
          }}
        >
          <Stage />
        </View>
        */}

        {/* STEP 1.39 at the foot of the page
        <PrimaryButton label={onboarding.cta} onPress={() => {}} />
        */}
      </View>
    </View>
  );
}
