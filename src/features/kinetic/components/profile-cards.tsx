import { Pressable, Text, View } from 'react-native';

import { Card } from './bits';
import { Symbol } from './symbol';
import { PROFILE, type Group, type Row } from '../data/profile';
import { FONT, LEVEL, R, TYPE, kc } from '../theme';

/** The lime-free switch — coral when on, as everything interactive here is. */
export function Toggle({ on, onPress }: { on: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="switch" accessibilityState={{ checked: on }}>
      <View
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          padding: 3,
          backgroundColor: on ? kc.coral : kc.surfaceHighest,
          alignItems: on ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={[
            { width: 22, height: 22, borderRadius: 11, backgroundColor: kc.surface },
            LEVEL.card,
          ]}
        />
      </View>
    </Pressable>
  );
}

/**
 * The account header — avatar, name, tier chip, and the points strip.
 *
 * The points strip is nested inside the same card rather than being a sibling,
 * which is what gives it the inset look: it sits on `surface-container-low`
 * inside a white card, so it reads as a tray rather than a second card.
 */
export function AccountCard({ onRedeem }: { onRedeem?: () => void }) {
  return (
    <Card padding={16}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <AccountAvatar />

        <View style={{ flex: 1 }}>
          <Text style={[TYPE.headlineMd, { color: kc.ink }]} numberOfLines={1}>
            {PROFILE.name}
          </Text>
          <Text style={[TYPE.bodyMd, { color: kc.secondary }]} numberOfLines={1}>
            {PROFILE.email}
          </Text>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: kc.surfaceLow,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              marginTop: 8,
            }}
          >
            <Symbol name="stars" size={15} color="#e0a41f" />
            <Text style={[TYPE.labelMd, { color: kc.ink }]}>{PROFILE.tier}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: kc.surfaceLow,
          borderRadius: R.lg,
          padding: 12,
          marginTop: 16,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: kc.coralTint,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="loyalty" size={20} color={kc.rust} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[TYPE.labelLg, { color: kc.ink }]} numberOfLines={1}>
            {PROFILE.points}
          </Text>
          <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
            {PROFILE.pointsNote}
          </Text>
        </View>

        <Pressable onPress={onRedeem} accessibilityRole="button">
          <View
            style={{
              backgroundColor: kc.coral,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 999,
            }}
          >
            <Text style={[TYPE.labelMd, { color: kc.onCoral }]}>{PROFILE.redeem}</Text>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

/**
 * The account portrait, with the camera badge clipped to its corner.
 *
 * Drawn for the same reason as every other figure in this showcase — the
 * export links a photograph that no longer resolves.
 */
function AccountAvatar() {
  const size = 72;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#d8c6ae',
          borderWidth: 3,
          borderColor: kc.coralTint,
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: size * 0.76,
            height: size * 0.34,
            borderTopLeftRadius: size * 0.38,
            borderTopRightRadius: size * 0.38,
            backgroundColor: '#2b3a4a',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: size * 0.22,
            width: size * 0.36,
            height: size * 0.36,
            borderRadius: size * 0.18,
            backgroundColor: '#8a5a3b',
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          right: -2,
          bottom: 2,
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: kc.coral,
          borderWidth: 2,
          borderColor: kc.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="photoCamera" size={13} color={kc.onCoral} />
      </View>
    </View>
  );
}

/** The three counters below the account card. */
export function StatTiles() {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {PROFILE.stats.map((s) => (
        <View key={s.key} style={{ flex: 1 }}>
          <Card padding={14}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ marginBottom: 8 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: s.accent ? kc.coralTint : kc.surfaceLow,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Symbol name={s.icon} size={20} color={s.accent ? kc.coral : kc.ink} />
                </View>

                {s.accent ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: kc.coral,
                      borderWidth: 2,
                      borderColor: kc.surface,
                    }}
                  />
                ) : null}
              </View>

              <Text style={[TYPE.headlineMd, { color: s.accent ? kc.coral : kc.ink }]}>
                {s.value}
              </Text>
              <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
                {s.label}
              </Text>
            </View>
          </Card>
        </View>
      ))}
    </View>
  );
}

