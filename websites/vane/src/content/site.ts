/**
 * One content deck. Both designs read it, so the comparison is of design and
 * nothing else (rule 1).
 *
 * The reference is a carbon-accounting platform, and almost everything it puts
 * on its home page is somebody's brand: fourteen client logos, twelve
 * certification marks, six advisory partners, four testimonial companies and
 * nine screenshots of its own product with its own wordmark in them.
 *
 * None of that can be carried over. Rule 10 replaces brand marks, and a
 * screenshot of a real company's software under an invented product's name is
 * a brand mark with the whole application attached to it. So every name below
 * is invented, every mark is drawn (`src/after/Marks.tsx`), and every product
 * visual is rebuilt in the DOM (`src/after/Visuals.tsx`) at the box the
 * reference paints it in.
 *
 * The one class of name kept is **public instruments** — CSRD, SBTi, TCFD, the
 * ISO numbers, SFDR, the Digital Product Passport. Those are laws and open
 * standards, not anybody's brand, and a carbon tool naming them is the same
 * kind of statement as a payments tool naming PCI DSS. The *certification*
 * marks in the reference's row — the ones that say a third party has audited
 * the company — are invented instead, because claiming one would be a claim.
 */

export const brand = {
  name: 'vane',
  legal: 'vane Climate Ltd',
  tagline: 'Carbon data your board can sign',
  year: '2026',
} as const;

export const announcement = {
  text: 'vane 3.0 is here — four AI agents, one audit trail.',
  cta: 'See what is new',
} as const;

export const nav = {
  primary: [
    { label: 'Platform', href: '#platform', menu: true },
    { label: 'Solutions', href: '#solutions', menu: true },
    { label: 'Pricing', href: '#pricing', menu: false },
    { label: 'Customers', href: '#customers', menu: false },
    { label: 'Resources', href: '#resources', menu: true },
    { label: 'Company', href: '#company', menu: true },
  ],
  accent: { label: 'Copilot', href: '#copilot' },
  login: 'Log in',
  cta: 'Book a demo',
  locale: 'EN',
} as const;

/* -------------------------------------------------------------------- hero */

export const hero = {
  counterLabel: 'Emissions under management with vane:',
  counterValue: '418,902,117',
  counterUnit: 'tCO₂e',
  heading: 'Carbon data that holds up in the boardroom',
  body: 'Measure, reduce and report the carbon and environmental footprint of your company and of everything it makes, on one platform, built to the standards your auditors already use.',
  primary: { label: 'Book a demo', href: '#demo' },
  secondary: { label: 'Meet the AI agents', href: '#copilot' },
  rating: { score: '4.8', of: '5', note: '280+ reviews on Softwise' },
} as const;

/* ------------------------------------------------------------- client wall */

export const clients = {
  label: 'From 40 people to 40,000: 4,000 companies run on vane',
  /**
   * Invented companies, drawn as wordmarks. The reference's wall is fourteen
   * real ones; the layout is unchanged and the names are not.
   */
  logos: [
    { name: 'Vantor', style: 'serif' },
    { name: 'Brelmont', style: 'grotesk' },
    { name: 'Caddick Rowe', style: 'mono' },
    { name: 'Delph Foods', style: 'round' },
    { name: 'Ennersdale', style: 'serif' },
    { name: 'Fitzgrave', style: 'grotesk' },
    { name: 'Garrowby Rail', style: 'mono' },
    { name: 'Hollick Energy', style: 'round' },
    { name: 'Inverleith', style: 'serif' },
    { name: 'Joslin & Pye', style: 'grotesk', caseStudy: true },
    { name: 'Kemsworth', style: 'mono' },
    { name: 'Larkmoor', style: 'round' },
    { name: 'Mardale Water', style: 'serif' },
    { name: 'Petherton', style: 'grotesk' },
  ],
  caseStudyLabel: 'CASE STUDY',
  marquee: [
    { icon: 'star', text: 'Highest rated platform in its category' },
    { icon: 'person', text: '4,000+ customers' },
    { icon: 'cube', text: 'No.1 in sustainability management software' },
    { icon: 'medal', text: 'Climate Software of the Year' },
    { icon: 'rocket', text: 'Scale-up Index 120' },
  ],
} as const;

