import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { steppers } from '../data/plan';
import { nl, radius } from '../theme';
import { T } from './text';

type Stepper = (typeof steppers)[number];

/** The two numbers the plan is built from, each with a way to change it. */
export function StepperRow({ onStep }: { onStep?: (s: Stepper, dir: -1 | 1) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {steppers.map((s) => (
        <View
          key={s.key}
          style={{
            flex: 1,
            borderRadius: 20,
            backgroundColor: nl.surface,
            padding: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <T variant="stepLabel" color={nl.ink} style={{ flex: 1 }}>
              {s.label}
            </T>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: radius.full,
                backgroundColor: nl.stepWell,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mark kind={s.mark} size={17} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <Sign label={`Less ${s.key}`} onPress={() => onStep?.(s, -1)} sign="minus" />
            <T variant="stepValue" color={nl.ink}>
              {s.value}
            </T>
            <Sign label={`More ${s.key}`} onPress={() => onStep?.(s, 1)} sign="plus" />
          </View>
        </View>
      ))}
    </View>
  );
}

function Sign({
  label,
  onPress,
  sign,
}: {
  label: string;
  onPress?: () => void;
  sign: 'minus' | 'plus';
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: radius.full,
          backgroundColor: nl.stepWell,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={14} height={14} viewBox="0 0 14 14">
          <Path
            d={sign === 'plus' ? 'M7 1.6 V12.4 M1.6 7 H12.4' : 'M1.6 7 H12.4'}
            stroke={nl.ink}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </Pressable>
  );
}

/**
 * A card's mark: a target, or a bowl with steam.
 *
 * Drawn rather than taken from an icon set — at 17dp the set's versions of
 * both are a stroke weight apart from each other, and the reference's are
 * distinct shapes.
 */
function Mark({ kind, size }: { kind: 'target' | 'bowl'; size: number }) {
  if (kind === 'target') {
    return (
      <Svg width={size} height={size} viewBox="0 0 18 18">
        <Circle cx={9} cy={9} r={6.6} fill="none" stroke={nl.ink} strokeWidth={1.4} />
        <Circle cx={9} cy={9} r={2.6} fill={nl.ink} />
        <Path d="M12.4 5.6 L16 2" stroke={nl.ink} strokeWidth={1.4} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        d="M2.4 9 H15.6 C15.6 12.6 12.6 15.4 9 15.4 C5.4 15.4 2.4 12.6 2.4 9 Z"
        fill="none"
        stroke={nl.ink}
        strokeWidth={1.4}
      />
      <Path
        d="M6.4 6.2 C6.4 4.8 8 4.6 8 3.2 M10.4 6.2 C10.4 5 11.8 4.8 11.8 3.6"
        stroke={nl.ink}
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
