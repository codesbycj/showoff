import Camera from 'lucide-react-native/icons/camera';
import Heart from 'lucide-react-native/icons/heart';
import House from 'lucide-react-native/icons/house';
import Search from 'lucide-react-native/icons/search';
import User from 'lucide-react-native/icons/user';
import { Pressable, View } from 'react-native';

import { selectedTab, tabs } from '../data/discover';
import { TAB_CAMERA, TAB_HEIGHT } from '../layout';
import { hp, radius, shadow } from '../theme';
import { T } from './text';

const ICONS = {
  home: House,
  search: Search,
  camera: Camera,
  heart: Heart,
  user: User,
} as const;

type Tab = (typeof tabs)[number];

/**
 * The floating dock, with the camera raised out of it.
 *
 * `shadow*` and `elevation` are carried together in one style object. A
 * `Platform.select` between them is the one thing the web harness cannot
 * check, so it is never used (AGENTS.md, "The web render is a proxy").
 */
export function TabDock({ onSelect }: { onSelect?: (t: Tab) => void }) {
  return (
    <View
      style={{
        height: TAB_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: hp.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        ...shadow.float,
      }}
    >
      {/* STEP 1.19 the five places to be
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
  const camera = tab.icon === 'camera';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={tab.label || tab.key}
      style={{ flex: 1 }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        {camera ? (
          <View
            style={{
              width: TAB_CAMERA,
              height: TAB_CAMERA,
              borderRadius: radius.full,
              backgroundColor: hp.blue,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} color={hp.onPhoto} strokeWidth={2} />
          </View>
        ) : (
          <View style={{ alignItems: 'center', gap: 3 }}>
            <Icon
              size={19}
              color={on ? hp.blueDeep : hp.muted}
              strokeWidth={on ? 2.2 : 1.8}
              fill={on && tab.solid ? hp.blueDeep : 'none'}
            />
            <T variant="tab" color={on ? hp.blueDeep : hp.muted}>
              {tab.label}
            </T>
          </View>
        )}
      </View>
    </Pressable>
  );
}
