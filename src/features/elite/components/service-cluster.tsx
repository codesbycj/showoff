import { Image, View, type ImageSourcePropType } from 'react-native';

import { CLUSTER, CLUSTER_MAIN, type ClusterCard } from '../data/onboarding';
import {
  CARD_MAIN_H,
  CARD_MAIN_W,
  CARD_SIDE_H,
  CARD_SIDE_W,
  CARD_SPREAD,
  CARD_TILT,
} from '../layout';
import { radius, shadow, el } from '../theme';

/**
 * One photograph in the cluster.
 *
 * Two nested views, and the nesting is the point: the outer one carries the
 * shadow, the inner one carries the clip. `overflow: 'hidden'` and
 * `elevation` on the same view is unreliable on Android, and the web harness
 * renders both happily either way, so it would never show up here.
 */
function Card({
  image,
  alt,
  width,
  height,
  style,
}: {
  image: ImageSourcePropType;
  alt: string;
  width: number;
  height: number;
  style?: object;
}) {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius.card,
          backgroundColor: el.canvas,
          ...shadow.card,
        },
        style,
      ]}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: radius.card,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: el.cardEdge,
        }}
      >
        <Image
          source={image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          accessible
          accessibilityRole="image"
          accessibilityLabel={alt}
        />
      </View>
    </View>
  );
}

/**
 * Three services, fanned, straddling the bottom of the hero.
 *
 * The middle card is taller and sits in front; the two behind it are smaller,
 * dropped, and turned out by nine degrees. Painted side-cards-first so the
 * middle one lands on top — paint order is the thing that works everywhere.
 */
export function ServiceCluster() {
  const main = CLUSTER.find((c) => c.id === CLUSTER_MAIN) ?? CLUSTER[0];
  const sides = CLUSTER.filter((c) => c.id !== main.id);
  const [left, right] = sides as [ClusterCard, ClusterCard];

  return (
    <View
      style={{
        height: CARD_MAIN_H,
        width: CARD_MAIN_W + CARD_SPREAD * 2 + CARD_SIDE_W,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // MISTAKE 1.09 the whole fan came in half-developed
        opacity: 0.35,
      }}
    >
      {/* STEP 1.06 one behind, on the left
      {left ? (
        <Card
          image={left.image}
          alt={left.alt}
          width={CARD_SIDE_W}
          height={CARD_SIDE_H}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ rotate: `-${CARD_TILT}deg` }],
          }}
        />
      ) : null}
      */}

      {/* STEP 1.07 one behind, on the right
      {right ? (
        <Card
          image={right.image}
          alt={right.alt}
          width={CARD_SIDE_W}
          height={CARD_SIDE_H}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: [{ rotate: `${CARD_TILT}deg` }],
          }}
        />
      ) : null}
      */}

      {/* STEP 1.08 and the one that sits in front
      <Card
        image={main.image}
        alt={main.alt}
        width={CARD_MAIN_W}
        height={CARD_MAIN_H}
        style={{ position: 'absolute', top: 0 }}
      />
      */}
    </View>
  );
}
