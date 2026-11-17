import { View } from 'react-native';

import { T } from './text';

type Props = { margin: number; height: number; label: string };

/** A section heading. */
export function SectionTitle({ margin, height, label }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="section">{label}</T>
    </View>
  );
}
