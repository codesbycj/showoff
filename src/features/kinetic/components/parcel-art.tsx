import { type ReactElement } from 'react';
import Svg, { Ellipse, G, Path, Polygon, Rect } from 'react-native-svg';

import { kc } from '../theme';

/**
 * The two isometric renders the design leans on, and the product thumbnails.
 *
 * The export points all sixteen of its images at `lh3.googleusercontent.com`
 * URLs that no longer resolve, and the one file the bundle does ship is the
 * original portfolio mockup rather than an app asset. So there is nothing to
 * bundle and nothing to fetch, and every one of them is drawn here instead.
 *
 * Isometric rather than perspective: both renders are described in the export's
 * own alt text as "isometric delivery illustration style", and an axonometric
 * box is a handful of polygons with no foreshortening to get wrong.
 */

/** The cardboard parcel — on the home hero card and the tracking sheet. */
export function ParcelBox({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* contact shadow */}
      <Ellipse cx={60} cy={104} rx={36} ry={7} fill="#c8a882" opacity={0.25} />

      {/* left face */}
      <Polygon points="18,42 60,64 60,110 18,88" fill="#c79a63" />
      {/* right face */}
      <Polygon points="102,42 60,64 60,110 102,88" fill="#d9ae78" />
      {/* top face */}
      <Polygon points="60,20 102,42 60,64 18,42" fill="#efcb99" />

      {/* the tape seam over the lid */}
      <Polygon points="60,20 70,25 30,47 20,42" fill="#dcb076" opacity={0.75} />

      {/* the shipping label on the right face */}
      <Polygon points="68,74 92,62 92,80 68,92" fill="#f7f1e6" />
      <Polygon points="71,77 84,70 84,73 71,80" fill="#9aa3ad" />
      <Polygon points="71,82 88,73 88,76 71,85" fill="#c3cad2" />

      {/* a blue fragile sticker on the left face */}
      <Polygon points="26,58 42,66 42,76 26,68" fill="#5b9ad6" opacity={0.85} />
    </Svg>
  );
}

/** The red delivery van — on the home screen's "New Delivery" card. */
export function DeliveryVan({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* contact shadow */}
      <Ellipse cx={60} cy={98} rx={40} ry={7} fill="#b0453a" opacity={0.18} />

      {/* cargo box */}
      <Rect x={16} y={40} width={58} height={40} rx={5} fill="#e8402c" />
      <Rect x={16} y={40} width={58} height={11} rx={5} fill="#f2614f" />
      {/* cargo door seam */}
      <Rect x={26} y={54} width={38} height={2} rx={1} fill="#c9331f" opacity={0.7} />

      {/* parcels stacked in the bed */}
      <Rect x={28} y={26} width={20} height={15} rx={2} fill="#e8c193" />
      <Rect x={28} y={31} width={20} height={2} fill="#d3a876" />
      <Rect x={50} y={31} width={15} height={10} rx={2} fill="#f0d2ab" />

      {/* cab */}
      <Path
        d="M74 52 h14 a5 5 0 0 1 4 2 l8 12 a4 4 0 0 1 1 3 v11 a3 3 0 0 1 -3 3 h-24 z"
        fill="#e8402c"
      />
      {/* windscreen */}
      <Path d="M78 55 h9 a3 3 0 0 1 2 1 l6 9 h-17 z" fill="#bfe0f2" />

      {/* bumper */}
      <Rect x={16} y={78} width={85} height={5} rx={2.5} fill="#c9331f" />

      {/* wheels */}
      <G>
        <Ellipse cx={36} cy={85} rx={11} ry={11} fill="#25282c" />
        <Ellipse cx={36} cy={85} rx={4.5} ry={4.5} fill="#8d949c" />
        <Ellipse cx={84} cy={85} rx={11} ry={11} fill="#25282c" />
        <Ellipse cx={84} cy={85} rx={4.5} ry={4.5} fill="#8d949c" />
      </G>
    </Svg>
  );
}

/**
 * The product thumbnails.
 *
 * Each is a flat silhouette of the device the shipment contains, on a 48-unit
 * box. They stand in for the studio product shots the export linked to — at the
 * 40dp these render at, a silhouette carries as much as a photograph would.
 */
