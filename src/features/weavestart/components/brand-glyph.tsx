import Svg, { Circle, Path } from 'react-native-svg';

/**
 * The two marks on the sign-in buttons.
 *
 * Both are drawn. A scheme or platform mark is a trademark and not
 * redistributable, and these stand in for them — the proportions are the
 * design's, the shapes are this project's. Drawing them also keeps them sharp
 * at any size and ships no font.
 *
 * They are small, flat and geometric, which is squarely in drawing range
 * (AGENTS.md, "Three kinds of reference").
 */
export function BrandGlyph({ name, size }: { name: 'google' | 'apple'; size: number }) {
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
          fill="#ffffff"
        />
        <Path
          d="M13.9 5.1 C14.6 4.3 15 3.2 14.9 2.1 C14 2.1 12.9 2.7 12.2 3.5
             C11.6 4.2 11.1 5.3 11.2 6.4 C12.2 6.5 13.2 5.9 13.9 5.1 Z"
          fill="#ffffff"
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21.6 12.2 C21.6 11.5 21.5 10.9 21.4 10.3 H12 V13.9 H17.4
           C17.2 15.1 16.5 16.1 15.4 16.8 V19.1 H18.4 C20.2 17.4 21.6 15 21.6 12.2 Z"
        fill="#4285f4"
      />
      <Path
        d="M12 22 C14.7 22 16.9 21.1 18.4 19.1 L15.4 16.8 C14.6 17.4 13.5 17.7 12 17.7
           C9.4 17.7 7.2 16 6.4 13.7 H3.3 V16 C4.8 19.6 8.1 22 12 22 Z"
        fill="#34a853"
      />
      <Path
        d="M6.4 13.7 C6.2 13.1 6.1 12.6 6.1 12 C6.1 11.4 6.2 10.9 6.4 10.3 V8 H3.3
           C2.7 9.2 2.4 10.6 2.4 12 C2.4 13.4 2.7 14.8 3.3 16 Z"
        fill="#fbbc05"
      />
      <Path
        d="M12 6.3 C13.5 6.3 14.8 6.8 15.8 7.7 L18.5 5.1 C16.9 3.6 14.7 2.7 12 2.7
           C8.1 2.7 4.8 5.1 3.3 8 L6.4 10.3 C7.2 8 9.4 6.3 12 6.3 Z"
        fill="#ea4335"
      />
      <Circle cx={12} cy={12} r={0} fill="none" />
    </Svg>
  );
}
