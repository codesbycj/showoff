import { Image, Pressable, View } from 'react-native';

import { assessors } from '../data/risk';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; rowH: number; radius: number };

/**
 * Who is assessing it, and at what stage.
 *
 * **Faces are photographs** (I4). The stage chips carry ink cut deep enough to
 * read on their own tint: the board's magenta lands at 4.3:1 as a letterform,
 * just under the floor (R4).
 *
 * The card's fill sits on an absolutely-filled child so an emptied card paints
 * nothing in frame one of the reveal (I9).
 */
export function AssessorList({ margin, rowH, radius }: Props) {
  const tints = { lavender: ct.lavenderTile, pink: ct.pinkTile } as const;

  return (
    <View style={{ marginHorizontal: margin, borderRadius: radius, paddingVertical: 6 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ct.white,
          borderRadius: radius,
        }}
      />

      {/* STEP 1.26 name
      {assessors.map((assessor) => (
        <Pressable
          key={assessor.id}
          accessibilityRole="button"
          accessibilityLabel={`${assessor.name}, ${assessor.stage}`}
        >
          <View
            style={{
              height: rowH,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={assessor.image}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              accessibilityIgnoresInvertColors
            />

            <View style={{ flex: 1 }}>
              <T variant="name">{assessor.name}</T>
            </View>

            <View
              style={{
                height: 30,
                borderRadius: 15,
                paddingHorizontal: 14,
                justifyContent: 'center',
                backgroundColor: tints[assessor.tint],
              }}
            >
              <T variant={assessor.tint === 'lavender' ? 'stageIndigo' : 'stageMagenta'}>
                {assessor.stage}
              </T>
            </View>
          </View>
        </Pressable>
      ))}
      */}
    </View>
  );
}
