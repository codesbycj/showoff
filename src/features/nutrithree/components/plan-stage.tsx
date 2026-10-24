import { Image, View } from 'react-native';

import { intro, macros } from '../data/plan';
import { nl, radius } from '../theme';
import { T } from './text';

const PLATE = require('../../../../assets/images/nutrithree/plate.jpg');

/**
 * What the plan comes to, with the meal it buys.
 *
 * The plate is a photograph: a plated meal is the example AGENTS.md gives for
 * a subject out of drawing range. It is round and bleeds off the right edge,
 * which is why it is placed absolutely at a negative offset rather than laid
 * out in the row — a row would push the macros left to make room for it.
 *
 * The macro bars are drawn, because a rounded bar is a flat mark.
 */
export function PlanStage({ width }: { width: number }) {
  const plate = width * 0.74;

  return (
    <View>
      {/* STEP 1.08 what it buys
      <Image
        source={PLATE}
        style={{
          position: 'absolute',
          right: -plate * 0.3,
          top: -plate * 0.04,
          width: plate,
          height: plate,
          borderRadius: radius.full,
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      */}

      {/* STEP 1.09 what it is called
      <T variant="display" color={nl.ink}>
        {intro.display}
      </T>
      */}

      <View style={{ marginTop: 24, gap: 26 }}>
        {/* STEP 1.10 and what is in it
        {macros.map((m, i) => (
          <View key={m.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 7,
                height: 38,
                borderRadius: radius.pill,
                backgroundColor: nl.macro[i % nl.macro.length],
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 7 }}>
              <T variant="macro" color={nl.ink}>
                {m.value}
              </T>
              <T variant="macroMeta" color={nl.muted}>
                {m.label}
              </T>
            </View>
          </View>
        ))}
        */}
      </View>
    </View>
  );
}
