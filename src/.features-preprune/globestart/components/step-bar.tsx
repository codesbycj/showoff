import { View } from 'react-native';

import { segments } from '../data/start';
import { ct } from '../theme';
import { StepProps } from './_start-parts-shared';

/** The progress segments, one row each, so the bar fills a segment at a time. */
export function StepBar({ margin, height }: StepProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {segments.map((s) => (
        <View
          key={s.key}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            backgroundColor: s.done ? ct.stepOn : ct.step,
          }}
        />
      ))}
    </View>
  );
}
