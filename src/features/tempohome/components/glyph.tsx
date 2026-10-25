import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * Every mark on the screen, drawn.
 *
 * All of these are interface — a chevron, a bell, a dock icon, a plus — so
 * they are vectors here exactly as they would be vectors in the real app
 * (AGENTS.md, "Draw the interface, photograph the picture"). The faces on this
 * screen are the other half of that rule, and they are photographs.
 *
 * `peace` replaces the ✌️ the reference sets in its headline. An emoji is not
 * shippable as UI: Windows, Android and iOS each draw a different one and some
 * platforms have no glyph at all, so the one thing you cannot do is know what
 * it will look like. Drawn, it is the same mark everywhere — and a hand
 * gesture is a pictogram rather than a picture of a hand, which keeps it in
 * range.
 */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name:
    | 'menu'
    | 'search'
    | 'bell'
    | 'bubble'
    | 'close'
    | 'plus'
    | 'dots'
    | 'chevron'
    | 'home'
    | 'message'
    | 'calendar'
    | 'friends';
  size?: number;
  tint: string;
}) {
  const s = { stroke: tint, strokeWidth: 1.9, strokeLinecap: 'round' as const, fill: 'none' };

  switch (name) {
    case 'menu':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4 8h16" {...s} />
          <Path d="M4 13h11" {...s} />
          <Path d="M4 18h7" {...s} />
        </Svg>
      );
    case 'search':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={11} cy={11} r={6.4} {...s} />
          <Path d="M15.8 15.8 20 20" {...s} />
        </Svg>
      );
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6.5 17.5V11a5.5 5.5 0 0 1 11 0v6.5" {...s} />
          <Path d="M4.8 17.6h14.4" {...s} />
          <Path d="M10.2 20.3a2 2 0 0 0 3.6 0" {...s} />
        </Svg>
      );
    case 'bubble':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M4.5 10.4c0-2.7 2.2-4.9 4.9-4.9h5.2c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9H9.6l-3.5 2.6c-.5.4-1.2 0-1.2-.6v-2.4a4.9 4.9 0 0 1-.4-1.9Z"
            fill={tint}
          />
          <Circle cx={9.4} cy={10.4} r={1.05} fill="#1A1D1F" />
          <Circle cx={12} cy={10.4} r={1.05} fill="#1A1D1F" />
          <Circle cx={14.6} cy={10.4} r={1.05} fill="#1A1D1F" />
        </Svg>
      );
    case 'close':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M8 8l8 8M16 8l-8 8" {...s} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 5.5v13M5.5 12h13" {...s} strokeWidth={2.4} />
        </Svg>
      );
    case 'dots':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={7.5} cy={12} r={1.5} fill={tint} />
          <Circle cx={16.5} cy={12} r={1.5} fill={tint} />
        </Svg>
      );
    case 'chevron':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M10 7l5 5-5 5" {...s} />
        </Svg>
      );
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.5 10.3 12 4.4l7.5 5.9v8.3a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1Z" fill={tint} />
        </Svg>
      );
    case 'message':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={3.6} y={6} width={16.8} height={12} rx={3} {...s} />
          <Path d="m5.4 8.4 6.6 4.5 6.6-4.5" {...s} />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={5.6} width={16} height={14} rx={3.2} {...s} />
          <Path d="M4 10h16M8.4 3.8v3.4M15.6 3.8v3.4" {...s} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={9} cy={9.4} r={3.1} {...s} />
          <Path d="M3.6 19.2c.8-2.8 2.8-4.2 5.4-4.2s4.6 1.4 5.4 4.2" {...s} />
          <Path d="M15.6 7.1a3 3 0 0 1 0 5.9M17.4 15.6c1.7.6 2.7 1.8 3.2 3.6" {...s} />
        </Svg>
      );
  }
}

/**
 * The gesture in the headline, which the reference sets as an emoji.
 *
 * Two fingers, a thumb and a cuff, flat, in the same yellow every platform's
 * emoji font would have used — drawn once so it is the same mark on all of
 * them.
 */
export function PeaceHand({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path
        d="M9.4 15.1 6.9 8.4a2.1 2.1 0 0 1 3.9-1.5l2.6 6.9"
        stroke="#F5B942"
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M17.6 13.8 18.4 6a2.1 2.1 0 0 1 4.2.4l-.7 7.6"
        stroke="#F5B942"
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M8.2 13.6c3.6-.9 9.6-1 13.4-.3 3 .5 4.4 2.3 4 5.3l-.5 3.8c-.4 3-2.6 5-5.6 5h-5.3c-2.6 0-4.5-1.2-5.6-3.5l-2.4-5.2c-.8-1.7-.1-3.5 2-5.1Z"
        fill="#F5B942"
      />
    </Svg>
  );
}
