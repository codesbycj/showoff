import { Image, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { qz, radius } from '../theme';
import { FACES } from './faces';

/**
 * The artwork: a photograph of a person on a bed of flat shapes, with doodles
 * scribbled round them.
 *
 * The split is deliberate and follows the rule (AGENTS.md, "Three kinds of
 * reference"). The **person is a photograph** — a face is not in drawing
 * range, and the reference's is a cut-out portrait. The **blobs and the
 * doodles are drawn** — a disc, a blob and a scribbled question mark are small
 * flat marks, which is exactly what vector is for.
 *
 * The photograph is round rather than cut out. A proper cut-out needs an alpha
 * matte, and a badly keyed one leaves a grey halo that reads as a mistake on
 * every frame of the video; a disc is an honest shape and sits on the blobs
 * the same way.
 *
 * The two drawn layers are named components rather than two `Svg` blocks in
 * line, because their opening tags would otherwise be identical — and a
 * staging anchor matches the first line it finds.
 */
export function HeroStage({ size }: { size: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Blobs size={size} />

      <Image
        source={FACES[0]}
        style={{
          width: size * 0.56,
          height: size * 0.56,
          borderRadius: radius.full,
          borderWidth: 5,
          borderColor: qz.stage,
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <Doodles size={size} />
    </View>
  );
}

/** The flat shapes the portrait stands on. */
function Blobs({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={{ position: 'absolute' }}>
      <Circle cx={74} cy={86} r={58} fill={qz.blobOrange} />
      <Path
        d="M118 60 C150 56 172 80 170 108 C168 136 140 152 116 144 C92 136 86 104 96 82 Z"
        fill={qz.blobPurple}
      />
      <Circle cx={150} cy={64} r={16} fill={qz.blobYellow} />
      <Circle cx={44} cy={152} r={12} fill={qz.blobTeal} />
    </Svg>
  );
}

/** The marks scribbled round it — a question mark, a cross, a plus, two arcs. */
function Doodles({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={{ position: 'absolute' }}>
      <Path
        d="M150 26 C158 20 168 24 168 32 C168 40 158 41 158 48"
        stroke={qz.doodle}
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={158} cy={56} r={2.6} fill={qz.doodle} />

      <Path
        d="M30 40 L36 46 M36 40 L30 46"
        stroke={qz.doodle}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M176 128 C176 120 182 116 188 118"
        stroke={qz.doodle}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M18 108 H30 M24 102 V114" stroke={qz.doodle} strokeWidth={3} strokeLinecap="round" />
      <Path
        d="M158 160 C164 154 172 156 174 162"
        stroke={qz.doodle}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
