import { Pressable, View } from 'react-native';

import { trip } from '../data/plan';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number };

/** When the trip leaves, and how many are going. */
export function TripOptions({ height }: Props) {
  const cell = {
    flex: 1,
    height,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  };

  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      {/* STEP 1.13 departure label
      <Pressable accessibilityRole="button" accessibilityLabel={trip.departure} style={cell}>
        <View>
          <T variant="fieldLabel">{trip.departureLabel}</T>
          <T variant="fieldValue" style={{ fontSize: 15.5, lineHeight: 21 }}>
            {trip.departure}
          </T>
        </View>
        <Glyph name="calendar" size={19} color={ct.accent} strokeWidth={1.7} />
      </Pressable>
      */}

      {/* STEP 1.14 view
      <View style={{ width: 1, marginVertical: 12, backgroundColor: ct.line }} />
      */}

      {/* STEP 1.15 party label
      <Pressable accessibilityRole="button" accessibilityLabel={trip.party} style={cell}>
        <View>
          <T variant="fieldLabel">{trip.partyLabel}</T>
          <T variant="fieldValue" style={{ fontSize: 15.5, lineHeight: 21 }}>
            {trip.party}
          </T>
        </View>
        <Glyph name="chevron" size={19} color={ct.muted} strokeWidth={1.9} />
      </Pressable>
      */}
    </View>
  );
}
