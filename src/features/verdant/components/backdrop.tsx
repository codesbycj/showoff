import { useId } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useStage } from '../layout';
import { vd } from '../theme';

/**
 * The page itself: deep forest green, lit from the lower right.
 *
 * The reference's background is not one fill. It darkens towards the top left
 * and opens up to a soft grey-green where the light lands behind the wallet,
 * and flattening that to a single colour is what makes a build of a shot like
 * this look dead. So it is three layers: a vertical ramp, a pool of light low
 * and right of centre for the stage to stand in, and a vignette closing the
 * top-left corner down.
 *
 * Two things here are not stylistic choices.
 *
 * **Everything is drawn in react-native-svg user space, not with
 * `expo-linear-gradient`.** A diagonal `expo-linear-gradient` has come out
 * mirrored on web in this repo before, and a backdrop lit from the wrong
 * corner is exactly what the harness renders happily and a device does not.
 *
 * **The pool is its own `Svg`, sized in dp.** `RadialGradient` takes `rx`/`ry`
 * in react-native-svg, but those are an extension: on web they reach the DOM
 * as attributes `<radialGradient>` does not have, the element falls back to
 * its circular `r`, and the glow is a different shape on the two platforms —
 * which is precisely the class of difference the web harness cannot see. A
 * circular `r` inside a box of the right proportions gives the same ellipse
 * everywhere, because `objectBoundingBox` units stretch it to the box.
 *
 * Sizes come from the window, so the lighting holds its place on any screen
 * rather than sliding off a 360dp phone.
 */
export function Backdrop() {
  const { width, height } = useWindowDimensions();
  const { glow } = useStage();
  const base = useId();
  const ramp = `${base}-ramp`;
  const pool = `${base}-pool`;
  const edge = `${base}-edge`;

  /** The pool is half again as wide as it is tall — light on a floor, not a sun. */
  const poolW = glow * 1.5;
  const poolH = glow;

  return (
    <View style={{ position: 'absolute', left: 0, top: 0, width, height }} pointerEvents="none">
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient
            id={ramp}
            x1="0"
            y1="0"
            x2={width * 0.18}
            y2={height}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={vd.canvasTop} />
            <Stop offset="0.52" stopColor={vd.canvasMid} />
            <Stop offset="1" stopColor={vd.canvasBottom} />
          </LinearGradient>
          <RadialGradient id={edge} cx="30%" cy="24%" r="78%">
            <Stop offset="0.4" stopColor={vd.shade} stopOpacity="0" />
            <Stop offset="1" stopColor={vd.shade} stopOpacity="0.6" />
          </RadialGradient>
        </Defs>

        <Rect x="0" y="0" width={width} height={height} fill={`url(#${ramp})`} />
        {/* STEP 1.03 close the top corner down
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${edge})`} />
        */}
      </Svg>

      {/* STEP 1.04 the light the wallet stands in
      <Svg
        width={poolW}
        height={poolH}
        style={{
          position: 'absolute',
          // MISTAKE 1.05 the light came in up behind the headline
          marginTop: -150,
          left: width * 0.58 - poolW / 2,
          top: height * 0.56 - poolH / 2,
        }}
      >
        <Defs>
          <RadialGradient id={pool} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={vd.light} stopOpacity="0.5" />
            <Stop offset="0.45" stopColor={vd.light} stopOpacity="0.2" />
            <Stop offset="1" stopColor={vd.light} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={poolW} height={poolH} fill={`url(#${pool})`} />
      </Svg>
      */}
    </View>
  );
}
