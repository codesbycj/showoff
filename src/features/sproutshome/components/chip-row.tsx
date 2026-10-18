import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { chips } from '../data/home';
import { CHIP_GAP, CHIP_HEIGHT, MARGIN } from '../layout';
import { radius, sp } from '../theme';
import { T } from './text';

type Chip = (typeof chips)[number];

/**
 * The aisles, in a row that runs off the right edge.
 *
 * A horizontal scroll and not a wrap: the reference clips the last chip at the
 * screen edge, and a wrap layout physically cannot reproduce that (AGENTS.md,
 * "Verifying pixel accuracy").
 */
export function ChipRow({ onSelect }: { onSelect?: (c: Chip) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CHIP_GAP }}
    >
      {chips.map((c) => (
        <Pressable
          key={c.key}
          onPress={() => onSelect?.(c)}
          accessibilityRole="button"
          accessibilityLabel={c.label}
        >
          <View
            style={{
              height: CHIP_HEIGHT,
              paddingLeft: 7,
              paddingRight: 16,
              borderRadius: radius.pill,
              backgroundColor: sp.chip,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: radius.full,
                backgroundColor: sp.greenDeep,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Leaf size={14} />
            </View>
            <T variant="chip" color={sp.chipInk}>
              {c.label}
            </T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

/** The aisle mark. A leaf is a flat mark — drawing range. */
function Leaf({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path d="M18 2 C10 2 3 6 3 12 C3 15 4.6 17.4 7 17.4 C13 17.4 18 11 18 2 Z" fill={sp.green} />
      <Path
        d="M15 5 C11 8 8 11.6 6.6 16"
        stroke={sp.greenDeep}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
