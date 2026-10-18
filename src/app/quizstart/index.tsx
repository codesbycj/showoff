import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';

// STEP 1.07 the artwork
// import { HeroStage } from '@/features/quizstart/components/hero-stage';
import { T } from '@/features/quizstart/components/text';
// STEP 1.02 and what you are playing for
// import { Trophy } from '@/features/quizstart/components/trophy';
import { intro } from '@/features/quizstart/data/intro';
import {
  BODY_TOP,
  BUTTON_BOTTOM,
  BUTTON_HEIGHT,
  BUTTON_TOP,
  COPY_TOP,
  MARGIN,
  MARK_TOP,
  STAGE_TOP,
  TROPHY,
} from '@/features/quizstart/layout';
import { qz, radius } from '@/features/quizstart/theme';
import { useInsets } from '@/features/quizstart/use-insets';

/**
 * Quiz — the intro.
 *
 * Assembly only: the wordmark, the artwork, what the app is, and the one thing
 * it asks.
 *
 * The artwork takes whatever height the copy leaves and is sized off the
 * window, so the screen fills on a tall phone and the picture gives first on a
 * short one rather than pushing the button off the page.
 */
export default function QuizStart() {
  const insets = useInsets();
  const { width } = useWindowDimensions();
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: qz.canvas }}>
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + MARK_TOP,
          paddingBottom: insets.bottom + BUTTON_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* STEP 1.01 the name of the thing
            <T variant="wordmark" color={qz.ink}>
              {intro.wordmark}
            </T>
            */}
            {/* STEP 1.03 beside it
            <View style={{ marginLeft: 8, marginTop: 6 }}>
              <Trophy size={TROPHY} />
            </View>
            */}
          </View>
          {/* STEP 1.06 what it is
          <T variant="tagline" color={qz.muted}>
            {intro.tagline}
          </T>
          */}
        </View>

        <View
          style={{
            flex: 1,
            marginTop: STAGE_TOP,
            borderRadius: radius.stage,
            backgroundColor: qz.stage,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* STEP 1.08 on its card
          <HeroStage size={width * 0.88} />
          */}
        </View>

        <View style={{ marginTop: COPY_TOP, alignItems: 'center' }}>
          {/* STEP 1.12 the pitch
          <T variant="headline" color={qz.ink}>
            {intro.headline}
          </T>
          */}
          {/* STEP 1.13 and the detail under it
          <T variant="body" color={qz.muted} style={{ marginTop: BODY_TOP, textAlign: 'center' }}>
            {intro.body}
          </T>
          */}
        </View>

        {/* STEP 1.14 the one thing it asks
        <Pressable
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={intro.cta}
          style={{ marginTop: BUTTON_TOP }}
        >
          <View
            style={{
              height: BUTTON_HEIGHT,
              borderRadius: radius.button,
              backgroundColor: qz.action,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="button" color={qz.onAction}>
              {intro.cta}
            </T>
          </View>
        </Pressable>
        */}
      </View>
    </View>
  );
}
