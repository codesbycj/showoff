import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, tasks } from '../data/start';
import { TASK_GAP, TASK_HEIGHT } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';

/**
 * What is on today, as rows you can actually tick.
 *
 * Each row shares the space the project row and the tab bar leave, so the
 * list fills the page at any screen height instead of stacking at fixed
 * heights and leaving a band of canvas above the bar.
 *
 * The checkbox is a 26dp box inside a full-row press target: the reference's
 * is 20dp with nothing else tappable, which is half a thumb.
 */
export function TaskList({ onToggle }: { onToggle?: (id: string) => void }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T
          variant="sectionTitle"
          color={on.ink}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.tasks}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.viewAll}>
          <T variant="sectionLink" color={on.muted} style={{ height: type.sectionLink.line }}>
            {copy.viewAll}
          </T>
        </Pressable>
      </View>

      {tasks.map((t) => (
        <Pressable
          key={t.id}
          onPress={() => onToggle?.(t.id)}
          style={{ flex: 1, marginTop: TASK_GAP }}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: t.done }}
          accessibilityLabel={t.body}
        >
          <View
            style={{
              flex: 1,
              minHeight: TASK_HEIGHT,
              borderRadius: radius.field,
              backgroundColor: on.surface,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
            }}
          >
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 9,
                backgroundColor: t.done ? on.panel : 'transparent',
                borderWidth: t.done ? 0 : 1.6,
                borderColor: on.hairline,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t.done ? (
                <Svg width={13} height={13} viewBox="0 0 24 24">
                  <Path
                    d="m5.6 12.4 4.2 4.4 8.6-9.6"
                    stroke={on.onPanel}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              ) : null}
            </View>

            <T variant="taskBody" color={on.ink} style={{ flex: 1, marginLeft: 12 }}>
              {t.body}
            </T>

            <View
              style={{ width: 6, height: 6, borderRadius: radius.pill, backgroundColor: on.ink }}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
