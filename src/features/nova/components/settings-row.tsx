import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Group, Row } from '../data/settings';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * The lime switch.
 *
 * Purely presentational — it renders the state it is given and reports taps,
 * so the screen owns whether anything actually changes. A real `Switch` is not
 * used because its track and thumb sizes are the platform's, and the reference
 * has specific ones.
 */
export function Toggle({ on, onPress }: { on: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="switch" accessibilityState={{ checked: on }}>
      <View
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          padding: 3,
          backgroundColor: on ? nv.lime : '#e5e7eb',
          alignItems: on ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
        }}
      >
        <View
          style={[
            { width: 22, height: 22, borderRadius: 11, backgroundColor: '#ffffff' },
            LEVEL.sm,
          ]}
        />
      </View>
    </Pressable>
  );
}

/** One row inside a settings group. */
export function SettingsRow({
  row,
  first,
  onPress,
}: {
  row: Row;
  /** Every row but the first carries the divider above it. */
  first?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" disabled={row.kind === 'toggle'}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 14,
            paddingHorizontal: 14,
          },
          !first && { borderTopWidth: 1, borderTopColor: '#f6f7f8' },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.md,
              backgroundColor: nv.surfaceSunken,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={row.icon} size={18} color="#4b5563" />
          </View>

          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 14,
                lineHeight: 19,
                letterSpacing: -0.14,
                color: nv.ink,
              }}
            >
              {row.title}
            </Text>
            {row.subtitle ? (
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 12,
                  lineHeight: 16,
                  color: nv.subtle,
                  marginTop: 2,
                }}
              >
                {row.subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        {row.kind === 'toggle' ? (
          <Toggle on={!!row.on} onPress={onPress} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {row.value ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {row.dot ? (
                  <View
                    style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: nv.blue }}
                  />
                ) : null}
                {row.pill ? (
                  <View
                    style={{
                      backgroundColor: nv.surfaceSunken,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: R.sm,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONT.semibold,
                        fontSize: 13,
                        lineHeight: 17,
                        color: nv.ink,
                      }}
                    >
                      {row.value}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontFamily: FONT.semibold,
                      fontSize: 12,
                      lineHeight: 16,
                      color: nv.muted,
                    }}
                  >
                    {row.value}
                  </Text>
                )}
              </View>
            ) : null}
            <Icon name="chevronRight" size={16} color="#c2c7cf" strokeWidth={2.4} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

/** A labelled group of rows, in one white card. */
export function SettingsGroup({ group, onRow }: { group: Group; onRow?: (key: string) => void }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 11,
          lineHeight: 15,
          letterSpacing: 0.55,
          textTransform: 'uppercase',
          color: nv.subtle,
          paddingHorizontal: 8,
          marginBottom: 8,
        }}
      >
        {group.label}
      </Text>

      <View
        style={[
          {
            backgroundColor: nv.surface,
            borderRadius: R.lg,
            paddingHorizontal: 4,
            borderWidth: 1,
            borderColor: nv.border,
          },
          LEVEL.card,
        ]}
      >
        {group.rows.map((row, i) => (
          <SettingsRow key={row.key} row={row} first={i === 0} onPress={() => onRow?.(row.key)} />
        ))}
      </View>
    </View>
  );
}
