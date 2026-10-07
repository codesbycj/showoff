import Svg, { Path } from 'react-native-svg';

/**
 * The flame in the lime disc beside the company mark on the job detail hero.
 *
 * It is not a brand, so it lives here rather than in `brand-mark` — the marks
 * there all identify a company and take that company's colours, and a flame
 * takes the ink it is given.
 */
export function Flame({ size = 36, tone = '#191A1E' }: { size?: number; tone?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M12 23c-4.418 0-8-3.41-8-7.619 0-3.665 2.535-6.526 5.25-9.673.541-.628 1.092-1.267 1.63-1.928.324-.398.92-.378 1.216.042.842 1.196 1.764 2.457 2.684 3.714C16.596 9.98 18.5 12.58 18.5 15.381 18.5 19.59 16.418 23 12 23zm-.12-14.73c-1.895 2.42-3.88 4.708-3.88 7.111 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.895-1.195-3.562-2.735-5.696-.34-.471-.692-.958-1.05-1.464-.112.015-.224.032-.335.049z"
      />
    </Svg>
  );
}
