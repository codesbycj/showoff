import atelier from '@/assets/img/atelier.webp';
import band from '@/assets/img/band.webp';
import col1 from '@/assets/img/col-1.webp';
import col2 from '@/assets/img/col-2.webp';
import col3 from '@/assets/img/col-3.webp';
import col4 from '@/assets/img/col-4.webp';
import col5 from '@/assets/img/col-5.webp';
import col6 from '@/assets/img/col-6.webp';
import col7 from '@/assets/img/col-7.webp';
import col8 from '@/assets/img/col-8.webp';
import col9 from '@/assets/img/col-9.webp';
import frame1 from '@/assets/img/frame-1.webp';
import frame2 from '@/assets/img/frame-2.webp';
import hero from '@/assets/img/hero.webp';
import prod1 from '@/assets/img/prod-1.webp';
import prod2 from '@/assets/img/prod-2.webp';
import prod3 from '@/assets/img/prod-3.webp';
import split1 from '@/assets/img/split-1.webp';
import split2 from '@/assets/img/split-2.webp';
import split3 from '@/assets/img/split-3.webp';
import thumb1 from '@/assets/img/thumb-1.webp';
import thumb2 from '@/assets/img/thumb-2.webp';
import thumb3 from '@/assets/img/thumb-3.webp';

/**
 * One content deck, read by both designs.
 *
 * **Every line of text here is invented** — the only thing rule 0 allows to
 * change. The structure is the reference's: the same sections in the same
 * order, the same number of items in each, and copy written to the same
 * lengths so lines break where its lines break. The wordmark is twelve
 * characters because the reference's is eleven and the type is fitted to the
 * container's width.
 *
 * The photographs are the reference's own, re-encoded unchanged. See
 * `src/assets/img/CREDITS.md`.
 */

export const BRAND = {
  name: 'Mara Atelier',
  /* The hero word, top right, in lime. */
  kicker: 'Verger',
};

export const HERO = {
  labels: ['E-commerce', 'Skincare', 'Beauty'],
  image: hero,
  alt: 'A close portrait of a woman holding an orange flower over one eye',
};

/* The green band under the hero. Four items, repeated: three words and a star. */
export const MARQUEE = ['New in', '40%', 'Off', '*'];

export const STATEMENT = {
  heading: 'Mara Atelier is a modern house',
  lead: 'offering formulas people love to keep,',
  tailLeft: 'best skin for',
  tailRight: 'and live in.',
  items: [
    { name: 'Velvet Citrus', note: 'fresh, radiant, uplifting', image: frame1 },
    { name: 'Earth Noir', note: 'warm, sensual, timeless', image: frame2 },
  ],
};

/**
 * Three splits, 830px each, image and panel swapping sides. `tint` is the
 * reference's own per-panel colour and the order is part of the design.
 */
export const SPLITS = [
  {
    id: 'skin',
    title: 'Skin care',
    note: 'Smooth body',
    tint: 'var(--color-lime)',
    image: split1,
    alt: 'A woman holding a white serum bottle',
    thumb: thumb1,
    side: 'left' as const,
  },
  {
    id: 'cosmetics',
    title: 'Cosmetics',
    note: 'Stay beautiful',
    tint: 'var(--color-bone)',
    image: split2,
    alt: 'A woman with flowers in her hair against a green ground',
    thumb: thumb2,
    side: 'right' as const,
  },
  {
    id: 'face',
    title: 'Face health',
    note: 'Close-up smiles',
    tint: 'var(--color-sage)',
    image: split3,
    alt: 'A woman wearing two shades of cream on her cheeks',
    thumb: thumb3,
    side: 'left' as const,
  },
];

/**
 * The two collages, on the forest ground. Each is a 236px grid: four columns
 * from x464, rows from y4485, with images dropped into some cells and white
 * blocks in the rest. The gaps are the composition — a collage with every cell
 * filled is a contact sheet.
 */
/**
 * The collage, as the reference lays it out: **absolute boxes on a 236px
 * column grid**, not a CSS grid. Coordinates are relative to the grid's origin
 * at (464, 4485); the container is 944 wide and 1677 tall.
 *
 * The cells with no image are real elements in the reference — 236x191 divs
 * with a white background and `opacity: 0`. They hold the shape and paint
 * nothing, which is why the gaps read as the green ground rather than as white
 * blocks. Rebuilt as empty space, since that is what they are.
 */
export const COLLAGE = {
  width: 944,
  height: 1677,
  /** The left column's two states. The word swaps as the grid scrolls past. */
  lead: 'We bring formulas to life through',
  words: [
    { word: 'Elegance', mark: '1' },
    { word: 'Clarity', mark: '2' },
  ],
  cells: [
    { img: col1, x: 0, y: 0, w: 236, h: 177 },
    { img: col2, x: 236, y: 177, w: 472, h: 354 },
    { img: col3, x: 0, y: 531, w: 236, h: 215 },
    { img: col4, x: 708, y: 531, w: 236, h: 215 },
    { img: col5, x: 472, y: 745, w: 236, h: 196 },
    { img: col6, x: 0, y: 941, w: 472, h: 354 },
    { img: col7, x: 472, y: 1295, w: 236, h: 191 },
    { img: col8, x: 236, y: 1486, w: 236, h: 191 },
    { img: col9, x: 708, y: 1486, w: 236, h: 191 },
  ],
};

/** Six words in the corners of one full-bleed photograph. */
export const BAND = {
  image: band,
  alt: 'A pump bottle under leaf shadows',
  rows: [
    ['Curated', 'Grace'],
    ['Daily life', 'For'],
    ['The', 'Simplicity'],
  ],
};

export const FEATURED = {
  heading: 'Featured products',
  items: [
    { name: 'Fumaria Amber', price: '180', badge: '30', image: prod1 },
    { name: 'Black Pump', price: '85', badge: null, image: prod2 },
    { name: 'Serene Aesthetic', price: '140', badge: '20', image: prod3 },
  ],
};

/**
 * The stockist list. The reference prints seven real cosmetics houses; a shelf
 * of real brand names on an invented shop is a factual claim about those
 * companies, so these are invented at the reference's own name lengths. The
 * README lists it as the one departure from "the images and words of the
 * design are copied".
 */
export const BRANDS = {
  heading: 'Brands',
  items: [
    { name: 'Vionn', kind: 'Luxury fashion', count: '12' },
    { name: 'Hesper Laurent', kind: 'Premium beauty', count: null },
    { name: 'Clairene', kind: 'Dermatologist skincare', count: '23' },
    { name: 'Boddle’s', kind: 'Apothecary skincare', count: '34' },
    { name: 'Lumerol', kind: 'Beauty innovation', count: '38' },
    { name: 'Marcolme', kind: 'Luxury beauty', count: null },
    { name: 'Nim Cosmetics', kind: 'Professional makeup', count: '14' },
  ],
};

export const FOOTER = {
  statement: 'An atelier dedicated to honest formulas, quiet packaging, and buying less.',
  columns: [
    { title: 'Address', lines: ['Fort Hill 12, Margate', 'CT9 1HF, United Kingdom'] },
    { title: 'New projects', lines: ['hello@maraatelier.co.uk'] },
    { title: 'Call us', lines: ['+44 1843 55 0119'] },
  ],
  meta: ['Mara Atelier', '2026', 'Return policy', 'Terms of use'],
  legal:
    'Mara Atelier is an invented company built for a design study. The products, prices, stockists and figures are not real.',
};

/** The fixed pill, bottom right, on every scroll position. */
export const CTA = { label: 'Get the list' };

/* Carried by the before only. */
export const ATELIER_IMAGE = atelier;
