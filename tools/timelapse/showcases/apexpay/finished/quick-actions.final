import { Pressable, Text, View } from 'react-native';

import type { QuickAction } from '../data/home';
import { ax, font, radius, shadow, type as t } from '../theme';
import { Symbol } from './symbol';

/**
 * The four-up action row inside the balance card.
 *
 * One tile is featured and filled chartreuse; the other three are
 * `surface-container-high`. Both states are the same box — 82 tall, a 32dp
 * icon well, a label under it — and only the three fills differ, so the
 * featured one is a set of colours rather than a second component.
 *
 * The featured label is set in bold where the others are medium. That is the
 * markup's own `font-bold` against `font-medium`, and at 12px it is the
 * difference between the tile reading as pressed and reading as merely
 * coloured.
 */
export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {actions.map((action) => {
        const on = action.featured === true;
        return (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            style={{
              flex: 1,
              height: 82,
              borderRadius: radius.tile,
              backgroundColor: on ? ax.signal : ax.surfaceHigh,
              boxShadow: on ? shadow.signalTile : undefined,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: radius.full,
                backgroundColor: on ? ax.onSignalWell : ax.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={action.icon} size={20} color={on ? ax.onSignal : ax.inkMuted} />
            </View>
            <Text
              style={[
                t.labelMd,
                {
                  fontFamily: on ? font.bold : font.medium,
                  color: on ? ax.onSignal : ax.ink,
                },
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
