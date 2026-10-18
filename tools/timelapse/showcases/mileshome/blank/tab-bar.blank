import CreditCard from 'lucide-react-native/icons/credit-card';
import House from 'lucide-react-native/icons/house';
import Tag from 'lucide-react-native/icons/tag';
import User from 'lucide-react-native/icons/user';
import { Pressable, View } from 'react-native';

import { selectedTab, tabs } from '../data/home';
import { TAB_HEIGHT } from '../layout';
import { ml, radius, shadow } from '../theme';
import { T } from './text';

const ICONS = {
  home: House,
  tag: Tag,
  card: CreditCard,
  user: User,
} as const;

type Tab = (typeof tabs)[number];

/** The four places the app goes, floating over the blue. */
export function TabBar({ onSelect }: { onSelect?: (t: Tab) => void }) {
  return (
    <View
      style={{
        height: TAB_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: ml.surface,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadow.float,
      }}
    >
      {/* STEP 1.19 the four places to be
      {tabs.map((t) => (
        <Item key={t.key} tab={t} onPress={() => onSelect?.(t)} />
      ))}
      */}
    </View>
  );
}

function Item({ tab, onPress }: { tab: Tab; onPress?: () => void }) {
  const Icon = ICONS[tab.icon];
  const on = tab.key === selectedTab;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={tab.label}
      style={{ flex: 1 }}
    >
      <View style={{ alignItems: 'center', gap: 3 }}>
        <Icon
          size={19}
          color={on ? ml.tabInk : ml.tabMuted}
          strokeWidth={on ? 2.2 : 1.8}
          fill={on && tab.solid ? ml.tabInk : 'none'}
        />
        <T variant="tab" color={on ? ml.tabInk : ml.tabMuted}>
          {tab.label}
        </T>
      </View>
    </Pressable>
  );
}
