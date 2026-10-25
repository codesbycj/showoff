import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { balance, card, money, pages } from '../data/start';
import { CARDROW_HEIGHT, DOTS_TOP } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * Which card the figures above belong to, and that there are others.
 *
 * The mark is an EMV contact chip, drawn: a rounded pad with its contact
 * lines, filled from the holographic sweep. Two overlapping discs was the
 * first attempt and it came out reading as a particular scheme's mark, which
 * is exactly what a showcase must not wear.
 *
 * The dots are a real pager: `pages.at` lights one, so the row can be swiped
 * without the indicator becoming a lie.
 */
export function CardRow() {
  const left = useId();

  return (
    <View>
      <Pressable accessibilityRole="button" accessibilityLabel={'Card ending ' + card.last4}>
        <View
          style={{
            height: CARDROW_HEIGHT,
            borderRadius: radius.card,
            backgroundColor: ob.card,
            borderWidth: 1,
            borderColor: ob.cardEdge,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          <Svg width={38} height={26} viewBox="0 0 38 26">
            <Defs>
              <LinearGradient
                id={left}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="38"
                y2="26"
              >
                <Stop offset="0" stopColor={ob.holo2} />
                <Stop offset="1" stopColor={ob.holo1} />
              </LinearGradient>
            </Defs>
            <Rect x={6} y={3} width={26} height={20} rx={4} fill={`url(#${left})`} />
            <Path
              d="M15 3v20M23 3v20M6 9.6h26M6 16.4h26"
              stroke={ob.card}
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </Svg>

          <T variant="cardNo" color={ob.ink} style={{ marginLeft: 12, height: type.cardNo.line }}>
            {'•' + card.last4}
          </T>

          <View style={{ flex: 1 }} />

          <T variant="cardNo" color={ob.ink} style={{ height: type.cardNo.line }}>
            {money(balance)}
          </T>
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: DOTS_TOP }}>
        {Array.from({ length: pages.total }, (_, i) => (
          <View
            key={i}
            style={{
              width: i === pages.at ? 16 : 6,
              height: 6,
              marginHorizontal: 3,
              borderRadius: radius.pill,
              backgroundColor: i === pages.at ? ob.ink : ob.muted,
            }}
          />
        ))}
      </View>
    </View>
  );
}
