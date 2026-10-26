import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { HEAD_TOP } from '../layout';
import { ls, type } from '../theme';
import { T } from './text';

/**
 * The name of the app, and when it last heard from the scales.
 *
 * The wordmark is set in the showcase's own typeface rather than traced from
 * the reference: the brand here is invented, so there is nothing to trace
 * (AGENTS.md, "Sourcing assets" — real marks are replaced, never copied).
 *
 * "devices" is a link, so it is a real `Pressable` with an underline rather
 * than a word that merely looks like one. The whole line is one `T` with
 * nested `T`s, so it wraps as a sentence instead of as three boxes.
 */
export function BrandHead({ onDevices }: { onDevices?: () => void }) {
  return (
    <View style={{ alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 the wordmark
      <T variant="wordmark" color={ls.ink} style={{ height: type.wordmark.line }}>
        {copy.brand}
      </T>
*/}

{/* STEP 1.04 and when it last synced
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
        <T variant="synced" color={ls.muted} style={{ height: type.synced.line }}>
          {copy.syncedBefore}
        </T>
        <Pressable
          onPress={onDevices}
          accessibilityRole="link"
          accessibilityLabel="Your devices"
          hitSlop={10}
        >
          <T
            variant="syncedLink"
            color={ls.ink}
            style={{ height: type.syncedLink.line, textDecorationLine: 'underline' }}
          >
            {copy.syncedLink}
          </T>
        </Pressable>
        <T variant="synced" color={ls.muted} style={{ height: type.synced.line }}>
          {copy.syncedAfter}
        </T>
      </View>
*/}
    </View>
  );
}
