import { Image, View } from 'react-native';

import { crew, crewMore } from '../data/home';
import { CREW_FACE, CREW_HEIGHT, CREW_OVERLAP } from '../layout';
import { radius, shadow, tp, type } from '../theme';
import { T } from './text';

/**
 * Who is on the project, and who is about.
 *
 * The faces are photographs of real people (AGENTS.md, "Faces are
 * photographs"). Each carries a status dot, and the dot is drawn — a 10dp
 * circle is interface.
 *
 * They overlap by a fixed number of dp rather than by a share of the row, so
 * the stack keeps its rhythm whatever the row is given, and the overflow disc
 * sits apart from the stack so "10+" is not read as another person.
 */
export function CrewRow() {
  return (
    <View
      style={{
        height: CREW_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: tp.card,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        ...shadow.card,
      }}
    >
{/* STEP 1.10 face by face
      <View style={{ flexDirection: 'row' }}>
        {crew.map((p, i) => (
          <View key={p.id} style={{ marginLeft: i === 0 ? 0 : -CREW_OVERLAP }}>
            <Image
              source={p.src}
              style={{
                width: CREW_FACE,
                height: CREW_FACE,
                borderRadius: radius.control,
                borderWidth: 2.4,
                borderColor: tp.card,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: 1,
                bottom: 1,
                width: 11,
                height: 11,
                borderRadius: radius.control,
                backgroundColor: p.live ? tp.green : tp.orange,
                borderWidth: 2,
                borderColor: tp.card,
              }}
            />
          </View>
        ))}
      </View>
*/}

{/* STEP 1.13 and how many
      <View
        style={{
          width: CREW_FACE,
          height: CREW_FACE,
          borderRadius: radius.control,
          borderWidth: 1.4,
          borderColor: tp.hair,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="crew" color={tp.ink} style={{ height: type.crew.line }}>
          {crewMore}
        </T>
      </View>
*/}
    </View>
  );
}
