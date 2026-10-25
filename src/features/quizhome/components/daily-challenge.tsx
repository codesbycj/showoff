import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { daily } from '../data/home';
import { HERO_HEIGHT, HERO_PAD, HERO_PHOTO_W } from '../layout';
import { qz, radius } from '../theme';
import { Confetti } from './confetti';
import { T } from './text';

const CHEER = require('../../../../assets/images/quizhome/hero-cheer.png');

/**
 * The challenge of the day: what it is, how far through you are, and the one
 * thing it asks.
 *
 * The photograph is positioned against the card's bottom edge and the card
 * clips it, so the figure is cropped at the waist by the card rather than by
 * the image — which is what lets the same cut-out be reused at a different
 * height on a trending card.
 *
 * `overflow: 'hidden'` is safe here because nothing on this card carries
 * `elevation`: the two together are unreliable on Android (AGENTS.md, "React
 * Native traps that have actually bitten").
 */
export function DailyChallenge({ onPlay }: { onPlay?: () => void }) {
  const [held, setHeld] = useState(false);
  const progress = daily.done / daily.total;

  return (
    <View
      style={{
        height: HERO_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: qz.violet,
        overflow: 'hidden',
      }}
    >
      <View
        style={{ position: 'absolute', right: 0, top: 0, width: HERO_PHOTO_W + 26, height: 96 }}
      >
        <Confetti width={HERO_PHOTO_W + 26} height={96} />
      </View>

      <Image
        source={CHEER}
        style={{
          position: 'absolute',
          right: -14,
          // A touch below the card's foot, so the figure is cropped by the
          // card rather than floating clear of it. The box carries the
          // cut-out's own aspect, near enough square, because `contain`
          // letterboxes inside a box of any other shape and the gap lands
          // under the feet where it shows.
          bottom: -6,
          width: HERO_PHOTO_W,
          height: HERO_PHOTO_W,
        }}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <View style={{ padding: HERO_PAD, width: '62%' }}>
        <T variant="cardTitle" color={qz.onColor}>
          {daily.title}
        </T>
        <T variant="cardBody" color={qz.onColorMuted} style={{ marginTop: 7 }}>
          {daily.body}
        </T>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 14 }}>
          <View
            style={{
              flex: 1,
              height: 6,
              borderRadius: radius.pill,
              backgroundColor: qz.violetTrack,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                borderRadius: radius.pill,
                backgroundColor: qz.onColor,
              }}
            />
          </View>
          <T variant="progress" color={qz.onColor}>
            {`${daily.done}/${daily.total}`}
          </T>
        </View>

        <Pressable
          onPress={onPlay}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={daily.cta}
          style={{ marginTop: 14, alignSelf: 'flex-start' }}
        >
          <View
            style={{
              height: 38,
              paddingHorizontal: 24,
              borderRadius: radius.pill,
              backgroundColor: qz.ink,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="play" color={qz.onColor}>
              {daily.cta}
            </T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
