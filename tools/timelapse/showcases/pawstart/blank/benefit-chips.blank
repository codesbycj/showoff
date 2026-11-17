import { View } from 'react-native';

import { benefits } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What the service promises.
 *
 * These are labels, not controls, so they carry no role and no tap target -
 * the choosing happens on the screens after this one.
 */
export function BenefitChips({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 7,
      }}
    >
      {benefits.map((benefit) => (
        <View
          key={benefit.id}
          style={{
            height,
            borderRadius: height / 2,
            paddingHorizontal: 12,
            justifyContent: 'center',
            backgroundColor: ct.sheet,
          }}
        >
          <T variant="benefit">{benefit.label}</T>
        </View>
      ))}
    </View>
  );
}
