import { Pressable, View } from 'react-native';

import { actions } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onTransfer?: () => void };

/** Transfer, withdraw, top up, more. Each disc is 56dp, over R7's floor. */
export function ActionRow({ margin, height, onTransfer }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {actions.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.id === 'transfer' ? onTransfer : undefined}
          style={{ alignItems: 'center', gap: 8 }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name={action.glyph} size={21} color={ct.ink} strokeWidth={1.9} />
          </View>
          <T variant="action">{action.label}</T>
        </Pressable>
      ))}
    </View>
  );
}
