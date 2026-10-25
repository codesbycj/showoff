import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { copy, performed, teamTasks, unfulfilled } from '../data/start';
import { CARD_PAD, HERO_HEIGHT, HERO_TOP, PAIR_GAP, PAIR_HEIGHT, PAIR_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/** The corner control every card carries: an arrow out of the box. */
function OpenArrow({ bg, tint }: { bg: string; tint: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Open">
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: radius.pill,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={14} height={14} viewBox="0 0 24 24">
          <Path
            d="M7.6 16.4 16.4 7.6M9.4 7.6h7v7"
            stroke={tint}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </View>
    </Pressable>
  );
}

/**
 * How much has been done, in one hero figure and two tiles.
 *
 * **The hero is the two tiles added up.** The reference prints 153 over 23
 * and 56, which do not come to it — a dashboard whose headline contradicts
 * its own tiles is worse than one with no headline.
 *
 * The hero's watermark is drawn on a gradient rather than placed as an
 * image: it is an abstract shape, which is the side of the drawing-range
 * rule that *is* vectors. Its gradient id comes from `useId`, because `Defs`
 * ids are document-global on web and two cards sharing one would both paint
 * in whichever mounted first.
 */
export function StatCards() {
  const glow = useId();

  return (
    <View>
      <View
        style={{
          height: HERO_HEIGHT,
          marginTop: HERO_TOP,
          borderRadius: radius.card,
          backgroundColor: fc.blue,
          overflow: 'hidden',
          padding: CARD_PAD,
        }}
      >
        <Svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Defs>
            <LinearGradient
              id={glow}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="360"
              y2="130"
            >
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Circle cx="76%" cy="30%" r={64} fill={`url(#${glow})`} />
          <Circle cx="94%" cy="92%" r={50} fill={`url(#${glow})`} />
        </Svg>

        <View style={{ flexDirection: 'row' }}>
          <T
            variant="statLabel"
            color={fc.blueSoft}
            style={{ flex: 1, height: type.statLabel.line }}
          >
            {copy.heroLabel}
          </T>
          <OpenArrow bg="rgba(255,255,255,0.22)" tint={fc.onBlue} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <T variant="statBig" color={fc.onBlue} style={{ height: type.statBig.line }}>
            {String(performed)}
          </T>
          <T variant="statSub" color={fc.blueSoft} style={{ height: type.statSub.line }}>
            {copy.permanent}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', height: PAIR_HEIGHT, marginTop: PAIR_TOP }}>
        {[
          { label: copy.unfulfilled, value: unfulfilled, face: fc.lilac, bordered: false },
          { label: copy.team, value: teamTasks, face: fc.surface, bordered: true },
        ].map((card, i) => (
          <View
            key={card.label}
            style={{
              flex: 1,
              marginLeft: i === 0 ? 0 : PAIR_GAP,
              borderRadius: radius.card,
              backgroundColor: card.face,
              borderWidth: card.bordered ? 1 : 0,
              borderColor: fc.hairline,
              padding: CARD_PAD,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <T
                variant="statLabel"
                color={fc.muted}
                style={{ flex: 1, height: type.statLabel.line }}
              >
                {card.label}
              </T>
              <OpenArrow bg={fc.lime} tint={fc.onLime} />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <T variant="statMid" color={fc.ink} style={{ height: type.statMid.line }}>
                {String(card.value)}
              </T>
              <T variant="statSub" color={fc.muted} style={{ height: type.statSub.line }}>
                {copy.permanent}
              </T>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
