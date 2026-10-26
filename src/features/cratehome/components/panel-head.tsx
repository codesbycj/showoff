import { Image, Pressable, View } from 'react-native';

import { avatar } from '../data/start';
import { AVATAR, BELL, HEAD_TOP } from '../layout';
import { cr, radius } from '../theme';
import { Glyph } from './glyph';

/**
 * Who is signed in, and the one notification control.
 *
 * The avatar is a photograph, per AGENTS.md, with numeric width and height —
 * absolute insets alone make an `Image` paint nothing, silently.
 */
export function PanelHead({ onBell }: { onBell?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.04 their photograph
      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
*/}
      <View style={{ flex: 1 }} />
{/* STEP 1.05 and the bell
      <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: BELL,
            height: BELL,
            borderRadius: radius.pill,
            backgroundColor: cr.panelSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="bell" size={18} tint={cr.onPanel} />
          <View
            style={{
              position: 'absolute',
              right: 9,
              top: 9,
              width: 8,
              height: 8,
              borderRadius: radius.pill,
              backgroundColor: cr.orange,
            }}
          />
        </View>
      </Pressable>
*/}
    </View>
  );
}
