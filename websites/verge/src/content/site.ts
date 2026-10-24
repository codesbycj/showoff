import ctaShot from '@/assets/img/cta.webp';
import heroShot from '@/assets/img/hero.webp';
import planLease from '@/assets/img/plan-lease.webp';
import planMiles from '@/assets/img/plan-miles.webp';
import planPool from '@/assets/img/plan-pool.webp';
import problemShot from '@/assets/img/problem.webp';
import riderShot from '@/assets/img/riders.webp';
import teamShot from '@/assets/img/employers.webp';
import voice1 from '@/assets/img/voice-1.webp';
import voice2 from '@/assets/img/voice-2.webp';
import voice3 from '@/assets/img/voice-3.webp';

/**
 * One content deck, read by both designs.
 *
 * verge is invented: the company, the three schemes, the prices, the figures,
 * the customers and every line of copy are mine. The photographs are
 * free-licensed stock (see `src/assets/img/CREDITS.md`).
 *
 * The statistics are written as a real scheme would write them — a number, a
 * unit and a basis — because a design that has to lay out "68% / of trips
 * under 5 miles / are driven" is a different design from one laying out a
 * slogan. They are invented all the same, and the footer says so.
 */

export const BRAND = {
  name: 'verge',
  line: 'Employee commute, handled',
  blurb:
    'verge runs cycle-to-work schemes, pool bikes and commute rewards for UK employers, from eleven people to eleven thousand.',
};

export const NAV = [
  { label: 'Schemes', href: '#schemes' },
  { label: 'Employers', href: '#employers' },
  { label: 'Riders', href: '#riders' },
  { label: 'Pricing', href: '#pricing' },
];

export const HERO = {
  lines: ['Get your team', 'riding in by', 'Tuesday'],
  sub: 'Three schemes, one contract, no fleet to manage. Set it up this week and your people can order a bike before payroll closes.',
  cta: 'Book a walkthrough',
  secondary: 'See what it costs',
  image: heroShot,
  alt: 'A commuter riding past an office building',
};

/** Set as type, not logos: inventing a company is fine, drawing its mark is not. */
export const TRUSTED = {
  label: 'Running at',
  names: [
    'Halden & Pike',
    'Northbank Health',
    'Mersey Civic',
    'Tolgate Logistics',
    'Brightmoor Schools',
    'Calder Water',
    'Finch & Row',
    'Peregrine Labs',
  ],
};

export const PROBLEM = {
  label: 'The problem',
  title: 'Most of the car park is a five-mile round trip',
  body: 'Short drives are the hardest commute to shift and the easiest to replace. The barrier is almost never the distance — it is the £1,800 up front, the nowhere to put it, and the one wet Tuesday that ends the habit.',
  image: problemShot,
  alt: 'Queued traffic at dusk',
  stats: [
    { figure: '68', unit: '%', label: 'of commutes under five miles are driven' },
    { figure: '£1,800', unit: '', label: 'average up-front cost of a decent e-bike' },
    { figure: '1 in 9', unit: '', label: 'employers offer anything beyond a car park' },
  ],
};

export const SCHEMES = {
  label: 'Three schemes',
  title: 'Pick one, or run all three',
  items: [
    {
      id: 'lease',
      name: 'Lease',
      kicker: 'Salary sacrifice',
      price: 'From £11',
      per: 'per rider / month',
      body: 'Your people choose a bike from any shop in the country and pay for it out of gross salary over 12, 24 or 36 months.',
      image: planLease,
      alt: 'A bike parked against a wall',
      points: [
        'Any shop, any bike',
        'Up to 42% saving for the rider',
        'No cost to the employer',
        'We handle the paperwork',
      ],
    },
    {
      id: 'pool',
      name: 'Pool',
      kicker: 'Shared bikes on site',
      price: 'From £68',
      per: 'per bike / month',
      body: 'A rack of maintained bikes at your building that anyone can take for a meeting, a site visit or a lunch run.',
      image: planPool,
      alt: 'Bikes in a rack outside a building',
      points: [
        'Delivered and installed',
        'Serviced every eight weeks',
        'Booked from a phone',
        'Swap sizes any time',
      ],
    },
    {
      id: 'miles',
      name: 'Miles',
      kicker: 'Commute rewards',
      price: 'From £2',
      per: 'per employee / month',
      body: 'Riders log the days they ride in and earn credit. It is the cheapest of the three and the one that changes behaviour.',
      image: planMiles,
      alt: 'A handlebar view of a ride to work',
      points: [
        'Works with any bike',
        'Auto-logged, not self-reported',
        'Credit at local shops',
        'Reporting for your ESG return',
      ],
    },
  ],
};

