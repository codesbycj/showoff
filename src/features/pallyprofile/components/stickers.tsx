import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

/**
 * The four stickers scattered over the cover.
 *
 * **The reference's are rendered 3D stickers.** Those cannot be reproduced
 * and must not be traced badly — but a sticker is flat vector art with a
 * white keyline in every app that has them, so these are drawn as what they
 * are: a chilli, a bomb, a drink, and a shape. That is expressing the idea
 * rather than copying an arrangement, which is the test the rules set.
 *
 * Each sticker carries its own white keyline inside the SVG. The shadow that
 * used to be on this wrapper is gone: a shadow on a View with no background
 * paints the View's whole rectangle on the web render, so every sticker sat
 * on a white card.
 */
function Sticker({
  size,
  rotate,
  children,
}: {
  size: number;
  rotate: string;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        transform: [{ rotate }],
      }}
    >
      {children}
    </View>
  );
}

export function ChilliSticker({ size = 72 }: { size?: number }) {
  return (
    <Sticker size={size} rotate="-12deg">
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G>
          <Path
            d="M31 24c10-9 25-6 33 4 9 11 10 27 2 40-7 12-21 18-33 14-9-3-13-12-10-20 3-9 12-12 17-19 4-6 2-13-9-19Z"
            fill="#FFFFFF"
          />
          <Path
            d="M34 28c9-7 21-4 28 5 8 10 8 24 1 35-6 10-18 15-27 12-7-3-10-9-8-15 3-8 11-11 16-18 4-6 3-13-10-19Z"
            fill="#E8402A"
          />
          <Path d="M33 27c-3-6-10-9-16-8 1 7 6 12 13 13Z" fill="#FFFFFF" />
          <Path d="M35 26c-3-5-8-7-13-7 1 5 5 9 11 10Z" fill="#3E9B48" />
          <Path
            d="M50 44c4 6 4 15 0 22"
            stroke="#FFC9B6"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </Sticker>
  );
}

export function BombSticker({ size = 60 }: { size?: number }) {
  return (
    <Sticker size={size} rotate="10deg">
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="46" cy="60" r="33" fill="#FFFFFF" />
        <Circle cx="46" cy="60" r="28" fill="#1C1C22" />
        <Rect
          x="58"
          y="24"
          width="14"
          height="12"
          rx="3"
          fill="#FFFFFF"
          transform="rotate(38 65 30)"
        />
        <Path
          d="M68 28c8-6 16-4 20 4"
          stroke="#FFFFFF"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M68 28c8-6 16-4 20 4"
          stroke="#F2A33C"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <Circle cx="38" cy="52" r="7" fill="#45454F" />
      </Svg>
    </Sticker>
  );
}

export function DrinkSticker({ size = 66 }: { size?: number }) {
  return (
    <Sticker size={size} rotate="-18deg">
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path d="M18 20h64L54 56v26h14v10H32V82h14V56Z" fill="#FFFFFF" />
        <Path d="M24 26h52L52 56v22h9v7H39v-7h9V56Z" fill="#DCEBF5" />
        <Path d="M28 30h44L52 54Z" fill="#F08A3C" />
        <Circle cx="70" cy="22" r="9" fill="#FFFFFF" />
        <Circle cx="70" cy="22" r="6" fill="#E2574C" />
      </Svg>
    </Sticker>
  );
}

export function ShapeSticker({ size = 64 }: { size?: number }) {
  return (
    <Sticker size={size} rotate="8deg">
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Rect x="10" y="10" width="80" height="80" rx="26" fill="#FFFFFF" />
        <Rect x="16" y="16" width="68" height="68" rx="22" fill="#1BC47D" />
        <Circle cx="38" cy="38" r="11" fill="#FFFFFF" />
        <Circle cx="62" cy="62" r="11" fill="#FFFFFF" />
        <Ellipse cx="62" cy="38" rx="11" ry="11" fill="#FFD75E" />
      </Svg>
    </Sticker>
  );
}
