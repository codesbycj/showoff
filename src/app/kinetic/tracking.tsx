import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RoundButton } from '@/features/kinetic/components/bits';
import {
  CourierMarker,
  DestinationPin,
  MapCanvas,
  MapControls,
} from '@/features/kinetic/components/map-canvas';
import { Symbol } from '@/features/kinetic/components/symbol';
import { CourierAvatar, TrackingSheet } from '@/features/kinetic/components/tracking-sheet';
import { TRACKING } from '@/features/kinetic/data/tracking';
import { SP, TYPE, kc, kineticTheme } from '@/features/kinetic/theme';

/**
 * Screen 2 — shipment details.
 *
 * A map under a transparent header, with the charcoal route sheet pinned to the
 * bottom. The whole thing scrolls as one column so the sheet's detail grid can
 * run past the fold on a short device, which is what the reference does — the
 * sheet is anchored, not a gesture-driven modal.
 *
 * There is no dock here. The reference does not draw one; the back button is
 * the way out.
 */
export default function KineticTracking() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[kineticTheme, { flex: 1, backgroundColor: kc.charcoal }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) + 20 }}
        style={{ backgroundColor: kc.bg }}
      >
        <View
          style={{
            paddingTop: insets.top,
            paddingHorizontal: SP.margin,
            backgroundColor: kc.bg,
          }}
        >
          <View
            style={{
              height: 64,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
              <RoundButton
                icon="arrowBackIosNew"
                size={40}
                iconSize={18}
                fill="transparent"
                onPress={() => router.back()}
                label="Go back"
              />
              <Text style={[TYPE.headlineMd, { color: kc.ink }]}>{TRACKING.title}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <RoundButton
                icon="share"
                size={40}
                iconSize={20}
                fill="transparent"
                color={kc.variant}
                label="Share"
              />
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: kc.rust,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol name="person" size={19} color={kc.onCoral} />
              </View>
            </View>
          </View>
        </View>

        <MapCanvas height={360}>
          <DestinationPin top={72} left={277} />
          <CourierMarker top={260} left={120} label={TRACKING.courierTag} />
          <MapControls onRecenter={() => router.push('/kinetic/fleet')} />
        </MapCanvas>

        <View style={{ marginTop: -20 }}>
          <TrackingSheet
            courierPhoto={<CourierAvatar size={52} />}
            onCall={() => router.push('/kinetic/fleet')}
            onMessage={() => router.push('/kinetic/fleet')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
