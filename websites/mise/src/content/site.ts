import card1 from '@/assets/img/card-1.svg';
import card2 from '@/assets/img/card-2.svg';
import card3 from '@/assets/img/card-3.svg';
import crew from '@/assets/img/crew.webp';
import ctaPhone from '@/assets/img/cta-phone.avif';
import heroVideo from '@/assets/img/hero.mp4';
import news1 from '@/assets/img/news-1.avif';
import news2 from '@/assets/img/news-2.avif';
import news3 from '@/assets/img/news-3.avif';
import news4 from '@/assets/img/news-4.avif';
import news5 from '@/assets/img/news-5.avif';
import news6 from '@/assets/img/news-6.avif';
import phoneBi from '@/assets/img/phone-bi.avif';
import phoneInv from '@/assets/img/phone-inv.avif';
import phonePay from '@/assets/img/phone-pay.avif';
import phoneWork from '@/assets/img/phone-work.avif';
import story1 from '@/assets/img/story-1.webp';
import story2 from '@/assets/img/story-2.webp';
import story3 from '@/assets/img/story-3.webp';

/**
 * One content deck, read by both designs.
 *
 * **Every line of text is invented** — the only thing rule 0 allows to change.
 * The structure, the counts and the copy lengths are the reference's, so lines
 * break where its lines break. The images are the reference's own.
 *
 * mise is an invented restaurant-operations platform. The customers, figures
 * and quotes are not real, and both designs say so in the footer.
 */

export const BRAND = { name: 'mise' };

export const NAV = {
  links: ['Platform', 'Solutions', 'About', 'Customers', 'Resources'],
  login: 'Login',
  cta: 'Book a chat',
};

export const HERO = {
  badge: 'Top rated in restaurant operations software',
  rating: '4.9',
  /* Two colours in one line: the second half is periwinkle. */
  headlineLead: 'Profitability’s',
  headlineAccent: 'quiet ingredient.',
  sub: 'The agentic operating system that forecasts demand, builds the rota, manages ordering and payroll, and keeps your P&L on track — across every site.',
  primary: 'Book a chat',
  secondary: 'Watch the tour',
  video: heroVideo,
};

/**
 * The customer rail. The reference prints seventeen real restaurant brands'
 * logos; an invented platform cannot, so these are invented operators set as
 * wordmarks at the reference's own slot widths. The README lists it.
 */
export const RAIL = {
  label: 'Trusted by operators across Europe & America',
  names: [
    'Badiani',
    'Hale Coffee',
    'BTP',
    'Bunsik',
    'Camile',
    'Colicci',
    'Cupp',
    'Dave’s',
    'Eclective',
    'Grind',
    'Oakberry',
    'Pennyfields',
    'Poke Shack',
    'Roasting Plant',
    'Sticks',
    'Fourth Floor',
    'W&W',
  ],
};

export const WHY = {
  heading: 'Why operators switch to mise',
  cards: [
    {
      icon: card1,
      title: 'Margins, managed.',
      body: 'Labour and food will make or break your P&L. What if you had a crew of AI controlling both — while you run your restaurant?',
    },
    {
      icon: card2,
      title: 'One system, zero blind spots.',
      body: 'Forecasting, scheduling, inventory, payroll, and BI connected in one system. AI that predicts what’s next and acts before you need to.',
    },
    {
      icon: card3,
      title: 'Your best performing site, multiplied.',
      body: 'The same standard of decisions from your best site, applied to every site — whether you run five locations or hundreds.',
    },
  ],
};

export const RESULTS = {
  heading: 'Results you can take to the bank',
  cta: 'Book a demo',
  stats: [
    { label: 'Demand forecast accuracy, up to', value: '96%' },
    { label: 'Hours saved in admin time', value: '100+' },
    { label: 'Productivity increase up to', value: '6%' },
    { label: 'Food waste reduced up to', value: '48%' },
  ],
  caveat: 'Invented figures for a design study. Nothing here is a real result.',
};

export const CREW = {
  label: 'Introducing mise’s agentic AI',
  heading: 'You’re open 12-10. We’re on 24/7.',
  body: 'A crew of AI assistants that works alongside your team — forecasting demand, building rotas, placing orders, and catching problems before they cost you. Built from the ground up by people who’ve run restaurants.',
  cta: 'Meet the crew',
  image: crew,
};

