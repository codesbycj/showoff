import { useId } from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

/**
 * The four glyphs on the action tiles.
 *
 * In the reference these are 3D renders — glass-and-graphite shapes lit from
 * above, about 19dp across. They are rebuilt here as flat SVG in two tones
 * with a vertical gradient on each, which is what survives at that size: the
 * dark shapes run #4a4a4a at the top to #0a0a0a at the bottom (sampled range
 * #040404–#4a4a4a) and the light ones #d6d6d8 to #9c9c9e (sampled #9c9c9e–
 * #d3d3d5). What makes each one legible at 19dp is its silhouette, and that is
 * measured: freeze 18.9 square, limits 21.7 across by 16 tall, the details
 * disc 19 across, top-up two 13dp squares offset by 5.5.
 *
 * Every gradient id comes from `useId`. react-native-svg puts `Defs` ids in a
 * document-global namespace on web, so four glyphs sharing hard-coded ids
 * would all paint with whichever mounted first.
 */
const BOX_W = 22;
const BOX_H = 20;

import type { ActionKey } from '../data/cards';

export type GlyphName = ActionKey;

export function TileGlyph({ name, size = 20 }: { name: GlyphName; size?: number }) {
  const id = useId();
  const dark = `${id}-d`;
  const light = `${id}-l`;

  return (
    <Svg width={(size * BOX_W) / BOX_H} height={size} viewBox={`0 0 ${BOX_W} ${BOX_H}`}>
      <Defs>
        <LinearGradient id={dark} x1={0} y1={0} x2={0} y2={BOX_H} gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#4a4a4a" />
          <Stop offset="1" stopColor="#0a0a0a" />
        </LinearGradient>
        <LinearGradient id={light} x1={0} y1={0} x2={0} y2={BOX_H} gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#dcdcde" />
          <Stop offset="1" stopColor="#9c9c9e" />
        </LinearGradient>
      </Defs>

      {name === 'freeze' ? <Freeze dark={dark} light={light} /> : null}
      {name === 'limits' ? <Limits dark={dark} light={light} /> : null}
      {name === 'details' ? <Details dark={dark} light={light} /> : null}
      {name === 'topup' ? <TopUp dark={dark} light={light} /> : null}
    </Svg>
  );
}

type Paint = { dark: string; light: string };

/** Four corner blocks closing in on a pale centre. */
function Freeze({ dark, light }: Paint) {
  const s = 8.2;
  const far = BOX_W - 1.55 - s;
  return (
    <G>
      {[
        [1.55, 0.5],
        [far, 0.5],
        [1.55, BOX_H - 0.5 - s],
        [far, BOX_H - 0.5 - s],
      ].map(([x, y]) => (
        <Rect key={`${x}-${y}`} x={x} y={y} width={s} height={s} rx={2.8} fill={`url(#${dark})`} />
      ))}
      <Rect
        x={(BOX_W - 9.8) / 2}
        y={(BOX_H - 9.8) / 2}
        width={9.8}
        height={9.8}
        rx={2.9}
        fill={`url(#${light})`}
      />
    </G>
  );
}

/** A gauge: a dome with a needle standing in it. */
function Limits({ dark, light }: Paint) {
  // 21.7 across by 16 tall in the reference — a round top on short straight
  // sides, not a semicircle, which is 10.85 of radius over 5.15 of wall.
  const x0 = (BOX_W - 21.7) / 2;
  const x1 = x0 + 21.7;
  const r = 10.85;
  const cx = BOX_W / 2;
  const dome = `M ${x0} 16 L ${x0} ${r} A ${r} ${r} 0 0 1 ${x1} ${r} L ${x1} 16 Z`;
  return (
    <G>
      <Path d={dome} fill={`url(#${dark})`} />
      {[
        [-7.9, 8.4],
        [-4.4, 5.2],
        [4.4, 5.2],
        [7.9, 8.4],
      ].map(([dx, y]) => (
        <Circle key={dx} cx={cx + dx} cy={y} r={0.9} fill="#d8d8da" />
      ))}
      <Path d={`M ${cx} 4.2 L ${cx + 2.1} 18.6 L ${cx - 2.1} 18.6 Z`} fill={`url(#${light})`} />
    </G>
  );
}

/** A pale disc with an i cut into it. */
function Details({ light }: Paint) {
  const cx = BOX_W / 2;
  return (
    <G>
      <Circle cx={cx} cy={BOX_H / 2} r={9.5} fill={`url(#${light})`} fillOpacity={0.5} />
      <Circle cx={cx} cy={4.4} r={1.5} fill="#1b1b1b" />
      <Rect x={cx - 1.7} y={7.4} width={3.4} height={7.7} rx={1.3} fill="#1b1b1b" />
    </G>
  );
}

/** Two cards, the front one taking a plus. */
function TopUp({ dark, light }: Paint) {
  const front = { x: 7.0, y: 5.4, s: 14.2 };
  const cx = front.x + front.s / 2;
  const cy = front.y + front.s / 2;
  return (
    <G>
      <Rect x={1.2} y={0} width={14.2} height={14.2} rx={3.6} fill={`url(#${dark})`} />
      <Rect x={front.x} y={front.y} width={front.s} height={front.s} rx={3.8} fill="#c9c9cb" />
      <Rect x={cx - 3.6} y={cy - 1.1} width={7.2} height={2.2} rx={0.6} fill="#121212" />
      <Rect x={cx - 1.1} y={cy - 3.6} width={2.2} height={7.2} rx={0.6} fill="#121212" />
    </G>
  );
}
