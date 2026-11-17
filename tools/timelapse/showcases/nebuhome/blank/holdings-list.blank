import { ScrollView, View } from 'react-native';

import { holdings } from '../data/home';
import { FeaturedHolding } from './featured-holding';
import { HoldingRow } from './holding-row';

type Props = {
  margin: number;
  width: number;
  rowH: number;
  featureH: number;
  radius: number;
  gap: number;
  bottomPad: number;
};

/**
 * The portfolio.
 *
 * The first row is the featured card and the rest are plain rows, which is how
 * the board draws it. The list's content is taller than the space it has, so
 * it runs under the floating dock rather than leaving a band at the foot (I3).
 */
export function HoldingsList({ margin, width, rowH, featureH, radius, gap, bottomPad }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: bottomPad }}
    >
      {holdings.map((holding) =>
        holding.insight ? (
          <FeaturedHolding
            key={holding.id}
            holding={holding}
            width={width}
            height={featureH}
            rowH={rowH}
            radius={radius}
          />
        ) : (
          <View key={holding.id}>
            <HoldingRow holding={holding} height={rowH} radius={radius} />
          </View>
        ),
      )}
    </ScrollView>
  );
}
