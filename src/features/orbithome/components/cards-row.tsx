import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { cashbackRate, copy, faces } from '../data/start';
import { CARD_GAP, CARDS_HEIGHT } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * Two cards side by side: what the account gives back, and who you have been
 * paying.
 *
 * The right-hand card's holographic fill is drawn in react-native-svg rather
 * than with `expo-linear-gradient`, whose diagonals come out mirrored on web
 * (AGENTS.md); its id comes from `useId` because `Defs` ids are
 * document-global there.
 *
 * The three faces are photographs, per AGENTS.md. They overlap by a third of
 * a disc, each with a ring in the card's own fill so the stack still reads
 * where two portraits happen to share a tone.
 */
export function CardsRow({ onOpen }: { onOpen?: () => void }) {
  const fill = useId();
  const disc = 34;

  return (
    <View style={{ flexDirection: 'row', height: CARDS_HEIGHT }}>
      <Pressable
        style={{ width: 104 }}
        accessibilityRole="button"
        accessibilityLabel={cashbackRate + '% ' + copy.cashbackSub}
      >
        <View
          style={{
            flex: 1,
            borderRadius: radius.card,
            backgroundColor: ob.card,
            borderWidth: 1,
            borderColor: ob.cardEdge,
            padding: 14,
            justifyContent: 'space-between',
          }}
        >
          <Svg width={26} height={26} viewBox="0 0 24 24">
            <Path d="M3.6 9.4 12 5.2l8.4 4.2-8.4 4.2Z" fill={ob.body} opacity={0.55} />
            <Path
              d="M3.6 9.4v5.2L12 18.8l8.4-4.2V9.4"
              stroke={ob.ink}
              strokeWidth={1.7}
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
          <View>
            <T variant="cashback" color={ob.ink} style={{ height: type.cashback.line }}>
              {cashbackRate + '%'}
            </T>
            <T variant="cashbackSub" color={ob.body} style={{ height: type.cashbackSub.line }}>
              {copy.cashbackSub}
            </T>
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={onOpen}
        style={{ flex: 1, marginLeft: CARD_GAP }}
        accessibilityRole="button"
        accessibilityLabel={copy.recent}
      >
        <View
          style={{
            flex: 1,
            borderRadius: radius.card,
            overflow: 'hidden',
            padding: 14,
            justifyContent: 'space-between',
          }}
        >
          {/*
            The fill is inset to 0 on all four sides, not just positioned
            absolutely. With `auto` offsets an absolute child starts at the
            *content* origin, so the gradient began 14dp in and overflowed the
            same amount at the other end: a dark strip down the card's left
            and top, and a title that looked flush with the edge.
          */}
          <Svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Defs>
              <LinearGradient
                id={fill}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="240"
                y2={String(CARDS_HEIGHT)}
              >
                <Stop offset="0" stopColor={ob.holo2} />
                <Stop offset="0.55" stopColor={ob.holo1} />
                <Stop offset="1" stopColor={ob.holo3} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width="100%" height="100%" rx={radius.card} fill={`url(#${fill})`} />
          </Svg>

          <T variant="cardTitle" color={ob.onHolo} style={{ height: type.cardTitle.line }}>
            {copy.recent}
          </T>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {faces.map((face, i) => (
              <Image
                key={i}
                source={face}
                style={{
                  width: disc,
                  height: disc,
                  marginLeft: i === 0 ? 0 : -11,
                  borderRadius: radius.pill,
                  borderWidth: 2,
                  borderColor: ob.holo1,
                }}
                accessibilityIgnoresInvertColors
              />
            ))}
            <View style={{ flex: 1 }} />
            <View
              style={{
                width: disc,
                height: disc,
                borderRadius: radius.pill,
                backgroundColor: ob.canvas,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Svg width={15} height={15} viewBox="0 0 24 24">
                <Path
                  d="M12 6v12M6 12h12"
                  stroke={ob.ink}
                  strokeWidth={2.3}
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
