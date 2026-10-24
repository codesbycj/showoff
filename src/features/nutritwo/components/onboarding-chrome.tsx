import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { header } from '../data/plan';
import { BAR_DISC, BAR_HEIGHT, STEP_DONE, STEP_GAP, STEP_H, STEPS } from '../layout';
import { nl, radius } from '../theme';
import { T } from './text';

/**
 * The wordmark and the way out of onboarding.
 *
 * The "AI" is set as a superscript by hand — a baseline shift, not a smaller
 * font in a row: React Native has no `verticalAlign` for text, so the only way
 * to lift it is to give it its own box and pull that box up.
 */
export function Masthead({ onSkip }: { onSkip?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
        {/* STEP 1.03 whose app this is
        <T variant="wordmark" color={nl.ink}>
          {header.wordmark}
        </T>
        */}
        <View style={{ marginTop: 1, marginLeft: 1 }}>
          <T variant="wordmarkSup" color={nl.ink}>
            {header.sup}
          </T>
        </View>
      </View>

      {/* STEP 1.04 and the way past it
      <Pressable onPress={onSkip} accessibilityRole="button" accessibilityLabel={header.skip}>
        <T variant="skip" color={nl.muted}>
          {header.skip}
        </T>
      </Pressable>
      */}
    </View>
  );
}

/** How far through onboarding this screen is. */
export function Steps() {
  return (
    <View style={{ flexDirection: 'row', gap: STEP_GAP }}>
      {/* STEP 1.05 four steps, two done
      {Array.from({ length: STEPS }, (_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: STEP_H,
            borderRadius: radius.bar,
            backgroundColor: i < STEP_DONE ? nl.trackOn : nl.track,
          }}
        />
      ))}
      */}
    </View>
  );
}

/**
 * The bar at the foot: a green chevron disc, the label, and a check.
 *
 * The three sit on one pill rather than in a row of three, because the
 * reference's reads as a single control — and a row would let the label drift
 * off centre as the chevron and the check change size.
 */
export function StartBar({
  tone = 'light',
  onPress,
  label,
}: {
  tone?: 'light' | 'dark';
  onPress?: () => void;
  label: string;
}) {
  const dark = tone === 'dark';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          height: BAR_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: dark ? nl.ink : nl.surface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: (BAR_HEIGHT - BAR_DISC) / 2,
        }}
      >
        <View
          style={{
            width: BAR_DISC,
            height: BAR_DISC,
            borderRadius: radius.full,
            backgroundColor: nl.green,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Chevrons size={20} />
        </View>

        <T variant="button" color={dark ? nl.surface : nl.ink}>
          {label}
        </T>

        <View
          style={{
            width: BAR_DISC,
            height: BAR_DISC,
            borderRadius: radius.full,
            backgroundColor: dark ? nl.surface : nl.canvas,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tick size={18} />
        </View>
      </View>
    </Pressable>
  );
}

/** The double chevron in the green disc. */
function Chevrons({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M4 5 L9 10 L4 15 M11 5 L16 10 L11 15"
        stroke={nl.greenDeep}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** The tick in the pale disc. */
function Tick({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M4 10.4 L8.2 14.4 L16 5.6"
        stroke={nl.ink}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
