import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, useWindowDimensions, View } from 'react-native';

import { Actions } from '@/features/orbitstart/components/actions';
import { HoloStage } from '@/features/orbitstart/components/holo';
import { T } from '@/features/orbitstart/components/text';
import { copy } from '@/features/orbitstart/data/start';
import {
  BUTTON_HEIGHT,
  BUTTONS_TOP,
  DISPLAY_TOP,
  FOOT_BOTTOM,
  FOOT_TOP,
  MARGIN,
  STAGE_MIN,
  STAGE_TOP,
} from '@/features/orbitstart/layout';
import { ob, type } from '@/features/orbitstart/theme';
import { useInsets } from '@/features/orbitstart/use-insets';

/**
 * Orbit — onboarding.
 *
 * Assembly only: the holographic stage with the card on it, what the app is
 * for, the ways in, and the way back to an account you already have.
 *
 * The stage takes a measured height rather than `flex: 1` so the ring can be
 * drawn in real dp, and the block under it takes the rest with
 * `justifyContent: 'flex-end'` — which puts the foot on the bottom inset at
 * any screen height instead of leaving a band of canvas below it.
 */
export default function OrbitstartScreen() {
  const insets = useInsets();
  const { width, height } = useWindowDimensions();

  // The block under the stage is measured, not guessed, so the stage can take
  // exactly the rest of the screen. Giving the stage a share of the height
  // instead leaves a band of dead canvas between the card and the headline.
  const block =
    copy.display.length * type.display.line +
    DISPLAY_TOP +
    BUTTONS_TOP +
    BUTTON_HEIGHT +
    FOOT_TOP +
    type.footLink.line +
    FOOT_BOTTOM;
  const stage = Math.max(STAGE_MIN, height - insets.top - STAGE_TOP - insets.bottom - block);

  return (
    <View style={{ flex: 1, backgroundColor: ob.canvas }}>
      <StatusBar style="light" />

      <View style={{ marginTop: insets.top + STAGE_TOP }}>
        <HoloStage w={width} h={stage} />
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom + FOOT_BOTTOM,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ marginTop: DISPLAY_TOP }}>
          {copy.display.map((line) => (
            <T key={line} variant="display" color={ob.ink} style={{ height: type.display.line }}>
              {line}
            </T>
          ))}
        </View>

        <View style={{ marginTop: BUTTONS_TOP }}>
          <Actions onStart={() => router.push('/orbithome')} />
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel={copy.footLink}>
          <View style={{ flexDirection: 'row', marginTop: FOOT_TOP }}>
            <T variant="foot" color={ob.muted} style={{ height: type.foot.line }}>
              {copy.foot + '  '}
            </T>
            <T variant="footLink" color={ob.ink} style={{ height: type.footLink.line }}>
              {copy.footLink}
            </T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
