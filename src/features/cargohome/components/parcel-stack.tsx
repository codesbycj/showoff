import Svg, { G, Path } from 'react-native-svg';

/**
 * The cardboard parcels that sit in both tracking cards.
 *
 * Drawn rather than photographed, because the reference's are **renders, not
 * photographs** — flat-shaded isometric boxes with hard edges. A stock photo
 * of a cardboard box would need cutting out of its background, which is the
 * failure this repo has already paid for once (see the promo panel in
 * `velora`), and it would still not match the flat look sitting next to it.
 *
 * Every face is a plain `Path` and every colour is a flat fill — there is no
 * gradient anywhere in it. The three tones *are* the lighting: a box reads as
 * three-dimensional because its top is lighter than its right face and its
 * right face lighter than its left, and nothing softer is needed at this size.
 *
 * The isometry is 2:1 — a face's depth runs half as far down as it does
 * across — which is what keeps the two boxes sitting on the same imaginary
 * floor without any of it being computed.
 */

const TOP = '#e8c79b';
const RIGHT = '#d0a675';
const LEFT = '#b1824f';
/** The tape, a shade off the face it crosses, and the printed marks. */
const TAPE_TOP = '#dbb686';
const INK = '#9a6f41';

/**
 * One box, as three faces.
 *
 * `x`,`y` is the apex of the top face — the topmost corner, not a bounding
 * box — because that is the point two stacked boxes have to agree on.
 */
function Box({
  x,
  y,
  w,
  d,
  h,
  tape = true,
}: {
  x: number;
  y: number;
  /** Across, corner to corner. */
  w: number;
  /** Down, apex to the far corner of the top face. */
  d: number;
  /** The height of the sides. */
  h: number;
  tape?: boolean;
}) {
  const hw = w / 2;
  const hd = d / 2;
  return (
    <G>
      {/* top */}
      <Path
        d={`M${x} ${y} L${x + hw} ${y + hd} L${x} ${y + d} L${x - hw} ${y + hd} Z`}
        fill={TOP}
      />
      {/* left */}
      <Path
        d={`M${x - hw} ${y + hd} L${x} ${y + d} L${x} ${y + d + h} L${x - hw} ${y + hd + h} Z`}
        fill={LEFT}
      />
      {/* right */}
      <Path
        d={`M${x} ${y + d} L${x + hw} ${y + hd} L${x + hw} ${y + hd + h} L${x} ${y + d + h} Z`}
        fill={RIGHT}
      />

      {tape ? (
        <>
          {/* A strip over the top seam, and the same strip carried down the
              right face so the two read as one piece of tape bent over an
              edge rather than two separate marks. */}
          <Path
            d={`M${x - hw * 0.18} ${y + hd * 0.18} L${x + hw} ${y + hd} L${x + hw * 0.82} ${
              y + hd * 1.18
            } L${x - hw * 0.36} ${y + hd * 0.36} Z`}
            fill={TAPE_TOP}
          />
          <Path
            d={`M${x + hw * 0.82} ${y + hd * 1.18 + hd * 0.82} L${x + hw} ${y + hd} L${x + hw} ${
              y + hd + h * 0.3
            } L${x + hw * 0.82} ${y + hd * 2 + h * 0.3}  Z`}
            fill={TAPE_TOP}
            opacity={0.55}
          />
          {/* Two printed marks on the right face — the handling stamps every
              one of these boxes has, and the only thing stopping a flat fill
              from reading as a blank slab. */}
          <Path
            d={`M${x + hw * 0.3} ${y + d + h * 0.42} l${hw * 0.13} ${hd * 0.13} l0 ${h * 0.16} l${
              -hw * 0.13
            } ${-hd * 0.13} Z`}
            fill={INK}
            opacity={0.45}
          />
          <Path
            d={`M${x + hw * 0.52} ${y + d * 0.86 + h * 0.42} l${hw * 0.13} ${hd * 0.13} l0 ${
              h * 0.16
            } l${-hw * 0.13} ${-hd * 0.13} Z`}
            fill={INK}
            opacity={0.45}
          />
        </>
      ) : null}
    </G>
  );
}

/**
 * A large parcel with a smaller one resting on it.
 *
 * The small box's apex is placed on the large box's top face rather than
 * computed from a bounding box, which is what makes it look *set down* on it
 * instead of floating near it.
 */
export function ParcelStack({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" aria-hidden>
      <Box x={100} y={74} w={150} d={76} h={56} />
      {/*
        Seated, not guessed. The small box's *base* centre sits at
        `y + h + d/2`, and for it to rest on the large box rather than hover
        near it that point has to land on the large top face — whose centre is
        (100, 112). At x=86 the face runs y 81..143 there, so y = 112 - 49 = 63.
        The first pass put it at y=28 and it floated.
      */}
      <Box x={86} y={63} w={74} d={38} h={30} />
    </Svg>
  );
}

/** A single parcel, for the smaller of the two cards. */
export function Parcel({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" aria-hidden>
      <Box x={100} y={58} w={156} d={80} h={60} />
    </Svg>
  );
}
