import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

import { CARD_HEIGHT } from '../layout';
import { nb } from '../theme';

/**
 * The light on the front card, as three painted layers.
 *
 * The reference's card is a 3D render: a black slab lit from above, with a
 * blue bounce washing into its bottom-left corner. Sampled at six points it is
 *
 *   top-left 38,42,41   top-right 34,34,34   centre 28,28,28
 *   bottom-left 50,72,93   bottom-right 44,44,44
 *
 * — so the face is darkest through the middle, lifts towards both the top and
 * the bottom edge, and carries all of its colour in one corner. That is a
 * vertical wash plus a radial glow, and the stops below put each sample within
 * two or three levels of the reference.
 *
 * **Drawn in SVG rather than with `expo-linear-gradient`**, which was the
 * first attempt. A diagonal `start={{x:0,y:1}}` gradient came out of the web
 * renderer mirrored — the glow landed in the *top*-left corner — and a
 * platform disagreement about gradient geometry is exactly what the harness
 * cannot check for Android. react-native-svg takes explicit user-space
 * coordinates, so there is no axis convention left to disagree about.
 *
 * The gradient ids come from `useId`. react-native-svg's `Defs` ids are
 * document-global on web, so two cards with a hard-coded id would both paint
 * with whichever one mounted first.
 */
export function CardFace({ width }: { width: number }) {
  const id = useId();
  const wash = `${id}-wash`;
  const glow = `${id}-glow`;

  return (
    <Svg width={width} height={CARD_HEIGHT} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <LinearGradient
          id={wash}
          x1={0}
          y1={0}
          x2={0}
          y2={CARD_HEIGHT}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#ffffff" stopOpacity={0.06} />
          <Stop offset="0.18" stopColor="#ffffff" stopOpacity={0} />
          <Stop offset="0.65" stopColor="#ffffff" stopOpacity={0} />
          <Stop offset="1" stopColor="#ffffff" stopOpacity={0.12} />
        </LinearGradient>
        <RadialGradient id={glow} cx={0} cy={CARD_HEIGHT} r={130} gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={nb.glow} stopOpacity={0.41} />
          <Stop offset="1" stopColor={nb.glow} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Rect x={0} y={0} width={width} height={CARD_HEIGHT} fill={nb.card} />
      <Rect x={0} y={0} width={width} height={CARD_HEIGHT} fill={`url(#${wash})`} />
      <Rect x={0} y={0} width={width} height={CARD_HEIGHT} fill={`url(#${glow})`} />
    </Svg>
  );
}
