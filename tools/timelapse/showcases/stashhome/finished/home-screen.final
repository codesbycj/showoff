import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { MemoryCard } from '@/features/stashhome/components/memory-card';
import { T } from '@/features/stashhome/components/text';
import { copy, dock, stats } from '@/features/stashhome/data/start';
import {
  DOCK_HEIGHT,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
  PANEL_TOP,
  STAT_GAP,
  STAT_HEIGHT,
  STATS_TOP,
  TITLE_TOP,
} from '@/features/stashhome/layout';
import { radius, st, type } from '@/features/stashhome/theme';
import { useInsets } from '@/features/stashhome/use-insets';

/** The brand's mark: two leaning slabs, which is the idea of a stack. */
function BrandMark({ size = 24, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 15.5 13 11l7 3.4-9 4.5Z" fill={tint} />
      <Path d="M4 10.5 13 6l7 3.4-9 4.5Z" fill={tint} opacity={0.55} />
    </Svg>
  );
}

/**
 * Stash — my storage.
 *
 * Assembly only: the brand and the two controls, what the screen is, the
 * three shares, how full the disk is, and the dock.
 *
 * The three shares and the ring are one reading: the shares are of what is
 * used, and the ring is what is used out of what there is.
 */
export default function StashhomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: st.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BrandMark size={26} tint={st.ink} />
        <View style={{ flex: 1 }} />
        <Pressable accessibilityRole="button" accessibilityLabel="Grid view">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: 12,
              backgroundColor: st.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24">
              {[4, 14].map((x) =>
                [4, 14].map((y) => (
                  <Circle key={`${x}-${y}`} cx={x + 3} cy={y + 3} r={3} fill={st.ink} />
                )),
              )}
            </Svg>
          </View>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Menu">
          <View
            style={{
              height: HEADER_SIZE,
              paddingHorizontal: 16,
              marginLeft: 8,
              borderRadius: radius.pill,
              backgroundColor: st.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="small" color={st.ink} style={{ height: type.small.line }}>
              menu
            </T>
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: TITLE_TOP }}>
        <T variant="display" color={st.ink} style={{ flex: 1, height: type.display.line }}>
          {copy.title}
        </T>
        <T variant="small" color={st.ink} style={{ marginRight: 8, height: type.small.line }}>
          {copy.search}
        </T>
        <View
          style={{
            width: HEADER_SIZE,
            height: HEADER_SIZE,
            borderRadius: radius.control,
            backgroundColor: st.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Circle cx={11} cy={11} r={6.4} stroke={st.ink} strokeWidth={1.9} fill="none" />
            <Path d="M15.8 15.8 20 20" stroke={st.ink} strokeWidth={1.9} strokeLinecap="round" />
          </Svg>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: STAT_GAP, marginTop: STATS_TOP }}>
        {stats.map((s) => (
          <View
            key={s.id}
            style={{
              flex: 1,
              height: STAT_HEIGHT,
              borderRadius: 16,
              backgroundColor: st.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="statLabel" color={st.ink} style={{ height: type.statLabel.line }}>
              {s.label}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <T variant="statValue" color={st.ink} style={{ height: type.statValue.line }}>
                {String(s.value)}
              </T>
              <T variant="statUnit" color={st.ink} style={{ height: type.statUnit.line }}>
                %
              </T>
            </View>
          </View>
        ))}
      </View>

      <View style={{ flex: 1, marginTop: PANEL_TOP }}>
        <MemoryCard />
      </View>

      <View
        style={{
          height: DOCK_HEIGHT,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {dock.map((d, i) => (
          <View key={d} style={{ flex: 1, alignItems: 'center' }}>
            <Pressable accessibilityRole="tab" accessibilityLabel={d}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: radius.control,
                  backgroundColor: i === 0 ? st.panel : st.card,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 5,
                    backgroundColor: i === 0 ? st.canvas : st.ink,
                    opacity: i === 0 ? 1 : 0.55,
                  }}
                />
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
