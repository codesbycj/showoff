import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { leaderboard } from '../data/dash';
import { BOARD_H, STAT_DISC } from '../layout';
import { hk, radius } from '../theme';
import { T } from './text';

/**
 * What the player has earned, and where that puts them.
 *
 * The cluster of rings behind the heading is a watermark — the brand mark
 * blown up and faded, which is what the reference puts there. It is drawn, and
 * clipped by the card rather than by an SVG clip path: react-native-svg's clip
 * ids are document-global on web and two of them collide.
 */
export function LeaderboardCard() {
  return (
    <View
      style={{
        height: BOARD_H,
        borderRadius: radius.card,
        backgroundColor: hk.card,
        padding: 12,
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', right: -10, top: -14 }}>
        {/* STEP 1.13 the brand behind it
        <Watermark size={150} />
        */}
      </View>

      {/* STEP 1.14 what the card is
      <T variant="section" color={hk.ink}>
        {leaderboard.title}
      </T>
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.15 what was earned
        <Stat label={leaderboard.hp.label} value={leaderboard.hp.value}>
          <Hp size={22} />
        </Stat>
        */}
        <View style={{ width: 22 }} />
        {/* STEP 1.16 and where that puts them
        <Stat label={leaderboard.position.label} value={leaderboard.position.value}>
          <Chevrons size={22} />
        </Stat>
        */}
      </View>
    </View>
  );
}

function Stat({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
      <View
        style={{
          width: STAT_DISC,
          height: STAT_DISC,
          borderRadius: radius.full,
          backgroundColor: hk.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
      <View>
        <T variant="statLabel" color={hk.muted}>
          {label}
        </T>
        <T variant="stat" color={hk.ink}>
          {value}
        </T>
      </View>
    </View>
  );
}

/** The HP mark: a ring with a hook through it. */
function Hp({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={14} r={7.4} fill="none" stroke={hk.ink} strokeWidth={2.4} />
      <Path
        d="M12 14 L12 7 C12 4.6 13.8 3.2 15.6 3.6"
        stroke={hk.ink}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

/** The rising mark beside the position. */
function Chevrons({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 12.6 L12 6.4 L19 12.6 M5 18.4 L12 12.2 L19 18.4"
        stroke={hk.ink}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Three of the brand's rings, blown up and faded behind the heading. */
function Watermark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {[
        { x: 22, y: 34, r: 20 },
        { x: 56, y: 40, r: 26 },
        { x: 84, y: 26, r: 16 },
      ].map((c, i) => (
        <Circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={c.r}
          fill={hk.watermark}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth={2.4}
        />
      ))}
      {[
        { x: 22, y: 34, r: 6 },
        { x: 56, y: 40, r: 8 },
        { x: 84, y: 26, r: 5 },
      ].map((c, i) => (
        <Circle key={`i${i}`} cx={c.x} cy={c.y} r={c.r} fill="rgba(0,0,0,0.22)" />
      ))}
    </Svg>
  );
}
