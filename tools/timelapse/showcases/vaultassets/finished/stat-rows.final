import { Pressable, View } from 'react-native';

import { stats } from '../data/assets';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; gap: number; height: number; radius: number };

/**
 * The five figures under the headline.
 *
 * **They take the remainder**, each growing into an equal share of whatever is
 * left, so the screen is full to the bottom edge however tall the device is -
 * the fix for a short screen is to scale up, never to pad out (I3 / R1).
 *
 * Each row's fill sits on an absolutely-filled child so an emptied row paints
 * nothing in frame one of the reveal (I9).
 */
export function StatRows({ margin, gap, height, radius }: Props) {
  const tints = {
    yellow: ct.yellow,
    grey: ct.grey,
    blue: ct.blue,
    mint: ct.mint,
    beige: ct.beige,
  } as const;

  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {stats.map((stat) => (
        <Pressable
          key={stat.id}
          accessibilityRole="button"
          accessibilityLabel={`${stat.figure} ${stat.label}`}
        >
          <View style={{ height, borderRadius: radius, paddingHorizontal: 18 }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: tints[stat.tint],
                borderRadius: radius,
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <T variant="rowFigure">{stat.figure}</T>
                <T variant="rowLabel">{stat.label}</T>
              </View>

              <Glyph name={stat.icon} size={24} color={ct.ink} strokeWidth={1.8} />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
