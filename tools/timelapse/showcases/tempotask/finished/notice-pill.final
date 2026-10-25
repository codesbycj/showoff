import { Pressable, View } from 'react-native';

import { copy } from '../data/task';
import { NOTICE_HEIGHT } from '../layout';
import { radius, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The one dark object on the page, telling you the week went well.
 *
 * Its dismiss control is a real 32dp disc rather than a bare 14dp cross, so
 * there is something to actually hit.
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
        paddingLeft: 13,
        paddingRight: 11,
      }}
    >
      <Glyph name="thumb" size={22} tint={tp.orange} />
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
