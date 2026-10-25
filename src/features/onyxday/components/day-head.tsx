import { Image, View } from 'react-native';

import { avatar, copy, dateLabel } from '../data/start';
import { AVATAR, HEAD_TOP } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';

/**
 * What day it is, and who is looking at it.
 *
 * The date string is formatted from the one `Date` the week strip is built
 * from, so the heading and the strip cannot disagree — which is the
 * reference's bug on this screen.
 */
export function DayHead() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
      <View style={{ flex: 1 }}>
        <T variant="greeting" color={on.muted} style={{ height: type.greeting.line }}>
          {dateLabel}
        </T>
        <T variant="display" color={on.ink} style={{ height: type.display.line }}>
          {copy.title}
        </T>
      </View>
      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
