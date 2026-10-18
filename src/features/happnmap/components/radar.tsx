import { Image, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { pings } from '../data/map';
import { BUBBLE } from '../layout';
import { hp, radius, shadow } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * The radar: who has crossed your path, and how close they were.
 *
 * The field is drawn — a few stylised streets under concentric rings, which is
 * squarely in drawing range (AGENTS.md: "a stylised map"). The faces on it are
 * photographs, because faces are not.
 *
 * The streets are clipped by a round `View` rather than by an SVG clip path.
 * `ClipPath` needs an id, and react-native-svg's ids are document-global on
 * web, so two of them on one page collide; a rounded parent needs no id. The
 * clip is safe because nothing here carries `elevation` — that pair is what is
 * unreliable on Android, not `overflow` on its own.
 *
 * Every ping is placed as a fraction of the radar's box rather than in dp, so
 * the arrangement holds at any width. The box is square and sized by the
 * caller, so the screen decides how much room the radar gets.
 */
export function Radar({ size }: { size: number }) {
  return (
    <View style={{ width: size, height: size, alignSelf: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: hp.radar,
          overflow: 'hidden',
        }}
      >
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Path
            d="M0 70 H200 M0 132 H200 M72 0 V200 M132 0 V200"
            stroke={hp.street}
            strokeWidth={7}
          />
          <Path d="M8 28 L192 172" stroke={hp.street} strokeWidth={5} />
        </Svg>
      </View>

      <Svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <Circle cx={100} cy={100} r={92} fill="none" stroke={hp.radarRing} strokeWidth={1.6} />
        <Circle cx={100} cy={100} r={64} fill="none" stroke={hp.radarRing} strokeWidth={1.6} />
        <Circle cx={100} cy={100} r={36} fill="none" stroke={hp.radarRing} strokeWidth={1.6} />
        <Circle cx={100} cy={100} r={13} fill="#ffffff" opacity={0.92} />
        <Circle cx={100} cy={100} r={7} fill={hp.blue} />
      </Svg>

      {/* STEP 1.11 and everyone on it
      {pings.map((p) => (
        <View
          key={p.key}
          style={{
            position: 'absolute',
            left: size * p.x - BUBBLE / 2,
            top: size * p.y - BUBBLE / 2,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 19,
              paddingHorizontal: 7,
              borderRadius: radius.pill,
              backgroundColor: hp.blue,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: -6,
              zIndex: 1,
            }}
          >
            <T variant="bubble" color={hp.onDark}>
              {p.match}
            </T>
          </View>
          <View
            style={{
              width: BUBBLE,
              height: BUBBLE,
              borderRadius: radius.full,
              borderWidth: 2.5,
              borderColor: hp.surface,
              ...shadow.float,
            }}
          >
            <Image
              source={FACES[p.face]}
              style={{ width: '100%', height: '100%', borderRadius: radius.full }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          </View>
        </View>
      ))}
      */}
    </View>
  );
}
