import { View } from 'react-native';

import { ct } from '../theme';

type Props = { height: number };

/** The sheet's grab handle, as the board draws it. */
export function SheetHandle({ height }: Props) {
  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 38, height: 4.5, borderRadius: 3, backgroundColor: ct.line }} />
    </View>
  );
}
