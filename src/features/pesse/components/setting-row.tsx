import { Pressable, Text, View } from 'react-native';

import { type SettingRow as Row } from '../data/settings';
import { FONT, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * One row of a settings group: an icon well, a stacked title and subtitle, and
 * whatever the row's `trailing` says sits at the right.
 *
 * Rows are divided by a hairline rather than spaced apart, and the hairline is
 * the row's own top border with the first row opting out. That keeps the group
 * a single card — drawing the dividers as separate Views between rows means the
 * group has to know how many rows it has.
 */
export function SettingRow({ row, first }: { row: Row; first: boolean }) {
  return (
    <Pressable accessibilityRole="button">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 14,
          borderTopWidth: first ? 0 : 1,
          borderTopColor: ps.hairline,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: ps.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={row.icon} size={20} color={ps.onSurface} />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[TYPE.labelLg, { color: ps.onSurface }]}>{row.title}</Text>
          <Text style={[TYPE.bodySm, { color: ps.secondary, marginTop: 1 }]} numberOfLines={1}>
            {row.subtitle}
          </Text>
        </View>

        <Trailing row={row} />
      </View>
    </Pressable>
  );
}

function Trailing({ row }: { row: Row }) {
  const t = row.trailing;

  if (t.kind === 'toggle') {
    return (
      <View
        style={{
          width: 48,
          height: 28,
          borderRadius: R.full,
          backgroundColor: t.on ? ps.lime : ps.surfaceHighest,
          padding: 3,
          alignItems: t.on ? 'flex-end' : 'flex-start',
        }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: t.on ? ps.onSurface : ps.surfaceLowest,
          }}
        />
      </View>
    );
  }

  if (t.kind === 'brand') {
    return (
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: R.sm * 0.6,
          backgroundColor: ps.onSurface,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.extrabold,
            fontStyle: 'italic',
            fontSize: 10,
            lineHeight: 13,
            letterSpacing: -0.3,
            color: ps.surfaceLowest,
          }}
        >
          {t.text}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {t.kind === 'pill' ? (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: R.full,
            backgroundColor: t.text === 'Active' ? ps.surfaceContainer : ps.lime,
          }}
        >
          <Text style={[TYPE.labelSm, { color: t.text === 'Active' ? ps.secondary : ps.onLime }]}>
            {t.text}
          </Text>
        </View>
      ) : null}

      {t.kind === 'count' ? (
        <View
          style={{
            minWidth: 22,
            height: 22,
            paddingHorizontal: 6,
            borderRadius: R.full,
            backgroundColor: ps.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[TYPE.labelSm, { color: ps.onLime }]}>{t.text}</Text>
        </View>
      ) : null}

      <Symbol name="chevronRight" size={20} color={ps.secondary} />
    </View>
  );
}
