import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

/**
 * The account avatar: a flat illustration on a yellow disc.
 *
 * The reference uses a stock illustration that is not redistributable, so this
 * is drawn to the same read — a bob-haired figure in a white top, centred on a
 * warm yellow disc, cropped by the disc at the shoulders. At 46dp the parts
 * that carry it are the silhouette of the hair and the white of the shirt, and
 * both are here.
 *
 * Drawn rather than bundled because a 46dp raster would need a 3x asset to
 * stay crisp, and this costs nothing at any size.
 */
export function UserAvatar({ size = 46 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 46 46">
      <Defs>
        <ClipPath id="dt-avatar-disc">
          <Circle cx={23} cy={23} r={23} />
        </ClipPath>
      </Defs>

      <Circle cx={23} cy={23} r={23} fill="#F6D953" />

      <G clipPath="url(#dt-avatar-disc)">
        {/* Shoulders, which the disc crops. */}
        <Path
          d="M23 29.5c8.4 0 14.6 5.4 15.8 13.4v8H7.2v-8C8.4 34.9 14.6 29.5 23 29.5Z"
          fill="#FBFBFD"
        />
        <Rect x={19.4} y={26.4} width={7.2} height={7} rx={3.2} fill="#EDB088" />

        {/* Face. */}
        <Path
          d="M14.6 17.6c0-5 3.8-8.6 8.4-8.6s8.4 3.6 8.4 8.6v4.6c0 5-3.8 8.6-8.4 8.6s-8.4-3.6-8.4-8.6v-4.6Z"
          fill="#F3BE97"
        />

        {/* Hair: a cap over the crown and two sides falling to the jaw. */}
        <Path
          d="M23 6.6c5.4 0 9.6 4 9.6 9.6 0 2-.3 4-.9 5.6-.3.8-.6 1.5-1 2l-.5-5.4c-2.6-.3-4.7-1.5-6.3-3.5-1.8 2.3-4.4 3.6-7.7 3.9l-.6 5c-.5-.5-.8-1.2-1.1-2-.6-1.6-.9-3.6-.9-5.6 0-5.6 4-9.6 9.4-9.6Z"
          fill="#9B5A22"
        />
        <Path
          d="M13.6 14.9c1.4-4.9 4.8-8.3 9.4-8.3s8 3.4 9.4 8.3c-2.4-3.1-5.5-4.7-9.4-4.7s-7 1.6-9.4 4.7Z"
          fill="#B06C2B"
        />
      </G>
    </Svg>
  );
}
