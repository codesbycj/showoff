import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Subject } from '../data/chat';
import { FONT, LEVEL } from '../theme';

/** One pastel subject chip on the chat screen's horizontal rail. */
export function SubjectChip({ subject, onPress }: { subject: Subject; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: subject.fill,
            borderWidth: 1,
            borderColor: subject.border,
          },
          LEVEL.sm,
        ]}
      >
        <Icon name={subject.icon} size={14} color={subject.ink} />
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 12,
            lineHeight: 16,
            color: '#3d4a3f',
          }}
        >
          {subject.label}
        </Text>
      </View>
    </Pressable>
  );
}
