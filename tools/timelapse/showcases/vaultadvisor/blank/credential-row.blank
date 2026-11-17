import { View } from 'react-native';

import { credentials } from '../data/advisor';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What the advisor carries.
 *
 * The board ends on one line of trust copy and leaves the rest of the frame
 * empty; this is the row it crops, and inventing it is the sanctioned fix for
 * a short screen (I3). The rules between the three are hairlines drawn by the
 * gap, not by a divider that has to know how many entries there are - the
 * reveal fills the array one at a time (I7).
 */
export function CredentialRow({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', alignItems: 'center' }}>
      {credentials.map((credential, i) => (
        <View key={credential.id} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {i > 0 ? (
            <View style={{ width: 1, height: 34, backgroundColor: ct.ink, opacity: 0.18 }} />
          ) : null}

          <View style={{ flex: 1, alignItems: i === 0 ? 'flex-start' : 'center', gap: 2 }}>
            <T variant="credValue">{credential.value}</T>
            <T variant="credLabel">{credential.label}</T>
          </View>
        </View>
      ))}
    </View>
  );
}
