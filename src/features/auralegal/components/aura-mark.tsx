import Svg, { Path } from 'react-native-svg';

import { al } from '../theme';

/**
 * The Aura Legal mark: a balance inside a ring, with an emerald tick over the
 * right pan.
 *
 * The export ships this only as a raster -- a 1024px plate, plus a hot-linked
 * copy in the two screen headers -- so it was traced rather than hand-authored,
 * on the same rule every other small glyph here follows. Tracing took two
 * passes: `trace.py` thresholds on luminance and cannot tell two inks apart, so
 * the plate was split by hue into a lavender mask and a tick mask first, and
 * each traced against the same box so both paths share this 100-unit space.
 *
 * The lavender path is filled `evenodd`, which is what keeps the ring a ring
 * and the pans hollow: every subpath after the first is a counter, not a
 * separate shape.
 *
 * The tick's mask was closed before tracing. Where it crosses the pan rim the
 * two inks blend, and the raw hue split left a notch there that read as a
 * visible nick in the stroke at splash size.
 */
export function AuraMark({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        fill={al.primaryContainer}
        fillRule="evenodd"
        d="M46.25 0.00 L53.56 0.00 L62.25 1.38 L68.18 3.36 L74.11 6.32 L79.45 9.88 L85.18 15.02 L89.13 19.57 L94.47 28.26 L97.43 36.17 L99.01 44.27 L99.41 50.99 L98.42 59.29 L96.44 66.80 L93.48 73.32 L88.74 80.63 L85.38 84.39 L77.87 90.91 L67.39 96.64 L57.31 99.41 L42.49 99.41 L36.56 98.02 L30.24 95.65 L24.90 92.89 L19.57 89.13 L12.06 81.82 L5.14 70.95 L1.38 59.49 L0.59 53.75 L0.59 46.44 L3.16 33.60 L7.51 24.31 L13.24 16.60 L19.37 10.67 L23.12 7.91 L34.39 2.37 L42.29 0.40 L46.05 0.20 Z M49.41 17.19 L50.99 17.79 L50.99 21.54 L54.35 23.72 L55.73 26.48 L74.51 26.48 L80.43 39.33 L79.64 40.51 L78.26 40.12 L73.72 30.43 L63.04 54.15 L84.39 54.35 L84.58 53.75 L81.82 48.02 L82.02 46.44 L83.20 46.25 L84.58 48.22 L87.55 55.34 L87.35 58.10 L85.97 61.26 L81.62 65.81 L76.68 67.79 L71.15 67.79 L66.80 66.21 L62.25 62.06 L60.67 59.09 L60.08 55.53 L71.94 28.66 L55.73 28.46 L54.74 30.63 L52.96 32.41 L50.99 33.20 L50.99 74.31 L58.89 74.51 L61.86 75.49 L64.03 77.47 L65.22 80.43 L68.77 80.63 L68.77 82.41 L31.23 82.61 L30.83 82.02 L31.42 80.43 L34.58 80.43 L35.77 77.47 L39.33 74.90 L48.81 74.51 L48.81 33.40 L45.06 30.63 L44.07 28.46 L27.87 28.85 L39.72 55.34 L39.13 59.09 L37.94 61.46 L34.78 65.02 L28.66 67.79 L21.74 67.39 L17.00 64.82 L14.23 61.86 L12.45 58.10 L12.45 54.55 L25.10 26.68 L44.07 26.48 L45.45 23.72 L48.81 21.54 L49.21 17.39 Z M47.43 2.96 L55.73 3.16 L61.07 4.15 L67.79 6.52 L73.91 9.68 L80.24 14.43 L84.39 18.58 L89.13 24.90 L92.29 30.83 L94.47 36.76 L96.05 44.86 L96.25 52.96 L95.65 58.10 L92.09 69.37 L88.93 75.10 L84.58 80.83 L76.48 88.14 L66.01 93.87 L54.94 96.64 L44.86 96.64 L38.74 95.45 L31.42 92.89 L21.94 87.15 L13.24 78.46 L7.91 69.76 L4.15 58.10 L3.56 47.23 L4.15 41.70 L5.93 34.98 L10.67 24.90 L15.61 18.38 L20.55 13.64 L25.89 9.68 L33.40 5.93 L38.93 4.15 L47.23 3.16 Z M49.41 24.11 L51.58 24.51 L52.96 25.89 L52.77 29.25 L50.59 30.83 L49.21 30.83 L47.23 29.45 L46.64 26.28 L47.83 24.70 L49.21 24.31 Z M25.89 30.63 L36.56 54.15 L15.42 54.15 L25.89 30.83 Z M14.82 56.92 L37.15 56.92 L35.77 60.47 L33.20 63.24 L27.87 65.42 L24.31 65.42 L20.36 64.23 L16.80 61.26 L15.42 59.09 L15.02 57.11 Z M62.65 56.92 L84.98 56.92 L83.60 60.47 L81.03 63.24 L77.67 65.02 L75.49 65.42 L70.16 65.02 L67.19 63.64 L64.43 61.07 L62.65 57.11 Z M41.70 77.08 L58.89 77.08 L61.07 77.87 L62.45 80.24 L37.35 80.24 L38.74 77.87 L41.50 77.27 Z"
      />
      <Path
        fill={al.secondaryFixed}
        d="M86.17 36.56 L87.15 36.76 L87.55 37.94 L85.38 40.51 L84.58 42.89 L83.60 43.08 L81.62 45.85 L79.84 47.04 L79.84 47.83 L78.46 48.42 L77.08 50.59 L75.10 51.98 L72.92 52.17 L71.94 51.58 L68.97 48.02 L68.77 46.05 L69.96 45.65 L71.74 46.44 L74.90 46.44 L76.28 45.85 L80.04 42.69 L81.23 40.32 L83.40 39.33 L85.97 36.76 Z"
      />
    </Svg>
  );
}
