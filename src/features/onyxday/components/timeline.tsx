import { Image, Pressable, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { entries, faces } from '../data/start';
import { CARD_PAD, DOT, ENTRY_GAP, MARGIN, RAIL } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';
import { Wave } from './wave';

/**
 * The day, down a rail.
 *
 * The rail is drawn per row — a dot, then a `flex: 1` line under it, omitted
 * on the last row. A single absolute line behind everything has to guess
 * where the last dot is; this one cannot be wrong, and it stops where the day
 * stops instead of running on to the tab bar.
 *
 * The gap between entries is `paddingBottom` on the content rather than a
 * margin on the row, so the row's own height includes it and the rail runs
 * through the gap instead of breaking at every joint.
 *
 * **The featured card absorbs the slack, the plain entries do not.** Giving
 * every entry an equal share fills the screen but leaves each short one
 * stranded at the top of a tall empty slot. One card growing is the version
 * that reads as a day.
 *
 * The card's wave field is drawn, and in range: an abstract pattern rather
 * than a picture of anything (AGENTS.md).
 */
export function Timeline({ onOpen }: { onOpen?: (id: string) => void }) {
  const { width } = useWindowDimensions();
  const cardW = width - MARGIN * 2 - RAIL;

  return (
    <View style={{ flex: 1 }}>
      {entries.map((e, i) => {
        const last = i === entries.length - 1;

        return (
          <View key={e.id} style={{ flexDirection: 'row', flex: e.featured ? 1 : undefined }}>
            <View style={{ width: RAIL, alignItems: 'center', paddingTop: e.featured ? 4 : 6 }}>
              <View
                style={{
                  width: DOT,
                  height: DOT,
                  borderRadius: radius.pill,
                  borderWidth: 2,
                  borderColor: on.ink,
                  backgroundColor: e.featured ? on.ink : on.canvas,
                }}
              />
              {last ? null : (
                <View style={{ flex: 1, width: 1.4, backgroundColor: on.ink, opacity: 0.85 }} />
              )}
            </View>

            <Pressable
              onPress={() => onOpen?.(e.id)}
              style={{ flex: 1, paddingBottom: ENTRY_GAP }}
              accessibilityRole="button"
              accessibilityLabel={e.title + ' at ' + e.at}
            >
              {e.featured ? (
                <View
                  style={{
                    flex: 1,
                    borderRadius: radius.card,
                    backgroundColor: on.panel,
                    overflow: 'hidden',
                    padding: CARD_PAD,
                  }}
                >
                  <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0 }}>
                    <Wave w={cardW} h={260} tint={on.wave} lines={18} />
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <T
                      variant="entryTitle"
                      color={on.onPanel}
                      style={{ flex: 1, height: type.entryTitle.line }}
                    >
                      {e.title}
                    </T>
                    <T
                      variant="entryTime"
                      color={on.onPanelDim}
                      style={{ height: type.entryTime.line }}
                    >
                      {e.at}
                    </T>
                  </View>

                  <T variant="entryBody" color={on.onPanelDim} style={{ flex: 1, marginTop: 4 }}>
                    {e.body}
                  </T>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {faces.map((f, k) => (
                      <Image
                        key={k}
                        source={f}
                        style={{
                          width: 36,
                          height: 36,
                          marginLeft: k === 0 ? 0 : -11,
                          borderRadius: radius.pill,
                          borderWidth: 2,
                          borderColor: on.panel,
                        }}
                        accessibilityIgnoresInvertColors
                      />
                    ))}
                    <View style={{ flex: 1 }} />
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: radius.control,
                        backgroundColor: on.surface,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Svg width={17} height={17} viewBox="0 0 24 24">
                        <Path
                          d="m5.6 12.4 4.2 4.4 8.6-9.6"
                          stroke={on.panel}
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <T
                      variant="entryTitle"
                      color={on.ink}
                      style={{ flex: 1, height: type.entryTitle.line }}
                    >
                      {e.title}
                    </T>
                    <T variant="entryTime" color={on.faint} style={{ height: type.entryTime.line }}>
                      {e.at}
                    </T>
                  </View>
                  <T variant="entryBody" color={on.faint} style={{ marginTop: 2 }}>
                    {e.body}
                  </T>
                </View>
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
