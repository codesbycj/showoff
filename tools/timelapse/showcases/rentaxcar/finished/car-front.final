import { View } from 'react-native';
import Svg, { Ellipse, G, Path, Rect } from 'react-native-svg';

import { rx } from '../theme';

/**
 * The car, head on.
 *
 * The reference photographs it — a blue supercar cut out and dropped on the
 * yellow. That is a product photograph of a specific marque: not
 * redistributable, and the sanctioned stand-in (free-licensed stock) has no
 * answer either, because free stock does not contain a cut-out supercar on
 * transparency. A found photograph badly cut out looks worse than no
 * photograph at all, which is the whole reason the rule says "must not be
 * traced badly" (AGENTS.md, "Three kinds of reference").
 *
 * So it is rebuilt as the thing the photograph is a picture of, in the flat
 * dialect the rest of the board uses: a wide low nose, a dark screen, a splitter
 * and two lamps. It takes the screen's palette, it is sharp at any size, and
 * the screen ships no bitmap.
 *
 * Drawn in a 200x120 viewBox, so every number is a fraction of the drawing
 * rather than a dp.
 */
export function CarFront({ width }: { width: number }) {
  const height = width * 0.6;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 200 120">
        <Ellipse cx={100} cy={106} rx={88} ry={9} fill={rx.shade} />

        <Path
          d="M42 44 C52 28 70 20 100 20 C130 20 148 28 158 44 L168 50 C180 56 186 66 186 78
             C186 90 178 96 166 96 H34 C22 96 14 90 14 78 C14 66 20 56 32 50 Z"
          fill={rx.body}
        />

        <Path
          d="M60 44 C68 32 82 27 100 27 C118 27 132 32 140 44 Z"
          fill={rx.glass}
        />

        <G fill={rx.lamp}>
          <Path d="M26 58 C34 54 44 53 54 54 L54 64 C44 64 34 63 26 66 Z" />
          <Path d="M174 58 C166 54 156 53 146 54 L146 64 C156 64 166 63 174 66 Z" />
        </G>

        <Path
          d="M14 80 C40 74 70 71 100 71 C130 71 160 74 186 80 L186 82 C186 92 178 96 166 96
             H34 C22 96 14 92 14 82 Z"
          fill={rx.bodyDeep}
        />

        <Rect x={72} y={78} width={56} height={11} rx={5.5} fill={rx.glass} />
        <Rect x={28} y={92} width={144} height={7} rx={3.5} fill="#15161a" />

        <G>
          <Ellipse cx={30} cy={92} rx={15} ry={15} fill="#15161a" />
          <Ellipse cx={170} cy={92} rx={15} ry={15} fill="#15161a" />
        </G>
      </Svg>
    </View>
  );
}
