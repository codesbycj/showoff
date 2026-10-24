import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { stats } from '../data/plan';
import { nl, radius } from '../theme';
import { T } from './text';

const RING = 152;
const STROKE = 17;

/**
 * What has been eaten against the goal, and the three macros behind it.
 *
 * The ring is drawn as a stroked circle with a dash pattern rather than as an
 * arc path: the gap at the foot is a fixed share of the circumference, and a
 * dash array is the only way to keep that gap the same at every fill level.
 *
 * It is rotated by a transform on the circle itself. React Native rotates
 * about an element's centre whatever `transformOrigin` says, and the centre is
 * exactly the pivot wanted here.
 */
export function StatsCard() {
  const r = (RING - STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  /** The ring is open at the foot: three quarters of a turn, not a full one. */
  const sweep = 0.78;
  const track = circumference * sweep;

  return (
    <View style={{ borderRadius: 22, backgroundColor: nl.statCard, padding: 22 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: radius.full,
            backgroundColor: nl.macroWell,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Target size={14} />
        </View>
        {/* STEP 1.15 the goal
        <T variant="goal" color={nl.ink}>
          {stats.goal}
        </T>
        */}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        {/* STEP 1.16 how far round it you are
        <View style={{ width: RING, height: RING, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={RING} height={RING} style={{ position: 'absolute' }}>
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={nl.ring}
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${track} ${circumference}`}
              transform={`rotate(126 ${RING / 2} ${RING / 2})`}
            />
            <Circle
              cx={RING / 2}
              cy={RING / 2}
              r={r}
              stroke={nl.ringOn}
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${track * stats.fraction} ${circumference}`}
              transform={`rotate(126 ${RING / 2} ${RING / 2})`}
            />
          </Svg>
          <T variant="figure" color={nl.ink}>
            {stats.eaten}
          </T>
          <T variant="figureMeta" color={nl.ink}>
            {stats.percent}
          </T>
        </View>
        */}

        <View style={{ flex: 1, marginLeft: 14, gap: 20 }}>
          {/* STEP 1.17 and what that was made of
          {stats.macros.map((m) => (
            <View key={m.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: radius.full,
                  backgroundColor: nl.macroWell,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MacroMark kind={m.mark} size={16} />
              </View>
              <View>
                <T variant="macro" color={nl.ink}>
                  {m.value}
                </T>
                <T variant="macroMeta" color={nl.ink}>
                  {m.label}
                </T>
              </View>
            </View>
          ))}
          */}
        </View>
      </View>
    </View>
  );
}

/** The goal mark. */
function Target({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={6} fill="none" stroke={nl.ink} strokeWidth={1.4} />
      <Circle cx={8} cy={8} r={2.2} fill={nl.ink} />
      <Path d="M11.2 4.8 L14.4 1.6" stroke={nl.ink} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * One macro's mark: a drumstick, an ear of wheat, a drop.
 *
 * Drawn rather than set as emoji — the reference's three are emoji, and a
 * drumstick is a different glyph on Windows, Android and iOS, which is exactly
 * the difference a web render cannot catch (AGENTS.md, "The web render is a
 * proxy, not proof").
 */
function MacroMark({ kind, size }: { kind: 'protein' | 'carb' | 'fat'; size: number }) {
  if (kind === 'protein') {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16">
        <Path
          d="M10.6 2.2 C12.6 2.2 14 3.6 14 5.6 C14 7.8 12 9.4 9.6 9.8 L7 12.4 L5.2 10.6 L7.8 8 C8.2 5.6 8.6 2.2 10.6 2.2 Z"
          fill="#e2703a"
        />
        <Path
          d="M5.6 10.2 L3 12.8 M4.4 11.4 L2 13.8"
          stroke="#f0f0f0"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  if (kind === 'carb') {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16">
        <Path d="M8 14 V4" stroke="#d9a63a" strokeWidth={1.4} strokeLinecap="round" />
        {[4.5, 7, 9.5].map((y) => (
          <Path
            key={y}
            d={`M8 ${y} C5.6 ${y} 4.4 ${y + 1.4} 4.4 ${y + 2.6} C6.8 ${y + 2.6} 8 ${y + 1.4} 8 ${y} Z M8 ${y} C10.4 ${y} 11.6 ${y + 1.4} 11.6 ${y + 2.6} C9.2 ${y + 2.6} 8 ${y + 1.4} 8 ${y} Z`}
            fill="#e8b84b"
          />
        ))}
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M8 1.6 C8 1.6 13 7.4 13 10.2 C13 12.9 10.8 14.8 8 14.8 C5.2 14.8 3 12.9 3 10.2 C3 7.4 8 1.6 8 1.6 Z"
        fill="#3b9ae8"
      />
    </Svg>
  );
}
