import catCivic from '@/assets/images/cat-civic.jpg';
import catEducation from '@/assets/images/cat-education.jpg';
import catHousing from '@/assets/images/cat-housing.jpg';
import catInteriors from '@/assets/images/cat-interiors.jpg';
import catWorkplace from '@/assets/images/cat-workplace.jpg';
import focusImage from '@/assets/images/focus.jpg';
import hero1 from '@/assets/images/hero-1.jpg';
import hero2 from '@/assets/images/hero-2.jpg';
import hero3 from '@/assets/images/hero-3.jpg';
import work1 from '@/assets/images/work-1.jpg';
import work2 from '@/assets/images/work-2.jpg';
import work3 from '@/assets/images/work-3.jpg';
import work4 from '@/assets/images/work-4.jpg';
import work5 from '@/assets/images/work-5.jpg';
import work6 from '@/assets/images/work-6.jpg';

/** The four words the loading sequence spells out of I-O-T-A. */
export const ACRONYM = [
  { lead: 'I', rest: 'nnovate' },
  { lead: 'O', rest: 'utline' },
  { lead: 'T', rest: 'est' },
  { lead: 'A', rest: 'ssemble' },
] as const;

/** Three hero photographs; the page picks one at random on every visit. */
export const HERO_IMAGES = [
  { src: hero1, alt: 'Daylit open-plan office with a long communal table' },
  { src: hero2, alt: 'Glazed atrium seen from an upper floor' },
  { src: hero3, alt: 'Corridor between full-height glass partitions' },
] as const;

export const HERO = {
  eyebrow: 'Architecture + Interiors',
  approach: 'A Process-Led Practice',
  scrollHint: 'Scroll to explore',
  title: 'We design buildings around the people who end up living in them',
} as const;

export type Category = {
  id: string;
  index: string;
  name: string;
  caption: string;
  tint: string;
  image: string;
  alt: string;
  markets?: readonly string[];
};

/** The five market panels that ride the pinned horizontal rail. */
export const CATEGORIES: readonly Category[] = [
  {
    id: 'housing',
    index: '1 / 5',
    name: 'Housing',
    caption: 'Homes at every price',
    tint: 'bg-cat-housing text-paper',
    image: catHousing,
    alt: 'Apartment building facade seen from below',
    markets: ['Affordable Housing', 'Student Housing', 'Market Rate Housing', 'Senior Housing'],
  },
  {
    id: 'interiors',
    index: '2 / 5',
    name: 'Interiors',
    caption: 'Design for everyday life',
    tint: 'bg-cat-interiors text-paper',
    image: catInteriors,
    alt: 'Living room in a neutral palette with large windows',
  },
  {
    id: 'education',
    index: '3 / 5',
    name: 'Education',
    caption: 'Places that teach well',
    tint: 'bg-cat-education text-ink',
    image: catEducation,
    alt: 'Campus building in brown concrete behind a lawn',
  },
  {
    id: 'civic',
    index: '4 / 5',
    name: 'Civic',
    caption: 'Buildings in public service',
    tint: 'bg-cat-civic text-paper',
    image: catCivic,
    alt: 'Library reading hall under a vaulted roof',
  },
  {
    id: 'workplace',
    index: '5 / 5',
    name: 'Workplace',
    caption: 'Rooms worth coming back to',
    tint: 'bg-cat-workplace text-ink',
    image: catWorkplace,
    alt: 'White concrete office building against a clear sky',
  },
];

export const PROCESS = {
  title: ['Slow questions.', 'Fast buildings.'],
  steps: ['Innovate.', 'Outline.', 'Test.', 'Assemble.'],
  body:
    'IOTA is a small practice that would rather prove an idea than argue for it. A scheme ' +
    'starts as a question, becomes a drawing within the week, and gets built at a scale we ' +
    'can walk around before anyone signs anything. Most of what we try does not survive ' +
    'that. What does, we build properly, and we build it fast.',
  cta: 'More about us',
} as const;

export type Project = {
  id: string;
  title: string;
  place: string;
  sector: string;
  image: string;
  alt: string;
  span: 'tall' | 'short';
};