/* ---------------------------------------------------------- the four cards */

export const platform = {
  heading: 'Measure, reduce, report.',
  headingTwo: 'All of it on one platform.',
  cards: [
    {
      key: 'ghg',
      icon: 'chart',
      tone: 'mint',
      chipHover: '#bef4cf',
      title: 'GHG inventory & climate strategy',
      body: 'Steer your carbon and generate a decarbonisation plan built for your own operations.',
      chips: ['Footprint', 'Reduction plan', 'Scope 3'],
    },
    {
      key: 'corporate',
      icon: 'doc',
      tone: 'sky',
      chipHover: '#d1e9ff',
      title: 'Corporate reporting',
      body: 'Produce audit-ready reports aligned to every major regulation.',
      chips: ['CSRD', 'VSME', 'TCFD', 'SBTi', 'Assurance'],
    },
    {
      key: 'product',
      icon: 'box',
      tone: 'lilac',
      chipHover: '#e8dffb',
      title: 'Product reporting',
      body: 'Get ISO-conformant life-cycle assessments for 100% of your product range.',
      chips: ['LCA', 'DPP', 'Ecodesign'],
    },
    {
      key: 'supply',
      icon: 'truck',
      tone: 'cream',
      chipHover: '#e8edeb',
      title: 'Value chain',
      body: 'Bring your suppliers onto the same ledger and close the gaps in your scope 3.',
      chips: ['Supplier portal', 'Primary data', 'Engagement'],
    },
  ],
} as const;

/* ------------------------------------------------------------------- stats */

export const stats = {
  /** The second clause is set in the display italic, word by word. */
  heading: 'Turn your climate strategy into',
  headingEm: 'an investment that pays.',
  items: [
    { figure: '−52%', body: 'Cut the cost of running carbon management and compliance' },
    { figure: '−93%', body: 'Cut the number of people pulled onto the reporting process' },
    { figure: '−80%', body: 'Cut the time your team spends on carbon accounting' },
    { figure: '×5', body: 'Multiply what your team gets through, with the AI agents' },
  ],
} as const;

/* ---------------------------------------------------------- the reason grid */

export const reasons = {
  heading: 'Why 4,000 companies choose vane',
  cards: [
    {
      key: 'agents',
      title: 'Five times the throughput, with AI agents',
      body: 'Four agents take the jobs that eat the week. Your team gets five times as far.',
      visual: 'agents',
      tone: 'dark',
    },
    {
      key: 'one',
      title: 'Reporting, product footprints and compliance on one platform',
      body: 'One carbon ledger for every ESG question you are asked.',
      visual: 'suite',
      tone: 'mint',
    },
    {
      key: 'industries',
      title: 'Built for your industry, not for an average of all of them',
      body: 'Emission factors, audit paths and templates per sector, maintained by people who work in it.',
      visual: 'industries',
      tone: 'light',
    },
    {
      key: 'expert',
      title: 'A climate expert on the account, not a ticket queue',
      body: 'Every account has a named analyst. They know your sector and they answer within the day.',
      visual: 'expert',
      tone: 'photo',
    },
  ],
  columns: [
    { label: 'ESG compliance', body: 'CSRD, SFDR and the VSME standard, in one place.' },
    { label: 'Supplier data', body: 'Primary figures from the people who actually have them.' },
    { label: 'Audit trail', body: 'Every number traceable to the document it came from.' },
  ],
} as const;

/* ----------------------------------------------------------- the merger bar */

export const partnerMerger = {
  headingTop: 'vane and Ardentia are joining to become the',
  headingBottom: 'leading carbon platform',
  points: [
    {
      title: 'A complete climate suite',
      body: 'Inventory, reduction, reporting and product footprints under one login.',
    },
    {
      title: 'AI built in, with Copilot',
      body: 'Four agents that do the collection, the mapping and the first draft.',
    },
    {
      title: 'International coverage',
      body: 'Fourteen markets, local factors, one consolidated group view.',
    },
    {
      title: 'Scale, without the headcount',
      body: 'The same team, five times the output, audited the same way.',
    },
  ],
  partnerName: 'Ardentia',
  note: 'vane 3.0 is a new architecture for low-carbon compute, with nothing given up on performance.',
} as const;

