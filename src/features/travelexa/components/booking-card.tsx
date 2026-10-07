import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * The active itinerary card: photo on top, flight meta beneath, QR trigger at
 * the end of the meta row.
 *
 * The export also ships a "Digital Boarding Pass" tray behind that QR button,
 * hidden until its script opens it. It appears in no reference render, and
 * unlike Aura Legal's toast there is no second state worth building toward here
 * — the button is drawn and left inert, which is what the reference shows.
 */
export function BookingCard({
  status,
  place,
  tour,
  dates,
  gate,
  reference,
  image,
  saved,
  onToggleSave,
  onQr,
}: {
  status: string;
  place: string;
  tour: string;
  dates: string;
  gate: string;
  reference: string;
  image: number;
  saved: boolean;
  onToggleSave?: () => void;
  onQr?: () => void;
}) {
  return (
    <View
      style={{
        marginHorizontal: SP.margin,
        borderRadius: R.md,
        backgroundColor: tx.surfaceContainerLowest,
        padding: SP.md - 4,
        gap: SP.md - 4,
        ...ELEV.card,
      }}
    >
      <View style={{ height: 190, borderRadius: R.DEFAULT, overflow: 'hidden' }}>
        <Image
          source={image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={['transparent', alpha(tx.black, 0.2), alpha(tx.black, 0.7)]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        />

        <View
          style={{
            position: 'absolute',
            top: SP.md - 4,
            left: SP.md - 4,
            right: SP.md - 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.sm,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: alpha(tx.surfaceContainerLowest, 0.9),
            }}
          >
            <View
              style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: '#34d399' }}
            />
            <Text style={{ ...TYPE.labelSm, color: tx.onSurface }}>{status}</Text>
          </View>

          <Pressable onPress={onToggleSave} accessibilityLabel="Save booking">
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: R.full,
                backgroundColor: alpha(tx.surfaceContainerLowest, 0.9),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="favorite" size={18} color={saved ? tx.secondary : tx.onSurface} />
            </View>
          </Pressable>
        </View>

        <View style={{ position: 'absolute', left: SP.md, right: SP.md, bottom: SP.md, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <Symbol name="locationOn" size={15} color={alpha(tx.white, 0.9)} />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.4, color: alpha(tx.white, 0.9) }}>
              {place.toUpperCase()}
            </Text>
          </View>
          <Text style={{ ...TYPE.headlineSm, color: tx.onPrimary }}>{tour}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: SP.sm, gap: SP.sm }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: SP.sm,
          }}
        >
          <View style={{ flexShrink: 1, gap: SP.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Symbol name="calendarToday" size={16} color={tx.onSurfaceVariant} />
              <Text style={{ ...TYPE.labelMd, color: tx.onSurfaceVariant }}>{dates}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flexWrap: 'wrap' }}
            >
              <View
                style={{
                  paddingHorizontal: SP.sm,
                  paddingVertical: 2,
                  borderRadius: R.full,
                  backgroundColor: tx.surfaceContainer,
                }}
              >
                <Text style={{ ...TYPE.labelSm, color: tx.onSurfaceVariant }}>{gate}</Text>
              </View>
              <Text style={{ ...TYPE.labelSm, color: tx.onSurfaceVariant }}>{reference}</Text>
            </View>
          </View>

          <Pressable onPress={onQr} accessibilityRole="button" accessibilityLabel="Boarding pass">
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: R.DEFAULT,
                backgroundColor: tx.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="qrCode2" size={22} color={tx.onPrimary} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
