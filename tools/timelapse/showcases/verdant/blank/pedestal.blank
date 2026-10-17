import { useId } from 'react';
import Svg, { Defs, Ellipse, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

import { vd } from '../theme';

/** The disc's half-height on screen — how far from circular the perspective is. */
const SQUASH = 0.17;
/** How thick the disc is, as a fraction of its width. */
const DEPTH = 0.055;
/** How far the pool of shadow spreads past the disc, each side. */
const SPREAD = 1.22;

/**
 * The lit disc the wallet stands on.
 *
 * A cylinder seen from slightly above: a bottom ellipse, a side wall between
 * the two, and a top ellipse lit from the right. Drawn in that order because
 * that is the order the eye reads depth in — a top face painted before its
 * own wall reads as a flat sticker.
 *
 * The contact shadow is a radial gradient rather than a blurred shape.
 * React Native has no CSS filter, and `expo-blur` blurs what is *behind* a
 * view, not the view's own fill — so a soft edge here has to be authored as a
 * ramp. Three stops is enough at this size: the falloff is standing in for a
 * penumbra, not reproducing one.
 *
 * `contact` is where the thing standing on the disc has its base, as a signed
 * fraction of the disc's width either side of centre. The shadow it casts is
 * painted **on the top face**, after it — a contact shadow under the pool
 * below the disc would be hidden by the disc itself, and without one the
 * object hovers no matter how carefully it is placed.
 *
 * `pedestalBox` below gives the caller the drawn box *and* where the top face
 * sits inside it, so the stage can rest something on the disc instead of
 * guessing at an offset.
 */
export function Pedestal({ width, contact }: { width: number; contact: number }) {
  const id = useId();
  const box = pedestalBox(width);
  const { width: w, height: h, faceCy: cy } = box;
  const ry = width * SQUASH;
  const depth = width * DEPTH;
  const cx = w / 2;

  return (
    <Svg width={w} height={h}>
      <Defs>
        <RadialGradient id={`${id}-pool`} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={vd.shadow} stopOpacity="0.8" />
          <Stop offset="0.45" stopColor={vd.shadow} stopOpacity="0.38" />
          <Stop offset="1" stopColor={vd.shadow} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id={`${id}-wall`} x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0" stopColor={vd.canvasBottom} />
          <Stop offset="0.62" stopColor={vd.pedestal} />
          <Stop offset="1" stopColor={vd.pedestalTop} />
        </LinearGradient>
        <LinearGradient id={`${id}-top`} x1="10%" y1="0%" x2="90%" y2="100%">
          <Stop offset="0" stopColor={vd.pedestal} />
          <Stop offset="0.55" stopColor={vd.pedestalTop} />
          <Stop offset="1" stopColor={vd.light} />
        </LinearGradient>
        <RadialGradient id={`${id}-contact`} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#04140d" stopOpacity="0.62" />
          <Stop offset="0.55" stopColor="#04140d" stopOpacity="0.26" />
          <Stop offset="1" stopColor="#04140d" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* The pool of shadow the disc sits in, wider than the disc itself. */}
      {/* STEP 1.23 the pool of shadow it sits in
      <Ellipse cx={cx} cy={cy + depth * 0.9} rx={w / 2} ry={ry * 1.5} fill={`url(#${id}-pool)`} />
      */}

      {/* The side wall, between the two ellipses. */}
      {/* STEP 1.24 the side wall
      <Path
        d={`M ${cx - width / 2} ${cy}
            V ${cy + depth}
            A ${width / 2} ${ry} 0 0 0 ${cx + width / 2} ${cy + depth}
            V ${cy} Z`}
        fill={`url(#${id}-wall)`}
      />
      */}

      {/* The top face. */}
      {/* STEP 1.25 the face, lit from the right
      <Ellipse cx={cx} cy={cy} rx={width / 2} ry={ry} fill={`url(#${id}-top)`} />
      */}

      {/* What stands on it, thrown away from the light in the lower right. */}
      {/* STEP 1.26 and what the wallet throws across it
      <Ellipse
        cx={cx + width * contact - width * 0.05}
        cy={cy + ry * 0.18}
        rx={width * 0.34}
        ry={ry * 0.62}
        fill={`url(#${id}-contact)`}
      />
      */}
    </Svg>
  );
}

/**
 * The drawn box for a disc of this width, and where its top face lands inside
 * it — everything the stage needs to stand an object on the disc.
 */
export function pedestalBox(width: number) {
  const ry = width * SQUASH;
  const depth = width * DEPTH;
  return {
    width: width * SPREAD,
    /** Room for the face, the wall, and the pool spreading below both. */
    height: ry * 1.25 + ry + depth + ry * 1.6,
    /** The centre of the top face, measured from the box's own top edge. */
    faceCy: ry * 1.25,
  };
}
