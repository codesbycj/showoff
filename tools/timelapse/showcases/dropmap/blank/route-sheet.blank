import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { actions, avoid, modes, place, route, type ModeKey } from '../data/route';
import {
  ACTION_GAP,
  ACTION_HEIGHT,
  BLOCK_TOP,
  CLOSE,
  OPTION_GAP,
  OPTION_HEIGHT,
  SHEET_PAD,
} from '../layout';
import { dm, radius, shadow } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The sheet: where you are going, how, and how long it will take.
 *
 * Which mode is live is held here rather than in the chips: the chips are what
 * change it, but what it changes is the duration above them, and a component
 * that owns its own state cannot be driven from anywhere else.
 *
 * The "Start" action is wide and the other three are square. That is not
 * decoration — one of the four is the thing you came here to do, and giving
 * them equal weight is how a screen like this gets tapped wrongly.
 */
export function RouteSheet({
  bottomInset,
  onClose,
}: {
  bottomInset: number;
  onClose?: () => void;
}) {
  const [mode, setMode] = useState<ModeKey>('car');

  return (
    <View
      style={{
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        // MISTAKE 1.26 the sheet came in inset
        marginHorizontal: 24,
        backgroundColor: dm.sheet,
        paddingHorizontal: SHEET_PAD,
        paddingTop: 18,
        paddingBottom: bottomInset + 12,
        ...shadow.sheet,
      }}
    >
      {/* STEP 1.20 where you are going
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <T variant="title" color={dm.ink}>
            {place.name}
          </T>
          <T variant="address" color={dm.muted} style={{ marginTop: 3 }}>
            {place.address}
          </T>
        </View>

        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close">
          <View
            style={{
              width: CLOSE,
              height: CLOSE,
              borderRadius: radius.full,
              backgroundColor: dm.surface,
              borderWidth: 1,
              borderColor: dm.edge,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="close" size={15} color={dm.ink} strokeWidth={2.2} />
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ flexDirection: 'row', gap: OPTION_GAP, marginTop: BLOCK_TOP }}>
        {/* STEP 1.21 how you are getting there
        {modes.map((m) => (
          <Option
            key={m.key}
            label={m.label}
            glyph={m.key}
            on={m.key === mode}
            onPress={() => setMode(m.key)}
          />
        ))}
        */}
      </View>

      <View style={{ flexDirection: 'row', gap: OPTION_GAP, marginTop: OPTION_GAP }}>
        {/* STEP 1.22 and what to keep off
        {avoid.map((a) => (
          <Option key={a.key} label={a.label} glyph="check" on={a.on} />
        ))}
        */}
      </View>

      {/* STEP 1.23 how long it takes
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 7, marginTop: BLOCK_TOP }}>
        <T variant="duration" color={dm.time}>
          {route.duration}
        </T>
        <T variant="distance" color={dm.muted}>
          {route.distance}
        </T>
      </View>
      */}
      {/* STEP 1.24 and why that is the best of it
      <T variant="note" color={dm.muted} style={{ marginTop: 2 }}>
        {route.note}
      </T>
      */}

      <View style={{ flexDirection: 'row', gap: ACTION_GAP, marginTop: BLOCK_TOP }}>
        {/* STEP 1.25 then what to do about it
        {actions.map((a) => (
          <Action key={a.key} glyph={a.key} label={a.label} primary={a.key === 'start'} />
        ))}
        */}
      </View>
    </View>
  );
}

function Option({
  label,
  glyph,
  on,
  onPress,
}: {
  label: string;
  glyph: 'car' | 'bike' | 'check';
  on: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{ flex: 1 }}
    >
      <View
        style={{
          height: OPTION_HEIGHT,
          borderRadius: radius.chip,
          backgroundColor: on ? dm.blue : dm.surface,
          borderWidth: 1,
          borderColor: on ? dm.blue : dm.edge,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <Icon name={glyph} size={15} color={on ? dm.onBlue : dm.ink} strokeWidth={2.1} />
        <T variant="option" color={on ? dm.onBlue : dm.ink}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}

function Action({
  glyph,
  label,
  primary,
}: {
  glyph: 'start' | 'call' | 'share' | 'save';
  label: string | null;
  primary: boolean;
}) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Save'}
      style={label ? { flex: 1 } : undefined}
    >
      <View
        style={{
          height: ACTION_HEIGHT,
          width: label ? undefined : ACTION_HEIGHT,
          borderRadius: radius.chip,
          backgroundColor: primary ? dm.blue : dm.surface,
          borderWidth: 1,
          borderColor: primary ? dm.blue : dm.edge,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          opacity: held ? 0.85 : 1,
        }}
      >
        <Icon name={glyph} size={16} color={primary ? dm.onBlue : dm.ink} strokeWidth={2} />
        {label ? (
          <T variant="action" color={primary ? dm.onBlue : dm.ink}>
            {label}
          </T>
        ) : null}
      </View>
    </Pressable>
  );
}
