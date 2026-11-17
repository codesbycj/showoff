import { Pressable, View } from 'react-native';

import { entries, priorityLabel } from '../data/timeline';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; gap: number; radius: number };

/**
 * What the week turned up.
 *
 * The dark card and the light one carry the same structure with inverted
 * tokens: a tile made of one ink goes invisible on the other ground, so each
 * variant names its own (R4).
 *
 * Each card's fill sits on an absolutely-filled child so an emptied card
 * paints nothing in frame one of the reveal (I9).
 */
export function EntryCards({ margin, height, gap, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {entries.map((entry) => {
        const dark = entry.tone === 'dark';

        return (
          <Pressable
            key={entry.id}
            accessibilityRole="button"
            accessibilityLabel={`${entry.kind}: ${entry.title}`}
          >
            <View
              style={{
                height,
                borderRadius: radius,
                paddingHorizontal: 20,
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: dark ? ct.dark : ct.white,
                  borderRadius: radius,
                }}
              />

              <T variant={dark ? 'kindDark' : 'kindLight'}>{entry.kind}</T>
              <T variant={dark ? 'titleDark' : 'titleLight'}>{entry.title}</T>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 4,
                }}
              >
                <T variant={dark ? 'kindDark' : 'kindLight'}>{priorityLabel}</T>

                <View
                  style={{
                    minWidth: 30,
                    height: 30,
                    borderRadius: 15,
                    paddingHorizontal: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dark ? ct.pinkTile : ct.lavenderTile,
                  }}
                >
                  <T variant="priority">{String(entry.priority)}</T>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