/* --------------------------------------------------------------- standards */

export const standards = {
  label: 'Built to the strictest standards in the world',
  /**
   * Public instruments keep their real names; the three marks that would be a
   * *certification claim* are invented and labelled as such in the README.
   */
  badges: [
    { mark: 'SBTi', note: 'Science-based targets' },
    { mark: 'Ledger Standard', note: 'Carbon ledger method', invented: true },
    { mark: 'CSRD', note: 'EU reporting directive' },
    { mark: 'Disclosure Index', note: 'Annual disclosure', invented: true },
    { mark: 'ISO 14067', note: 'Product carbon footprint' },
    { mark: 'TCFD', note: 'Climate-related disclosure' },
    { mark: 'ISO 27001', note: 'Information security' },
    { mark: 'EFRAG Circle', note: 'Standards contributor', invented: true },
    { mark: 'Certified Climate Co.', note: 'Company certification', invented: true },
    { mark: 'DPP', note: 'Digital product passport' },
    { mark: 'SFDR', note: 'Sustainable finance disclosure' },
    { mark: 'GHG Protocol', note: 'Accounting standard' },
  ],
} as const;

/* ------------------------------------------------------------- the agents */

export const agents = {
  headingTop: 'Our sharpest model yet.',
  headingBottom: 'Four AI agents on your side.',
  body: 'vane 3.0 runs on a low-carbon architecture and gives up nothing on performance. Take 93% off the jobs that eat your week and spend it on the ones that move the number.',
  cta: { label: 'Meet Copilot', href: '#copilot' },
  list: [
    {
      name: 'The Architect',
      body: 'Maps your org, your sites and your ledgers into one carbon model, and keeps it current as the business moves.',
    },
    {
      name: 'The Scope 3 Scout',
      body: 'Chases the suppliers, reads what they send back, and tells you which of the gaps are worth closing first.',
    },
    {
      name: 'The Environmental Engineer',
      body: 'Builds the life-cycle assessment for a product from its bill of materials, and shows its working.',
    },
    {
      name: 'The Strategist',
      body: 'Costs every reduction lever you have, in money and in tonnes, and puts them in the order that pays.',
    },
  ],
} as const;

/* ------------------------------------------------------------ recognition */

export const recognition = {
  heading: 'Recognised by leading organisations around the world',
  cards: [
    {
      key: 'reviews',
      mark: 'Softwise',
      title: 'Category leader on Softwise',
      body: 'Trusted by thousands of users, rated 4.8/5, and a Leader badge in five consecutive quarters.',
      tone: 'light',
      visual: 'badges',
    },
    {
      key: 'ranking',
      mark: 'Sustainability Monthly',
      title: 'No.1 carbon management platform in Europe',
      body: 'Ranked by Sustainability Monthly as the leading carbon management solution on the continent.',
      tone: 'dark',
      visual: 'cover',
    },
    {
      key: 'list',
      mark: 'The Index',
      title: 'On the 2026 GreenTech 100',
      body: 'Picked by The Index and Datafold among the most important GreenTech companies in the world in 2026.',
      tone: 'grey',
      visual: 'list',
    },
  ],
} as const;

/* -------------------------------------------------------------- resources */

export const resources = {
  heading: 'More on sustainability',
  mediaName: 'Fathom',
  mediaLabel: 'Media by vane',
  mediaBody:
    'Our podcast episodes and long reads, for when you want the argument rather than the summary.',
  mediaCta: 'Explore Fathom',
  cards: [
    {
      kind: 'CALCULATOR',
      title: 'Work out the return on your climate spend',
      cta: 'Calculate it now',
    },
    {
      kind: 'THE BOOK',
      title: 'The green book of decarbonisation',
      cta: 'Download the book',
    },
    {
      kind: 'GUIDE',
      title: 'Why carbon transparency is your next growth lever',
      cta: 'Download the guide',
    },
  ],
} as const;

/* ------------------------------------------------------- partner programme */

