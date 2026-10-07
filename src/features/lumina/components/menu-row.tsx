import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { MenuItem } from '../data/profile';
import { FONT, LEVEL, ll } from '../theme';

/** One row in the profile's menu list — glyph well, title, subtitle, chevrons. */
export function MenuRow({ item, onPress }: { item: MenuItem; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: ll.surface,
            borderRadius: 16,
            padding: 14,
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: item.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={item.icon} size={16} color={item.ink} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 13,
                lineHeight: 18,
                letterSpacing: -0.13,
                color: '#191e1a',
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 11,
                lineHeight: 15,
                color: '#889489',
                marginTop: 2,
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        </View>

        <Icon name="chevronsRight" size={15} color={ll.subtle} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}
