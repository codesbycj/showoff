import { Image, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { activity } from '../data/dash';
import { ACTIVITY_AVATAR, ACTIVITY_H } from '../layout';
import { hk, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * Who has been reacting, and the most recent of them.
 *
 * The faces behind the heading are placed as fractions of the card rather than
 * in dp, so the scatter keeps its shape on a 360dp phone as well as a 430dp
 * one — a cluster laid out in dp slides off the narrow one.
 */
export function ActivityCard() {
  return (
    <View
      style={{
        height: ACTIVITY_H,
        borderRadius: radius.card,
        backgroundColor: hk.card,
        padding: 12,
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <T variant="section" color={hk.ink}>
          {activity.title}
        </T>
        <Heart size={22} />
      </View>

      {activity.float.map((f) => (
        <Image
          key={f.key}
          source={FACES[f.face]}
          style={{
            position: 'absolute',
            left: `${f.x * 100}%`,
            top: `${f.y * 100}%`,
            width: f.size,
            height: f.size,
            borderRadius: radius.full,
            borderWidth: f.ring ? 2 : 0,
            borderColor: f.ring || 'transparent',
          }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      ))}

      <View style={{ position: 'absolute', right: 12, top: ACTIVITY_H * 0.46 }}>
        <AddPerson size={26} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
        <Image
          source={FACES[activity.latest.face]}
          style={{
            width: ACTIVITY_AVATAR,
            height: ACTIVITY_AVATAR,
            borderRadius: radius.full,
          }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <View>
          <T variant="name" color={hk.ink}>
            {activity.latest.name}
            <T variant="nameMeta" color={hk.muted}>
              {activity.latest.meta}
            </T>
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Heart size={13} />
            <T variant="activity" color={hk.muted}>
              {activity.latest.line}
            </T>
          </View>
        </View>
      </View>
    </View>
  );
}

/** The like mark. Drawn: an emoji heart differs on every platform. */
function Heart({ size }: { size: number }) {
  return (
    <Svg width={size} height={size * 0.9} viewBox="0 0 20 18">
      <Path
        d="M10 17 C2 11.6 0 8.3 0 5.4 C0 2.4 2.2 0.4 5 0.4 C7 0.4 8.9 1.6 10 3.4 C11.1 1.6 13 0.4 15 0.4 C17.8 0.4 20 2.4 20 5.4 C20 8.3 18 11.6 10 17 Z"
        fill={hk.muted}
      />
    </Svg>
  );
}

/** The "and more" mark at the end of the scatter. */
function AddPerson({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={9} cy={7.4} r={4} fill={hk.muted} />
      <Path d="M2 20 C2 15.6 5.2 13 9 13 C12.8 13 16 15.6 16 20 Z" fill={hk.muted} />
      <Path d="M19 12 V18 M16 15 H22" stroke={hk.muted} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
