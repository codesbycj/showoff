import ChartPie from 'lucide-react-native/icons/chart-pie';
import House from 'lucide-react-native/icons/house';
import MessageSquare from 'lucide-react-native/icons/message-square';
import Plus from 'lucide-react-native/icons/plus';
import User from 'lucide-react-native/icons/user';
import { Pressable, View } from 'react-native';

import { dock, selectedDock } from '../data/work';
import { DOCK_ADD, DOCK_HEIGHT } from '../layout';
import { radius, shadow, sl } from '../theme';

const ICONS = {
  home: House,
  chart: ChartPie,
  chat: MessageSquare,
  user: User,
} as const;

type Tab = (typeof dock)[number];

/**
 * The floating dock, with the add button standing beside it rather than in it.
 *
 * `shadow*` and `elevation` are carried together in one style object. A
 * `Platform.select` between them is the one thing the web harness cannot
 * check, so it is never used (AGENTS.md, "The web render is a proxy").
 */
export function Dock({ onSelect, onAdd }: { onSelect?: (t: Tab) => void; onAdd?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View
        style={{
          flex: 1,
          height: DOCK_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: sl.surface,
          flexDirection: 'row',
          alignItems: 'center',
          ...shadow.float,
        }}
      >
        {dock.map((t) => {
          const Icon = ICONS[t.icon];
          const on = t.key === selectedDock;
          return (
            <Pressable
              key={t.key}
              onPress={() => onSelect?.(t)}
              accessibilityRole="button"
              accessibilityLabel={t.key}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Icon
                size={20}
                color={on ? sl.ink : sl.muted}
                strokeWidth={on ? 2.2 : 1.8}
                fill={on && t.icon === 'home' ? sl.ink : 'none'}
              />
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add">
        <View
          style={{
            width: DOCK_ADD,
            height: DOCK_ADD,
            borderRadius: radius.full,
            backgroundColor: sl.action,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadow.float,
          }}
        >
          <Plus size={23} color={sl.onDark} strokeWidth={2.3} />
        </View>
      </Pressable>
    </View>
  );
}
