import { Pressable, View } from 'react-native';

import { greeting } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/** The greeting, the date, and notifications. */
export function GreetRow({ margin, height }: Props) {
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
      {/* STEP 1.02 title
      <View>
        <T variant="greeting">{greeting.title}</T>
        <T variant="date">{greeting.date}</T>
      </View>
      */}

      {/* STEP 1.03 "Notifications"
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.tray,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="bell" size={19} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
