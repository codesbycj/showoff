import Svg, { Path } from 'react-native-svg';

/**
 * The field of fine lines across the black panel.
 *
 * Drawn, and in range: it is an abstract pattern, not a picture of anything
 * (AGENTS.md, "Draw the interface"). Twenty-two sine paths, each one phase
 * and amplitude further on than the last, so the band reads as a surface
 * turning rather than as a stack of identical curves.
 *
 * It takes its width and height in dp rather than a viewBox, because a
 * non-square viewBox stretched to the panel scales x and y differently and
 * takes every stroke width with it.
 */
export function Wave({
  w,
  h,
  tint,
  lines = 22,
}: {
  w: number;
  h: number;
  tint: string;
  lines?: number;
}) {
  const paths = [];

  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const y = h * (0.12 + t * 0.78);
    const amp = h * (0.1 + 0.13 * Math.sin(t * Math.PI));
    const phase = t * 2.1;

    // Each line starts a little further in than its neighbours, which gives
    // the field a soft wavy left boundary instead of a ruled vertical edge.
    const x0 = w * (0.3 + 0.17 * Math.sin(i * 1.7));

    let d = `M${x0.toFixed(1)} ${(y + Math.sin((x0 / w) * Math.PI * 2 + phase) * amp).toFixed(1)}`;
    for (let x = x0; x <= w; x += w / 24) {
      const yy = y + Math.sin((x / w) * Math.PI * 2 + phase) * amp;
      d += ` L${x.toFixed(1)} ${yy.toFixed(1)}`;
    }

    paths.push(
      <Path
        key={i}
        d={d}
        stroke={tint}
        strokeWidth={0.7}
        fill="none"
        opacity={0.1 + 0.26 * Math.sin(t * Math.PI)}
      />,
    );
  }

  return (
    <Svg width={w} height={h}>
      {paths}
    </Svg>
  );
}
