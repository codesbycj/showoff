import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { ArrowRight } from './icons';
import { ParcelDisc } from './parcel-disc';
import { LEVEL, TYPE, dt } from '../theme';

/**
 * One card on the Current Shipment rail.
 *
 * 245x135dp, measured at x 16..261 and y 443..577. Three bands: the parcel and
 * its status, two labelled figures, and the carrier strip.
 *
 * The white rim is a 2dp pad on the outer view rather than a border, so the
 * periwinkle strip can run to the inner view's edge and still be rounded by
 * it. The clip lives on that inner view, which carries no elevation — putting
 * `overflow: 'hidden'` and `elevation` on one view is what Android gets wrong.
 */

export const SHIPMENT_CARD_WIDTH = 245;

const PAD = 15;

export function ShipmentCard({
  title,
  product,
  badge,
  date,
  dateLabel,
  tracking,
  trackingLabel,
  carrier,
  onPress,
  onCarrier,
}: {
  title: string;
  product: string;
  badge: string;
  date: string;
  dateLabel: string;
  tracking: string;
  trackingLabel: string;
  carrier: string;
  onPress?: () => void;
  onCarrier?: () => void;
}) {
  return (
    // No `accessibilityRole="button"` on this wrapper, deliberately: react-
    // native-web renders that role as a real <button>, Expo's static web
    // output server-renders the page, and the HTML parser hoists a nested
    // <button> straight out of its parent. That is what sent this card's
    // arrow to the top-right corner of the screen and knocked the second
    // card out of the rail. The arrow inside keeps the role; the card around
    // it is a plain pressable surface.
    <Pressable onPress={onPress} accessibilityLabel={`${title}, ${product}`}>
      <View
        style={[
          {
            width: SHIPMENT_CARD_WIDTH,
            // Never let a row compress the card: it is 245dp in the
            // reference whether one card fits beside it or two.
            flexShrink: 0,
            height: 135,
            borderRadius: 20,
            backgroundColor: dt.surface,
            padding: 2,
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flex: 1, borderRadius: 18, overflow: 'hidden' }}>
          <LinearGradient
            colors={[dt.cardTop, dt.cardFoot, dt.surface]}
            locations={[0, 0.72, 1]}
            style={{ flex: 1, paddingHorizontal: PAD, paddingTop: 6 }}
          >
{/* STEP 1.27 the parcel, and what is in it
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <ParcelDisc size={32} />

              <View style={{ flex: 1, marginLeft: 11 }}>
                <Text style={[TYPE.rowTitle, { color: dt.ink }]}>{title}</Text>
                <Text style={[TYPE.bodySm, { color: dt.inkSoft, marginTop: 1 }]}>{product}</Text>
              </View>
            </View>
*/}

            {/* The badge sits over the title's line rather than in it: the
                product name underneath runs on past where the badge starts,
                so the two cannot share a row. */}
{/* STEP 1.28 how far it has got
            <View
              style={{
                position: 'absolute',
                top: 6,
                right: PAD,
                height: 16,
                borderRadius: 8,
                backgroundColor: dt.blue,
                paddingHorizontal: 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[TYPE.micro, { color: '#FFFFFF' }]}>{badge}</Text>
            </View>
*/}

{/* STEP 1.29 the two figures
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
              <View>
                <Text style={[TYPE.value, { color: dt.ink }]}>{date}</Text>
                <Text style={[TYPE.label, { color: dt.muted, marginTop: 4 }]}>{dateLabel}</Text>
              </View>

              <View style={{ marginLeft: 17 }}>
                <Text style={[TYPE.value, { color: dt.ink }]}>{tracking}</Text>
                <Text style={[TYPE.label, { color: dt.muted, marginTop: 4 }]}>{trackingLabel}</Text>
              </View>
            </View>
*/}
          </LinearGradient>

{/* STEP 1.30 who is carrying it
          <View
            style={{
              height: 34,
              backgroundColor: dt.carrierBand,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: PAD,
              paddingRight: PAD + 1,
            }}
          >
            <Text style={[TYPE.carrier, { color: dt.ink }]}>{carrier}</Text>

            <Pressable
              onPress={onCarrier}
              accessibilityRole="button"
              accessibilityLabel={`Open ${carrier}`}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: dt.navy,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowRight size={14} color={dt.onDark} />
              </View>
            </Pressable>
          </View>
*/}
        </View>
      </View>
    </Pressable>
  );
}
