import Layers from 'lucide-react-native/icons/layers';
import MapPin from 'lucide-react-native/icons/map-pin';
import PackagePlus from 'lucide-react-native/icons/package-plus';
import Search from 'lucide-react-native/icons/search';
import { Pressable, View } from 'react-native';

import { actions } from '../data/track';
import { ACTION_DISC } from '../layout';
import { dl, radius } from '../theme';
import { T } from './text';

const ICONS = {
  parcel: PackagePlus,
  search: Search,
  pin: MapPin,
  layers: Layers,
} as const;

type Action = (typeof actions)[number];

/** The four things the app can start, each in its own tinted disc. */
export function ActionGrid({ onSelect }: { onSelect?: (a: Action) => void }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {actions.map((a, i) => {
        const Icon = ICONS[a.icon];
        return (
          <Pressable
            key={a.key}
            onPress={() => onSelect?.(a)}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            style={{ flex: 1 }}
          >
            <View style={{ alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: ACTION_DISC,
                  height: ACTION_DISC,
                  borderRadius: radius.full,
                  backgroundColor: dl.action[i % dl.action.length],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} color={dl.ink} strokeWidth={1.8} />
              </View>
              <T variant="action" color={dl.onDark}>
                {a.label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
