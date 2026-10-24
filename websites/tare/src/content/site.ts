import clickLabel from '@/assets/img/click-label.svg';
import hand from '@/assets/img/hand.svg';
import icon0 from '@/assets/img/icons/0.svg';
import icon1 from '@/assets/img/icons/1.svg';
import icon2 from '@/assets/img/icons/2.svg';
import icon3 from '@/assets/img/icons/3.svg';
import icon4 from '@/assets/img/icons/4.svg';
import icon5 from '@/assets/img/icons/5.svg';
import step0 from '@/assets/img/steps/0.svg';
import step1 from '@/assets/img/steps/1.svg';
import step2 from '@/assets/img/steps/2.svg';
import step3 from '@/assets/img/steps/3.svg';
import mug00 from '@/assets/img/taxman/00.svg';
import mug01 from '@/assets/img/taxman/01.svg';
import mug02 from '@/assets/img/taxman/02.svg';
import mug03 from '@/assets/img/taxman/03.svg';
import mug04 from '@/assets/img/taxman/04.svg';
import mug05 from '@/assets/img/taxman/05.svg';
import mug06 from '@/assets/img/taxman/06.svg';
import mug07 from '@/assets/img/taxman/07.svg';
import mug08 from '@/assets/img/taxman/08.svg';
import mug09 from '@/assets/img/taxman/09.svg';
import mug10 from '@/assets/img/taxman/10.svg';
import mug11 from '@/assets/img/taxman/11.svg';
import mug12 from '@/assets/img/taxman/12.svg';

/**
 * One content deck, read by both designs.
 *
 * **Every line of text is invented** — the only thing rule 0 allows to change.
 * The structure, the counts and the copy lengths are the reference's. The
 * illustrations are the reference's own, extracted from its markup as inline
 * SVG; see `src/assets/img/CREDITS.md`.
 *
 * tare is an invented accountancy practice for freelance creatives. The firm,
 * the services and the figures are not real, and nothing here is tax advice.
 */

export const BRAND = { line1: 'THE', line2: 'TARE' };

export const NAV = {
  links: ['Services', 'Company', 'Resources'],
  secondary: 'View pricing',
  cta: 'Talk to us',
};

export const HERO = {
  label: 'Accounting for creatives',
  heading: 'Creatives, face the tax man together',
  sub: 'He’s the deadline that never ends',
  body: 'Accountants for UK-based creatives who would rather be creating.',
  primary: 'Talk to us',
  secondary: 'View pricing',
  /** The thirteen drawings the hero cycles through on a click. */
  mugs: [mug00, mug01, mug02, mug03, mug04, mug05, mug06, mug07, mug08, mug09, mug10, mug11, mug12],
  clickLabel,
  hand,
};

export const USPS = [
  'We speak your language',
  'Proactive and personable',
  'You keep more in your pocket',
];

export const WHO = {
  label: 'Accounting for creatives',
  heading: 'Who it’s for',
  sub: 'Creatives create, we calculate',
  /*
   * Six cards, dealt one at a time as the section is pinned. The tints
   * alternate and the order is the reference's.
   */
  cards: [
    {
      title: 'Creative Freelancers',
      body: 'Providing support and expertise to clients, solo, managing all of it from one desk.',
      tint: 'var(--color-pink)',
    },
    {
      title: 'Studios and Agencies',
      body: 'Creative experiences that connect, convert and inspire audiences at scale.',
      tint: 'var(--color-mint-pale)',
    },
    {
      title: 'Creative Collectives',
      body: 'All-in-one solutions for creative work from concept through to launch.',
      tint: 'var(--color-pink)',
    },
    {
      title: 'Production Houses',
      body: 'Turning ideas into visuals that define brands, stories and whole campaigns.',
      tint: 'var(--color-mint-pale)',
    },
    {
      title: 'Creative Contractors',
      body: 'Expertly advising long-term clients with strategy, systems and leadership.',
      tint: 'var(--color-pink)',
    },
    {
      title: 'Media Businesses',
      body: 'Guiding clients to their milestones through media management and planning.',
      tint: 'var(--color-mint-pale)',
    },
  ],
};

