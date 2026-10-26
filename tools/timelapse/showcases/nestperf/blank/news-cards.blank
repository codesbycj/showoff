import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { news } from '../data/start';
import { NEWS_GAP, NEWS_HEIGHT, NEWS_PHOTO } from '../layout';
import { ne, radius, type } from '../theme';
import { T } from './text';

const TONES = { mist: ne.mist, blush: ne.blush } as const;
const INKS = { mist: '#2F6155', blush: '#A24A2E' } as const;

/** The mark on a card, drawn. */
function Mark({ id, tint }: { id: string; tint: string }) {
  if (id === 'percent') {
    return (
      <Svg width={16} height={16} viewBox="0 0 24 24">
        <Path d="M6.4 17.6 17.6 6.4" stroke={tint} strokeWidth={2} strokeLinecap="round" />
        <Circle cx={8} cy={8} r={2.6} stroke={tint} strokeWidth={2} fill="none" />
        <Circle cx={16} cy={16} r={2.6} stroke={tint} strokeWidth={2} fill="none" />
      </Svg>
    );
  }
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        d="M13 2.6c3 3.1 4.2 5.2 4.2 7.3 0 .9-.3 1.7-.8 2.3.8-.2 1.5-.8 2-1.6 1 1.6 1.6 3.2 1.6 4.8 0 3.8-3.1 6.6-7 6.6s-7-2.8-7-6.6c0-4 2.6-7.1 5.3-10.4.6 1 .8 2.1.6 3.2 1-1.4 1.4-3.4 1.1-5.6Z"
        fill={tint}
      />
    </Svg>
  );
}

/**
 * One item of news.
 *
 * The card that carries a photograph gives it the full height of the card
 * and clips it to the card's own corner radius, which is the reference's
 * treatment — and `overflow: 'hidden'` is safe here because nothing on this
 * card carries `elevation`, the pair that is unreliable on Android.
 */
function Card({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const n = news[i];
  return (
    <Pressable
      onPress={() => onPress?.(n.id)}
      accessibilityRole="button"
      accessibilityLabel={n.text}
    >
      <View
        style={{
          height: NEWS_HEIGHT,
          marginBottom: NEWS_GAP,
          borderRadius: radius.card,
          backgroundColor: TONES[n.tone],
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 14,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: radius.pill,
            backgroundColor: ne.canvas,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Mark id={n.mark} tint={INKS[n.tone]} />
        </View>

        <T variant="news" color={ne.ink} style={{ flex: 1, marginHorizontal: 14 }}>
          {n.text}
        </T>

        {n.photo ? (
          <Image
            source={n.photo}
            style={{ width: NEWS_PHOTO, height: NEWS_HEIGHT }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 9,
              height: 9,
              marginRight: 16,
              borderRadius: radius.pill,
              backgroundColor: ne.greenDeep,
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

/** Both of them. */
export function NewsCards({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View>
{/* STEP 1.20 one item
      <Card i={0} onPress={onPress} />
*/}
{/* STEP 1.21 and another
      <Card i={1} onPress={onPress} />
*/}
    </View>
  );
}
