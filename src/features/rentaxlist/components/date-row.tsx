import { Pressable, View } from 'react-native';

import { date } from '../data/browse';
import { TOGGLE, TOGGLE_GAP } from '../layout';
import { radius, rx } from '../theme';
import { Icon, type IconName } from './icon';
import { T } from './text';

/**
 * When you want the car, and how you want the list drawn.
 *
 * The date and the two view toggles share a row because they are the same kind
 * of thing — controls over the list below — and the reference puts them on one
 * line. The toggles are a pair with one live, so they take `view` and
 * `onView` rather than each owning its own state.
 */
export function DateRow({
  view,
  onView,
  onPickDate,
}: {
  view: 'rows' | 'grid';
  onView?: (v: 'rows' | 'grid') => void;
  onPickDate?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <T variant="fieldLabel" color={rx.onDarkMuted}>
            {date.label}
          </T>
          <Icon name="calendar" size={12} color={rx.onDarkMuted} />
        </View>

        <Pressable onPress={onPickDate} accessibilityRole="button" accessibilityLabel="Choose date">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5 }}>
            <Icon name="check" size={13} color={rx.check} strokeWidth={3} />
            <T variant="fieldValue" color={rx.onDark}>
              {date.value}
            </T>
            <Icon name="pick" size={14} color={rx.onDarkMuted} strokeWidth={2} />
          </View>
        </Pressable>
      </View>

      <Toggle name="rows" on={view === 'rows'} onPress={() => onView?.('rows')} />
      <View style={{ width: TOGGLE_GAP }} />
      <Toggle name="grid" on={view === 'grid'} onPress={() => onView?.('grid')} />
    </View>
  );
}

function Toggle({ name, on, onPress }: { name: IconName; on: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${name} view`}>
      <View
        style={{
          width: TOGGLE,
          height: TOGGLE,
          borderRadius: radius.tile,
          backgroundColor: on ? rx.onDark : rx.raised,
          borderWidth: 1,
          borderColor: on ? rx.onDark : rx.raisedEdge,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={name} size={15} color={on ? rx.canvas : rx.onDarkMuted} />
      </View>
    </Pressable>
  );
}
