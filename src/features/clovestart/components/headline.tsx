import { View } from 'react-native';

import { GAP_HEAD_BODY } from '../layout';
import { ct, type } from '../theme';
import { copy } from '../data/start';
import { T } from './text';

/**
 * The promise and the sentence under it.
 *
 * The headline's line breaks are in the copy rather than left to wrapping:
 * "Track Your / Spending / Effortlessly" is the reference's own three-line
 * shape, and a wrap would re-break it at every width.
 */
export function Headline() {
  return (
    <View>
      <T variant="display" color={ct.ink}>
        {copy.headline}
      </T>
      <T variant="body" color={ct.inkSoft} style={{ marginTop: GAP_HEAD_BODY, maxWidth: 320 }}>
        {copy.body}
      </T>
    </View>
  );
}

/** Exported so the screen can reserve the exact height of three display lines. */
export const HEADLINE_LINES = 3 * type.display.line;
