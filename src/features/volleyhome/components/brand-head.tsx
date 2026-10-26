import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { HEAD_TOP, WELCOME_TOP } from '../layout';
import { type, vl } from '../theme';
import { Refresh } from './glyphs';
import { T } from './text';

/**
 * The brand, and the greeting under it.
 *
 * The wordmark is set in this showcase's own typeface — the brand here is
 * invented, so there is nothing of anyone else's to trace.
 */
export function BrandHead({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 the name
        <T variant="wordmark" color={vl.green} style={{ flex: 1, height: type.wordmark.line }}>
          {copy.brand}
        </T>
*/}

        <Pressable onPress={onRefresh} accessibilityRole="button" accessibilityLabel="Refresh">
          <Refresh tint={vl.ink} />
        </Pressable>
      </View>

{/* STEP 1.04 and the greeting
      <T
        variant="welcome"
        color={vl.ink}
        style={{ marginTop: WELCOME_TOP, height: type.welcome.line }}
      >
        {copy.welcome}
      </T>
*/}
    </View>
  );
}
