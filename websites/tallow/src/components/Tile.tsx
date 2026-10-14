import type { Tile as TileData } from '@/data/statement';

/**
 * One block from the fictional editor's library: artwork cut to a squircle,
 * with a white rim lit around the inside of the cut.
 *
 * The rim is an `inset` box-shadow on an overlay rather than a border, so it
 * follows the squircle's curvature instead of a rounded rectangle's. Its blur
 * is 15% of the tile's own width, which is why it is a CSS variable fed from
 * the container query unit rather than a fixed pixel value: the tile is drawn
 * at five different sizes between the sentence and the timeline, and a fixed
 * blur would look like a hairline at one end and a fog at the other.
 */
export function Tile({ tile }: { tile: TileData }) {
  return (
    <div className="tile relative h-full w-full" role="img" aria-label={tile.alt}>
      <div className="h-full w-full [clip-path:url(#squircle)]">
        <tile.art />
      </div>
      <span className="tile-rim pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}
