import { View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { height: number; margin: number };

/** The mark, top left, as the board places it. */
export function BrandMark({ height, margin }: Props) {
  return (
    <View style={{ height, marginHorizontal: margin, justifyContent: 'center' }}>
      <Glyph name="logo" size={30} color={ct.deep} />
    </View>
  );
}
