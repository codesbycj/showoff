import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { T } from './text';
import { cg } from '../theme';

/** Points on the star. Twelve reads as a seal; fewer reads as a cartoon star. */
const POINTS = 12;
const OUTER = 50;
const INNER = 42;

/**
 * The white starburst in the tracking card's corner.
 *
 * Generated rather than drawn by hand: twelve points at two radii is a loop,
 * and writing out twenty-four coordinates invites exactly one of them to be
 * wrong in a way nobody notices until it is on film.
 *
 * The gap between the two radii is deliberately small — 42 against 50. A
 * deeper star reads as a decoration; a shallow one reads as a stamped seal,
 * which is what the reference has and what carries a word in the middle.
 */
function burstPath() {
  const pts: string[] = [];
  for (let i = 0; i < POINTS * 2; i++) {
    const r = i % 2 === 0 ? OUTER : INNER;
    const a = (Math.PI / POINTS) * i - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(' L')} Z`;
}

export function FastBadge({ label, size }: { label: string; size: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute' }}>
        <Path d={burstPath()} fill={cg.surface} />
      </Svg>
      {/*
        The word is tilted, not the badge. Rotating the whole thing would turn
        the star's points too, and a seal whose points are off-axis looks like
        a mistake rather than a flourish.
      */}
      <T variant="burst" color={cg.ink} style={{ transform: [{ rotate: '-18deg' }] }}>
        {label}
      </T>
    </View>
  );
}
