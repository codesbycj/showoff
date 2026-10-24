import about1 from '@/assets/img/about-1.webp';
import about2 from '@/assets/img/about-2.webp';
import faqImage from '@/assets/img/faq.webp';
import hero1 from '@/assets/img/hero-1.webp';
import hero2 from '@/assets/img/hero-2.webp';
import hero3 from '@/assets/img/hero-3.webp';
import hero4 from '@/assets/img/hero-4.webp';
import hero5 from '@/assets/img/hero-5.webp';
import hero6 from '@/assets/img/hero-6.webp';
import hero7 from '@/assets/img/hero-7.webp';
import product1 from '@/assets/img/product-1.webp';
import product2 from '@/assets/img/product-2.webp';
import review1 from '@/assets/img/review-1.webp';
import review2 from '@/assets/img/review-2.webp';
import review3 from '@/assets/img/review-3.webp';
import story1 from '@/assets/img/story-1.webp';
import story2 from '@/assets/img/story-2.webp';
import story3 from '@/assets/img/story-3.webp';
import tile1 from '@/assets/img/tile-1.webp';
import tile2 from '@/assets/img/tile-2.webp';
import tile3 from '@/assets/img/tile-3.webp';
import tile4 from '@/assets/img/tile-4.webp';
import tile5 from '@/assets/img/tile-5.webp';

/**
 * One content deck, read by both designs.
 *
 * **Every line of text is invented** — the only thing rule 0 allows to change.
 * The structure, the counts and the copy lengths are the reference's. The
 * photographs are the reference's own; see `src/assets/img/CREDITS.md`.
 *
 * rook is an invented furniture brand. The products, prices, reviews and
 * awards are not real, and both designs say so in the footer.
 */

export const BRAND = { name: 'rook' };

export const NAV = {
  /* `label` because the before concatenates these into a flat link soup. */
  links: [{ label: 'Chairs' }, { label: 'Stories' }, { label: 'About' }, { label: 'Support' }],
  cta: 'Shop',
};

export const HERO = {
  /* Four lines of 60px at x30, each set as its own line in the reference. */
  lines: ['We make furniture', 'that’s flexible, and', 'playful, to fit', 'modern life'],
  foot: 'New design from New Zealand',
  tiles: [hero1, hero2, hero3, hero4, hero5, hero6, hero7],
};

/**
 * The ingredients statement: one 60px sentence centred across the measure with
 * small images set **inline between the words** — a chair, a bean, a coil of
 * rope. It is the page's one piece of typographic play and the reason the
 * sentence is set as words rather than as a paragraph.
 */
export const INGREDIENTS = {
  parts: [
    { text: 'Our furniture' },
    { img: tile1, alt: 'a chair' },
    { text: 'is made from' },
    { text: 'sustainable ingredients' },
    { img: tile2, alt: 'a bean' },
    { text: 'like' },
    { text: 'castor' },
    { img: tile3, alt: 'a coil of rope' },
    { text: 'beans, old carpets and' },
    { text: 'recycled' },
    { text: 'fishing nets' },
  ],
};

export const PRODUCTS = [
  {
    id: 'light',
    name: 'rook Lightly',
    priceLabel: 'From $',
    price: '329',
    swatchLabel: 'Pick a colour',
    swatches: ['#e8d44d', '#2f2f2f', '#b9b2a4', '#7b8f6b'],
    image: product1,
    alt: 'A yellow stacking chair',
    cta: 'Add to cart',
    spec: [
      ['Weight', '2.7 kg'],
      ['Stack', '8 high'],
      ['Materials', '98% recycled nylon'],
      ['Warranty', '5 years'],
    ],
  },
  {
    id: 'move',
    name: 'rook Move',
    priceLabel: 'From $',
    price: '450',
    swatchLabel: 'Pick a colour',
    swatches: ['#2f2f2f', '#c4502f', '#d8d2c6', '#4a5f7a'],
    image: product2,
    alt: 'A black moulded chair',
    cta: 'Add to cart',
    spec: [
      ['Weight', '4.1 kg'],
      ['Tilt', 'Free-float'],
      ['Materials', 'Recycled fishing net'],
      ['Warranty', '5 years'],
    ],
  },
];

export const STATS = [
  { label: 'Sustainable materials', value: '98% recycled nylon' },
  { label: 'Made in New Zealand', value: '82% renewable electricity' },
  { label: 'Designed to last', value: '5-year warranty' },
];

export const SPACES = {
  heading:
    'Create spaces that put people at ease with products that are intuitively designed for how we live, work and play.',
  tiles: [tile1, tile2, tile3, tile4, tile5],
};

