import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { useId } from 'react';

/**
 * A country flag, drawn as a disc.
 *
 * Drawn and not an emoji, because Windows has no flag glyphs at all and the
 * preview harness runs on Windows: the reference's flag would render as two
 * letters in the web shot and as a flag on the device, which is exactly the
 * difference a web render cannot catch (AGENTS.md, "The web render is a proxy").
 *
 * The clip id comes from `useId`. react-native-svg's ids are document-global
 * on web, so two flags on one page with the same literal id would both render
 * out of whichever one mounted first.
 */
export function Flag({ country, size = 18 }: { country: 'us' | 'ng'; size?: number }) {
  const clip = `flag-${useId()}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id={clip}>
          <Circle cx={12} cy={12} r={12} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clip})`}>{country === 'us' ? <Stars /> : <Nigeria />}</G>
    </Svg>
  );
}

/** Thirteen stripes compressed to seven, and a canton — at 18dp that reads. */
function Stars() {
  return (
    <>
      <Rect x={0} y={0} width={24} height={24} fill="#ffffff" />
      <Rect x={0} y={0} width={24} height={3.43} fill="#cc2a3a" />
      <Rect x={0} y={6.86} width={24} height={3.43} fill="#cc2a3a" />
      <Rect x={0} y={13.72} width={24} height={3.43} fill="#cc2a3a" />
      <Rect x={0} y={20.58} width={24} height={3.43} fill="#cc2a3a" />
      <Rect x={0} y={0} width={11} height={12} fill="#2a3b8f" />
      <Path
        d="M3 3 L3.6 4.5 L5.2 4.5 L3.9 5.5 L4.4 7 L3 6.1 L1.6 7 L2.1 5.5 L0.8 4.5 L2.4 4.5 Z"
        fill="#ffffff"
      />
      <Path
        d="M8 7 L8.6 8.5 L10.2 8.5 L8.9 9.5 L9.4 11 L8 10.1 L6.6 11 L7.1 9.5 L5.8 8.5 L7.4 8.5 Z"
        fill="#ffffff"
      />
    </>
  );
}

/** Green, white, green. */
function Nigeria() {
  return (
    <>
      <Rect x={0} y={0} width={8} height={24} fill="#128a4d" />
      <Rect x={8} y={0} width={8} height={24} fill="#ffffff" />
      <Rect x={16} y={0} width={8} height={24} fill="#128a4d" />
    </>
  );
}
