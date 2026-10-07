import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Task } from '../data/home';
import { FONT, LEVEL, ll } from '../theme';

/** One "Today's Tasks" card — icon well, title, subtitle, and a corner arrow. */
export function TaskRow({ task, onPress }: { task: Task; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            borderRadius: 20,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: ll.surface,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.03)',
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: task.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={task.icon} size={17} color={task.ink} />
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
              {task.title}
            </Text>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 10,
                lineHeight: 14,
                color: ll.muted,
              }}
            >
              {task.subtitle}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: ll.surfaceSunken,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="arrowUpRight" size={11} color={ll.subtle} strokeWidth={2.5} />
        </View>
      </View>
    </Pressable>
  );
}