export const STORIES_PEOPLE = {
  heading: 'People stories',
  items: [
    {
      name: 'Michael Andersen',
      body: 'Two extra guests or ten, Lightly is there for you. Light to carry, quick to stack, and it does not look like a spare chair when it is out.',
      stars: 5,
      image: review1,
    },
    {
      name: 'Emily Johnson',
      body: 'Life at home can go from peaceful to chaotic in an instant. These take it, and they still look like something we chose rather than something we needed.',
      stars: 5,
      image: review2,
    },
    {
      name: 'Christopher Miller',
      body: 'I love these chairs. They feel like a comfortable outfit rather than furniture, and after eight hours at the table that is the whole difference.',
      stars: 5,
      image: review3,
    },
  ],
};

export const QUIZ = {
  tabs: ['Take a quiz', 'Ask a question'],
  question: 'What’s your main reason for buying a chair?',
  options: ['Work day and night', 'Leisure', 'Gatherings with friends', 'Everything in one'],
  submit: 'Next',
  askLabel: 'Your question',
  askPlaceholder: 'Ask us anything about the chairs',
};

export const ABOUT = {
  heading: 'A few words about us',
  people: [
    {
      name: 'Kent Parker',
      role: 'CEO, Project Director',
      blurb:
        'rook is a direct-to-consumer brand that celebrates design, comfort and the stuff a chair is made of.',
      quote: '“We think furniture should look and feel good while doing good for the planet.”',
      image: about1,
    },
    {
      name: 'Chris Bisman',
      role: 'Project Director',
      blurb:
        'We know the world does not need another chair. But we believe it needs this one, and we can say why.',
      quote: '“It’s the most comfortable chair you can bring to the table.”',
      image: about2,
    },
  ],
};

export const AWARDS = {
  heading: 'Awards & recognitions',
  groups: [
    {
      title: 'Move awards',
      rows: [
        ['Best of NeoCon Gold & Sustainability', '2023'],
        ['Good Design Award', '2023'],
        ['Best Awards Gold Pin — Packaging', '2022'],
        ['Best Awards Gold Pin — Furniture', '2022'],
        ['Best Awards Gold Pin — Sustainability', '2022'],
      ],
    },
    {
      title: 'Lightly awards',
      rows: [
        ['Dezeen Awards — Furniture Design of the Year', '2023'],
        ['Best Awards Gold Pin — Sustainability', '2022'],
        ['Best Awards Gold Pin — Furniture', '2022'],
        ['Green Good Award — Sustainability', '2022'],
      ],
    },
    {
      title: 'Media',
      rows: [
        ['Dezeen Awards — Furniture Design of the Year', '2023'],
        ['Best Awards Gold Pin — Sustainability', '2022'],
        ['Best Awards Gold Pin — Furniture', '2022'],
        ['Green Good Award — Sustainability', '2022'],
      ],
    },
  ],
};

export const STORIES = {
  heading: 'rook stories',
  items: [
    {
      title: 'A Good-Goodbye',
      body: 'What happens to a chair at the end of its life, and why we built ours to come apart.',
      date: 'March 2026',
      image: story1,
    },
    {
      title:
        'From Heritage to Innovation: Behind mixed-use build “Strip-Mall” with owners Jemma & Adam',
      body: 'A long conversation about re-use, renovation and the furniture that outlasts a fit-out.',
      date: 'February 2026',
      image: story2,
    },
    {
      title: 'People: At home with Mai Nguyen — her design aesthetic and life in Houston',
      body: 'A house full of light, plants and chairs that get moved four times a day.',
      date: 'January 2026',
      image: story3,
    },
  ],
};

export const EARTH = {
  heading: 'Earth’s health in mind',
  body: 'We gift you a tree back for every chair you buy, and we publish the receipt.',
  cta: 'Read more',
};

export const FAQ = {
  image: faqImage,
  items: [
    {
      q: 'Does the delivery have a warranty?',
      a: 'Five years on every chair, covering the frame, the base and the fabric. We will repair before we replace, and we will send you the part if you would rather do it yourself.',
    },
    {
      q: 'Do the rook chairs have a warranty?',
      a: 'Yes — five years, and it transfers if you sell the chair on. We would rather the chair stayed in use than came back to us.',
    },
    {
      q: 'Where do you ship?',
      a: 'Across the UK, Ireland and most of Europe. Shipping is flat-rate and the chairs arrive in one box, assembled.',
    },
    {
      q: 'How much is shipping?',
      a: 'Flat £15 per order in the UK, free over £400. Europe is £35 and takes about a week.',
    },
    {
      q: 'How long will it take for my order to arrive?',
      a: 'Three to five working days in the UK. If a colour is on back-order we tell you on the product page, not after you have paid.',
    },
    {
      q: 'Can I return my order?',
      a: 'Within 60 days, used, and we pay the return postage. We take the chair back into circulation rather than landfill.',
    },
  ],
};