export const SERVICES = {
  label: 'our services',
  heading: 'We handle more than the tax man can throw',
  sub: 'You become financially resilient',
  body: 'Onboarding. Quarterly reports. Annual accounts and corporation tax. Self assessment. VAT. Payroll and pensions.',
  items: [
    {
      icon: icon0,
      title: 'Onboarding',
      body: 'We do the heavy lifting, then it is over to teaching you what matters and what does not.',
    },
    {
      icon: icon1,
      title: 'Quarterly Reports',
      body: 'tare reviews your opportunities and risks, while educating you on what each one means.',
    },
    {
      icon: icon2,
      title: 'Annual Accounts',
      body: 'Annual accounts and corporation tax for UK creatives. tare keeps the deadlines, not you.',
    },
    {
      icon: icon3,
      title: 'Self Assessment',
      body: 'tare does not forget the details that are usually overlooked, leaving nothing to chance.',
    },
    {
      icon: icon4,
      title: 'VAT',
      body: 'VAT specialists for UK creatives. tare shields you from the errors that cost the most.',
    },
    {
      icon: icon5,
      title: 'Payroll & Pensions',
      body: 'Avoid deadlines with accurate filings. You stay creative, your team stays paid on time.',
    },
  ],
};

export const WHY = {
  label: 'why choose us',
  heading: 'Numbers aren’t for you',
  sub: 'Bespoke accounting for creatives',
  cta: 'Meet the team',
  items: [
    { title: 'We speak creative', body: 'We encounter and resolve your challenges every day.' },
    {
      title: 'You don’t panic',
      body: 'We handle everything and you have visibility of your position every month.',
    },
    {
      title: 'We plan ahead',
      body: 'Actions are taken to keep taxes low, leaving no surprise tax bill at the year end.',
    },
    {
      title: 'We’re not robots (yet)',
      body: 'Clear advice and genuine support for today’s creatives.',
    },
  ],
};

/** Four steps, each a full screen, grounds alternating cream / mint / pink. */
export const STEPS = [
  {
    n: 'Step 1',
    title: 'Talk to us',
    sub: 'Where are you at and what’s keeping you up?',
    body: 'We have heard it all before and nothing shocks us. We will work out where you are, what is overdue, and what it will take to put it right.',
    tint: 'var(--color-cream)',
    art: step0,
  },
  {
    n: 'Step 2',
    title: 'We build defences',
    sub: 'Initial setups, immediate time and monetary savings',
    body: 'We create systems the tax man cannot penetrate. Bullet-proof bookkeeping, a bank feed that works, and every deadline in one place.',
    tint: 'var(--color-mint-pale)',
    art: step1,
  },
  {
    n: 'Step 3',
    title: 'Quarterly reporting',
    sub: 'We review everything',
    body: 'We flag issues, increase savings and summarise your entire financial position in a page you can read in four minutes.',
    tint: 'var(--color-pink)',
    art: step2,
  },
  {
    n: 'Step 4',
    title: 'Your taxes sorted',
    sub: 'No unnecessary taxes, no surprises, no panic',
    body: 'Returns filed accurately, tax minimised legally and paid on time, every time — with the number in your inbox weeks before it is due.',
    tint: 'var(--color-cream)',
    art: step3,
  },
];

export const CTA = {
  heading: 'Don’t run from the tax man',
  sub: 'Creatives, face the tax man together',
  button: 'Talk to us',
};

/**
 * The footer is a **receipt** — a white paper docket with a torn edge, printed
 * with the sitemap. Its columns are the reference's.
 */
export const FOOTER = {
  tagline: 'Creatives, face the tax man together',
  columns: [
    {
      title: 'Services',
      links: [
        'Onboarding Phase',
        'Quarterly Reports',
        'Annual Accounts & Corporation Tax',
        'Self Assessment',
        'VAT',
        'Payroll & Pensions',
      ],
    },
    {
      title: 'Company',
      links: ['About', 'Our Team', 'Careers', 'Contact'],
    },
    {
      title: 'Resources',
      links: ['Guides', 'Calculators', 'Deadlines', 'Blog'],
    },
  ],
  totals: [
    { label: 'Tax man', value: 'Off your back' },
    { label: 'Peace of mind', value: 'Restored' },
  ],
  stamp: 'Accountants for UK-based creatives',
  legal:
    'tare is an invented accountancy practice built for a design study. The firm, the services, the fees and the figures are not real, and nothing here is tax advice.',
  copy: '© 2026 tare. Registered in England and Wales.',
};
