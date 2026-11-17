import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The map.
 *
 * **Built as the map *idea*, never traced** (I4). A map is a picture of a
 * place: vectoring a real one is copying an arrangement path by path, at
 * twenty times the cost of either honest route. So this is a road grid, a
 * park and a route — no real street, no real city, and every name invented.
 *
 * The grid is rotated as a whole with a single `<G transform>`; `<G origin>`
 * emits an invalid DOM prop and red-bars the screen (§7).
 */
export function RouteMap({ width, height }: Props) {
  const cols = [-40, 30, 110, 200, 290, 380, 470];
  const rows = [-30, 70, 170, 270, 370, 470, 570, 670];

  return (
    <View style={{ width, height, backgroundColor: ct.mapGround, overflow: 'hidden' }}>
      <Svg width={width} height={height}>
        <G transform={`rotate(-14 ${width / 2} ${height / 2})`}>
          {/* STEP 1.02 rect
          {rows.map((y) => (
            <Rect
              key={`r${y}`}
              x={-120}
              y={y}
              width={width + 260}
              height={y % 200 === 70 ? 13 : 8}
              fill={y % 200 === 70 ? ct.mapRoadLight : ct.mapRoad}
            />
          ))}
          */}

          {/* STEP 1.03 rect
          {cols.map((x) => (
            <Rect
              key={`c${x}`}
              x={x}
              y={-160}
              width={x === 110 ? 13 : 8}
              height={height + 320}
              fill={x === 110 ? ct.mapRoadLight : ct.mapRoad}
            />
          ))}
          */}

          {/* STEP 1.04 the next block

          */}
          {/* STEP 1.05 rect
          <Rect x={-50} y={110} width={230} height={230} rx={18} fill={ct.mapPark} opacity={0.92} />
          */}
          {/* STEP 1.06 rect
          <Rect x={-10} y={150} width={70} height={70} rx={8} fill="#B6E022" opacity={0.6} />
          */}
          {/* STEP 1.07 rect
          <Rect x={80} y={150} width={70} height={70} rx={8} fill="#B6E022" opacity={0.6} />
          */}
          {/* STEP 1.08 rect
          <Rect x={-10} y={245} width={70} height={70} rx={8} fill="#B6E022" opacity={0.6} />
          */}
          {/* STEP 1.09 rect
          <Rect x={80} y={245} width={70} height={70} rx={8} fill="#B6E022" opacity={0.6} />
          */}

          {/* STEP 1.10 the next block

          */}
          {/* STEP 1.11 path
          <Path
            d="M70 190 L70 265 L205 265 L205 700"
            stroke={ct.route}
            strokeWidth={11}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          */}
          {/* STEP 1.12 path
          <Path
            d="M70 190 L70 265 L205 265 L205 700"
            stroke="#E6E2FF"
            strokeWidth={2.4}
            strokeDasharray="7 11"
            strokeLinecap="round"
            fill="none"
          />
          */}
          {/* STEP 1.13 circle
          <Circle cx={70} cy={190} r={11} stroke={ct.route} strokeWidth={4} fill={ct.mapGround} />
          */}
        </G>
      </Svg>
    </View>
  );
}
