import { Pressable, View } from 'react-native';

import { copy } from '../data/home';
import { NOTICE_HEIGHT } from '../layout';
import { radius, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The one dark object on the page: how much is waiting for you today.
 *
 * It is dismissible, and the control is a real 32dp disc with its own hit area
 * rather than a bare glyph — a cross drawn at 14dp is a 14dp target, which is
 * a third of what a thumb needs.
 */
export function NoticePill({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <View
      style={{
        height: NOTICE_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: tp.dark,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 11,
      }}
    >
      <Glyph name="bubble" size={24} tint={tp.green} />
      <T
        variant="notice"
        color={tp.onDark}
        style={{ flex: 1, marginLeft: 10, height: type.notice.line }}
      >
        {copy.notice}
      </T>
      <Pressable
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        hitSlop={8}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: radius.control,
            backgroundColor: tp.darkClose,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="close" size={15} tint={tp.onDark} />
        </View>
      </Pressable>
    </View>
  );
}
