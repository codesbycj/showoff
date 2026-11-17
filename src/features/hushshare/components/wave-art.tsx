import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { wave } from '../data/share';
import { ct } from '../theme';

type Props = { width: number; height: number; margin: number };

/**
 * The session's artwork.
 *
 * **A contour is an idea, so it is drawn** (I4): the same wave displaced down
 * the frame, each line phase-shifted a *little*, with one colour ramp read
 * left to right across all of them. Nothing here is traced from the board.
 *
 * The phase step is small on purpose. At 0.42 radians per line the shapes
 * differ by more than the band between them and the contours cross each other
 * in a knot; the board's never touch.
 *
 * The ramp is one `LinearGradient` shared by every line, and its id comes from
 * `useId` because gradient ids are document-global on web - everything would
 * otherwise render in the first colour (I8).
 *
 * The `<svg>` is wrapped in a `View`: on web an `<svg>` is not a positioned
 * element, so an absolutely positioned sibling paints straight over it
 * (RULES Part 7).
 */
export function WaveArt({ width, height, margin }: Props) {
  const gid = useId();

  const lines = Math.max(1, wave.lines);
  const plotW = width - margin * 2;
  const band = height / (lines + 3);

  const line = (index: number) => {
    const y0 = band * 2 + index * band * 0.84;
    const phase = index * 0.07;
    const steps = 48;

    const points = Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const x = margin + plotW * t;
      const swell = Math.sin(t * Math.PI * 2.1 + phase) * band * 1.5;
      const ripple = Math.sin(t * Math.PI * 4.6 + phase * 1.4) * band * 0.4;
      const lift = -t * band * 0.9;
      return `${x} ${y0 + swell + ripple + lift}`;
    });

    return `M${points.join(' L')}`;
  };

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={ct.waveWarm} />
            <Stop offset="0.5" stopColor={ct.waveMid} />
            <Stop offset="1" stopColor={ct.waveCool} />
          </LinearGradient>
        </Defs>

        {Array.from({ length: lines }, (_, i) => (
          <Path
            key={i}
            d={line(i)}
            stroke={`url(#${gid})`}
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </Svg>
    </View>
  );
}
