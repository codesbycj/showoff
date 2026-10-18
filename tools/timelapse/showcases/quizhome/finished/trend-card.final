import FileText from 'lucide-react-native/icons/file-text';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { trending } from '../data/home';
import { TREND_HEIGHT } from '../layout';
import { qz, radius } from '../theme';
import { Confetti } from './confetti';
import { T } from './text';

const ART = {
  astro: require('../../../../assets/images/quizhome/hero-astro.png'),
  cheer: require('../../../../assets/images/quizhome/hero-cheer.png'),
} as const;

type Trend = (typeof trending)[number];

/**
 * A popular quiz: what it is, how long it runs, and a way to start it.
 *
 * The right third is artwork — a bed of flat shapes with a cut-out photograph
 * standing on it, which is the same split as the intro screen's hero and the
 * same rule behind it: the blobs are drawn, the subject is a photograph.
 *
 * `overflow: 'hidden'` is what crops the artwork to the card's corners. Safe
 * here because nothing on the card carries `elevation`.
 *
 * The play mark is a drawn triangle rather than an icon-set glyph: at 15dp the
 * set's rounded corners read as a blob and the reference's is sharp. That note
 * belongs here and not beside the triangle, because a JSX comment inside a
 * block the timelapse stages closes that block with its own terminator, and
 * the blank file stops parsing (AGENTS.md, "Timelapse mode").
 */
export function TrendCard({ trend, onPlay }: { trend: Trend; onPlay?: () => void }) {
  const [held, setHeld] = useState(false);
  const art = ART[trend.art];

  return (
    <View
      style={{
        height: TREND_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: trend.color,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%' }}>
        {trend.art === 'astro' ? (
          <Blobs />
        ) : (
          <Confetti width={176} height={TREND_HEIGHT * 0.6} density={0.7} />
        )}
      </View>

      <Image
        source={art}
        style={{
          position: 'absolute',
          right: trend.art === 'astro' ? -4 : -8,
          bottom: trend.art === 'astro' ? -8 : -6,
          width: 128,
          height: TREND_HEIGHT + 4,
        }}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <View style={{ padding: 16, width: '58%', justifyContent: 'space-between', flex: 1 }}>
        <T variant="cardTitle" color={qz.onColor}>
          {trend.title}
        </T>
        <T variant="cardBody" color={qz.onColorMuted}>
          {trend.body}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <FileText size={14} color={qz.onColorMuted} strokeWidth={1.8} />
          <T variant="meta" color={qz.onColorMuted}>
            {trend.meta}
          </T>
        </View>
      </View>

      <Pressable
        onPress={onPlay}
        onPressIn={() => setHeld(true)}
        onPressOut={() => setHeld(false)}
        accessibilityRole="button"
        accessibilityLabel={`Play ${trend.title}`}
        style={{ position: 'absolute', right: '41%', top: TREND_HEIGHT / 2 - 22 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.full,
            backgroundColor: qz.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.86 : 1,
          }}
        >
          <Svg width={15} height={16} viewBox="0 0 15 16">
            <Path d="M3 1.5 L13 8 L3 14.5 Z" fill={qz.ink} />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The flat shapes behind the spacesuit: wedges off the card's right edge, the
 * way the reference stages its artwork.
 *
 * Every shape is a path and none is a circle, because `preserveAspectRatio`
 * is off: the 100x100 user space is stretched to a box half as wide as it is
 * tall, and a circle drawn in it comes out an ellipse twice the width it was
 * meant to be.
 */
function Blobs() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <Path d="M62 0 H100 V30 C80 30 64 18 62 0 Z" fill={qz.history} />
      <Path d="M100 40 V74 C84 70 80 54 88 42 Z" fill={qz.movies} />
      <Path d="M100 86 V100 H70 C76 89 89 85 100 86 Z" fill={qz.gem} opacity={0.9} />
      <Path d="M44 100 C44 88 54 82 64 84 L64 100 Z" fill={qz.science} opacity={0.9} />
    </Svg>
  );
}
