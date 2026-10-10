import Svg, { Circle, G, Path, Polygon } from 'react-native-svg';

/**
 * The hero's illustration: a taped carton with a location pin on its corner.
 *
 * The reference uses a 3D render, which is not obtainable, so this is the same
 * subject built isometrically — a 34x37dp cube with a tape band crossing the
 * lid and running down the shaded face, and a pin sitting over its lower right
 * corner. Measured off the reference at x 35..76, y 152..190, which is the
 * 42x39 viewBox here.
 *
 * Drawn rather than bundled: it is the only place the art appears, and a
 * raster would need a 3x asset to survive the 42dp it is used at.
 */

/** The cube's eight corners, so the three faces cannot drift out of register. */
const T = '17,0';
const RT = '34,10';
const B = '17,20';
const L = '0,10';
const L2 = '0,27';
const B2 = '17,37';
const R2 = '34,27';

export function ParcelArt({ size = 42 }: { size?: number }) {
  return (
    <Svg width={size} height={(size * 39) / 42} viewBox="0 0 42 39">
      <G>
        {/* Lid, lit face, shaded face. */}
        <Polygon points={`${T} ${RT} ${B} ${L}`} fill="#F8CB8C" />
        <Polygon points={`${L} ${B} ${B2} ${L2}`} fill="#F2AE64" />
        <Polygon points={`${B} ${RT} ${R2} ${B2}`} fill="#DD8B3D" />

        {/* The tape, over the lid and down the shaded face. */}
        <Polygon points="7.7,5.5 12.2,2.8 29.2,12.8 24.7,15.5" fill="#8B4A24" />
        <Polygon points="24.7,15.5 29.2,12.8 29.2,29.8 24.7,32.5" fill="#71391B" />

        {/* The shipping label's print, on the lit face. */}
        <Path
          d="M3.6 22.2h7.4M3.6 24.6h5"
          stroke="#D8964C"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
      </G>

      {/* The pin, over the carton's lower right corner. */}
      <G>
        <Path
          d="M32.6 17.4c-5 0-9 4-9 9 0 6 7.7 12 8.3 12.5a1.1 1.1 0 0 0 1.4 0c.6-.5 8.3-6.5 8.3-12.5 0-5-4-9-9-9Z"
          fill="#FFFFFF"
        />
        <Path
          d="M32.6 19.1c-4 0-7.3 3.3-7.3 7.3 0 4.9 6.3 10 7.3 10.8 1-.8 7.3-5.9 7.3-10.8 0-4-3.3-7.3-7.3-7.3Z"
          fill="#DD2222"
        />
        <Circle cx={32.6} cy={26.2} r={3.3} fill="#FFFFFF" />
        <Circle cx={32.6} cy={26.2} r={1.3} fill="#DD2222" />
      </G>
    </Svg>
  );
}
