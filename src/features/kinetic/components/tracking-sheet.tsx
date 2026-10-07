import { Pressable, Text, View } from 'react-native';

import { ParcelBox } from './parcel-art';
import { Stepper } from './stepper';
import { Symbol } from './symbol';
import { DETAILS, TRACKING } from '../data/tracking';
import { FONT, LEVEL, R, TYPE, kc } from '../theme';

/**
 * The charcoal route sheet anchored to the bottom of the tracking screen.
 *
 * The spec calls this "Level 3": a `#1c1e21` surface with a grab handle, a top
 * hairline, and an upward shadow. Everything inside is inverted — white
 * headings, cool-grey metadata — and the one coral run is the order cost.
 *
 * The parcel render sits in the detail grid's right-hand column rather than
 * floating over it, so the six labelled cells and the art share one row and the
 * grid cannot collide with it at any text length.
 */
export function TrackingSheet({
  courierPhoto,
  onCall,
  onMessage,
}: {
  courierPhoto: React.ReactNode;
  onCall?: () => void;
  onMessage?: () => void;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: kc.charcoal,
          borderTopLeftRadius: R.sheet,
          borderTopRightRadius: R.sheet,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.08)',
          paddingHorizontal: 20,
          paddingTop: 12,
        },
        LEVEL.sheet,
      ]}
    >
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 44, height: 5, borderRadius: 2.5, backgroundColor: kc.handle }} />
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <View>
          <Text style={[TYPE.bodyMd, { color: kc.onDarkMuted }]}>{TRACKING.bookingLabel}</Text>
          <Text style={[TYPE.headlineLg, { color: kc.surface, marginTop: 2 }]}>
            {TRACKING.bookingId}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[TYPE.bodyMd, { color: kc.onDarkMuted }]}>{TRACKING.statusLabel}</Text>
          <View
            style={{
              backgroundColor: kc.charcoalRaised,
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              marginTop: 4,
            }}
          >
            <Text style={[TYPE.labelMd, { color: kc.surface }]}>{TRACKING.status}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Stepper
          onDark
          nodeSize={28}
          steps={[
            { state: 'done' },
            { state: 'done' },
            { state: 'icon', icon: 'localShipping', active: true },
            { state: 'icon', icon: 'inventory2' },
          ]}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: kc.charcoalEdge,
          gap: 12,
        }}
      >
        <View>
          <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]}>{TRACKING.createdLabel}</Text>
          <Text style={[TYPE.labelLg, { color: kc.inverseOnSurface, marginTop: 2 }]}>
            {TRACKING.createdPlace}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[TYPE.bodySm, { color: kc.onDarkLabel }]}>{TRACKING.estimatedLabel}</Text>
          <Text style={[TYPE.labelLg, { color: kc.inverseOnSurface, marginTop: 2 }]}>
            {TRACKING.estimatedPlace}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 8 }}>
        <View style={{ flex: 1, gap: 10 }}>
          {[0, 2, 4].map((start) => (
            <View key={start} style={{ flexDirection: 'row', gap: 4 }}>
              {DETAILS.slice(start, start + 2).map((d) => (
                <View key={d.key} style={{ flex: 1 }}>
                  <Text style={[TYPE.labelSm, { color: kc.onDarkLabel }]}>{d.label}</Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: FONT.semibold,
                      fontSize: 14,
                      lineHeight: 20,
                      color: d.accent ? kc.coralOnDark : kc.inverseOnSurface,
                      marginTop: 2,
                    }}
                  >
                    {d.value}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* The markup fixes this at `w-28 h-28` and right-aligns it in its
            column — as a flex share it stole width the metadata needs, and
            every value in the left column truncated. */}
        <View
          style={{
            width: 112,
            height: 112,
            borderRadius: R.md,
            backgroundColor: kc.surfaceLow,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <ParcelBox size={92} />
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
          marginTop: 20,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          {courierPhoto}
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.headlineSm, { color: kc.surface }]} numberOfLines={1}>
              {TRACKING.courierName}
            </Text>
            <Text style={[TYPE.bodyMd, { color: kc.onDarkMuted }]}>{TRACKING.courierRole}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable onPress={onCall} accessibilityRole="button" accessibilityLabel="Call courier">
            <View
              style={[
                {
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: kc.coral,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.fab,
              ]}
            >
              <Symbol name="call" size={22} color={kc.onCoral} />
            </View>
          </Pressable>

          <Pressable
            onPress={onMessage}
            accessibilityRole="button"
            accessibilityLabel="Message courier"
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: kc.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="chatBubble" size={22} color={kc.charcoal} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/**
 * The courier's portrait.
 *
 * The export links a photograph that no longer resolves, so it is drawn: a
 * figure in the coral cap and jacket the reference shows, with the online dot
 * the fleet screen also uses. `online` is a prop because the fleet screen
 * reuses this at a smaller size.
 */
export function CourierAvatar({ size = 52, online = false }: { size?: number; online?: boolean }) {
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#d9cbb8',
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.85)',
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* jacket */}
        <View
          style={{
            width: size * 0.78,
            height: size * 0.34,
            borderTopLeftRadius: size * 0.39,
            borderTopRightRadius: size * 0.39,
            backgroundColor: kc.coral,
          }}
        />
        {/* head */}
        <View
          style={{
            position: 'absolute',
            top: size * 0.24,
            width: size * 0.36,
            height: size * 0.36,
            borderRadius: size * 0.18,
            backgroundColor: '#8a5a3b',
          }}
        />
        {/* cap */}
        <View
          style={{
            position: 'absolute',
            top: size * 0.16,
            width: size * 0.44,
            height: size * 0.18,
            borderTopLeftRadius: size * 0.22,
            borderTopRightRadius: size * 0.22,
            backgroundColor: kc.rust,
          }}
        />
      </View>

      {online ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 2,
            width: size * 0.26,
            height: size * 0.26,
            borderRadius: size * 0.13,
            backgroundColor: '#22c55e',
            borderWidth: 2,
            borderColor: kc.charcoalRaised,
          }}
        />
      ) : null}
    </View>
  );
}
