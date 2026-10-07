import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Tool } from '../data/home';
import { FONT, LEVEL, ll } from '../theme';

/**
 * One square tool card in the home screen's three-up grid.
 *
 * The selected card swaps its white fill for mint and its pastel icon well for
 * a translucent white one; nothing else changes, so the three cards keep the
 * same box and the row cannot jump when the selection moves.
 */
export function ToolCard({ tool, onPress }: { tool: Tool; onPress?: () => void }) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            borderRadius: 22,
            paddingVertical: 16,
            paddingHorizontal: 8,
            alignItems: 'center',
            backgroundColor: tool.selected ? ll.mint : ll.surface,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.03)',
          },
          LEVEL.card,
        ]}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 16,
            backgroundColor: tool.tint,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <Icon name={tool.icon} size={17} color={tool.ink} />
        </View>

        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: -0.24,
            color: ll.ink,
            textAlign: 'center',
          }}
        >
          {tool.label}
        </Text>
      </View>
    </Pressable>
  );
}