export const WORK = {
  title: 'A selection of our work',
  filters: ['All projects', 'Housing', 'Interiors', 'Education', 'Civic', 'Workplace'],
  cta: 'See our focus areas',
  projects: [
    {
      id: 'p1',
      title: 'Halden Hall Learning Commons',
      place: 'Corvallis, OR',
      sector: 'Education',
      image: work1,
      alt: 'Concrete academic building under a blue sky',
      span: 'tall',
    },
    {
      id: 'p2',
      title: 'Marrow Street Apartments',
      place: 'Portland, OR',
      sector: 'Housing',
      image: work2,
      alt: 'Apartment block with glazed balconies at dusk',
      span: 'short',
    },
    {
      id: 'p3',
      title: 'Westfold Medical Pavilion',
      place: 'Hillsboro, OR',
      sector: 'Civic',
      image: work3,
      alt: 'Glass and steel clinic building',
      span: 'short',
    },
    {
      id: 'p4',
      title: 'The Ardenne',
      place: 'Portland, OR',
      sector: 'Housing',
      image: work4,
      alt: 'White concrete residential building',
      span: 'short',
    },
    {
      id: 'p5',
      title: 'Cascade County Field Office',
      place: 'Bend, OR',
      sector: 'Civic',
      image: work5,
      alt: 'Public building interior with people walking through',
      span: 'tall',
    },
    {
      id: 'p6',
      title: 'Lindell Works',
      place: 'Tacoma, WA',
      sector: 'Workplace',
      image: work6,
      alt: 'Tall office building with a repeating window grid',
      span: 'short',
    },
  ] satisfies readonly Project[],
} as const;

export type Update = { id: string; source: string; date: string; text: string; time: string };

export const UPDATES = {
  title: 'Latest updates',
  cta: 'All news',
  items: [
    {
      id: 'u1',
      source: 'Journal',
      date: '24 Sep 2026',
      text: 'Halden Hall opened to students this month, two weeks ahead of the academic calendar.',
      time: '09:24:26',
    },
    {
      id: 'u2',
      source: 'Journal',
      date: '21 May 2026',
      text: 'Marrow Street took the regional award for affordable housing. The whole team went.',
      time: '04:21:26',
    },
    {
      id: 'u3',
      source: 'Journal',
      date: '12 May 2026',
      text: 'We are hiring a project architect for the civic studio. Portland or Tacoma.',
      time: '04:12:26',
    },
    {
      id: 'u4',
      source: 'Journal',
      date: '26 Mar 2026',
      text: 'Notes from a year of post-occupancy visits, and the three things they changed.',
      time: '03:26:26',
    },
    {
      id: 'u5',
      source: 'Journal',
      date: '17 Mar 2026',
      text: 'Lindell Works topped out. Photographs once the hoarding comes down in June.',
      time: '03:17:26',
    },
    {
      id: 'u6',
      source: 'Journal',
      date: '13 Mar 2026',
      text: 'A new site, built in-house. It loads slowly on purpose — read on if you want to know why.',
      time: '03:13:26',
    },
  ] satisfies readonly Update[],
} as const;

export const FOCUS = {
  eyebrow: 'Our Focus',
  items: ['Housing', 'Interiors', 'Education', 'Civic', 'Workplace'],
  cta: 'Explore our',
  ctaEmphasis: 'Portfolio',
  image: focusImage,
  alt: 'Timber-lined lounge with soft afternoon light',
} as const;

export const NAV = [
  'Our Focus',
  'Portfolio',
  'Journal',
  'About',
  'Studio',
  'Careers',
  'Contact',
] as const;

export const FOOTER = {
  offices: [
    {
      city: 'Portland',
      lines: ['418 NW Tenth Avenue, Suite 300', 'Portland, OR 97209'],
      phone: '503 555 0142',
    },
    {
      city: 'Tacoma',
      lines: ['1125 Pacific Avenue, Suite 210', 'Tacoma, WA 98402'],
      phone: '253 555 0188',
    },
  ],
  socials: ['Instagram', 'LinkedIn', 'Are.na'],
  backToTop: 'Back to top',
  copyright: '© 2026 IOTA Architecture. All rights reserved.',
} as const;
