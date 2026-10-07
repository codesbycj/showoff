import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { FONT } from '../theme';

/**
 * The seven expressive characters the onboarding screen is built around.
 *
 * These are ported from the export's own inline SVG rather than traced or
 * redrawn: Stitch hand-authored them as real vector art — gradient fills, a
 * white rim stroke, a translucent top-light ellipse, blush cheeks, then the
 * features — and every coordinate is already exact. `tools/preview/trace.py`
 * exists for the opposite case, a glyph that survives only as pixels.
 *
 * Two things had to be repaired on the way across. The export is HTML, so its
 * parser lowercased every SVG attribute name — `viewbox`, `lineargradient`,
 * `gradientunits`, `stop-color` — and react-native-svg wants the real camelCase
 * spellings back. And each face keeps its own `viewBox`, which is not uniformly
 * 120: the bolt is 110x145 and the capsule 100x130, so a face is sized by the
 * box it was drawn in and not by one shared number.
 *
 * `idSuffix` exists because gradient ids are document-global on web while
 * react-native-svg scopes them per-`Svg` on native. Each kind appears once on
 * the cluster so the default is safe, but a face reused elsewhere on the same
 * screen passes a suffix rather than quietly picking up the first one's fill.
 */

type FaceProps = { width: number; height: number; idSuffix?: string };

/** Each character's natural drawing box, so a caller can size by aspect. */
export const FACE_BOX = {
  happy: { w: 120, h: 120 },
  curious: { w: 130, h: 130 },
  tender: { w: 100, h: 130 },
  energized: { w: 110, h: 145 },
  grumpy: { w: 120, h: 120 },
  sleepy: { w: 120, h: 120 },
  squint: { w: 120, h: 120 },
} as const;

export type FaceKind = keyof typeof FACE_BOX;

const RIM = 'rgba(255,255,255,0.7)';
const RIM_BRIGHT = 'rgba(255,255,255,0.75)';

