/**
 * Every word on the page.
 *
 * Sem Veldkamp is invented, and so is the Continental GT Cup, every partner,
 * every result and every date. Sections are assembly: none of them hard-codes
 * a sentence, so changing the driver is an edit to this file and nothing else.
 */

export const DRIVER = {
  firstName: 'Sem',
  lastName: 'Veldkamp',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  /** Also what the loader counts up to, and the shape of the mark. */
  number: 96,
  age: 21,
  city: 'Eindhoven',
  country: 'The Netherlands',
  series: 'Continental GT Cup',
  email: 'sem@veldkamp-racing.nl',
  phone: '+31 6 22 07 41 88',
} as const;

export const HERO = {
  /** Left column: three numbers that roll up as the loader hands over. */
  stats: [
    { value: '96', label: 'Car number' },
    { value: '23', label: 'Career podiums' },
    { value: '18', label: 'Circuits raced' },
  ],

  /** Right column: a line, then three facts. */
  asideIntro: 'A race weekend is won on the Thursday.',
  aside: [
    { value: DRIVER.city, label: DRIVER.country, counts: false },
    { value: '11+', label: 'Years in motorsport', counts: true },
    { value: '21', label: 'Years old', counts: true },
  ],

  intro:
    'Racing rewards whoever is still thinking clearly on lap forty. I spend a season looking for the tenth of a second nobody else has gone looking for yet.',

  countdownLabel: 'Next race',
} as const;

/** The statement band. Spans marked `signal` come up in yellow. */
export type StatementPart = { text: string; signal?: boolean };

export const STATEMENT: StatementPart[] = [
  { text: 'I am not chasing the fastest lap. I am chasing the ' },
  { text: 'one tenth everybody else has stopped looking for', signal: true },
  {
    text: ', the one hiding in a corner that already feels finished. Every session is a question. ',
  },
  { text: 'Every mistake is the answer', signal: true },
  { text: ', if you are honest enough to read it.' },
];

export const PARTNERS = {
  eyebrow: 'Partners',
  title: 'Backed by',
  cta: 'Become a partner',
  logos: [
    'NORDVELD',
    'KEMPEN &co',
    'ATLAS BRAKE',
    'VOSS',
    'RIJNMOND',
    'MERIDIAN',
    'STAAL 9',
    'HELDER',
    'DE BRUIJN',
    'OKTAAN',
    'LUMEN',
    'VAART',
  ],
} as const;

/** The scroll-driven story. One chapter at a time, image and copy swapping. */
export const STORY_CHAPTERS = [
  {
    year: '2014',
    title: 'A rental kart in Eindhoven',
    body: 'Eight years old, a birthday voucher and a wet indoor circuit. He went back the following Saturday with his own money and did not stop going back.',
    image: 'story-1.jpg',
  },
  {
    year: '2017',
    title: 'Regional karting',
    body: 'Three seasons of club racing taught him the part nobody films: that the fast lap is set up on the out-lap, and that a kart you do not understand will beat you in the last corner.',
    image: 'story-2.jpg',
  },
  {
    year: '2020',
    title: 'First season in cars',
    body: 'A step up that went badly on purpose. He finished eleventh, learned how a race engineer actually wants to be spoken to, and rewrote how he prepares.',
    image: 'story-3.jpg',
  },
  {
    year: '2023',
    title: 'First overall win',
    body: 'Wet, red-flagged, restarted twice. He led the restart from third and held it for nine laps on a track that was drying in patches.',
    image: 'story-4.jpg',
  },
  {
    year: '2026',
    title: 'Continental GT Cup',
    body: 'A full campaign across seven European circuits, with the same engineer he has worked with since 2021 and a car he has spent the winter learning.',
    image: 'story-5.jpg',
  },
] as const;

