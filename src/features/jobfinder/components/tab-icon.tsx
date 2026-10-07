import Svg, { Path } from 'react-native-svg';

import { type TabKey } from '../data/jobs';

/**
 * The dock's four glyphs, as the reference draws them.
 *
 * These are the reference's own paths rather than an icon set's. It matters
 * because the design marks the selected tab by filling its glyph, and a stroked
 * icon set does not have a filled twin — filling a stroke-drawn house gives a
 * blob with the roof line closed over the door. A solid-drawn house fills
 * cleanly and, at `fill: none` with a stroke, reads as the outline version.
 *
 * The bookmark is the exception: it is drawn as an outline in every state the
 * reference shows, so it keeps its own stroked path and fills the same shape.
 */
const PATHS: Record<TabKey, { d: string; solid: boolean }> = {
  home: { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', solid: true },
  messages: {
    d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    solid: true,
  },
  saved: { d: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z', solid: false },
  profile: { d: 'M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 1116 0H4z', solid: true },
};

export function TabIcon({
  tab,
  size = 20,
  tone,
  active,
}: {
  tab: TabKey;
  size?: number;
  tone: string;
  active: boolean;
}) {
  const { d, solid } = PATHS[tab];

  // Unselected, a solid-drawn glyph is shown as its own outline — the same path
  // stroked and unfilled, not a second, thinner drawing.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={d}
        fill={active ? tone : 'none'}
        stroke={active && solid ? 'none' : tone}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
