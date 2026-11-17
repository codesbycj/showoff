import { Pressable, View } from 'react-native';

import { modes } from '../data/view';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onClose: () => void };

/** Close, the AR/Object switch, and share. */
export function ViewControls({ margin, height, onClose }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={onClose}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="close" size={19} color={ct.onDark} strokeWidth={1.9} />
        </View>
      </Pressable>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: ct.scrim,
          borderRadius: 18,
          padding: 3,
          gap: 2,
        }}
      >
        {modes.map((mode) => (
          <Pressable
            key={mode.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!mode.on }}
            accessibilityLabel={mode.label}
            hitSlop={{ top: 10, bottom: 10, left: 4, right: 4 }}
          >
            <View
              style={{
                paddingHorizontal: 16,
                height: 44,
                borderRadius: 15,
                backgroundColor: mode.on ? 'rgba(255,255,255,0.18)' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant={mode.on ? 'modeOn' : 'mode'}>{mode.label}</T>
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share this piece"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="share" size={19} color={ct.onDark} strokeWidth={1.8} />
        </View>
      </Pressable>
    </View>
  );
}
