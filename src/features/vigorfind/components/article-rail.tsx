import { Image, Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { articles } from '../data/start';
import { CARD_PAD, CARD_W, MARGIN, RAIL_MIN, RAIL_TOP } from '../layout';
import { radius, type, vg } from '../theme';
import { T } from './text';

/** One of the three figures along the foot of a card. */
function Stat({ kind, value }: { kind: 'eye' | 'reply' | 'heart'; value: number }) {
  const tint = kind === 'heart' ? vg.like : vg.muted;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
      <Svg width={15} height={15} viewBox="0 0 24 24">
        {kind === 'eye' ? (
          <>
            <Path
              d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z"
              stroke={tint}
              strokeWidth={1.7}
              strokeLinejoin="round"
              fill="none"
            />
            <Circle cx={12} cy={12} r={2.6} stroke={tint} strokeWidth={1.7} fill="none" />
          </>
        ) : null}
        {kind === 'reply' ? (
          <Path
            d="M4.4 5.4h15.2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H10l-4.2 3.4v-3.4H4.4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
            stroke={tint}
            strokeWidth={1.7}
            strokeLinejoin="round"
            fill="none"
          />
        ) : null}
        {kind === 'heart' ? (
          <Path
            d="M12 20.2c-.5 0-.9-.2-1.3-.5C6.2 15.9 3.8 13.5 3.8 10.2a4.3 4.3 0 0 1 8.2-1.8 4.3 4.3 0 0 1 8.2 1.8c0 3.3-2.4 5.7-6.9 9.5-.4.3-.8.5-1.3.5Z"
            fill={tint}
          />
        ) : null}
      </Svg>

      <T variant="stat" color={vg.muted} style={{ marginLeft: 6, height: type.stat.line }}>
        {String(value)}
      </T>
    </View>
  );
}

/** One card. Written out in `ArticleRail` so the reveal lands them singly. */
function Card({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const a = articles[i];
  return (
    <Pressable
      onPress={() => onPress?.(a.id)}
      accessibilityRole="button"
      accessibilityLabel={a.title}
      style={{ alignSelf: 'stretch' }}
    >
      <View
        style={{
          flex: 1,
          width: CARD_W,
          marginRight: 14,
          borderRadius: radius.card,
          backgroundColor: vg.card,
          // MISTAKE 1.28 the cards came in squared off on one corner
          borderTopLeftRadius: 0,
          padding: CARD_PAD,
        }}
      >
{/* STEP 1.24 what it is about
        <T variant="cardTitle" color={vg.ink} style={{ minHeight: type.cardTitle.line * 2 }}>
          {a.title}
        </T>
*/}

        {/*
          The art is a photograph. The reference draws a flat illustration of
          a person here, and a drawn person is a picture *of* someone — which
          is the bitmap side of the split, not the vector side.

          It takes `flex: 1` of the card rather than a fixed ratio, so the
          rail fills whatever height the phone has left and the cards grow
          with it instead of leaving a band of blue under the chips.
        */}
{/* STEP 1.25 the photograph
        <Image
          source={a.art}
          resizeMode="cover"
          style={{
            flex: 1,
            width: CARD_W - CARD_PAD * 2,
            marginTop: 10,
            borderRadius: radius.art,
          }}
        />
*/}

{/* STEP 1.26 and how it has been received
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <Stat kind="eye" value={a.views} />
          <Stat kind="reply" value={a.comments} />
          <Stat kind="heart" value={a.likes} />
        </View>
*/}
      </View>
    </Pressable>
  );
}

/**
 * The articles, on a rail.
 *
 * The rail bleeds past the page margin and puts the margin back as content
 * padding, so the first card lines up with the headline and the next one is
 * clipped by the right edge — which is how a rail says there is more.
 */
export function ArticleRail({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View style={{ flex: 1, minHeight: RAIL_MIN, marginTop: RAIL_TOP }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -MARGIN }}
        contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'stretch' }}
      >
{/* STEP 1.23 the first
        <Card i={0} onPress={onPress} />
*/}
{/* STEP 1.27 and the ones behind it
        <Card i={1} onPress={onPress} />
        <Card i={2} onPress={onPress} />
*/}
      </ScrollView>
    </View>
  );
}
