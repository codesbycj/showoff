import Svg, { Circle, Path } from 'react-native-svg';

/**
 * Every mark on the screen, drawn — all of them interface.
 *
 * `sparkle` replaces the ✨ the reference sets inside its headline. An emoji
 * is a different mark on every platform and missing on some, so it cannot be
 * shipped as UI; drawn, it is the same four-point star everywhere and it can
 * take the brand's violet rather than whatever yellow the system font has.
 *
 * `mark` is the brand's, invented: a tilted bar through a disc, which is the
 * idea the name is about. The reference's own wordmark is a real company's and
 * does not come along.
 */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'home' | 'money' | 'bell' | 'settings' | 'caret' | 'arrow' | 'plus' | 'chevron';
  size?: number;
  tint: string;
}) {
  const s = { stroke: tint, strokeWidth: 1.9, strokeLinecap: 'round' as const, fill: 'none' };

  switch (name) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.6 10.4 12 4.6l7.4 5.8v8a1 1 0 0 1-1 1h-12.8a1 1 0 0 1-1-1Z" fill={tint} />
        </Svg>
      );
    case 'money':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={8.4} {...s} />
          <Path
            d="M12 7.2v9.6M14.4 9.6c0-1-1.1-1.7-2.4-1.7s-2.4.7-2.4 1.7 1.1 1.6 2.4 1.9 2.4.9 2.4 1.9-1.1 1.7-2.4 1.7-2.4-.7-2.4-1.7"
            {...s}
            strokeWidth={1.7}
          />
        </Svg>
      );
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6.6 17.4V11a5.4 5.4 0 0 1 10.8 0v6.4" {...s} />
          <Path d="M4.9 17.5h14.2" {...s} />
          <Path d="M10.3 20.1a2 2 0 0 0 3.4 0" {...s} />
        </Svg>
      );
    case 'settings':
      // A gear, not a sun: a ring of eight teeth drawn as short radial bars
      // with a hub in the middle. The first pass drew the bars without the
      // ring and it read as a sun at 22dp, which is a different icon.
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 2.9a2.1 2.1 0 0 1 2 1.5l.2.7 1 .4.7-.4a2.1 2.1 0 0 1 2.6 3.2l-.4.6.4 1 .7.2a2.1 2.1 0 0 1 0 4l-.7.2-.4 1 .4.6a2.1 2.1 0 0 1-2.6 3.2l-.7-.4-1 .4-.2.7a2.1 2.1 0 0 1-4 0l-.2-.7-1-.4-.7.4a2.1 2.1 0 0 1-2.6-3.2l.4-.6-.4-1-.7-.2a2.1 2.1 0 0 1 0-4l.7-.2.4-1-.4-.6a2.1 2.1 0 0 1 2.6-3.2l.7.4 1-.4.2-.7a2.1 2.1 0 0 1 2-1.5Z"
            fill={tint}
          />
          <Circle cx={12} cy={12} r={3.1} fill="#15283C" />
        </Svg>
      );
    case 'caret':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 10 5 5 5-5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'chevron':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M10 6.5 15.5 12 10 17.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.4} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 17 17 7M9.4 7H17v7.6" {...s} strokeWidth={2.6} />
        </Svg>
      );
  }
}

/** The four-point star in the headline. */
export function Sparkle({ size = 30, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path
        d="M20 3c1.4 5.3 3.7 7.6 9 9-5.3 1.4-7.6 3.7-9 9-1.4-5.3-3.7-7.6-9-9 5.3-1.4 7.6-3.7 9-9Z"
        fill={tint}
      />
      <Path
        d="M9.5 17c.8 3 2.1 4.3 5.1 5.1-3 .8-4.3 2.1-5.1 5.1-.8-3-2.1-4.3-5.1-5.1 3-.8 4.3-2.1 5.1-5.1Z"
        fill={tint}
      />
    </Svg>
  );
}

/** The brand's mark: a tilted bar through a disc. */
export function BrandMark({ size = 22, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9.6} fill={tint} />
      <Path d="M8.6 15.8 15.4 8.2" stroke="#FAF6F0" strokeWidth={2.6} strokeLinecap="round" />
      <Circle cx={15.4} cy={8.2} r={2} fill="#FAF6F0" />
    </Svg>
  );
}
