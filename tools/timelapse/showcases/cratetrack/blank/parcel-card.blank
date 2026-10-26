import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, parcel, route } from '../data/start';
import { CARD_PAD, CARD_RADIUS, THUMB } from '../layout';
import { cr, radius, type } from '../theme';
import { T } from './text';

/**
 * What is being tracked, and between where.
 *
 * The two ends are a row of two equal columns rather than a label pair with a
 * gap, so a long place name wraps inside its own half instead of pushing the
 * other one off the card.
 *
 * The places are invented. The reference names real neighbourhoods, and a
 * showcase has no business asserting where anyone's parcel is.
 */
export function ParcelCard({ onOpen }: { onOpen?: () => void }) {
  return (
    <View
      style={{
        borderRadius: CARD_RADIUS,
        backgroundColor: cr.surface,
        padding: CARD_PAD,
        // MISTAKE 1.22 the card came in square on one corner
        borderBottomLeftRadius: 0,
      }}
    >
{/* STEP 1.14 which parcel
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={parcel}
          style={{ width: THUMB, height: THUMB, borderRadius: 14 }}
          accessibilityIgnoresInvertColors
        />
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowId" color={cr.ink} style={{ height: type.rowId.line }}>
            {copy.code}
          </T>
          <T variant="rowName" color={cr.muted} style={{ height: type.rowName.line }}>
            {copy.name}
          </T>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: radius.pill,
            backgroundColor: cr.canvas,
          }}
        >
          <T variant="chip" color={cr.muted} style={{ height: type.chip.line }}>
            {copy.state}
          </T>
        </View>
      </View>
*/}

{/* STEP 1.15 and between where
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <T variant="label" color={cr.muted} style={{ height: type.label.line }}>
            {copy.senderLabel}
          </T>
          <T variant="place" color={cr.ink} style={{ height: type.place.line }}>
            {route.from}
          </T>
        </View>

        <View style={{ flex: 1 }}>
          <T variant="label" color={cr.muted} style={{ height: type.label.line }}>
            {copy.receiverLabel}
          </T>
          <T variant="place" color={cr.ink} style={{ height: type.place.line }}>
            {route.to}
          </T>
        </View>

        <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel="Open details">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: radius.pill,
              backgroundColor: cr.canvas,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path
                d="M12 5v12M7.4 12.4 12 17l4.6-4.6"
                stroke={cr.ink}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
*/}
    </View>
  );
}
