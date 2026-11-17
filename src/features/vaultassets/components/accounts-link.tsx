import { Pressable, View } from 'react-native';

import { footer } from '../data/assets';
import { T } from './text';

type Props = { height: number };

/**
 * The way out to the rest of the portfolio.
 *
 * A text link's tap target is its **line height**, so the anchor is padded to
 * 44dp rather than left at the 20dp the type gives it (R7).
 */
export function AccountsLink({ height }: Props) {
  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable accessibilityRole="link" accessibilityLabel={footer.accounts}>
        <View style={{ height: 44, paddingHorizontal: 8, justifyContent: 'center' }}>
          <T variant="pill">{footer.accounts}</T>
        </View>
      </Pressable>
    </View>
  );
}
