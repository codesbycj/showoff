import Svg, { G, Path, Rect } from 'react-native-svg';

/**
 * The waving hand beside "Welcome Back".
 *
 * The reference uses the emoji. This project does not ship emoji as UI —
 * Windows, Android and iOS each draw a different hand, and the harness renders
 * whichever one the machine building it happens to have, which is exactly the
 * difference a web render cannot catch. So it is drawn: a palm, four fingers
 * and a thumb, in the flat style the rest of the board uses.
 *
 * Tilted as a whole rather than per finger. React Native rotates about an
 * element's centre whatever `transformOrigin` says, and for a square glyph box
 * that is precisely the pivot a wave wants.
 */
export function WaveGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G transform="rotate(14 12 14)">
        <Rect x={7.4} y={2.6} width={2.9} height={10} rx={1.45} fill="#f2b23c" />
        <Rect x={10.7} y={1.8} width={2.9} height={10.8} rx={1.45} fill="#f5c45a" />
        <Rect x={14} y={2.9} width={2.9} height={9.7} rx={1.45} fill="#f2b23c" />
        <Path
          d="M5.6 9.1 C5.6 8.2 6.3 7.5 7.2 7.5 C8.1 7.5 8.8 8.2 8.8 9.1 V12 H5.6 Z"
          fill="#e8a52f"
        />
        <Path
          d="M5.6 11.4 H17.6 C18.4 11.4 19 12 19 12.8 V15 C19 18.6 16.1 21.4 12.6 21.4 H11.4
             C7.9 21.4 5.6 18.6 5.6 15 Z"
          fill="#f5c45a"
        />
      </G>
    </Svg>
  );
}
