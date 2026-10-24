import Svg, { Circle, Path } from 'react-native-svg';

import { tb } from '../theme';

/**
 * The three marks on the sign-in buttons.
 *
 * All drawn, and all in range: a platform mark is small, flat and geometric,
 * and the person is a pictogram rather than a picture of anybody. A scheme's
 * real mark is a trademark and not redistributable, so these stand in for them
 * — the proportions are the design's, the shapes are this project's.
 *
 * Google's keeps its four colours, because a single-colour G reads as a
 * different company's mark rather than as a stand-in for that one.
 */
export function ProviderGlyph({
  name,
  size,
  tint,
}: {
  name: 'guest' | 'apple' | 'google';
  size: number;
  tint: string;
}) {
  if (name === 'guest') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={9.2} stroke={tint} strokeWidth={1.6} fill="none" />
        <Circle cx={12} cy={9.8} r={2.9} fill={tint} />
        <Path
          d="M6.6 18.6c1-2.5 3-3.8 5.4-3.8s4.4 1.3 5.4 3.8"
          stroke={tint}
          strokeWidth={1.6}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }

  if (name === 'apple') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M16.2 12.6 C16.2 9.9 18.4 8.7 18.5 8.6 C17.3 6.9 15.4 6.7 14.8 6.6
             C13.3 6.5 11.9 7.5 11.1 7.5 C10.3 7.5 9.1 6.6 7.9 6.7
             C6.3 6.7 4.9 7.6 4.1 9 C2.5 11.9 3.7 16.2 5.3 18.5
             C6.1 19.7 7 20.9 8.2 20.9 C9.4 20.8 9.8 20.1 11.2 20.1
             C12.6 20.1 13 20.9 14.2 20.9 C15.5 20.8 16.3 19.7 17 18.6
             C17.9 17.3 18.3 16.1 18.3 16 C18.3 16 16.2 15.2 16.2 12.6 Z"
          fill={tint}
        />
        <Path
          d="M13.9 5.1 C14.6 4.3 15 3.2 14.9 2.1 C14 2.1 12.9 2.7 12.2 3.5
             C11.6 4.2 11.1 5.3 11.2 6.4 C12.2 6.5 13.2 5.9 13.9 5.1 Z"
          fill={tint}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1.2-.9 2.2-2 2.9v2.3h3c1.8-1.7 3.2-4.1 3.2-6.9Z"
        fill="#4285F4"
      />
      <Path
        d="M12 22c2.7 0 5-.9 6.6-2.4l-3-2.3c-.9.6-2 1-3.6 1-2.7 0-5-1.8-5.9-4.3H3v2.4C4.6 19.6 8 22 12 22Z"
        fill="#34A853"
      />
      <Path
        d="M6.1 13.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9V7.7H3C2.4 9 2 10.4 2 12s.4 3 1 4.3l3.1-2.4Z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.8c1.5 0 2.8.5 3.9 1.5l2.7-2.7C17 3.1 14.7 2 12 2 8 2 4.6 4.4 3 7.7l3.1 2.4C7 7.6 9.3 5.8 12 5.8Z"
        fill="#EA4335"
      />
      <Circle cx={12} cy={12} r={0} fill={tb.canvas} />
    </Svg>
  );
}
