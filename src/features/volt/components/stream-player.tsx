import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';

/** The export's `aspect-[4/5]`, capped at 580dp. At 393dp wide that is 491. */
const PLAYER_HEIGHT = 491;

/**
 * The video block and everything floating over it.
 *
 * The still is a photograph standing in for a stream, which is what the export
 * does too — it sets a generated image as a CSS `background-image` on the
 * player, not a `<video>`. So nothing here pretends to play; the pause control
 * and the scrubber are drawn at the position the reference shows them.
 *
 * The frosted controls drop their `backdrop-blur`, which React Native has no
 * equivalent for. Each keeps the 80-85% fill the export sets, which over a
 * photograph this dark lands on effectively the same colour.
 *
 * The export stacks two gradients over the still — a vertical fade and a radial
 * vignette. Only the vertical one is rebuilt: `bg-radial-gradient` is not a real
 * Tailwind utility, so it resolves to nothing in the reference either, and
 * adding a vignette the reference never draws would be inventing.
 */
export function StreamPlayer({
  still,
  quality,
  viewers,
  half,
  clock,
  progress,
  onBack,
}: {
  still: number;
  quality: string;
  viewers: string;
  half: string;
  clock: string;
  progress: number;
  onBack?: () => void;
}) {
  return (
    <View
      style={{
        height: PLAYER_HEIGHT,
        borderBottomLeftRadius: R.xl,
        borderBottomRightRadius: R.xl,
        overflow: 'hidden',
      }}
    >
      <Image source={still} style={{ width: '100%', height: '100%' }} contentFit="cover" />

      <LinearGradient
        colors={[
          alpha(vt.surfaceContainerLowest, 0.8),
          alpha(vt.surfaceContainerLowest, 0.3),
          vt.surfaceContainerLowest,
        ]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        pointerEvents="none"
      />

      <View
        style={{
          position: 'absolute',
          top: SP.md,
          left: SP.margin,
          right: SP.margin,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <GlassButton icon="arrowBack" label="Back" onPress={onBack} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.xs,
            paddingHorizontal: SP.md,
            paddingVertical: 6,
            borderRadius: R.full,
            backgroundColor: alpha(vt.surfaceContainerHigh, 0.85),
          }}
        >
          <View style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: vt.error }} />
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.primaryFixed }}>
            {quality.toUpperCase()}
          </Text>
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{viewers}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: SP.xs }}>
          <GlassButton icon="volumeUp" label="Mute audio" />
          <GlassButton icon="pictureInPictureAlt" label="Picture in picture" />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: R.full,
            backgroundColor: alpha(vt.surfaceContainerHigh, 0.7),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="pause" size={36} color={vt.primary} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: SP.margin,
          gap: SP.sm,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SP.xs,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
              }}
            />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.5, color: vt.primary }}>
              {half.toUpperCase()}
            </Text>
          </View>
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.primaryFixed }}>
            {clock}
          </Text>
        </View>

        <View
          style={{
            height: 6,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerHighest,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
              height: 6,
              borderRadius: R.full,
              backgroundColor: vt.primaryFixed,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                position: 'absolute',
                right: -7,
                width: 14,
                height: 14,
                borderRadius: R.full,
                backgroundColor: vt.primary,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/** One 44dp frosted control over the video. */
function GlassButton({
  icon,
  label,
  onPress,
}: {
  icon: 'arrowBack' | 'volumeUp' | 'pictureInPictureAlt';
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: R.full,
          backgroundColor: alpha(vt.surfaceContainerHigh, 0.8),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name={icon} size={20} color={vt.primary} />
      </View>
    </Pressable>
  );
}
