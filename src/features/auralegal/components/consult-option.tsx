import { Pressable, Text, View } from 'react-native';

import { type ConsultOption as Option } from '../data/booking';
import { R, SP, TYPE, al, alpha } from '../theme';

import { Symbol } from './symbol';

/**
 * One consultation-mode row.
 *
 * Selected and unselected are the same shape in different colours, with one
 * real difference: the radio. Unselected is a flat 20dp disc in
 * `surface-variant` with nothing inside it; selected inverts — the disc takes
 * the *text* colour and carries a lavender bullseye, so the fill and the dot
 * swap roles rather than the dot simply appearing.
 */
export function ConsultOption({
  option,
  selected,
  onPress,
}: {
  option: Option;
  selected: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SP.md,
          paddingVertical: 14,
          borderRadius: R.full,
          backgroundColor: selected ? al.primaryContainer : al.surfaceContainer,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: R.full,
              backgroundColor: selected ? al.onPrimaryContainer : al.surfaceVariant,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selected ? (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: R.full,
                  backgroundColor: al.primaryContainer,
                }}
              />
            ) : null}
          </View>

          <Text
            numberOfLines={1}
            style={{
              ...TYPE.labelLg,
              fontFamily: selected ? TYPE.headlineXl.fontFamily : TYPE.labelLg.fontFamily,
              color: selected ? al.onPrimaryContainer : al.onSurface,
              flexShrink: 1,
            }}
          >
            {option.label}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          {option.tag ? (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: R.full,
                backgroundColor: alpha(al.onPrimaryContainer, 0.1),
              }}
            >
              <Text style={{ ...TYPE.labelSm, color: al.onPrimaryContainer }}>{option.tag}</Text>
            </View>
          ) : null}

          <Symbol
            name={option.icon}
            size={18}
            color={selected ? al.onPrimaryContainer : al.outline}
          />
        </View>
      </View>
    </Pressable>
  );
}