/** The default drop-off card. */
export function DropoffCard({
  onChange,
  onSwitch,
}: {
  onChange?: () => void;
  onSwitch?: () => void;
}) {
  return (
    <Card padding={16}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Symbol name="pinDrop" size={22} color={kc.coral} />
          <Text style={[TYPE.headlineSm, { color: kc.ink }]}>{PROFILE.dropoffTitle}</Text>
        </View>

        <Pressable onPress={onChange} accessibilityRole="button">
          <Text style={[TYPE.labelMd, { color: kc.coral }]}>{PROFILE.dropoffChange}</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: kc.surfaceLow,
          borderRadius: R.md,
          padding: 12,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.base,
            backgroundColor: kc.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="homePin" size={20} color={kc.ink} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[TYPE.labelLg, { color: kc.ink }]} numberOfLines={1}>
              {PROFILE.dropoff.name}
            </Text>
            <View
              style={{
                backgroundColor: kc.surfaceHigh,
                paddingHorizontal: 8,
                paddingVertical: 1,
                borderRadius: 999,
              }}
            >
              <Text style={[TYPE.labelSm, { color: kc.secondary }]}>{PROFILE.dropoff.tag}</Text>
            </View>
          </View>

          <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
            {PROFILE.dropoff.address}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
            <Symbol name="doorFront" size={14} color={kc.coral} />
            <Text style={[TYPE.labelSm, { color: kc.coral }]} numberOfLines={1}>
              {PROFILE.dropoff.note}
            </Text>
          </View>
        </View>

        <Symbol name="chevronRight" size={20} color={kc.secondary} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <Symbol name="apartment" size={18} color={kc.secondary} />
          <Text style={[TYPE.bodyMd, { color: kc.secondary }]} numberOfLines={1}>
            {PROFILE.alternate}
          </Text>
        </View>

        <Pressable onPress={onSwitch} accessibilityRole="button">
          <Text style={[TYPE.labelMd, { color: kc.coral }]}>{PROFILE.switchLabel}</Text>
        </Pressable>
      </View>
    </Card>
  );
}

/** A labelled group of setting rows, in one white card. */
export function SettingsGroup({ group, onRow }: { group: Group; onRow?: (key: string) => void }) {
  return (
    <View>
      <Text
        style={[
          TYPE.labelSm,
          {
            color: kc.secondary,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            paddingHorizontal: 4,
            marginBottom: 8,
          },
        ]}
      >
        {group.label}
      </Text>

      <Card padding={4}>
        {group.rows.map((row, i) => (
          <SettingsRow key={row.key} row={row} first={i === 0} onPress={() => onRow?.(row.key)} />
        ))}
      </Card>
    </View>
  );
}

function SettingsRow({ row, first, onPress }: { row: Row; first?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" disabled={row.kind === 'toggle'}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            gap: 12,
          },
          !first && { borderTopWidth: 1, borderTopColor: kc.surfaceLow },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.md,
              backgroundColor: row.tint === 'green' ? '#e7f6ec' : kc.surfaceLow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol
              name={row.icon}
              size={20}
              color={row.tint === 'green' ? kc.deliveredInk : kc.ink}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[TYPE.labelLg, { color: kc.ink }]}>{row.title}</Text>
            <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={2}>
              {row.subtitle}
            </Text>
          </View>
        </View>

        {row.kind === 'toggle' ? (
          <Toggle on={!!row.on} onPress={onPress} />
        ) : row.kind === 'badge' ? (
          <View
            style={{
              backgroundColor: kc.deliveredBg,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <Text style={[TYPE.labelSm, { color: kc.deliveredInk }]}>{row.badge}</Text>
          </View>
        ) : (
          <Symbol name="chevronRight" size={20} color={kc.secondary} />
        )}
      </View>
    </Pressable>
  );
}

/** The log-out card and the version line under it. */
export function LogoutCard({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ gap: 12 }}>
      <Pressable onPress={onPress} accessibilityRole="button">
        <Card padding={16}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Symbol name="logout" size={20} color={kc.coral} />
            <Text style={{ fontFamily: FONT.bold, fontSize: 15, color: kc.coral }}>
              {PROFILE.logout}
            </Text>
          </View>
        </Card>
      </Pressable>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <Symbol name="bolt" size={14} color={kc.secondary} />
        <Text style={[TYPE.bodySm, { color: kc.secondary }]}>{PROFILE.version}</Text>
      </View>
    </View>
  );
}
