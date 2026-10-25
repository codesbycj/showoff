import Ellipsis from 'lucide-react-native/icons/ellipsis';
import { Image, Pressable, View } from 'react-native';

import { tasks } from '../data/work';
import { TASK_AVATAR, TASK_H } from '../layout';
import { radius, sl } from '../theme';
import { FACES } from './faces';
import { T } from './text';

type Task = (typeof tasks)[number];

/**
 * One task: what it is, where it has got to, who is on it, and when.
 *
 * The avatars overlap by a third of their width, which is why they are laid
 * out with a negative margin rather than a gap — a stack reads as "these
 * people together", a row reads as a list.
 */
export function TaskCard({ task, onMore }: { task: Task; onMore?: () => void }) {
  return (
    <View
      style={{
        height: TASK_H,
        borderRadius: radius.card,
        backgroundColor: sl.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 12,
      }}
    >
      <View
        style={{
          width: 3,
          height: 34,
          borderRadius: radius.pill,
          backgroundColor: sl.ink,
          marginRight: 11,
        }}
      />

      <View style={{ flex: 1 }}>
        <T variant="task" color={sl.ink} numberOfLines={1}>
          {task.title}
        </T>
        <T variant="taskMeta" color={sl.muted}>
          {task.state}
        </T>

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          {task.faces.map((f, i) => (
            <Image
              key={f}
              source={FACES[f]}
              style={{
                width: TASK_AVATAR,
                height: TASK_AVATAR,
                borderRadius: radius.full,
                borderWidth: 1.5,
                borderColor: sl.surface,
                marginLeft: i === 0 ? 0 : -8,
              }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          ))}
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: 48 }}>
        <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel="More">
          <Ellipsis size={16} color={sl.muted} strokeWidth={2} />
        </Pressable>
        <T variant="taskWhen" color={sl.muted}>
          {task.when}
        </T>
      </View>
    </View>
  );
}
