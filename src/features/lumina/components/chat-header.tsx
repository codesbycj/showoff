import { Text, View } from 'react-native';

import { Icon } from './icon';
import { MenuGlyph } from './menu-glyph';
import { RoundButton } from './round-button';
import { FONT, LEVEL, ll } from '../theme';

/**
 * The chat screen's top bar — back, a centred "AI Study Buddy" badge, and the
 * staggered menu.
 *
 * The badge is centred by the row's `space-between` rather than absolutely,
 * because the two buttons flanking it are the same 40dp width, so the middle
 * child lands on the screen's centre line on its own.
 */
export function ChatHeader({
  badge,
  onBack,
  onMenu,
}: {
  badge: string;
  onBack?: () => void;
  onMenu?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <RoundButton icon="back" iconSize={16} color="#3d4a3f" onPress={onBack} label="Go back" />

      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 16,
            paddingVertical: 9,
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
          },
          LEVEL.sm,
        ]}
      >
        <Icon name="sparkles" size={14} color={ll.ink} />
        <Text
          style={{
            fontFamily: FONT.semibold,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: -0.12,
            color: ll.ink,
          }}
        >
          {badge}
        </Text>
      </View>

      <RoundButton
        glyph={<MenuGlyph size={16} color="#3d4a3f" />}
        onPress={onMenu}
        label="Open menu"
      />
    </View>
  );
}
