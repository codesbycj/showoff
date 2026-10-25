import { Image, Pressable, View } from 'react-native';

import { me } from '../data/home';
import { HEADER_SIZE } from '../layout';
import { radius, tp } from '../theme';
import { Glyph } from './glyph';

/**
 * The row of controls across the top: a menu on the left, and search, alerts
 * and whoever is signed in on the right.
 *
 * The three discs are one component used three times rather than three
 * near-identical blocks, so the row cannot drift out of alignment. The avatar
 * is the same disc with a photograph in it — a face is a photograph, never a
 * drawn mark or a coloured initial.
 *
 * The bell's dot is the only thing on this screen in the action accent apart
 * from the button that starts something, which is what makes it read as "this
 * wants you" rather than as decoration.
 */
function Disc({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={{
          width: HEADER_SIZE,
          height: HEADER_SIZE,
          borderRadius: radius.control,
          backgroundColor: tp.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}

export function TopBar() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Disc>
        <Glyph name="menu" size={21} tint={tp.ink} />
      </Disc>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Disc>
          <Glyph name="search" size={20} tint={tp.ink} />
        </Disc>
        <Disc>
          <Glyph name="bell" size={20} tint={tp.ink} />
          <View
            style={{
              position: 'absolute',
              top: 11,
              right: 12,
              width: 8,
              height: 8,
              borderRadius: radius.control,
              backgroundColor: tp.orange,
              borderWidth: 1.6,
              borderColor: tp.card,
            }}
          />
        </Disc>
        <Pressable accessibilityRole="button" accessibilityLabel="Your profile">
          <Image
            source={me}
            style={{ width: HEADER_SIZE, height: HEADER_SIZE, borderRadius: radius.control }}
          />
        </Pressable>
      </View>
    </View>
  );
}