export const PROCESS = {
  label: 'Setting it up',
  title: 'Four steps, about three weeks',
  steps: [
    {
      n: '01',
      title: 'A half-hour call',
      body: 'We look at your headcount, your sites and your payroll provider, and tell you which of the three is worth running.',
    },
    {
      n: '02',
      title: 'One agreement',
      body: 'A single contract covers all three schemes. Your finance team gets one invoice and one line in the ledger.',
    },
    {
      n: '03',
      title: 'We launch it for you',
      body: 'Posters, payroll codes, a page on your intranet and a session at your all-hands. Most of the sign-ups happen that week.',
    },
    {
      n: '04',
      title: 'It runs itself',
      body: 'Riders deal with us, not with you. You get a quarterly report with the numbers your ESG return asks for.',
    },
  ],
};

/** The calculator's own copy. The arithmetic lives in the component. */
export const ESTIMATOR = {
  label: 'What it comes to',
  title: 'Put your headcount in',
  body: 'A rough figure in ten seconds, on the assumption that about one in six people take it up in year one. We will give you a real one on the call.',
  note: 'Illustrative only — invented rates for a design study, not an offer.',
  defaults: { headcount: 250, uptake: 0.16 },
};

export const AUDIENCE = {
  label: 'Who gets what',
  title: 'Two sides, one scheme',
  tabs: [
    {
      id: 'employers',
      label: 'For employers',
      image: teamShot,
      alt: 'A team meeting around a table',
      points: [
        {
          title: 'No fleet to manage',
          body: 'We own the bikes, the servicing and the riders’ questions. You own one invoice.',
        },
        {
          title: 'Numbers for your return',
          body: 'Mileage, modal shift and avoided emissions, quarterly, in the format auditors ask for.',
        },
        {
          title: 'Nothing on the balance sheet',
          body: 'Lease is salary sacrifice; Pool is an operating cost. Neither is capital.',
        },
        {
          title: 'One contract for all sites',
          body: 'Add a building in a fortnight without renegotiating anything.',
        },
      ],
    },
    {
      id: 'riders',
      label: 'For riders',
      image: riderShot,
      alt: 'A cyclist waiting at a junction',
      points: [
        {
          title: 'Up to 42% off a bike',
          body: 'Paid from gross salary over three years, with nothing up front.',
        },
        {
          title: 'Any shop you like',
          body: 'Including the one near you that does the servicing. We do not run a catalogue.',
        },
        {
          title: 'Wet Tuesday cover',
          body: 'Six taxi credits a year, because that is the day the habit usually dies.',
        },
        {
          title: 'It follows you',
          body: 'Leave the company and the bike comes with you at a fixed buy-out.',
        },
      ],
    },
  ],
};

