import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';

import { HeroStage } from '@/features/quizstart/components/hero-stage';
import { T } from '@/features/quizstart/components/text';
import { Trophy } from '@/features/quizstart/components/trophy';
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
            <T variant="wordmark" color={qz.ink}>
              {intro.wordmark}
            </T>
            <View style={{ marginLeft: 8, marginTop: 6 }}>
              <Trophy size={TROPHY} />
            </View>
          </View>
          <T variant="tagline" color={qz.muted}>
            {intro.tagline}
          </T>
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
          <HeroStage size={width * 0.88} />
        </View>

        <View style={{ marginTop: COPY_TOP, alignItems: 'center' }}>
          <T variant="headline" color={qz.ink}>
            {intro.headline}
          </T>
          <T variant="body" color={qz.muted} style={{ marginTop: BODY_TOP, textAlign: 'center' }}>
            {intro.body}
          </T>
        </View>

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
      </View>
    </View>
  );
}
