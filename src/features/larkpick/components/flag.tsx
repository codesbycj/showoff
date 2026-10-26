import { View } from 'react-native';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';

import { FLAG_SIZE } from '../layout';

/**
 * A flag, drawn as a disc.
 *
 * Flags are the single worst thing to ship as emoji: Windows has no flag
 * glyphs at all, so the row would render as two letters in a box on the
 * machine these are recorded from, and the web harness would never show it
 * (AGENTS.md, "Draw small brand glyphs rather than relying on emoji").
 *
 * They are built from bands in plain `View`s inside a round, clipped box
 * rather than from SVG with a circular `ClipPath`: `Defs` ids are
 * document-global on web, and seven flags on one screen would be seven
 * chances to collide. The two that need a shape — the star and the taegeuk —
 * carry a small `Svg` on top of their band, which needs no ids at all.
 *
 * There is no `elevation` anywhere here, because `overflow: 'hidden'` and
 * `elevation` on one View is unreliable on Android.
 */

const BANDS: Record<string, { dir: 'row' | 'column'; colors: string[] }> = {
  fr: { dir: 'row', colors: ['#0B2A82', '#FFFFFF', '#D7232B'] },
  it: { dir: 'row', colors: ['#0E8A44', '#FFFFFF', '#D7232B'] },
  de: { dir: 'column', colors: ['#111111', '#D7232B', '#F2C200'] },
  es: { dir: 'column', colors: ['#C8102E', '#F2C200', '#C8102E'] },
  jp: { dir: 'row', colors: ['#FFFFFF'] },
  cn: { dir: 'row', colors: ['#DE2910'] },
  kr: { dir: 'row', colors: ['#FFFFFF'] },
};

/** Spain's centre band is double height, which is what makes it read as Spain. */
const WEIGHTS: Record<string, number[]> = {
  es: [1, 1.6, 1],
};

export function Flag({ name, size = FLAG_SIZE }: { name: string; size?: number }) {
  const band = BANDS[name] ?? BANDS.fr;
  const weights = WEIGHTS[name] ?? band.colors.map(() => 1);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        flexDirection: band.dir,
        backgroundColor: band.colors[0],
      }}
    >
      {band.colors.map((c, i) => (
        <View key={i} style={{ flex: weights[i], backgroundColor: c }} />
      ))}

      {name === 'jp' ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Svg width={size} height={size}>
            <Circle cx={size / 2} cy={size / 2} r={size * 0.26} fill="#C8102E" />
          </Svg>
        </View>
      ) : null}

      {name === 'cn' ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Svg width={size} height={size} viewBox="0 0 30 30">
            <Polygon
              points="10,7 11.5,11 15.7,11 12.3,13.5 13.6,17.5 10,15 6.4,17.5 7.7,13.5 4.3,11 8.5,11"
              fill="#F2C200"
            />
            <Circle cx={18.5} cy={7.5} r={1.5} fill="#F2C200" />
            <Circle cx={21.5} cy={11} r={1.5} fill="#F2C200" />
            <Circle cx={21} cy={15.5} r={1.5} fill="#F2C200" />
            <Circle cx={18} cy={19} r={1.5} fill="#F2C200" />
          </Svg>
        </View>
      ) : null}

      {name === 'kr' ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Svg width={size} height={size} viewBox="0 0 30 30">
            {/* the taegeuk: two halves of one disc, each curling into the other */}
            <Path d="M7 15a8 8 0 0 1 16 0 4 4 0 0 0-8 0 4 4 0 0 1-8 0Z" fill="#CD2E3A" />
            <Path d="M23 15a8 8 0 0 1-16 0 4 4 0 0 0 8 0 4 4 0 0 1 8 0Z" fill="#0047A0" />
            <Path
              d="M4.5 7.5 7 5M5.6 9 8.1 6.5M25.5 22.5 23 25M24.4 21 21.9 23.5"
              stroke="#111111"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      ) : null}
    </View>
  );
}
