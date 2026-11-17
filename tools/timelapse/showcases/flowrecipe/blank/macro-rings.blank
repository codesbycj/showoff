import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { macros, macroTotal } from '../data/recipe';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The dish's macros.
 *
 * **R9: each ring sweeps that macro's share of the three.** 34 g of protein
 * against 110 g in total is 31% of the circle, drawn with `strokeDasharray` —
 * not three identical arcs with different numbers inside them.
 *
 * `macroTotal` floors at one gram, because the reveal stages `macros` one
 * entry at a time and an empty list would divide by zero (I7).
 */
export function MacroRings({ margin, height }: Props) {
  const gid = useId();
  const tone = { rose: ct.rose, amber: ct.amber, lilac: ct.lilac } as const;

  const size = 56;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const total = macroTotal(macros);

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {macros.map((macro) => {
        const swept = circumference * Math.min(macro.grams / total, 1);
        return (
          <View key={macro.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
            >
              <Svg width={size} height={size} style={{ position: 'absolute' }}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={ct.line}
                  strokeWidth={stroke}
                  fill="none"
                />
                <Circle
                  key={`${gid}-${macro.id}`}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={tone[macro.colour]}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${swept} ${circumference}`}
                  fill="none"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </Svg>
            </View>

            <View>
              <T variant="macro">{macro.grams} g</T>
              <T variant="facts">{macro.label}</T>
            </View>
          </View>
        );
      })}
    </View>
  );
}
