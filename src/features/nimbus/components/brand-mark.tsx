import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import type { BrandKey } from '../data/transactions';
import { ROW_AVATAR } from '../layout';
import { nb, radius } from '../theme';
import { T } from './text';

/**
 * The merchant marks inside the transaction avatars.
 *
 * Each is a 33dp white disc with a ~15dp mark in it, which is the size the
 * reference draws them at — small enough that what carries a brand is its
 * colour and its silhouette, not its letterforms. So the two wordmarks are set
 * in Inter rather than in faces that cannot be had, and the two drawn marks
 * are built from the shapes they are made of:
 *
 *   Apple Music  #fa233b rounded square, two beamed quavers in white
 *   Uber Eats    the wordmark over two lines, black on white
 *   Prime        "prime" in Amazon's blue over the smile
 *   Netflix      the N, which is three strokes
 *
 * None of these is an emoji and none is a bitmap: emoji differ across Windows,
 * Android and iOS, and a bitmap at 15dp is mush. See AGENTS.md.
 */
export type BrandName = BrandKey;

const MARK = 15.1;

export function BrandMark({ name }: { name: BrandName }) {
  return (
    <View
      style={{
        width: ROW_AVATAR,
        height: ROW_AVATAR,
        borderRadius: radius.full,
        backgroundColor: nb.surface,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {name === 'appleMusic' ? <AppleMusic /> : null}
      {name === 'uberEats' ? <UberEats /> : null}
      {name === 'prime' ? <Prime /> : null}
      {name === 'netflix' ? <Netflix /> : null}
    </View>
  );
}

function AppleMusic() {
  const id = useId();
  const g = `${id}-am`;
  return (
    <Svg width={MARK} height={MARK} viewBox="0 0 16 16">
      <Defs>
        <LinearGradient id={g} x1={0} y1={0} x2={0} y2={16} gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#fb3a53" />
          <Stop offset="1" stopColor="#f91c38" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={16} height={16} rx={4.4} fill={`url(#${g})`} />
      <G fill="#ffffff">
        {/* Two quavers: the heads, their stems, and the beam across the top. */}
        <Ellipse cx={5.5} cy={11.1} rx={1.9} ry={1.6} />
        <Ellipse cx={11.1} cy={9.8} rx={1.9} ry={1.6} />
        <Rect x={6.6} y={4.3} width={1} height={6.9} />
        <Rect x={12.2} y={3.1} width={1} height={6.8} />
        <Path d="M6.6 4.3 L13.2 3.1 L13.2 5.1 L6.6 6.3 Z" />
      </G>
    </Svg>
  );
}

function UberEats() {
  return (
    <View style={{ alignItems: 'center' }}>
      <T variant="markLine" color="#070707">
        Uber
      </T>
      <T variant="markLine" color="#070707">
        Eats
      </T>
    </View>
  );
}

function Prime() {
  const id = useId();
  const g = `${id}-pr`;
  return (
    <View style={{ alignItems: 'center', width: MARK }}>
      <T variant="markWord" color="#1a6eb4" style={{ marginBottom: 0.4 }}>
        prime
      </T>
      <Svg width={MARK} height={3.4} viewBox="0 0 16 3.6">
        <Defs>
          <LinearGradient id={g} x1={0} y1={0} x2={16} y2={0} gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#1a6eb4" />
            <Stop offset="1" stopColor="#2f8fd6" />
          </LinearGradient>
        </Defs>
        {/* The smile: an arc with a flick on its right end. */}
        <Path
          d="M0.8 0.6 C 4 3.6, 12 3.6, 15.2 0.6 C 12.4 4.4, 3.6 4.4, 0.8 0.6 Z"
          fill={`url(#${g})`}
        />
      </Svg>
    </View>
  );
}

function Netflix() {
  return (
    <Svg width={MARK * 0.62} height={MARK} viewBox="0 0 10 16">
      <G fill="#e50914">
        <Rect x={0} y={0} width={3} height={16} />
        <Rect x={7} y={0} width={3} height={16} />
        <Path d="M0 0 L3 0 L10 16 L7 16 Z" />
      </G>
    </Svg>
  );
}
