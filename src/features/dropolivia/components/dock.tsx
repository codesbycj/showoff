import Ellipsis from 'lucide-react-native/icons/ellipsis';
import MapPin from 'lucide-react-native/icons/map-pin';
import Radar from 'lucide-react-native/icons/radar';
import User from 'lucide-react-native/icons/user';
import { Pressable, View } from 'react-native';

import { dock, selectedDock } from '../data/track';
import { DOCK_DISC, DOCK_HEIGHT } from '../layout';
import { dl, radius } from '../theme';
import { T } from './text';

const ICONS = {
  target: Radar,
  pin: MapPin,
  user: User,
  more: Ellipsis,
} as const;

type Tab = (typeof dock)[number];

/**
 * The floating dock: the place you are, spelled out, and three you are not.
 *
 * The label lives on the selected item rather than under every icon, which is
 * what lets the selected one be a pill and the rest discs.
 */
export function Dock({ onSelect }: { onSelect?: (t: Tab) => void }) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: dl.dock,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
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
          >
            <View
              style={{
                height: DOCK_DISC,
                borderRadius: radius.pill,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingHorizontal: on ? 16 : 0,
                width: on ? undefined : DOCK_DISC,
                backgroundColor: on ? dl.dockOn : dl.dockWell,
              }}
            >
              <Icon size={19} color={on ? dl.ink : dl.onDark} strokeWidth={1.9} />
              {'label' in t ? (
                <T variant="dock" color={dl.ink}>
                  {t.label}
                </T>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
