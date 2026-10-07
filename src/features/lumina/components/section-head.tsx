import { Pressable, Text, View } from 'react-native';

import { FONT, ll } from '../theme';

/**
 * A section title with an optional action on the right.
 *
 * Three screens use it at two sizes — 14dp on the home dashboard, 16dp in the
 * library — so the size is a prop rather than two near-identical components.
 * The action is a plain string; whether it navigates is the screen's business.
 */
export function SectionHead({
  title,
  action,
  size = 14,
  onAction,
}: {
  title: string;
  action?: string;
  size?: number;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: size,
          lineHeight: size + 6,
          letterSpacing: -0.3,
          color: ll.ink,
        }}
      >
        {title}
      </Text>

      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" disabled={!onAction}>
          <Text
            style={{
              fontFamily: FONT.semibold,
              fontSize: size === 14 ? 11 : 12,
              lineHeight: 16,
              color: ll.muted,
            }}
          >
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