export const MEDIA = {
  title: 'Media & articles',
  items: [
    {
      source: 'Circuit Weekly',
      title: 'The Dutch junior rewriting his own data',
      body: 'How a 21-year-old built a telemetry habit that his engineers now borrow from.',
      image: 'media-1.jpg',
    },
    {
      source: 'Paddock Notes',
      title: 'Veldkamp takes maiden GT Cup pole at Zandvoort',
      body: 'A tenth and a half clear in conditions that caught out half the field.',
      image: 'media-2.jpg',
    },
    {
      source: 'Grid Magazine',
      title: 'Nine laps in the wet: the restart that made a season',
      body: 'A lap-by-lap read of the drive that put him on the championship radar.',
      image: 'media-3.jpg',
    },
  ],
} as const;

export type Race = {
  round: number;
  circuit: string;
  country: string;
  series: string;
  /** Local start, and the countdown's target. */
  start: Date;
  dates: string;
  year: number;
};

/**
 * The calendar is generated against whatever year it is being looked at in,
 * rolling to next season once the last round has been run.
 *
 * A hard-coded season is a showcase with a shelf life: every date falls into
 * the past, the hero countdown quietly reads TBA, and the one live number on
 * the page is dead. The rounds themselves are fixed — only the year moves.
 */
const ROUNDS = [
  {
    circuit: 'Circuit Zandvoort',
    country: 'The Netherlands',
    month: 3,
    day: 11,
    hour: 13,
    minute: 30,
    span: '10–12 Apr',
  },
  {
    circuit: 'Spa-Francorchamps',
    country: 'Belgium',
    month: 4,
    day: 9,
    hour: 14,
    minute: 0,
    span: '08–10 May',
  },
  {
    circuit: 'Hockenheimring',
    country: 'Germany',
    month: 5,
    day: 6,
    hour: 13,
    minute: 0,
    span: '05–07 Jun',
  },
  {
    circuit: 'Red Bull Ring',
    country: 'Austria',
    month: 6,
    day: 4,
    hour: 13,
    minute: 30,
    span: '03–05 Jul',
  },
  {
    circuit: 'Autodrom Most',
    country: 'Czechia',
    month: 7,
    day: 15,
    hour: 14,
    minute: 0,
    span: '14–16 Aug',
  },
  {
    circuit: 'Circuit de Barcelona',
    country: 'Spain',
    month: 8,
    day: 19,
    hour: 13,
    minute: 0,
    span: '18–20 Sep',
  },
  {
    circuit: 'Autodromo di Monza',
    country: 'Italy',
    month: 9,
    day: 10,
    hour: 13,
    minute: 30,
    span: '09–11 Oct',
  },
];

function buildSeason(now = new Date()): Race[] {
  const make = (year: number) =>
    ROUNDS.map((r, i) => ({
      round: i + 1,
      circuit: r.circuit,
      country: r.country,
      series: DRIVER.series,
      start: new Date(year, r.month, r.day, r.hour, r.minute),
      dates: `${r.span} ${year}`,
      year,
    }));

  const thisYear = make(now.getFullYear());
  // Once the final round is behind us, the season on show is the next one.
  return thisYear[thisYear.length - 1].start.getTime() > now.getTime()
    ? thisYear
    : make(now.getFullYear() + 1);
}

export const RACES: Race[] = buildSeason();

export const SEASON_YEAR = RACES[0].year;

export const SPONSOR_GUIDE = {
  title: 'Want the detail on the championship I race in?',
  body: 'The 2026 sponsor guide covers the calendar, the car, the audience the series reaches and what a season on the side of it actually looks like.',
  cta: 'Download the 2026 guide',
} as const;

export const GALLERY = {
  title: 'Gallery',
  images: [
    'gallery-1.jpg',
    'gallery-2.jpg',
    'gallery-3.jpg',
    'gallery-4.jpg',
    'gallery-5.jpg',
    'gallery-6.jpg',
  ],
} as const;

export const CONTACT = {
  title: 'Contact',
  intro: 'Ready to support, or just have a question?',
  fields: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    message: 'Message',
  },
  cta: 'Send it',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'History', href: '#history' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
] as const;
