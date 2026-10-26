import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { BACK_SIZE, HEAD_TOP } from '../layout';
import { lk, radius } from '../theme';

/**
 * The way back.
 *
 * A 40dp disc, which clears a thumb on its own — the reference's is 32dp and
 * sits alone at the top of the screen, where a miss costs the whole flow.
 */
export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ marginTop: HEAD_TOP }}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
{/* STEP 1.03 a disc to go back
        <View
          style={{
            width: BACK_SIZE,
            height: BACK_SIZE,
            // MISTAKE 1.04 the disc came in half-faded
            opacity: 0.4,
            borderRadius: radius.pill,
            backgroundColor: lk.pill,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M14.4 5.6 8 12l6.4 6.4"
              stroke={lk.ink}
              strokeWidth={2.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
*/}
      </Pressable>
    </View>
  );
}
