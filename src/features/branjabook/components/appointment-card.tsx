import { Image, View } from 'react-native';

import { appointment } from '../data/book';
import { PANEL_W } from '../layout';
import { bj, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * The booking that is already made: what it is, when it is, and who is doing
 * it.
 *
 * The white panel is the half that carries the numbers, which is why it is a
 * fraction of the card rather than a fixed width — at 393dp the reference's
 * split is about 46%, and it has to stay a split on a 360dp phone rather than
 * becoming the whole card.
 */
export function AppointmentCard() {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: bj.card,
        borderWidth: 1,
        borderColor: bj.glassLine,
        padding: 14,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T variant="label" color={bj.onDarkSoft}>
            {appointment.label}
          </T>
          <T variant="booking" color={bj.onDark} style={{ marginTop: 6 }}>
            {appointment.title}
          </T>
          <T variant="bookingMeta" color={bj.onDarkSoft} style={{ marginTop: 4 }}>
            {appointment.meta}
          </T>
        </View>

        <View
          style={{
            width: `${PANEL_W * 100}%`,
            borderRadius: radius.panel,
            backgroundColor: bj.panel,
            padding: 12,
          }}
        >
          <T variant="day" color={bj.ink}>
            {appointment.day}
          </T>
          {appointment.slots.map((s, i) => (
            <View key={s.key} style={{ marginTop: i === 0 ? 10 : 8 }}>
              <T variant="slot" color={bj.ink}>
                {s.time}
              </T>
              <T variant="slotMeta" color={bj.muted}>
                {s.meta}
              </T>
            </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Image
          source={FACES[appointment.barber.face]}
          style={{ width: 32, height: 32, borderRadius: radius.full }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <T variant="barber" color={bj.onDark}>
            {appointment.barber.name}
          </T>
          <T variant="barberMeta" color={bj.onDarkSoft}>
            {appointment.barber.role}
          </T>
        </View>

        <View
          style={{
            paddingHorizontal: 9,
            paddingVertical: 4,
            borderRadius: radius.pill,
            backgroundColor: bj.discount,
          }}
        >
          <T variant="discount" color={bj.ink}>
            {appointment.discount}
          </T>
        </View>
      </View>
    </View>
  );
}