export const PLATFORM = {
  label: 'Explore the platform',
  items: [
    {
      id: 'bi',
      title: 'Business Intelligence',
      lines: [
        'Demand Forecasting predicts revenue over every location.',
        'Customer Reviews Assistant analyses reviews and drafts responses.',
      ],
      link: 'Learn more about Business Intelligence',
      phone: phoneBi,
    },
    {
      id: 'inventory',
      title: 'Inventory',
      lines: [
        'Ordering Assistant places tomorrow’s order against tonight’s forecast.',
        'Invoice Assistant reads every supplier price, including the handwritten ones.',
      ],
      link: 'Learn more about Inventory',
      phone: phoneInv,
    },
    {
      id: 'workforce',
      title: 'Workforce',
      lines: [
        'Scheduling Assistant builds the rota against the forecast, not last week.',
        'Compliance Assistant watches breaks, hours and right-to-work.',
      ],
      link: 'Learn more about Workforce',
      phone: phoneWork,
    },
    {
      id: 'payroll',
      title: 'Payroll',
      lines: [
        'Clock-ins reconcile against the published rota every night.',
        'Payroll Assistant exports to the five providers your accountant uses.',
      ],
      link: 'Learn more about Payroll',
      phone: phonePay,
    },
  ],
};

export const STORIES = {
  label: 'Success Stories',
  items: [
    {
      quote:
        'Before mise, we were using spreadsheets, an old till and a lot of hope. Now the forecast is the first thing I look at and the rota writes itself against it.',
      cite: '— Paul Tanner, Managing Director at Hale Coffee',
      link: 'Read Hale Coffee’s story',
      image: story1,
      stats: [
        { label: 'Reduction in food waste', value: '60%' },
        { label: 'Sales forecast accuracy', value: '99%' },
      ],
    },
    {
      quote:
        'As we scale, having forecasting, labour and inventory in one place is the difference between opening a site and opening a problem.',
      cite: '— Ula Spire, Head of Operations',
      link: 'Read Fourth Floor’s story',
      image: story2,
      stats: [
        { label: 'Forecasting accuracy', value: '98%' },
        { label: 'Labour cost variance of sales', value: '<1%' },
      ],
    },
    {
      quote:
        'Before mise, adding a new location meant building everything again from nothing. Now a new site inherits the way the best one already works.',
      cite: '— Stephen Oladimeji, Head of IT Systems',
      link: 'Read Pennyfields’ story',
      image: story3,
      stats: [
        { label: 'Forecast accuracy', value: '98.5%' },
        { label: 'Reduction in food waste', value: '42%' },
      ],
    },
  ],
};

export const NEWS = {
  heading: 'This week’s specials',
  items: [
    { kind: 'New product release', text: 'Our invoicing assistant is now live', img: news1 },
    { kind: 'New product release', text: 'Our compliance assistant is now live', img: news2 },
    { kind: 'Series B funding', text: 'We’ve raised $37M to scale the crew', img: news3 },
    { kind: 'New product release', text: 'Our ordering assistant is now live in beta', img: news4 },
    { kind: 'We’ve gone Stateside', text: 'mise is now operating across the US!', img: news5 },
    { kind: 'New product release', text: 'Our payroll assistant is now live', img: news6 },
  ],
};

export const CTA = {
  heading: 'Want better margins?',
  body: 'Find out how mise’s agentic AI system can boost your profits.',
  button: 'Book a demo',
  image: ctaPhone,
};

export const FOOTER = {
  columns: [
    { title: 'Home', links: ['Home', 'Product tour', 'Login'] },
    { title: 'Platform', links: ['The system', 'Managing change', 'Capital', 'Integrations'] },
    { title: 'Modules', links: ['Business Intelligence', 'Inventory', 'Workforce', 'Payroll'] },
    { title: 'About', links: ['About mise', 'Partner Program', 'Careers'] },
  ],
  columns2: [
    { title: 'Get in touch', links: ['Book a chat', 'Contact'] },
    {
      title: 'Resources',
      links: ['Success stories', 'Blog', 'ROI Calculator', 'Panels', 'Data to Decisions'],
    },
    { title: 'Follow us', links: ['X', 'Instagram', 'LinkedIn'] },
    {
      title: 'Solutions for Business',
      links: ['Independent brands', 'Franchise networks', 'Multi-location', 'Enterprise groups'],
    },
  ],
  ask: 'Ask AI for a summary of mise',
  legal: '© 2026 mise. All rights reserved.',
  meta: ['Terms and Conditions', 'Privacy Policy', 'Cookie Policy', 'Cookie Preferences'],
  bigType: 'No profit lost',
  disclaimer:
    'mise is an invented company built for a design study. The customers, figures, quotes and prices are not real.',
};
