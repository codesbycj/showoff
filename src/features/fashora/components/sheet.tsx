import { Children, type ReactNode } from 'react';
import { View } from 'react-native';

import { ELEV, R, SP, fa } from '../theme';

/**
 * The detail screen's bottom sheet — the white panel the specifications sit on.
 *
 * It is not a real sheet: nothing drags it and nothing dismisses it. The export
 * draws it as a section with rounded top shoulders that the page scrolls as one
 * piece, and the drag handle is decoration. Rebuilding it as a gesture-driven
 * sheet would add behaviour the reference does not have and the harness could
 * not check.
 *
 * `pb-32` is 128dp of tail, which is what keeps the last highlight row clear of
 * the sticky buy bar.
 *
 * With nothing in it the panel does not paint at all. It is a frame for its
 * contents and there is nothing to frame — and it keeps the sheet out of the
 * timelapse's blank state, where every child of it is still commented out and a
 * bare white shoulder would otherwise be the only thing on the screen.
 */
export function Sheet({ children }: { children?: ReactNode }) {
  if (!Children.count(children)) return null;

  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderTopLeftRadius: R.sheet,
        borderTopRightRadius: R.sheet,
        paddingHorizontal: SP.margin,
        paddingTop: SP.gutterMobile,
        paddingBottom: 128,
        ...ELEV.sheet,
      }}
    >
      <View style={{ alignItems: 'center', paddingVertical: SP.sm }}>
        <View
          style={{
            width: 44,
            height: 6,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerHighest,
          }}
        />
      </View>

      {children}
    </View>
  );
}