export const partners = {
  heading: 'A partner programme built to grow your practice',
  body: 'With vane Pro, our 300+ partners bill an average of $990K a year.',
  cta: 'Become a partner',
  quote:
    '“We were reselling three tools and reconciling them by hand. Now it is one platform and the margin is ours.”',
  person: { name: 'Bailey Wamp', role: 'Head of sustainability practice, Delverne' },
  logos: ['Delverne', 'Fenbrook', 'Carrowmore', 'Garrick ESG', 'Elsham Partners', 'Brightpath'],
} as const;

/* ------------------------------------------------------------ testimonials */

export const testimonials = {
  heading: 'Sustainability pays when it is properly tooled.',
  featured: {
    company: 'Petherton',
    headline: 'Petherton turned its carbon inventory into a tool its buyers actually use',
    quote:
      '“A carbon inventory for a group like Petherton means hundreds of thousands of lines of data, most of it purchasing. Every tool we tried before either fell over on the volume or gave us a number nobody downstream could do anything with. vane is the first that did neither: it took the whole purchase ledger, mapped it, and handed the category buyers a figure per supplier that they could put in front of that supplier the same week. The first year we used it to find the twenty suppliers that accounted for half the footprint. The second year eleven of them had moved. The inventory stopped being an annual exercise somebody dreaded and started being the thing the buying team opens before a negotiation.”',
    person: { name: 'Imogen Hart', role: 'Group sustainability director, Petherton' },
  },
  cards: [
    {
      company: 'Joslin & Pye',
      stat: '−18%',
      statNote: 'on emissions tied to its menu',
      quote:
        '“vane helped us structure the climate strategy in a way the whole operations team could read. Collecting the data stopped being a project.”',
      person: 'Nadia Olufemi, Operations director',
    },
    {
      company: 'Larkmoor',
      stat: '−24%',
      statNote: 'on its product footprint',
      quote:
        '“We had life-cycle numbers for six products. We now have them for all four hundred, and the design team uses them before the brief is signed off.”',
      person: 'Tom Weir, Head of product',
    },
    {
      company: 'Kemsworth',
      stat: '×3',
      statNote: 'the reporting coverage, same team',
      quote:
        '“The audit went from a six-week scramble to a week of checking. Nobody on the team has had to learn a new job to make that happen.”',
      person: 'Priya Raman, Group financial controller',
    },
    {
      company: 'Mardale Water',
      stat: '−31%',
      statNote: 'on scope 3 within two years',
      quote:
        '“The supplier portal did what three years of spreadsheets could not: it got primary data out of people who had never been asked for it.”',
      person: 'Callum Ross, Procurement lead',
    },
  ],
} as const;

/* ------------------------------------------------------------------ footer */

export const footer = {
  cta: {
    heading: 'Put a number on it, then move it.',
    body: 'Book a demo and we will walk your own data through the platform.',
    primary: 'Book a demo',
    secondary: 'Talk to sales',
  },
  /**
   * Ten short groups rather than five long ones, which is the reference's own
   * shape: a footer that is a site map, laid out in two rows of five.
   */
  columns: [
    { title: 'Carbon management', links: ['Footprint', 'Supplier engagement', 'Reduction plans'] },
    { title: 'Life-cycle assessment', links: ['Emission factors', 'Product footprints'] },
    { title: 'ESG management', links: ['TCFD', 'CSRD', 'SFDR', 'VSME'] },
    { title: 'By industry', links: ['Manufacturing', 'Financial services', 'Retail & FMCG'] },
    { title: 'By size', links: ['Scale-up', 'Mid-market', 'Enterprise'] },
    { title: 'Resources', links: ['Fathom podcast', 'Guides', 'Glossary', 'Help centre'] },
    { title: 'Developers', links: ['API documentation', 'Status', 'Changelog'] },
    { title: 'Company', links: ['About vane', 'Careers', 'Press'] },
    { title: 'Partners', links: ['Partner programme', 'Find a partner'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookie settings'] },
  ],
  address: 'vane Climate Ltd · 14 Pollard Row · London E2 6NB',
  copyright: '© 2026 vane Climate Ltd. All rights reserved.',
  closing:
    'Every tonne on this page was measured by somebody, checked by somebody else, and signed off by a board. That is the only kind of carbon number worth having.',
  social: ['LinkedIn', 'X', 'YouTube'],
} as const;
