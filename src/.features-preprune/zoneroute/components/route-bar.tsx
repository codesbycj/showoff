import { Pressable, View } from 'react-native';

import { distanceKm, etaMinutes, rider, screen, steps } from '../data/route';
import { BarProps, Round } from './_route-sheet-shared';

/** The controls, floating over the map. Each sits wholly over the map rather
 *  than straddling anything it covers (R3). */
export function RouteBar({ margin, topInset, control, onBack }: BarProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        top: topInset + 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Round glyph="back" label="Back" size={control} onPress={onBack} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Round glyph="arrowUpRight" label="Share" size={control} />
        <Round glyph="search" label={screen.help} size={control} />
      </View>
    </View>
  );
}
