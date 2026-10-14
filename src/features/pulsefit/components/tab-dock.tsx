import { Pressable, Text, View } from 'react-native';

import { DrawnIcon } from './drawn-icon';
import { Symbol } from './symbol';
import type { Tab } from '../data/home';
import { DOCK_HEIGHT } from '../layout';
import { LEVEL, R, TYPE, pf } from '../theme';

/**
 * The bottom dock.
 *
 * 80dp of white with the five slots spread by `space-around`, which on a 393dp
 * screen puts their centres 77dp apart rather than at the fifths an equal-flex
 * row would give. The slots are 56dp wide — wider than any of the labels — so
 * that spacing comes out of the free space between them and not out of the
 * text.
 *
 * The export paints it `rgba(255,255,255,0.95)` with a `backdrop-blur-xl`.
 * Over this page's `#F7F9FB` that composites to #FFFFFF at every one of the
 * three channels, so it is painted opaque: identical at rest, and without a
 * `backdrop-filter`, which is one of the things the web harness renders and
 * the device does not.
 *
 * The quick-add slot is `-top-5`: its column is centred in the row like the
 * others and then lifted 20dp, so the button overhangs the dock's top edge
 * while its label stays on the same line as the rest.
 */
export function TabDock({
  tabs,
  active,
  bottomInset = 0,
  onSelect,
  onScan,
}: {
  tabs: readonly Tab[];
  active: string;
  bottomInset?: number;
  onSelect?: (key: string) => void;
  onScan?: () => void;
}) {
  return (
    <View
      style={[
        {
          height: DOCK_HEIGHT + bottomInset,
          paddingBottom: bottomInset,
          paddingHorizontal: 4,
          backgroundColor: pf.surface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        LEVEL.dock,
      ]}
    >
{/* STEP 1.43 five slots, and the one in the middle that is a button
      {tabs.map((tab) =>
        tab.key === 'scan' ? (
          <View
            key={tab.key}
            // `-top-5`: centred in the row like the others, then lifted.
            style={{ width: 56, alignItems: 'center', transform: [{ translateY: -20 }] }}
          >
            <Pressable
              onPress={onScan}
              accessibilityRole="button"
              accessibilityLabel="Scan and log activity"
            >
              <View
                style={[
                  {
                    width: 56,
                    height: 56,
                    borderRadius: R.chip,
                    // MISTAKE 1.44 the quick-add came out a circle
                    borderRadius: R.full,
                    backgroundColor: pf.lime,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  LEVEL.fab,
                ]}
              >
                <DrawnIcon name="addBold" size={30} color={pf.ink} />
              </View>
            </Pressable>

            <Text style={[TYPE.micro, { color: pf.inkVariant, marginTop: 4 }]}>{tab.label}</Text>
          </View>
        ) : (
          <Pressable
            key={tab.key}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.key === active }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol
                name={tab.icon}
                size={24}
                color={tab.key === active ? pf.primary : pf.inkVariant}
              />
              <Text
                style={[
                  TYPE.label,
                  { color: tab.key === active ? pf.primary : pf.inkVariant, marginTop: 2 },
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </Pressable>
        ),
      )}
*/}
    </View>
  );
}