export type ProductKey = 'macmini' | 'speaker' | 'drone' | 'display' | 'keyboard';

export function ProductThumb({ product, size = 40 }: { product: ProductKey; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {PRODUCTS[product]}
    </Svg>
  );
}

const PRODUCTS: Record<ProductKey, ReactElement> = {
  // Mac mini — a low aluminium square slab seen at a slight angle.
  macmini: (
    <G>
      <Rect x={8} y={20} width={32} height={12} rx={3} fill="#c3c8ce" />
      <Rect x={8} y={20} width={32} height={5} rx={2.5} fill="#dfe3e8" />
      <Ellipse cx={24} cy={29} rx={3} ry={1.2} fill="#9aa1a9" />
    </G>
  ),
  // Sonos Move — a tall rounded speaker with a grille.
  speaker: (
    <G>
      <Rect x={16} y={9} width={16} height={30} rx={6} fill="#31353a" />
      <Rect x={18.5} y={13} width={11} height={19} rx={4} fill="#4a4f56" />
      <Rect x={20} y={35} width={8} height={2} rx={1} fill="#20242a" />
    </G>
  ),
  // DJI Mini — a body with four booms and props.
  drone: (
    <G>
      <Rect x={19} y={19} width={10} height={11} rx={3} fill="#40464d" />
      <Rect
        x={9}
        y={14}
        width={12}
        height={2.4}
        rx={1.2}
        fill="#5b626a"
        transform="rotate(20 15 15)"
      />
      <Rect
        x={27}
        y={14}
        width={12}
        height={2.4}
        rx={1.2}
        fill="#5b626a"
        transform="rotate(-20 33 15)"
      />
      <Rect
        x={9}
        y={32}
        width={12}
        height={2.4}
        rx={1.2}
        fill="#5b626a"
        transform="rotate(-20 15 33)"
      />
      <Rect
        x={27}
        y={32}
        width={12}
        height={2.4}
        rx={1.2}
        fill="#5b626a"
        transform="rotate(20 33 33)"
      />
      <Ellipse cx={10} cy={13} rx={5} ry={1.4} fill="#8d949c" />
      <Ellipse cx={38} cy={13} rx={5} ry={1.4} fill="#8d949c" />
      <Ellipse cx={10} cy={35} rx={5} ry={1.4} fill="#8d949c" />
      <Ellipse cx={38} cy={35} rx={5} ry={1.4} fill="#8d949c" />
    </G>
  ),
  // Studio Display — a panel on a stand.
  display: (
    <G>
      <Rect x={7} y={11} width={34} height={22} rx={2.5} fill="#2f343a" />
      <Rect x={9} y={13} width={30} height={18} rx={1.5} fill="#7e8790" />
      <Rect x={21} y={33} width={6} height={5} fill="#b6bcc3" />
      <Rect x={15} y={38} width={18} height={2.5} rx={1.25} fill="#c3c8ce" />
    </G>
  ),
  // Keychron Q1 — a compact mechanical keyboard, keys implied by a grid.
  keyboard: (
    <G>
      <Rect x={6} y={17} width={36} height={15} rx={2.5} fill="#3b4046" />
      <Rect x={8} y={19} width={32} height={11} rx={1.5} fill="#585e65" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
          <Rect
            key={`${r}-${c}`}
            x={9.2 + c * 3.9}
            y={20 + r * 3.4}
            width={3}
            height={2.6}
            rx={0.6}
            fill="#8d949c"
          />
        )),
      )}
    </G>
  ),
};

/** A product thumbnail inside the tinted rounded well the cards use. */
export function ThumbWell({
  product,
  size = 48,
  radius = 12,
}: {
  product: ProductKey;
  size?: number;
  radius?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect x={0} y={0} width={size} height={size} rx={radius} fill={kc.surfaceContainer} />
      <G transform={`translate(${size * 0.1} ${size * 0.1}) scale(${(size * 0.8) / 48})`}>
        {PRODUCTS[product]}
      </G>
    </Svg>
  );
}
