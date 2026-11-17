import { Pressable, View } from 'react-native';

import { options } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; radius: number };

/** The run's goal and its audio cues. */
export function OptionRows({ height, radius }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {options.map((option) => (
        <Pressable
          key={option.id}
          accessibilityRole="button"
          accessibilityLabel={`${option.label}: ${option.value}`}
          style={{ flex: 1 }}
        >
          <View
            style={{
              height,
              borderRadius: radius,
              backgroundColor: ct.cardSoft,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              gap: 10,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                backgroundColor: ct.limeSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={option.glyph} size={18} color={ct.lime} strokeWidth={1.8} />
            </View>

            <View style={{ flex: 1 }}>
              <T variant="chipOff">{option.label}</T>
              <T variant="metric" style={{ fontSize: 15.5, lineHeight: 21 }}>
                {option.value}
              </T>
            </View>

            <Glyph name="chevron" size={16} color={ct.muted} strokeWidth={2} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
