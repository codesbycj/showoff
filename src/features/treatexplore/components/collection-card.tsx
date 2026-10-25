import { Image, Pressable, View } from 'react-native';

import { collections } from '../data/explore';
import { CARD_ART, CARD_BADGE, CARD_HEIGHT } from '../layout';
import { radius, tr } from '../theme';
import { T } from './text';

const PACKS = {
  cream: require('../../../../assets/images/treatexplore/pack-cream.jpg'),
  peach: require('../../../../assets/images/treatexplore/pack-peach.jpg'),
  lemon: require('../../../../assets/images/treatexplore/pack-lemon.jpg'),
} as const;

const SNACKS = [
  require('../../../../assets/images/treatexplore/snack-1.jpg'),
  require('../../../../assets/images/treatexplore/snack-2.jpg'),
  require('../../../../assets/images/treatexplore/snack-3.jpg'),
];

type Collection = (typeof collections)[number];

/**
 * One collection: what it is, what it tastes of, and what is in it.
 *
 * The right of the card is a pack shot duotoned into the card's own colour, so
 * the photograph and the panel are one surface rather than a picture pasted
 * onto a tint. The round badge over it is the snack itself, in full colour —
 * which is the contrast the reference uses to stop three tinted cards reading
 * as three tinted rectangles.
 *
 * Both are photographs because both are out of drawing range: a snack pack and
 * a pile of crisps are specific things, and a vector of either comes out a
 * cartoon (AGENTS.md, "Know what is in drawing range").
 *
 * `overflow: 'hidden'` is safe here because nothing on the card carries
 * `elevation` — the two together are unreliable on Android.
 */
export function CollectionCard({
  collection,
  onPress,
}: {
  collection: Collection;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={collection.title}>
      <View
        style={{
          height: CARD_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: collection.color,
          overflow: 'hidden',
        }}
      >
{/* STEP 1.13 the first photograph
        <Image
          source={PACKS[collection.pack]}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: `${CARD_ART * 100}%`,
            height: CARD_HEIGHT,
          }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
*/}

{/* STEP 1.14 and the second
        <Image
          source={SNACKS[collection.snack - 1]}
          style={{
            position: 'absolute',
            left: '38%',
            bottom: -CARD_BADGE * 0.3,
            width: CARD_BADGE,
            height: CARD_BADGE,
            borderRadius: radius.full,
          }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
*/}

        <View style={{ padding: 18, width: '58%' }}>
{/* STEP 1.15 what it is
          <T variant="collection" color={tr.ink}>
            {collection.title}
          </T>
*/}
{/* STEP 1.16 and how much of it
          <T variant="collectionMeta" color={tr.muted} style={{ marginTop: 2 }}>
            {collection.meta}
          </T>
*/}
        </View>
      </View>
    </Pressable>
  );
}
