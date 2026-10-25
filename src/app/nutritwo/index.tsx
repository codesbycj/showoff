import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Masthead, StartBar, Steps } from '@/features/nutritwo/components/onboarding-chrome';
import { StatsCard } from '@/features/nutritwo/components/stats-card';
import { T } from '@/features/nutritwo/components/text';
import { WeekCard } from '@/features/nutritwo/components/week-card';
import { intro } from '@/features/nutritwo/data/plan';
import { BAR_BOTTOM, DISPLAY_TOP, HEADER_TOP, MARGIN, STEPS_TOP } from '@/features/nutritwo/layout';
import { nl, radius } from '@/features/nutritwo/theme';
import { useInsets } from '@/features/nutritwo/use-insets';

/**
 * Nutrilens — onboarding, two of four.
 *
 * Assembly only: the brand, how far through this is, what the screen promises,
 * the week, and the day's numbers.
 *
 * The green disc inside the headline is a nested `T` holding a drawn mark, so
 * it sits on the same baseline as the words either side of it however the line
 * breaks. An absolutely placed disc would drift the moment the headline
 * re-flowed at another width.
 */
export default function NutriTwo() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: nl.canvas }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingHorizontal: MARGIN, paddingTop: insets.top + HEADER_TOP }}>
        <Masthead />
        <View style={{ marginTop: STEPS_TOP }}>
          <Steps />
        </View>

        <View style={{ marginTop: DISPLAY_TOP }}>
          <T variant="display" color={nl.ink}>
            {intro.displayTop}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <T variant="display" color={nl.ink}>
              {intro.displayMid[0]}
            </T>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: radius.full,
                backgroundColor: nl.green,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={19} />
            </View>
            <T variant="display" color={nl.ink}>
              {intro.displayMid[1]}
            </T>
          </View>
          <T variant="display" color={nl.ink}>
            {intro.displayBottom}
          </T>
        </View>

        <View style={{ marginTop: 18 }}>
          <WeekCard />
        </View>

        <View style={{ marginTop: 12 }}>
          <StatsCard />
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ marginBottom: insets.bottom + BAR_BOTTOM }}>
          <StartBar tone="dark" label={intro.cta} />
        </View>
      </View>
    </View>
  );
}

/** The streak mark inside the headline's disc. */
function Flame({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        d="M9 1.4 C9 4.4 5.2 5.6 5.2 9.4 C5.2 12.2 6.8 14.4 9 14.4 C11.2 14.4 12.8 12.2 12.8 9.4 C12.8 7 11 6 11 3.6 C10.4 4.6 9.6 5 9 5 Z"
        fill={nl.surface}
      />
    </Svg>
  );
}
