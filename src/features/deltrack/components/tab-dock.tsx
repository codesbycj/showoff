import { Pressable, Text, View } from 'react-native';

import { HomeGlyph, Layers, Person, Scan, Truck } from './icons';
import type { Tab } from '../data/home';
import { DOCK_HEIGHT } from '../layout';
import { LEVEL, R, TYPE, dt } from '../theme';

/**
 * The floating dock.
 *
 * x 7..386 and y 750..840, with 27dp of padding and the five slots spread by
 * `space-between`. The tabs are only 26dp wide — the width of the longest
 * label — which is what puts their centres at 47/114/279/346 in the reference
 * rather than at the fifths an equal-flex row would give.
 *
 * The home indicator is drawn *inside* the dock, over the navy, because that
 * is where the reference puts it: the dock's foot stops 12dp off the screen
 * edge and the indicator rides along its bottom.
 */

const TAB_WIDTH = 26;
const FAB = 57;

function TabGlyph({ tab }: { tab: Tab }) {
  if (tab.key === 'home') return <HomeGlyph size={20} color={dt.onDark} />;
  if (tab.key === 'send') return <Truck size={19} color={dt.onDark} />;
  if (tab.key === 'history') return <Layers size={19} color={dt.onDark} />;
  return <Person size={25} color={dt.onDark} />;
}

export function TabDock({
  tabs,
  active,
  onSelect,
  onScan,
}: {
  tabs: readonly Tab[];
  active: string;
  onSelect?: (key: string) => void;
  onScan?: () => void;
}) {
  return (
    <View
      style={[
        {
          height: DOCK_HEIGHT,
          // Two radii: 21 at the top, 40 at the foot. The dock's bottom
          // corners follow the phone's own, which is why they are twice as
          // round as the ones facing the list.
          borderTopLeftRadius: R.dock,
          borderTopRightRadius: R.dock,
          borderBottomLeftRadius: R.dockFoot,
          borderBottomRightRadius: R.dockFoot,
          backgroundColor: dt.navy,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingTop: 28,
          paddingHorizontal: 27,
        },
        LEVEL.dock,
      ]}
    >
      {tabs.map((tab) =>
        tab.key === 'scan' ? (
          <Pressable
            key={tab.key}
            onPress={onScan}
            accessibilityRole="button"
            accessibilityLabel="Scan a label"
            // The button overhangs the row it sits in — its disc is centred
            // on the icons' line, not hung below it.
            style={{ marginTop: -12 }}
          >
            <View
              style={[
                {
                  width: FAB,
                  height: FAB,
                  borderRadius: FAB / 2,
                  backgroundColor: dt.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.scan,
              ]}
            >
              <Scan size={27} color={dt.onDark} />
            </View>
          </Pressable>
        ) : (
          <Pressable
            key={tab.key}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.key === active }}
            hitSlop={12}
            style={{ width: TAB_WIDTH, alignItems: 'center' }}
          >
            <View style={{ height: 20, justifyContent: 'center' }}>
              <TabGlyph tab={tab} />
            </View>

            <Text style={[TYPE.micro, { color: dt.onDark, marginTop: 3.5 }]}>{tab.label}</Text>
          </Pressable>
        ),
      )}

      <View
        style={{
          position: 'absolute',
          bottom: 2,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
        pointerEvents="none"
      >
        <View style={{ width: 145, height: 5, borderRadius: 2.5, backgroundColor: dt.onDark }} />
      </View>
    </View>
  );
}
