import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Polygon, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

/**
 * The reward badge: a hexagon with a chest in it, and sparkles around it.
 *
 * **The reference's is a rendered 3D badge.** A render cannot be reproduced
 * and must not be traced; the rules say to rebuild the idea in-app, so this
 * is the idea — a bevelled hexagon drawn as three stacked polygons with a
 * gradient on each, and a chest built from rectangles.
 *
 * The sparkles are placed deterministically rather than randomly: a
 * recording has to look the same on every take.
 */
function Sparkle({ size, tint }: { size: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tint}
        d="M12 1.6c.5 4.6 1.6 7.9 4.4 10.4-3 2.4-3.9 5.8-4.4 10.4-.6-4.6-1.6-8-4.4-10.4 2.9-2.5 3.9-5.8 4.4-10.4Z"
      />
    </Svg>
  );
}

export function RewardBadge({ size = 190 }: { size?: number }) {
  const id = useId();
  const outer = `lootOuter-${id}`;
  const inner = `lootInner-${id}`;
  const chest = `lootChest-${id}`;

  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const a = (Math.PI / 180) * (60 * i - 90);
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      })
      .join(' ');

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id={outer} x1="0" y1="0" x2="0.6" y2="1">
            <Stop offset="0" stopColor="#B79BF8" />
            <Stop offset="1" stopColor="#6B3FD6" />
          </LinearGradient>
          <LinearGradient id={inner} x1="0" y1="0" x2="0.4" y2="1">
            <Stop offset="0" stopColor="#8457EE" />
            <Stop offset="1" stopColor="#4C2AA8" />
          </LinearGradient>
          <LinearGradient id={chest} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#D9C8FF" />
            <Stop offset="1" stopColor="#A383F2" />
          </LinearGradient>
        </Defs>

        <Polygon points={hex(100, 100, 80)} fill={`url(#${outer})`} />
        <Polygon points={hex(100, 100, 66)} fill={`url(#${inner})`} />

        {/* A chest, not an arch: a shallow lid over a box, with a band and a
            latch across the seam. The first pass drew the lid as a half
            circle and it read as a doorway. */}
        <Rect x="66" y="98" width="68" height="34" rx="6" fill={`url(#${chest})`} />
        <Path d="M66 100a34 18 0 0 1 68 0Z" fill="#C9B4FF" />
        <Rect x="66" y="96" width="68" height="8" rx="3" fill="#7A57DE" />
        <Rect x="92" y="92" width="16" height="20" rx="4" fill="#5A32C4" />
        <Path d="M100 98l4.5 4.5-4.5 4.5-4.5-4.5Z" fill="#E7DCFF" />
        <Rect x="66" y="120" width="68" height="5" fill="#8B6BE8" opacity={0.5} />
      </Svg>
    </View>
  );
}

/** Four sparkles, placed around the badge at fixed points. */
export function Sparkles({ box }: { box: number }) {
  const spots = [
    { left: box * 0.12, top: box * 0.2, size: 14, tint: ct.violetSoft },
    { left: box * 0.82, top: box * 0.12, size: 18, tint: ct.violet },
    { left: box * 0.06, top: box * 0.72, size: 11, tint: ct.violet },
    { left: box * 0.88, top: box * 0.68, size: 13, tint: ct.violetSoft },
  ];
  return (
    <>
      {spots.map((s, i) => (
        <View key={i} style={{ position: 'absolute', left: s.left, top: s.top }}>
          <Sparkle size={s.size} tint={s.tint} />
        </View>
      ))}
    </>
  );
}