/** 1 — mint circle, arched closed eyes, wide gentle smile. */
function Happy({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-mint${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="20" y1="12" x2="100" y2="108">
          <Stop stopColor="#A7F3D0" />
          <Stop offset="1" stopColor="#6EE7B7" />
        </LinearGradient>
      </Defs>
      <Circle cx="60" cy="60" r="54" fill={`url(#${id})`} />
      <Circle cx="60" cy="60" r="52.5" stroke={RIM} strokeWidth="2.5" />
      <Ellipse cx="60" cy="24" rx="34" ry="12" fill="white" fillOpacity="0.25" />
      <Ellipse cx="28" cy="66" rx="8" ry="4.5" fill="#34D399" fillOpacity="0.38" />
      <Ellipse cx="92" cy="66" rx="8" ry="4.5" fill="#34D399" fillOpacity="0.38" />
      <Path
        d="M36 50 C40 42 50 42 54 50"
        stroke="#164e32"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <Path
        d="M66 50 C70 42 80 42 84 50"
        stroke="#164e32"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <Path
        d="M42 66 C49 79 71 79 78 66"
        stroke="#164e32"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** 2 — lilac circle overlaid with a hypnotic swirl, wide sparkling eyes. */
function Curious({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-lilac${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 130 130" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="18" y1="14" x2="114" y2="116">
          <Stop stopColor="#F3E8FF" />
          <Stop offset="1" stopColor="#D8B4FE" />
        </LinearGradient>
      </Defs>
      <Circle cx="65" cy="65" r="58" fill={`url(#${id})`} />
      <Circle cx="65" cy="65" r="56.5" stroke={RIM_BRIGHT} strokeWidth="2.5" />
      <Ellipse cx="65" cy="26" rx="36" ry="12" fill="white" fillOpacity="0.3" />
      <Path
        d="M 65 24 C 92 24 110 44 110 68 C 110 93 88 111 63 111 C 36 111 20 90 20 64 C 20 40 37 26 56 26 C 75 26 89 39 89 57 C 89 74 76 85 62 85 C 50 85 41 77 42 66"
        stroke="#A855F7"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <Ellipse cx="36" cy="74" rx="7" ry="4" fill="#C084FC" fillOpacity="0.45" />
      <Ellipse cx="94" cy="74" rx="7" ry="4" fill="#C084FC" fillOpacity="0.45" />
      <Circle cx="48" cy="62" r="7.5" fill="#3B0764" />
      <Circle cx="46" cy="59.5" r="2.5" fill="white" />
      <Circle cx="50" cy="63.5" r="1.2" fill="white" />
      <Circle cx="82" cy="62" r="7.5" fill="#3B0764" />
      <Circle cx="80" cy="59.5" r="2.5" fill="white" />
      <Circle cx="84" cy="63.5" r="1.2" fill="white" />
      <Path d="M 54 75 Q 65 83 76 74" stroke="#3B0764" strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

/** 3 — peach capsule, drooping brows, big kawaii eyes, pouty mouth. */
function Tender({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-peach${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 100 130" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="14" y1="12" x2="86" y2="120">
          <Stop stopColor="#FFE4E6" />
          <Stop offset="1" stopColor="#FECDD3" />
        </LinearGradient>
      </Defs>
      <Rect x="7" y="7" width="86" height="116" rx="43" fill={`url(#${id})`} />
      <Rect
        x="8.5"
        y="8.5"
        width="83"
        height="113"
        rx="41.5"
        stroke={RIM_BRIGHT}
        strokeWidth="2.5"
      />
      <Ellipse cx="50" cy="25" rx="26" ry="9" fill="white" fillOpacity="0.32" />
      <Path d="M 28 47 Q 35 44 42 48" stroke="#881337" strokeWidth="3" strokeLinecap="round" />
      <Path d="M 72 47 Q 65 44 58 48" stroke="#881337" strokeWidth="3" strokeLinecap="round" />
      <Circle cx="35" cy="58" r="6" fill="#881337" />
      <Circle cx="33.5" cy="56" r="2" fill="white" />
      <Circle cx="65" cy="58" r="6" fill="#881337" />
      <Circle cx="63.5" cy="56" r="2" fill="white" />
      <Ellipse cx="27" cy="67" rx="6.5" ry="3.5" fill="#FB7185" fillOpacity="0.5" />
      <Ellipse cx="73" cy="67" rx="6.5" ry="3.5" fill="#FB7185" fillOpacity="0.5" />
      <Path d="M 39 80 Q 50 72 61 80" stroke="#881337" strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

/** 4 — the yellow lightning bolt, winking. The cluster's centrepiece. */
function Energized({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-bolt${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 110 145" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="20" y1="10" x2="88" y2="135">
          <Stop stopColor="#FEF08A" />
          <Stop offset="1" stopColor="#FACC15" />
        </LinearGradient>
      </Defs>
      <Path
        d="M64 8 L18 78 L52 78 L38 138 L94 62 L60 62 Z"
        fill={`url(#${id})`}
        stroke={RIM}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M60 14 L26 73 L54 73"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <Ellipse cx="40" cy="74" rx="5" ry="3" fill="#F59E0B" fillOpacity="0.45" />
      <Ellipse cx="70" cy="74" rx="5" ry="3" fill="#F59E0B" fillOpacity="0.45" />
      <Path d="M 42 66 Q 47 62 52 66" stroke="#713F12" strokeWidth="3.5" strokeLinecap="round" />
      <Circle cx="68" cy="65" r="4.5" fill="#713F12" />
      <Circle cx="66.5" cy="63.5" r="1.5" fill="white" />
      <Path d="M 48 76 Q 56 83 64 76" stroke="#713F12" strokeWidth="3.5" strokeLinecap="round" />
    </Svg>
  );
}

/** 5 — sage squircle, furrowed brows, grumpy pout. */
function Grumpy({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-sage${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="16" y1="12" x2="104" y2="108">
          <Stop stopColor="#D1FAE5" />
          <Stop offset="1" stopColor="#A7F3D0" />
        </LinearGradient>
      </Defs>
      <Rect x="8" y="8" width="104" height="104" rx="34" fill={`url(#${id})`} />
      <Rect x="9.5" y="9.5" width="101" height="101" rx="32.5" stroke={RIM} strokeWidth="2.5" />
      <Ellipse cx="60" cy="24" rx="36" ry="10" fill="white" fillOpacity="0.32" />
      <Path d="M 30 46 L 49 54" stroke="#064E3B" strokeWidth="5" strokeLinecap="round" />
      <Path d="M 90 46 L 71 54" stroke="#064E3B" strokeWidth="5" strokeLinecap="round" />
      <Circle cx="40" cy="63" r="5" fill="#064E3B" />
      <Circle cx="80" cy="63" r="5" fill="#064E3B" />
      <Path d="M 43 83 Q 60 72 77 83" stroke="#064E3B" strokeWidth="4.5" strokeLinecap="round" />
      <Ellipse cx="32" cy="72" rx="6" ry="3.5" fill="#6EE7B7" fillOpacity="0.6" />
      <Ellipse cx="88" cy="72" rx="6" ry="3.5" fill="#6EE7B7" fillOpacity="0.6" />
    </Svg>
  );
}

/** 6 — aqua circle asleep, round snoring mouth, two floating `z`s. */
function Sleepy({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-aqua${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="16" y1="14" x2="104" y2="108">
          <Stop stopColor="#CCFBF1" />
          <Stop offset="1" stopColor="#99F6E4" />
        </LinearGradient>
      </Defs>
      <Circle cx="60" cy="60" r="54" fill={`url(#${id})`} />
      <Circle cx="60" cy="60" r="52.5" stroke={RIM_BRIGHT} strokeWidth="2.5" />
      <Ellipse cx="60" cy="24" rx="34" ry="11" fill="white" fillOpacity="0.3" />
      <Path d="M 28 53 Q 39 63 50 53" stroke="#134E4A" strokeWidth="4.5" strokeLinecap="round" />
      <Path d="M 70 53 Q 81 63 92 53" stroke="#134E4A" strokeWidth="4.5" strokeLinecap="round" />
      <Ellipse cx="26" cy="64" rx="7" ry="4" fill="#2DD4BF" fillOpacity="0.45" />
      <Ellipse cx="94" cy="64" rx="7" ry="4" fill="#2DD4BF" fillOpacity="0.45" />
      <Ellipse cx="60" cy="76" rx="7" ry="9" fill="#134E4A" />
      <Ellipse cx="60" cy="73" rx="4" ry="5.5" fill="#042F2E" />
      <SvgText
        x="78"
        y="38"
        fill="#0D9488"
        fontFamily={FONT.extrabold}
        fontSize="14"
        opacity="0.65"
      >
        z
      </SvgText>
      <SvgText
        x="88"
        y="27"
        fill="#0D9488"
        fontFamily={FONT.extrabold}
        fontSize="11"
        opacity="0.45"
      >
        z
      </SvgText>
    </Svg>
  );
}

/** 7 — coral rounded triangle, squinting `&gt; &lt;` eyes, shy smile. */
function Squint({ width, height, idSuffix = '' }: FaceProps) {
  const id = `grad-coral${idSuffix}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id={id} gradientUnits="userSpaceOnUse" x1="30" y1="18" x2="100" y2="110">
          <Stop stopColor="#FECDD3" />
          <Stop offset="1" stopColor="#FDA4AF" />
        </LinearGradient>
      </Defs>
      <Path
        d="M 60 14 C 64 7 70 7 74 14 L 111 88 C 115 95 111 104 103 104 L 17 104 C 9 104 5 95 9 88 Z"
        fill={`url(#${id})`}
        stroke={RIM}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M 60 22 L 98 96"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      <Path
        d="M 37 66 L 47 71 L 37 76"
        stroke="#881337"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M 77 66 L 67 71 L 77 76"
        stroke="#881337"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M 52 82 Q 57 87 62 82" stroke="#881337" strokeWidth="3.5" strokeLinecap="round" />
      <Ellipse cx="33" cy="79" rx="6" ry="3.5" fill="#F43F5E" fillOpacity="0.45" />
      <Ellipse cx="81" cy="79" rx="6" ry="3.5" fill="#F43F5E" fillOpacity="0.45" />
    </Svg>
  );
}

const FACES: Record<FaceKind, (p: FaceProps) => React.ReactElement> = {
  happy: Happy,
  curious: Curious,
  tender: Tender,
  energized: Energized,
  grumpy: Grumpy,
  sleepy: Sleepy,
  squint: Squint,
};

/** One character, drawn at whatever box the caller gives it. */
export function MoodFace({
  kind,
  width,
  height,
  idSuffix,
}: {
  kind: FaceKind;
  width: number;
  height: number;
  idSuffix?: string;
}) {
  const Face = FACES[kind];
  return <Face width={width} height={height} idSuffix={idSuffix} />;
}
