import ChartColumnBig from 'lucide-react-native/icons/chart-column-big';
import Gamepad2 from 'lucide-react-native/icons/gamepad-2';
import House from 'lucide-react-native/icons/house';
import User from 'lucide-react-native/icons/user';
import { Pressable, View } from 'react-native';

import { dock } from '../data/home';
import { DOCK_HEIGHT, DOCK_PAD } from '../layout';
import { qz, radius } from '../theme';
import { T } from './text';

const ICONS = {
  home: House,
  gamepad: Gamepad2,
  podium: ChartColumnBig,
  person: User,
} as const;

type Tab = (typeof dock)[number];

/**
 * The floating dock: where you are, spelled out, and three places you are not.
 *
 * The selected tab is a dark pill carrying its own label, and the rest are
 * white discs — which is why the label lives on the item rather than under
 * every icon.
 *
 * `shadow*` and `elevation` are carried together in one style object. A
 * `Platform.select` between them is the one thing the web harness cannot
 * check, so it is never used (AGENTS.md, "The web render is a proxy").
 */
export function TabDock({ onSelect }: { onSelect?: (t: Tab) => void }) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: qz.dockSurface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: DOCK_PAD,
        shadowColor: '#2a2118',
        shadowOpacity: 0.14,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
      }}
    >
      {/* STEP 1.32 the four places to be
      {dock.map((t) => (
        <DockItem key={t.key} tab={t} onPress={() => onSelect?.(t)} />
      ))}
      */}
    </View>
  );
}

function DockItem({ tab, onPress }: { tab: Tab; onPress?: () => void }) {
  const Icon = ICONS[tab.icon];
  const selected = 'label' in tab;
  const size = DOCK_HEIGHT - DOCK_PAD * 2;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={tab.key}>
      <View
        style={{
          height: size,
          borderRadius: radius.pill,
          flexDirection: 'row',
          alignItems: 'center',
          // MISTAKE 1.33 the dock came in squeezed
          paddingVertical: 10,
          gap: 9,
          paddingHorizontal: selected ? 15 : 0,
          width: selected ? undefined : size,
          justifyContent: 'center',
          backgroundColor: selected ? qz.dockInk : 'transparent',
        }}
      >
        <Icon
          size={21}
          color={selected ? qz.onColor : qz.ink}
          strokeWidth={selected ? 2 : 1.7}
          fill={selected ? qz.onColor : 'none'}
        />
        {/* Narrowed in place rather than through the `selected` flag above:
            only one of these tabs carries a label, and a boolean does not
            narrow the union for TypeScript. */}
        {'label' in tab ? (
          <T variant="dock" color={qz.onColor}>
            {tab.label}
          </T>
        ) : null}
      </View>
    </Pressable>
  );
}
