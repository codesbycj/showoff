import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import { View } from 'react-native';

import { jf } from '../theme';

/**
 * One floating thing in the onboarding collage.
 *
 * The collage is absolutely positioned — thirteen items at explicit coordinates
 * inside a 475dp band — because that is what it is in the design: a scatter, not
 * a layout. Trying to express it as rows would mean inventing structure the
 * design does not have and then fighting it.
 *
 * `left` and `right` are both offered and exactly one is used per item. The
 * design anchors the right-hand items to the right edge, and one of them hangs
 * off it (`right: -8`), which only survives if it is anchored that way.
 */
export type CollagePos = {
  top: number;
  left?: number;
  right?: number;
  size: number;
};

export type Lift = 'none' | 'soft' | 'lifted';

const LIFTS = {
  none: null,
  soft: {
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  lifted: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
} as const;

export function CollageItem({
  top,
  left,
  right,
  size,
  width,
  radius,
  fill,
  ring,
  children,
  shadow = 'soft',
}: CollagePos & {
  /** Square unless given. The coral pill is the one item that is wider than tall. */
  width?: number;
  /** Circle unless given; the two tiles use a rounded square. */
  radius?: number;
  /** Disc colour behind a brand mark. Photos leave it undefined. */
  fill?: string;
  /** Width of the page-coloured ring that separates a photo from what it overlaps. */
  ring?: number;
  children?: ReactNode;
  shadow?: Lift;
}) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top,
          left,
          right,
          width: width ?? size,
          height: size,
          borderRadius: radius ?? size / 2,
          backgroundColor: fill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        LIFTS[shadow],
        ring ? { borderWidth: ring, borderColor: jf.bg } : null,
      ]}
    >
      {children}
    </View>
  );
}

/**
 * A photo item.
 *
 * The image is sized in dp rather than at `100%`, and its clip is its own
 * `borderRadius` rather than `overflow: 'hidden'` on the box around it — that
 * box carries the shadow, and Android is unreliable when a clip and an
 * `elevation` land on the same View.
 */
export function CollagePhoto({
  source,
  ring = 0,
  ...pos
}: CollagePos & { source: number; ring?: number; shadow?: Lift }) {
  const inner = pos.size - ring * 2;
  return (
    <CollageItem {...pos} ring={ring || undefined}>
      <Image
        source={source}
        style={{ width: inner, height: inner, borderRadius: inner / 2 }}
        contentFit="cover"
        transition={0}
      />
    </CollageItem>
  );
}