export const FOOTER = {
  columns: [
    { title: 'Shop', links: ['Lightly', 'Move', 'Accessories', 'Gift cards'] },
    { title: 'About', links: ['Our story', 'Materials', 'Sustainability', 'Press'] },
    { title: 'Support', links: ['Shipping', 'Returns', 'Warranty', 'Contact'] },
  ],
  contact: {
    address: ['rook furniture', '14 Jervois Quay', 'Wellington 6011'],
    email: 'hello@rookfurniture.co.nz',
    phone: '+64 4 555 0119',
    hours: 'Weekdays, 9am — 5pm NZST',
  },
  legal:
    'rook is an invented furniture brand built for a design study. The products, prices, reviews and awards are not real.',
  copy: '© 2026 rook.',
};

/* ------------------------------------------------------------------------ */
/*  Carried by the before only.                                              */
/*                                                                           */
/*  The congested-directory angle needs a catalogue's worth of furniture: a  */
/*  spec table per product, a gallery of thumbnails, a making-of blurb, a    */
/*  studio paragraph and a sustainability panel. The after shows none of     */
/*  them, which is most of what makes it the after — but rule 3 says the     */
/*  before has to carry the same content, so it lives here.                  */
/* ------------------------------------------------------------------------ */

export const SPEC = {
  light: [
    ['Weight', '2.7 kg'],
    ['Stack', '8 high'],
    ['Materials', '98% recycled nylon'],
    ['Warranty', '5 years'],
  ],
  move: [
    ['Weight', '4.1 kg'],
    ['Tilt', 'Free-float'],
    ['Materials', 'Recycled fishing net'],
    ['Warranty', '5 years'],
  ],
};

export const GALLERY = {
  title: 'Gallery',
  /* The before's thumbnail grid wants an alt per tile; the after's does not. */
  items: [
    { image: tile1, alt: 'A chair in a bright room', caption: 'Lightly in Chalk' },
    { image: tile2, alt: 'A stack of chairs', caption: 'Stacked eight high' },
    { image: tile3, alt: 'A chair against colour', caption: 'Move in Clay' },
    { image: tile4, alt: 'A chair at a table', caption: 'At the table' },
    { image: tile5, alt: 'A chair in use', caption: 'In use, Wellington' },
    { caption: 'Studio shot', image: hero1, alt: 'A seated figure' },
    { caption: 'From above', image: hero2, alt: 'A chair from above' },
    { caption: 'In profile', image: hero3, alt: 'A chair in profile' },
    { caption: 'A pair', image: hero4, alt: 'Two chairs together' },
    { caption: 'Carried', image: hero5, alt: 'A chair being carried' },
    { caption: 'With a plant', image: hero6, alt: 'A chair and a plant' },
    { caption: 'In a hallway', image: hero7, alt: 'A chair in a hallway' },
  ],
};

export const MAKING = {
  title: 'How it is made',
  body: 'Shells pressed from recycled nylon in Napier, bases spun in Auckland, and a flat box that is the only packaging there is.',
  /* The before prints these as a figure/unit/title list in its left rail. */
  points: [
    {
      id: 'nylon',
      figure: '98',
      unit: '%',
      title: 'recycled nylon',
      body: 'Pressed, not injection-moulded.',
    },
    {
      id: 'power',
      figure: '82',
      unit: '%',
      title: 'renewable electricity',
      body: 'Made on the grid we are on.',
    },
    {
      id: 'tool',
      figure: '1',
      unit: 'tool',
      title: 'to take it apart',
      body: 'Every part replaceable.',
    },
    {
      id: 'years',
      figure: '5',
      unit: 'yr',
      title: 'warranty, transferable',
      body: 'It outlives the first owner.',
    },
  ],
};

export const STUDIO = {
  title: 'The studio',
  body: 'Eleven people in a shed on the harbour, making two chairs and refusing to make a third until these are right.',
};

export const SUSTAIN = {
  title: 'Sustainability',
  body: 'We publish what the chairs are made of, what they cost the planet, and the bits we have not solved.',
  figures: [
    { id: 'nylon', figure: '98', unit: '%', title: 'recycled nylon', label: 'Materials' },
    { id: 'power', figure: '82', unit: '%', title: 'renewable electricity', label: 'Energy' },
    { id: 'years', figure: '5', unit: 'yr', title: 'warranty, transferable', label: 'Guarantee' },
    { id: 'trees', figure: '1', unit: 'tree', title: 'planted per chair', label: 'Give-back' },
  ],
};

/* The before's right rail runs a news column and a pull-quote column. */
export const JOURNAL = {
  title: 'Latest news',
  items: STORIES.items.map((s) => ({ title: s.title, date: s.date, read: '6 min' })),
};

export const VOICES = {
  title: 'What buyers say',
  items: STORIES_PEOPLE.items.map((p) => ({
    name: p.name,
    role: 'Verified buyer',
    quote: p.body,
    stars: p.stars,
  })),
};

/* The before lists awards as flat records rather than as grouped rows. */
export const AWARD_LIST = AWARDS.groups.flatMap((g) =>
  g.rows.map(([name, year]) => ({ name, year, group: g.title })),
);
