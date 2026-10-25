import { Image, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { podium } from '../data/board';
import { CROWN_W, ROSETTE, RUNNER, RUNNER_DROP, WINNER } from '../layout';
import { qz, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

type Standing = (typeof podium)[number];

/**
 * The top three, standing the way a podium stands: the winner in the middle
 * and taller, the other two dropped and smaller either side.
 *
 * The drop is a top padding on the outer two rather than a bottom alignment,
 * because the names underneath have to line up with each other — align the
 * portraits by their feet and the three captions end up on three baselines.
 */
export function Podium() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {podium.map((p) => (
        <Standing key={p.key} standing={p} />
      ))}
    </View>
  );
}

function Standing({ standing }: { standing: Standing }) {
  const first = standing.place === 1;
  const size = first ? WINNER : RUNNER;
  const ring = qz.ring[standing.place - 1];

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: first ? 0 : RUNNER_DROP }}>
      <View style={{ height: CROWN_W * 0.62, justifyContent: 'flex-end' }}>
        {first ? <Crown width={CROWN_W} /> : null}
      </View>

      <View style={{ marginTop: 4, alignItems: 'center' }}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: radius.full,
            borderWidth: 3,
            borderColor: ring,
            padding: 3,
          }}
        >
          <Image
            source={FACES[standing.face]}
            style={{ width: '100%', height: '100%', borderRadius: radius.full }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>

        <View style={{ marginTop: -ROSETTE / 2 }}>
          <Rosette place={standing.place} />
        </View>
      </View>

      <T variant="podium" color={qz.ink} style={{ marginTop: 7 }}>
        {standing.name}
      </T>
      <T variant="podiumMeta" color={qz.muted} style={{ marginTop: 2 }}>
        {standing.points}
      </T>
    </View>
  );
}

/**
 * The winner's crown.
 *
 * Drawn, not an emoji — a crown is a different glyph on Windows, Android and
 * iOS, and the harness would show one while the emulator shows another
 * (AGENTS.md, "The web render is a proxy, not proof").
 */
function Crown({ width }: { width: number }) {
  return (
    <Svg width={width} height={width * 0.62} viewBox="0 0 46 28">
      <Path d="M4 24 L1 7 L12 14 L23 2 L34 14 L45 7 L42 24 Z" fill={qz.crown} />
      <Circle cx={1.5} cy={5} r={3} fill={qz.crown} />
      <Circle cx={44.5} cy={5} r={3} fill={qz.crown} />
      <Circle cx={23} cy={2} r={3.2} fill={qz.crown} />
      <Path d="M4 24 H42 L41.4 27 H4.6 Z" fill={qz.crown} opacity={0.75} />
    </Svg>
  );
}

/**
 * The placing badge that hangs off the bottom of a portrait: a disc with two
 * ribbon tails under it, carrying the number.
 *
 * The tails are drawn behind the disc in one SVG rather than as separate
 * views, because anything overlapping here would otherwise need
 * `overflow: 'visible'` on a parent, which Android clips anyway.
 */
function Rosette({ place }: { place: number }) {
  const fill = qz.rosette[place - 1];

  return (
    <View style={{ width: ROSETTE, height: ROSETTE * 1.35, alignItems: 'center' }}>
      <Svg
        width={ROSETTE}
        height={ROSETTE * 1.35}
        viewBox="0 0 26 35"
        style={{ position: 'absolute' }}
      >
        <Path d="M7 18 L3 33 L10 29 L13 34 L13 20 Z" fill={fill} opacity={0.85} />
        <Path d="M19 18 L23 33 L16 29 L13 34 L13 20 Z" fill={fill} />
        <Circle cx={13} cy={13} r={12} fill="#ffffff" />
        <Circle cx={13} cy={13} r={10} fill={fill} />
      </Svg>
      <View style={{ height: ROSETTE, justifyContent: 'center' }}>
        <T variant="rosette" color="#ffffff">
          {String(place)}
        </T>
      </View>
    </View>
  );
}
