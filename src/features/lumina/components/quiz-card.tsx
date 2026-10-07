import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, ll } from '../theme';

/** The bookmarked quiz — lime tick, title, meta, and a dark "Practice" pill. */
export function QuizCard({
  title,
  meta,
  cta,
  onPress,
}: {
  title: string;
  meta: string;
  cta: string;
  onPress?: () => void;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: ll.surface,
          borderRadius: 24,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(232,239,227,0.7)',
        },
        LEVEL.card,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 16,
            backgroundColor: ll.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="check" size={20} color={ll.ink} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: -0.12,
              color: ll.ink,
            }}
          >
            {title}
          </Text>
          <Text style={{ fontFamily: FONT.regular, fontSize: 11, lineHeight: 15, color: ll.muted }}>
            {meta}
          </Text>
        </View>
      </View>

      <Pressable onPress={onPress} accessibilityRole="button">
        <View
          style={[
            {
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 999,
              backgroundColor: ll.ink,
            },
            LEVEL.sm,
          ]}
        >
          <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: ll.surface }}>
            {cta}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
