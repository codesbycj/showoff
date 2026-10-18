import CalendarDays from 'lucide-react-native/icons/calendar-days';
import House from 'lucide-react-native/icons/house';
import Users from 'lucide-react-native/icons/users';
import Wallet from 'lucide-react-native/icons/wallet';
import { Pressable, View } from 'react-native';

import { dock, selectedDock } from '../data/book';
import { DOCK_HEIGHT } from '../layout';
import { bj, radius } from '../theme';

const ICONS = {
  home: House,
  calendar: CalendarDays,
  users: Users,
  wallet: Wallet,
} as const;

type Tab = (typeof dock)[number];

/** The four places the app goes, on a white pill over the violet. */
export function Dock({ onSelect }: { onSelect?: (t: Tab) => void }) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: bj.dock,
        flexDirection: 'row',
        alignItems: 'center',
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
              size={21}
              color={on ? bj.dockOn : bj.dockOff}
              strokeWidth={on ? 2.2 : 1.8}
              fill={on && t.icon === 'home' ? bj.dockOn : 'none'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
