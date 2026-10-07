import { Pressable, Text, View } from 'react-native';

import { ActionButton, Card } from './bits';
import { Symbol } from './symbol';
import { CourierAvatar } from './tracking-sheet';
import { FLEET, type FleetUnit } from '../data/fleet';
import { FONT, LEVEL, R, TYPE, kc } from '../theme';

/**
 * The charcoal dispatch panel that sits over the bottom of the fleet map.
 *
 * It is the tracking sheet's sibling — same surface, same inverted type — but
 * squarer, because it floats inside the page's margin rather than being
 * anchored to the screen edge. The one thing it does not share is the grab
 * handle: nothing here is draggable.
 */
export function DispatchPanel({
  onCall,
  onMessage,
  onTurnByTurn,
  onAssign,
}: {
  onCall?: () => void;
  onMessage?: () => void;
  onTurnByTurn?: () => void;
  onAssign?: () => void;
}) {
  const d = FLEET.dispatch;

  return (
    <View
      style={[
        {
          backgroundColor: kc.charcoal,
          borderRadius: R.sheet,
          padding: 16,
        },
        LEVEL.dock,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          gap: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <Text
            style={[TYPE.labelMd, { color: kc.onDarkLabel, letterSpacing: 0.8 }]}
            numberOfLines={1}
          >
            {d.eyebrow.toUpperCase()}
          </Text>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: kc.coral }} />
          <Text style={[TYPE.headlineSm, { color: kc.surface }]}>{d.vehicle}</Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(224,227,229,0.2)',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={[TYPE.labelSm, { color: kc.surface, letterSpacing: 0.5 }]}>
            {d.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: kc.charcoalRaised,
          borderRadius: R.lg,
          padding: 12,
          marginBottom: 16,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <CourierAvatar size={44} online />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 15,
                lineHeight: 20,
                color: kc.surface,
              }}
              numberOfLines={1}
            >
              {d.driver}
            </Text>
            <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]}>{d.driverMeta}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable onPress={onCall} accessibilityRole="button" accessibilityLabel="Call driver">
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: kc.handle,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="call" size={19} color={kc.surface} />
            </View>
          </Pressable>

          <Pressable
            onPress={onMessage}
            accessibilityRole="button"
            accessibilityLabel="Message driver"
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: kc.coral,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="chatBubble" size={19} color={kc.onCoral} />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
        <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]} numberOfLines={1}>
          {d.stopsLabel}
        </Text>
        <Text style={[TYPE.labelSm, { color: kc.coral }]} numberOfLines={1}>
          {d.remaining}
        </Text>
      </View>

      {/* The route bar: three cleared stops, one in progress, one to go. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Node done />
        <Bar done />
        <Node done />
        <Bar done />
        <Node active />
        <Bar />
        <Node />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginTop: 16,
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]}>{d.destLabel}</Text>
          <Text style={[TYPE.headlineSm, { color: kc.surface, marginTop: 2 }]} numberOfLines={1}>
            {d.dest}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]}>{d.trackLabel}</Text>
          <Text style={[TYPE.labelLg, { color: kc.coral, marginTop: 2 }]}>{d.trackId}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <Pressable onPress={onTurnByTurn} accessibilityRole="button">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                backgroundColor: kc.charcoalRaised,
                paddingVertical: 13,
                paddingHorizontal: 8,
                borderRadius: 999,
              }}
            >
              <Symbol name="altRoute" size={16} color={kc.surface} />
              <Text style={[TYPE.labelMd, { color: kc.surface }]} numberOfLines={1}>
                {d.secondary}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={{ flex: 1.25 }}>
          <ActionButton label={d.primary} icon="addBox" tone="coral" compact onPress={onAssign} />
        </View>
      </View>
    </View>
  );
}

function Node({ done, active }: { done?: boolean; active?: boolean }) {
  if (active) {
    return (
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: kc.surface,
          borderWidth: 4,
          borderColor: kc.coral,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: done ? kc.coral : kc.handle,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {done ? <Symbol name="check" size={12} color={kc.onCoral} /> : null}
    </View>
  );
}

function Bar({ done }: { done?: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: done ? kc.coral : kc.handle,
      }}
    />
  );
}

/** One row on the "Active Fleet In Vicinity" list. */
export function FleetRow({ unit, onPress }: { unit: FleetUnit; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card padding={12}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.md,
                backgroundColor: kc.surfaceLow,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={unit.icon} size={22} color={kc.ink} />
            </View>
            <View
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: unit.online ? '#22c55e' : '#f59e0b',
                borderWidth: 2,
                borderColor: kc.surface,
              }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[TYPE.headlineSm, { color: kc.ink }]} numberOfLines={1}>
                {unit.name}
              </Text>
              <View
                style={{
                  backgroundColor: kc.surfaceHigh,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 999,
                }}
              >
                <Text style={[TYPE.labelSm, { color: kc.secondary }]}>{unit.tag}</Text>
              </View>
            </View>
            <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
              {unit.detail}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: unit.etaTone === 'good' ? kc.processBg : kc.surfaceHigh,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 999,
              }}
            >
              <Text
                style={[
                  TYPE.labelSm,
                  { color: unit.etaTone === 'good' ? kc.processInk : kc.secondary },
                ]}
              >
                {unit.eta}
              </Text>
            </View>
            <Text style={[TYPE.bodySm, { color: kc.secondary, marginTop: 3 }]} numberOfLines={1}>
              {unit.place}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
