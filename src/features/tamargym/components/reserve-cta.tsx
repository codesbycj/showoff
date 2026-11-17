import { Pressable, View } from 'react-native';

import {
  PRICE,
  about,
  amenities,
  facts,
  pricing,
  usd,
  venue,
  yearSaving,
  yearly,
} from '../data/gym';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { CtaProps } from './_gym-body-shared';

/**
 * Reserve.
 *
 * The board floats this as a pill over its own cropped paragraph — a control
 * straddling the text under it, which R3 calls a FAIL outright. Here it is the
 * last block in the column, flush with the foot, so nothing is covered.
 *
 * Its fill and shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function ReserveCta({ margin, height, radius, onPress }: CtaProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Reserve at ${venue.name}`}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            backgroundColor: ct.dark,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#0B1A0F',
            shadowOpacity: 0.25,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 7,
          }}
        >
          {/* STEP 1.27 glyph
          <Glyph name="classes" size={17} color={ct.darkInk} strokeWidth={1.8} />
          */}
          {/* STEP 1.28 "Reserve"
          <T variant="reserve">Reserve</T>
          */}
        </View>
      )}
    </Pressable>
  );
}
