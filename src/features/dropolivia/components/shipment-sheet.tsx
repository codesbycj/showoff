import Bell from 'lucide-react-native/icons/bell';
import Package from 'lucide-react-native/icons/package';
import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { header, shipment, steps, stepsDone } from '../data/track';
import {
  HEADER_AVATAR,
  HEADER_DISC,
  PARCEL_H,
  PARCEL_TOP,
  PROGRESS_DOT,
  PROGRESS_TOP,
  SHEET_PAD,
  STATUS_TOP,
  TRUCK_W,
} from '../layout';
import { dl, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

const TRUCK = require('../../../../assets/images/dropolivia/truck.jpg');

/**
 * Everything about the parcel that is moving: who is waiting for it, where it
 * is, what it is called, and how far along it is.
 *
 * The lorry is a photograph in a rounded tile rather than a cut-out. A lorry
 * is a large, specific subject and out of drawing range (AGENTS.md), and stock
 * of one on a seamless backdrop does not exist — a tile keeps the photograph
 * honest and avoids a halo that would show on every frame.
 */
export function ShipmentSheet({ topInset, onAlerts }: { topInset: number; onAlerts?: () => void }) {
  return (
    <View
      style={{
        backgroundColor: dl.sheet,
        borderBottomLeftRadius: radius.sheet,
        borderBottomRightRadius: radius.sheet,
        paddingTop: topInset + 10,
        paddingBottom: 22,
        paddingHorizontal: SHEET_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={FACES[0]}
          style={{ width: HEADER_AVATAR, height: HEADER_AVATAR, borderRadius: radius.full }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="greetingMeta" color={dl.inkSoft}>
            {header.meta}
          </T>
          <T variant="greeting" color={dl.ink}>
            {header.name}
          </T>
        </View>
        <Pressable onPress={onAlerts} accessibilityRole="button" accessibilityLabel="Alerts">
          <View
            style={{
              width: HEADER_DISC,
              height: HEADER_DISC,
              borderRadius: radius.full,
              backgroundColor: dl.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={18} color={dl.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          marginTop: STATUS_TOP,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="status" color={dl.ink}>
          {shipment.status}
        </T>
        <View
          style={{
            height: 30,
            paddingHorizontal: 13,
            borderRadius: radius.pill,
            backgroundColor: dl.chip,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="chip" color={dl.ink}>
            {shipment.chip}
          </T>
        </View>
      </View>
      <T variant="statusMeta" color={dl.inkSoft}>
        {shipment.eta}
      </T>

      <View style={{ marginTop: PARCEL_TOP, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            flex: 1,
            height: PARCEL_H,
            borderRadius: radius.card,
            backgroundColor: dl.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 11,
            gap: 11,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: radius.tile,
              backgroundColor: dl.sheetCard,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Package size={21} color="#c08a1e" strokeWidth={1.9} />
          </View>
          <View>
            <T variant="tracking" color={dl.ink}>
              {shipment.tracking}
            </T>
            <T variant="trackingMeta" color={dl.inkSoft}>
              {shipment.trackingLabel}
            </T>
          </View>
        </View>

        <Image
          source={TRUCK}
          style={{ width: TRUCK_W, height: PARCEL_H, borderRadius: radius.card }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>

      <View style={{ marginTop: PROGRESS_TOP }}>
        <Svg width="100%" height={PROGRESS_DOT} viewBox="0 0 100 12" preserveAspectRatio="none">
          <Line
            x1={2}
            y1={6}
            x2={98}
            y2={6}
            stroke={dl.track}
            strokeWidth={1.4}
            strokeDasharray="2 2"
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {steps.map((s, i) => (
            <View
              key={s.key}
              style={{
                width: PROGRESS_DOT,
                height: PROGRESS_DOT,
                borderRadius: radius.full,
                backgroundColor: dl.track,
                opacity: i <= stepsDone ? 1 : 0.35,
              }}
            />
          ))}
        </View>
        <View
          style={{
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {steps.map((s) => (
            <T key={s.key} variant="step" color={dl.ink}>
              {s.label}
            </T>
          ))}
        </View>
      </View>
    </View>
  );
}
