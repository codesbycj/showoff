import { Pressable, View } from 'react-native';

import { fares, trip } from '../data/search';
import { CARD_PAD, DETAIL_HEIGHT, FIELD_HEIGHT } from '../layout';
import { radius, rv, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * When, in what, and for how many.
 *
 * Four fields in two rows, then the fare. The radios are real radios — a
 * filled ring and a label, each its own target — rather than a dot beside
 * text: a 10dp dot is a 10dp target, and this is the control that decides
 * what you pay.
 */
function Field({
  label,
  value,
  mark,
}: {
  label: string;
  value: string;
  mark: 'calendar' | 'seat' | 'person';
}) {
  return (
    <View style={{ flex: 1 }}>
      <T variant="fieldLabel" color={rv.muted} style={{ height: type.fieldLabel.line }}>
        {label}
      </T>
      <View
        style={{
          height: FIELD_HEIGHT,
          marginTop: 6,
          paddingHorizontal: 12,
          borderRadius: radius.field,
          backgroundColor: rv.canvas,
          borderWidth: 1,
          borderColor: rv.cardEdge,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Glyph name={mark} size={16} tint={rv.green} />
        <T variant="chip" color={rv.ink} style={{ flex: 1, marginLeft: 8, height: type.chip.line }}>
          {value}
        </T>
      </View>
    </View>
  );
}

export function DetailCard() {
  return (
    <View
      style={{
        height: DETAIL_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: rv.card,
        borderWidth: 1,
        borderColor: rv.cardEdge,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Field label={trip.departure.label} value={trip.departure.value} mark="calendar" />
        <Field label={trip.back.label} value={trip.back.value} mark="calendar" />
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Field label={trip.travelClass.label} value={trip.travelClass.value} mark="seat" />
        <Field label={trip.travellers.label} value={trip.travellers.value} mark="person" />
      </View>

      <View style={{ flexDirection: 'row' }}>
        {fares.map((f) => (
          <Pressable
            key={f.id}
            accessibilityRole="radio"
            accessibilityState={{ selected: f.on }}
            accessibilityLabel={f.label}
            style={{ flex: 1 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: radius.control,
                  borderWidth: 2,
                  borderColor: f.on ? rv.green : rv.cardEdge,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {f.on ? (
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: radius.control,
                      backgroundColor: rv.green,
                    }}
                  />
                ) : null}
              </View>
              <T
                variant="radio"
                color={f.on ? rv.ink : rv.body}
                style={{ marginLeft: 9, height: type.radio.line }}
              >
                {f.label}
              </T>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
