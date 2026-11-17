import { Image, View } from 'react-native';

import { fit } from '../data/fit';
import { ct } from '../theme';

type Props = { margin: number; height: number; corner: number };

/**
 * The camera frame the hand is held inside.
 *
 * **The hand is a photograph and the frame is drawn** (I4): the corner
 * brackets and the measuring line are ideas, the hand is a picture of a hand.
 *
 * The brackets are four Views rather than an `<svg>`, because an `<svg>`
 * paints below a positioned sibling on web and the photograph would hide them
 * outright (SS7).
 */
export function FitFrame({ margin, height, corner }: Props) {
  const bar = { position: 'absolute' as const, backgroundColor: ct.ink, opacity: 0.55 };

  return (
    <View style={{ marginHorizontal: margin, height }}>
      <Image
        source={fit.image}
        style={{ width: '100%', height, borderRadius: 24 }}
        resizeMode="cover"
      />

      {/* STEP 1.09 view
      <View style={[bar, { left: 0, top: 0, width: corner, height: 2 }]} />
      */}
      {/* STEP 1.10 view
      <View style={[bar, { left: 0, top: 0, width: 2, height: corner }]} />
      */}
      {/* STEP 1.11 view
      <View style={[bar, { right: 0, top: 0, width: corner, height: 2 }]} />
      */}
      {/* STEP 1.12 view
      <View style={[bar, { right: 0, top: 0, width: 2, height: corner }]} />
      */}
      {/* STEP 1.13 view
      <View style={[bar, { left: 0, bottom: 0, width: corner, height: 2 }]} />
      */}
      {/* STEP 1.14 view
      <View style={[bar, { left: 0, bottom: 0, width: 2, height: corner }]} />
      */}
      {/* STEP 1.15 view
      <View style={[bar, { right: 0, bottom: 0, width: corner, height: 2 }]} />
      */}
      {/* STEP 1.16 view
      <View style={[bar, { right: 0, bottom: 0, width: 2, height: corner }]} />
      */}

      {/* STEP 1.17 view
      <View
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          top: height * 0.56,
          height: 2,
          backgroundColor: ct.white,
          opacity: 0.85,
        }}
      />
      */}
    </View>
  );
}
