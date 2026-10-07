import Svg, { Path } from 'react-native-svg';

import { vt } from '../theme';

/**
 * The map beside the state leaderboard.
 *
 * It is a stylised block map, not Nigeria's actual outline — ten quadrilaterals
 * roughly where the geopolitical zones sit, each filled with the colour of the
 * party leading there. That is what the export draws, and it is the honest
 * thing to reproduce: at 155dp tall on half a card, a true boundary file would
 * render as a green smudge, and the panel's job is to say "the north-west went
 * one way, the south-east another", which ten blocks say more clearly.
 *
 * The white 1.5 strokes are what separate neighbouring blocks of similar hue;
 * without them the two greens and the two blues merge.
 */
const ZONES = [
  { d: 'M42 22 L90 28 L98 62 L60 85 L20 70 Z', fill: '#22C55E', o: 0.9 },
  { d: 'M90 28 L170 30 L165 72 L120 75 L98 62 Z', fill: '#F59E0B', o: 0.95 },
  { d: 'M170 30 L255 45 L245 98 L185 92 L165 72 Z', fill: '#3B82F6', o: 0.85 },
  { d: 'M60 85 L120 75 L130 120 L75 130 L45 105 Z', fill: '#2563EB', o: 0.9 },
  { d: 'M120 75 L185 92 L195 135 L138 138 L130 120 Z', fill: '#16A34A', o: 0.95 },
  { d: 'M185 92 L245 98 L230 160 L180 155 L195 135 Z', fill: '#15803D', o: 0.8 },
  { d: 'M30 100 L75 130 L80 170 L25 150 Z', fill: '#3B82F6', o: 0.85 },
  { d: 'M32 155 L65 158 L60 175 L30 170 Z', fill: '#15803D', o: 1 },
  { d: 'M75 168 L130 160 L145 195 L85 200 Z', fill: '#EF4444', o: 0.9 },
  { d: 'M130 148 L175 145 L170 185 L125 185 Z', fill: '#16A34A', o: 1 },
] as const;

export function NigeriaMap({ height = 155 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 280 230" fill="none">
      {ZONES.map((z) => (
        <Path key={z.d} d={z.d} fill={z.fill} opacity={z.o} stroke={vt.card} strokeWidth={1.5} />
      ))}
    </Svg>
  );
}
