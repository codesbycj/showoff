import { Pressable, View } from 'react-native';

import { fields } from '../data/book';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** One round step control. Disabled at the floor so the count cannot go to 0. */
function Step({
  icon,
  size,
  solid,
  disabled,
  onPress,
  label,
}: {
  icon: 'minus' | 'plus';
  size: number;
  solid?: boolean;
  disabled?: boolean;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: solid ? ct.accent : ct.chip,
            borderWidth: solid ? 0 : 1,
            borderColor: ct.chipBorder,
            opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={icon} size={16} color={solid ? '#FFFFFF' : ct.ink} strokeWidth={2.2} />
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  height: number;
  radius: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
};

/**
 * Party size, with a working stepper.
 *
 * The unit agrees with the count — "1 Guest", "2 Guests". The reference prints
 * "1 Guests" on both of its booking screens; R9 wants the words to agree with
 * the number, so `fields.partyUnit` decides it rather than a fixed string.
 *
 * The step controls are 30dp drawn with `hitSlop: 10`, giving a 50dp target
 * (R7). The reference draws them smaller still.
 */
export function PartyField({ margin, height, radius, step, value, onChange }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        borderRadius: radius,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ct.surface,
        borderWidth: 1,
        borderColor: ct.hairline,
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Glyph name="users" size={13} color={ct.sub} strokeWidth={1.7} />
          <T variant="fieldLabel">{fields.partyLabel}</T>
        </View>
        <T variant="fieldValue">{fields.partyUnit(value)}</T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Step
          icon="minus"
          size={step}
          disabled={value <= 1}
          onPress={() => onChange(Math.max(1, value - 1))}
          label="Fewer guests"
        />
        <T variant="stepper">{value}</T>
        <Step
          icon="plus"
          size={step}
          solid
          onPress={() => onChange(Math.min(12, value + 1))}
          label="More guests"
        />
      </View>
    </View>
  );
}
