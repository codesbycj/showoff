import type { ComponentType } from 'react';

import { Halftone } from '@/assets/tiles/Halftone';
import { Inflate } from '@/assets/tiles/Inflate';
import { Kinetic } from '@/assets/tiles/Kinetic';
import { Repeat } from '@/assets/tiles/Repeat';
import { Scanline } from '@/assets/tiles/Scanline';

export type Tile = {
  /** The name this block goes by in the fictional editor's library. */
  name: string;
  /** What a screen reader is told, since the artwork carries meaning here. */
  alt: string;
  art: ComponentType;
};

/**
 * The sentence, in the fragments the layout needs.
 *
 * A fragment with a `tile` has an inline slot rendered *before* its text, so the
 * tiles land between phrases rather than after them. The opening word has none,
 * which is what keeps the first tile from sitting flush against the margin.
 */
export type Fragment = {
  text: string;
  tile?: Tile;
};

export const STATEMENT: Fragment[] = [
  { text: 'Tallow' },
  {
    text: 'is a video editor',
    tile: {
      name: 'Inflate',
      alt: 'An inflated orange ring on a glossy pale blue block',
      art: Inflate,
    },
  },
  {
    text: 'your team can',
    tile: {
      name: 'Kinetic',
      alt: 'The word kinetic set in white italics on black',
      art: Kinetic,
    },
  },
  {
    text: 'program — build a',
    tile: {
      name: 'Halftone',
      alt: 'A blue disc dissolving into a halftone dot screen',
      art: Halftone,
    },
  },
  {
    text: 'look once, then',
    tile: {
      name: 'Scanline',
      alt: 'The word displace knocked out of rainbow scanlines',
      art: Scanline,
    },
  },
  {
    text: 'share it as a block.',
    tile: {
      name: 'Repeat',
      alt: 'The word repeat tiled over and over in red',
      art: Repeat,
    },
  },
];

/** The flat list of tiles, in the order they appear — one timeline slot each. */
export const TILES: Tile[] = STATEMENT.flatMap((f) => (f.tile ? [f.tile] : []));
