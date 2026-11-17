import { View } from 'react-native';

import { moods } from '../data/onboarding';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What a session can be built for.
 *
 * These are labels, not controls, so they carry no role and no tap target -
 * the screen they sit on is an onboarding page, and the choosing happens
 * after it.
 *
 * Each chip carries its own translucent ground because it sits on
 * photography, where the frame behind a string cannot be relied on for 4.5:1
 * (R4).
 */
export function MoodChips({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 8 }}>
      {moods.map((mood) => (
        <View
          key={mood.id}
          style={{
            height,
            borderRadius: height / 2,
            paddingHorizontal: 15,
            justifyContent: 'center',
            backgroundColor: ct.scrim,
          }}
        >
          <T variant="mood">{mood.label}</T>
        </View>
      ))}
    </View>
  );
}
