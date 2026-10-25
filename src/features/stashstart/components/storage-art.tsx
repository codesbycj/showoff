import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ART_MIN } from '../layout';
import { st } from '../theme';

/**
 * The illustration: a folder, a floppy disk and two arrows moving between
 * them.
 *
 * Drawn, and in range: every piece of it is a small flat object — a folder,
 * a disk, an arrow, a card — rather than a picture of anything. That is the
 * side of the rule that *is* vectors (AGENTS.md, "Draw the interface,
 * photograph the picture").
 *
 * It measures itself and scales the drawing to the box rather than taking a
 * dp size, so the artwork holds on a narrow phone.
 */
export function StorageArt() {
  return (
    <View style={{ flex: 1, minHeight: ART_MIN, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="100%" height="100%" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
        {/* the cards underneath */}
        <Rect x={44} y={56} width={120} height={92} rx={12} fill={st.slate} opacity={0.75} />
        <Rect x={58} y={44} width={120} height={92} rx={12} fill={st.white} />

        {/* the folder, tilted */}
        <Path
          d="M74 40h46l12 15h58a10 10 0 0 1 10 10v62a10 10 0 0 1-10 10H74a10 10 0 0 1-10-10V50a10 10 0 0 1 10-10Z"
          fill={st.ink}
          transform="rotate(-8 140 90)"
        />

        {/* the floppy disk */}
        <Rect
          x={206}
          y={62}
          width={64}
          height={64}
          rx={9}
          fill={st.white}
          stroke={st.ink}
          strokeWidth={4}
        />
        <Rect x={222} y={62} width={32} height={24} rx={3} fill={st.ink} />
        <Rect x={220} y={98} width={36} height={20} rx={3} fill={st.slate} />

        {/* the arrows: one up into the folder, one down out of it */}
        <Path
          d="M96 196v-38h-14l24-28 24 28h-14v38Z"
          fill={st.white}
          stroke={st.ink}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <Path d="M186 150v38h14l-24 28-24-28h14v-38Z" fill={st.yellow} />

        {/* two chips of nothing in particular, for balance */}
        <Circle cx={262} cy={166} r={10} fill={st.yellow} />
        <Rect x={34} y={104} width={22} height={8} rx={4} fill={st.ink} opacity={0.25} />
      </Svg>
    </View>
  );
}

/** The brand's mark: three slabs leaning, which is the idea of a stack. */
export function BrandMark({ size = 22, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 15.5 13 11l7 3.4-9 4.5Z" fill={tint} />
      <Path d="M4 10.5 13 6l7 3.4-9 4.5Z" fill={tint} opacity={0.55} />
    </Svg>
  );
}