export const VOICES = {
  label: 'Running it',
  title: 'People who had to make it work',
  items: [
    {
      name: 'Priya Raman',
      role: 'Head of People, Northbank Health',
      photo: voice1,
      quote:
        'We had tried a voucher scheme nobody used. The difference here is that our staff deal with verge and not with me.',
    },
    {
      name: 'Tom Okafor',
      role: 'Facilities, Mersey Civic',
      photo: voice2,
      quote:
        'Eleven pool bikes across three buildings. I have not touched a puncture since March, which was the whole point.',
    },
    {
      name: 'Jen Whitlock',
      role: 'Finance Director, Calder Water',
      photo: voice3,
      quote:
        'One invoice, one line, and a report I can hand to the auditor without rewriting it. That is worth more than the saving.',
    },
  ],
};

export const JOURNAL = {
  label: 'Journal',
  title: 'What we have learned running these',
  items: [
    {
      date: '04 October',
      read: '7 min',
      title: 'Uptake is a launch problem, not a price problem',
      excerpt:
        'The schemes that stall are the ones announced in an email. The ones that work get fifteen minutes at an all-hands.',
    },
    {
      date: '19 August',
      read: '5 min',
      title: 'Why we cover six taxis a year',
      excerpt:
        'The habit does not die in January. It dies the first time someone gets soaked and has nowhere to dry a jacket.',
    },
    {
      date: '02 July',
      read: '9 min',
      title: 'What the ESG return actually asks for',
      excerpt:
        'Most commute data is self-reported and useless. Here is the shape of a number an auditor will accept.',
    },
  ],
};

export const FAQ = {
  label: 'Questions',
  lead: 'The things finance teams ask first, including',
  highlight: 'what happens when somebody leaves',
  tail: 'and who owns the bike.',
  cta: 'Ask us something else',
  items: [
    {
      q: 'What does it cost the employer?',
      a: 'Lease costs you nothing — it runs through payroll and the rider funds it from gross salary. Pool is £68 per bike per month including servicing. Miles is £2 per employee per month, charged on headcount rather than on sign-ups, which is why it is the one most people start with.',
    },
    {
      q: 'What happens when somebody leaves?',
      a: 'The remaining payments come out of their final salary, or they take over the agreement directly with us at the same rate. Nobody is asked to hand the bike back, and no employer has ever had to chase one. Pool bikes stay with the building.',
    },
    {
      q: 'Does this work with our payroll provider?',
      a: 'We have run it through every major UK provider and a dozen small ones. The integration is a monthly CSV in the shape your provider already exports; if yours cannot do that, we do it by hand and do not charge you for it.',
    },
    {
      q: 'How long does setup take?',
      a: 'About three weeks from the first call to the first order, and most of that is waiting for a payroll cut-off. The agreement itself is four pages and we have never needed more than one round of legal on it.',
    },
    {
      q: 'What if nobody signs up?',
      a: 'Then you are paying for Miles and nothing else, and we have failed at the launch. Our average first-year uptake is about one in six — if yours is under one in twenty after six months we will refund the Miles fee for that period.',
    },
  ],
};

export const CTA = {
  title: 'Start with the half-hour call',
  body: 'No deck, no discovery process. We will tell you on the call which of the three is worth running and roughly what it comes to.',
  button: 'Book a walkthrough',
  secondary: 'Or email a human',
  image: ctaShot,
  alt: 'Colleagues talking in an office',
};

export const FOOTER = {
  columns: [
    { title: 'Schemes', links: ['Lease', 'Pool', 'Miles', 'Pricing', 'Compare'] },
    { title: 'Company', links: ['About', 'Journal', 'Careers', 'Press', 'Contact'] },
    { title: 'Help', links: ['For riders', 'For payroll', 'Service status', 'Terms', 'Privacy'] },
  ],
  contact: {
    address: ['verge commuting ltd', 'Unit 7, Kingsland Works', 'Manchester M4 6DE'],
    email: 'hello@vergecommuting.co.uk',
    phone: '0161 555 0147',
    hours: 'Weekdays, 8.30am — 6pm',
  },
  legal:
    'verge is an invented company built for a design study. The schemes, prices, figures, customers and testimonials are not real, and nothing here is an offer or advice.',
};
