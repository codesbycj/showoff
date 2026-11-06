import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import { MARGIN, PERSON } from '../layout';
import { ct, sheet, type } from '../theme';
import { copy, people } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Who you send to, with the way to add one at the head of the rail.
 *
 * The rail scrolls and is pinned to its own height — a `ScrollView` carries
 * `flexGrow: 1` and would otherwise take the sheet's spare space with it,
 * which is one of the two ways a hole appears on a screen like this.
 *
 * The faces are photographs. The reference's are Memoji, which are a 3D
 * render; the rules put people in photographs and say an initial on a disc
 * is a fallback rather than a substitute.
 */
export function QuickSend() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: PERSON + 22, flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'center' }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel={`${copy.add} a recipient`}>
        <View style={{ alignItems: 'center', marginRight: 18 }}>
          <View
            style={{
              width: PERSON,
              height: PERSON,
              borderRadius: PERSON / 2,
              borderWidth: 1.4,
              borderStyle: 'dashed',
              borderColor: sheet.dashed,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="plus" size={20} tint={sheet.ink} />
          </View>
          <T
            variant="person"
            color={sheet.muted}
            style={{ height: type.person.line, marginTop: 6 }}
          >
            {copy.add}
          </T>
        </View>
      </Pressable>

      {people.map((p) => (
        <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={`Send to ${p.name}`}>
          <View style={{ alignItems: 'center', marginRight: 18 }}>
            <View
              style={{
                width: PERSON,
                height: PERSON,
                borderRadius: PERSON / 2,
                overflow: 'hidden',
                backgroundColor: ct.cardPale,
              }}
            >
              <Image
                source={p.photo}
                style={{ width: PERSON, height: PERSON }}
                contentFit="cover"
              />
            </View>
            <T
              variant="person"
              color={sheet.ink}
              style={{ height: type.person.line, marginTop: 6 }}
            >
              {p.name}
            </T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
