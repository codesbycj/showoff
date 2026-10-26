import { Image, View } from 'react-native';

import { parcel } from '../data/start';
import { BRACKET, BRACKET_W, FRAME_MIN, FRAME_RADIUS, FRAME_TOP } from '../layout';
import { cr } from '../theme';

/**
 * One corner bracket of the viewfinder.
 *
 * Drawn as two borders on an empty box rather than as SVG, so each corner is
 * a single `View` the reveal can land on its own.
 */
function Corner({ at }: { at: 'tl' | 'tr' | 'bl' | 'br' }) {
  const top = at === 'tl' || at === 'tr';
  const left = at === 'tl' || at === 'bl';

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: BRACKET,
        height: BRACKET,
        ...(top ? { top: 16 } : { bottom: 16 }),
        ...(left ? { left: 16 } : { right: 16 }),
        ...(top ? { borderTopWidth: BRACKET_W } : { borderBottomWidth: BRACKET_W }),
        ...(left ? { borderLeftWidth: BRACKET_W } : { borderRightWidth: BRACKET_W }),
        borderColor: cr.surface,
        ...(at === 'tl' ? { borderTopLeftRadius: 18 } : null),
        ...(at === 'tr' ? { borderTopRightRadius: 18 } : null),
        ...(at === 'bl' ? { borderBottomLeftRadius: 18 } : null),
        ...(at === 'br' ? { borderBottomRightRadius: 18 } : null),
      }}
    />
  );
}

/**
 * The viewfinder: a photograph with four brackets drawn over it.
 *
 * The parcel is a photograph because it is a picture of something, which is
 * the bitmap side of the drawing-range rule (AGENTS.md). The frame around it
 * is drawn, because a bracket is an idea.
 *
 * The `Image` carries an explicit `width` and `height` of `'100%'` as well as
 * its absolute insets: insets alone make an `Image` paint nothing, silently.
 *
 * There is no `elevation` on this box, because `overflow: 'hidden'` and
 * `elevation` on one View is unreliable on Android and the clip is what
 * matters here.
 */
export function ScanFrame() {
  return (
    <View
      style={{
        flex: 1,
        minHeight: FRAME_MIN,
        marginTop: FRAME_TOP,
        borderRadius: FRAME_RADIUS,
        overflow: 'hidden',
        backgroundColor: cr.panelSoft,
        // MISTAKE 1.21 the frame came in square on one corner
        borderTopLeftRadius: 0,
      }}
    >
{/* STEP 1.08 what the camera sees
      <Image
        source={parcel}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
*/}

{/* STEP 1.09 one corner
      <Corner at="tl" />
*/}
{/* STEP 1.10 another
      <Corner at="tr" />
*/}
{/* STEP 1.11 another
      <Corner at="bl" />
*/}
{/* STEP 1.12 and the last
      <Corner at="br" />
*/}
    </View>
  );
}
