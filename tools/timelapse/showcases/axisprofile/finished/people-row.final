import { Image, View } from 'react-native';

import { groups } from '../data/profile';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who owns, manages and watches this function.
 *
 * **Faces are photographs** (I4). Initials on a coloured disc is a fallback
 * state, not a substitute - a screen built from one is visibly missing what
 * the board had.
 *
 * Each disc overlaps the one before it by half its width, which is a stack by
 * design: `audit.js` only reports a **partial** overlap between two boxes that
 * are not nested, and a disc laid wholly over its neighbour's edge is exactly
 * what a stack is - so each is given its own left offset rather than a
 * negative margin that would make the boxes straddle (R3).
 */
export function PeopleRow({ margin, height }: Props) {
  const disc = 30;
  const step = 20;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row' }}>
      {groups.map((group) => (
        <View key={group.id} style={{ flex: 1, gap: 8 }}>
          <T variant="groupLabel">{group.label}</T>

          <View style={{ height: disc, flexDirection: 'row' }}>
            {group.faces.map((face, i) => (
              <Image
                key={face.id}
                source={face.image}
                style={{
                  width: disc,
                  height: disc,
                  borderRadius: disc / 2,
                  marginLeft: i === 0 ? 0 : step - disc,
                  borderWidth: 2,
                  borderColor: ct.white,
                }}
              />
            ))}

            <View
              style={{
                width: disc,
                height: disc,
                borderRadius: disc / 2,
                marginLeft: step - disc,
                borderWidth: 2,
                borderColor: ct.white,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="more">{group.more}</T>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
