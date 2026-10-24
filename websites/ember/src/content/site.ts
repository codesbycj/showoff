import benefitFemale from '@/assets/img/benefit-female.webp';
import benefitLongevity from '@/assets/img/benefit-longevity.webp';
import benefitResilience from '@/assets/img/benefit-resilience.webp';
import benefitSkin from '@/assets/img/benefit-skin.webp';
import benefitSleep from '@/assets/img/benefit-sleep.webp';
import cardGlasses from '@/assets/img/card-glasses.webp';
import cardMan from '@/assets/img/card-man.webp';
import cardWoman from '@/assets/img/card-woman.webp';
import ctaBg from '@/assets/img/cta-bg.webp';
import heroGradient from '@/assets/img/hero-gradient.avif';
import hero from '@/assets/img/hero.webp';
import productPanel from '@/assets/img/product-panel.webp';
import productRender from '@/assets/img/product-render.webp';

import voiceCarleigh from '@/assets/img/voice-carleigh.webp';
import voiceCarrie from '@/assets/img/voice-carrie.webp';
import voiceDimitri from '@/assets/img/voice-dimitri.webp';
import voiceJenna from '@/assets/img/voice-jenna.webp';
import voiceLindsay from '@/assets/img/voice-lindsay.webp';
import voiceMarco from '@/assets/img/voice-marco.webp';
import voiceMel from '@/assets/img/voice-mel.webp';
import voiceRolf from '@/assets/img/voice-rolf.webp';
import voiceSam from '@/assets/img/voice-sam.webp';
import voiceTalea from '@/assets/img/voice-talea.webp';

/**
 * One content deck, read by both designs.
 *
 * The point of the episode is to compare two designs of the same thing, so the
 * words and the photographs may not differ between them. Anything a design is
 * allowed to decide for itself — order, emphasis, what it leaves out — stays in
 * that design's components; everything that is *content* lives here.
 *
 * Ember is invented. The business, the product names and every line of copy are
 * mine; the photographs are not, and `src/assets/img/CREDITS.md` says so.
 */

export const BRAND = {
  name: 'ember health',
  tagline: 'Red light therapy, made for every day',
  /** The strip above the nav. */
  banner: 'Small steps, lasting benefits. Invest in your wellbeing one day at a time.',
  bannerCta: 'See all panels',
};

export const NAV = [
  { label: 'Technology', href: '#technology' },
  { label: 'Company', href: '#company' },
  { label: 'Commercial', href: '#commercial' },
  { label: 'Journal', href: '#journal' },
];

export const HERO = {
  title: 'Your cells, switched on',
  sub: 'Red light therapy: science-backed, non-invasive, and built for safe use every day.',
  image: hero,
  gradient: heroGradient,
  alt: 'A woman resting with her eyes closed under warm red light',
};

export const STATEMENT = {
  lead: 'By 2050, what you own will not impress anybody.',
  rest: 'Your VO₂ max, your rate of ageing, your HRV and your body fat will.',
};

export const CARDS = {
  eyebrow: 'Applications',
  title: 'Start building your tomorrow',
  cta: 'All panels',
  items: [
    {
      image: cardMan,
      caption: 'Recovery that keeps up with how hard you train',
      category: 'Wellbeing',
      /** The two stops of the category's sphere, and of the fill it grows into. */
      tint: ['#ffd0a0', '#ff8958'],
      alt: 'A man in a pale shirt',
    },
    {
      image: cardWoman,
      caption: 'For female wellness through every stage of life',
      category: "Women's health",
      tint: ['#ffd2f2', '#ff6e8f'],
      alt: 'A woman smiling',
    },
    {
      image: cardGlasses,
      caption: 'Fuel your cells for a supercharged life',
      category: 'Longevity',
      tint: ['#ff8958', '#ff443a'],
      alt: 'A woman in purple glasses',
    },
  ],
};

export const PRODUCT = {
  titleLead: 'Meet Core Series 3,',
  titleRest:
    ' the intelligent light panel built for precision, performance and post-session recovery.',
  /** The red mesh the panel is shown against. */
  image: productPanel,
  /** The panel itself, cut out. */
  render: productRender,
  alt: 'The Core Series 3 light panel, seen at an angle',
};

/**
 * The range, with prices.
 *
 * The modern page shows one panel and no price at all — it sells the idea and
 * leaves the number to the shop. The 2012 page tabulates all three with an RRP,
 * a sale price and an availability column, because a price list *was* the
 * product page. Both designs read this one list; what each does with it is its
 * own decision.
 */
export const PANELS = [
  {
    name: 'Core Series 3 (panel only)',
    code: 'EH-CS3',
    output: '300W',
    rrp: '£749.00',
    price: '£649.00',
    stock: 'In stock',
  },
  {
    name: 'Core Series 3 + floor stand',
    code: 'EH-CS3-FS',
    output: '300W',
    rrp: '£899.00',
    price: '£799.00',
    stock: 'In stock',
  },
  {
    name: 'Ember Mini (travel panel)',
    code: 'EH-MIN',
    output: '80W',
    rrp: '£249.00',
    price: '£199.00',
    stock: 'Low stock',
  },
];

/**
 * The five benefit blocks.
 *
 * Each one carries a photograph, two levels of copy, a row of tiles, and a
 * readout plate laid over the photograph. The plate is the interesting part and
 * it is a different instrument in every row, which is why these are not one
 * uniform shape: `stats` is a row of figures that count up, `bars` a pair of
 * meters, `grow` a square that opens out with labels around it, `arc` a drawn
 * dial with a figure inside it.
 *
 * The short strings -- `code`, `value`, `around` -- are set in 8px uppercase
 * IBM Plex Mono on the plate, so they have to stay short enough for a 53px
 * column. That is a content constraint rather than a styling one, which is why
 * they live here.
 */
export const BENEFITS = {
  eyebrow: 'Benefits',
  title: 'Feel the difference in every aspect',
  items: [
    {
      id: 'sleep',
      title: 'Deeper, quieter sleep',
      body: 'Ember brings focused red and near-infrared light into your evening routine.',
      copy: 'Used in the evening, it supports the wind-down that makes the difference between sleeping and resting.',
      image: benefitSleep,
      alt: 'A person asleep, lit softly',
      plate: { head: 'sleep onset: improving', layout: 'figures' as const },
      stats: [
        { id: 'sleep-1', code: 'sol', to: 0.65, suffix: '' },
        { id: 'sleep-2', code: 'waso', to: 0.55, suffix: '' },
        { id: 'sleep-3', code: 'rem', to: 2.3, suffix: '' },
      ],
      tiles: ['Easier wind-down', 'Calmer mornings', 'More restful nights'],
    },
    {
      id: 'female',
      title: 'Female wellness',
      body: 'Ember brings focused red and near-infrared light into your everyday routine.',
      copy: 'Flexible use on external areas such as the lower abdomen, designed for women across different life stages.',
      image: benefitFemale,
      alt: 'A woman holding her baby by a window',
      bars: [
        { id: 'female-1', label: 'Session consistency', value: 'Optimal' },
        { id: 'female-2', label: 'Comfort rating', value: 'High' },
      ],
      tiles: ['Mindful self-care', 'Wellness across life stages'],
    },
    {
      id: 'skin',
      title: 'Radiant skin',
      body: 'Ember brings focused red and near-infrared light to your skin, season after season.',
      copy: 'The results it feeds: glowing and clear skin, allowing you to look as young as you feel in your heart.',
      image: benefitSkin,
      alt: 'A close portrait lit in warm red light',
      /** The square opens from nothing to 5rem; the four labels sit around it. */
      grow: { around: ['epidermis', 'collagen', 'dermis', '660 nm'] as const },
      tiles: [
        'Accelerated cellular repair',
        'Comfortable, non-invasive sessions',
        "Supports your skin's natural glow",
      ],
    },
    {
      id: 'longevity',
      title: 'Longevity, measured',
      body: 'Cellular energy supports how you feel and function over time.',
      copy: 'Making it a central part of a longevity-focused lifestyle rather than a treatment you remember to book.',
      image: benefitLongevity,
      alt: 'A person stretching in bright daylight',
      plate: { layout: 'pairs' as const },
      stats: [
        { id: 'long-1', code: 'chronological', to: 49, suffix: 'yrs' },
        { id: 'long-2', code: 'biological', to: 52, suffix: 'yrs' },
      ],
      tiles: [
        'Improved cellular energy production',
        'Enhanced mitochondrial function',
        'Supports healthy ageing',
      ],
    },
    {
      id: 'resilience',
      title: 'Built for everyday resilience',
      body: 'HRV and oxidative stress are widely studied in relation to recovery, healthy ageing and physical performance.',
      copy: 'Ember makes red and near-infrared light easy to integrate into a consistent everyday wellness routine.',
      image: benefitResilience,
      alt: 'A man in a blue t-shirt, arms folded',
      plate: { head: 'recovery readiness', layout: 'dial' as const },
      arc: { id: 'res-1', to: 152, unit: 'ms rmssd' },
      tiles: ['Recovery-focused routine', 'Everyday performance'],
    },
  ],
};

export const VOICES = {
  eyebrow: 'Testimonials',
  title: 'Helping people feel better, daily',
  items: [
    {
      name: 'Talea',
      handle: '@taleajosephine',
      photo: voiceTalea,
      quote: 'Just 5–10 minutes of red light therapy can do wonders for your skin.',
      note: 'Wanted to improve her skin’s complexion',
    },
    {
      name: 'Lindsay',
      handle: '@lindsaysfitness',
      photo: voiceLindsay,
      quote:
        'I have been using my Ember panel for six weeks and my recovery between sessions is noticeably quicker.',
      note: 'Looking for a faster turnaround between training days',
    },
    {
      name: 'Marco',
      handle: '@minimalistbiohacker',
      photo: voiceMarco,
      quote: 'It is the one piece of kit in my flat that I actually use every single day.',
      note: 'Wanted one habit that did not need a schedule',
    },
    {
      name: 'Carrie',
      handle: '@nurturedhealing',
      photo: voiceCarrie,
      quote:
        'Ten minutes in the evening has become the part of the day my whole household protects.',
      note: 'Building an evening wind-down that sticks',
    },
    {
      name: 'Dimitri',
      handle: '@dimitribergados',
      photo: voiceDimitri,
      quote:
        'I stopped thinking about it as a device and started thinking about it as part of training.',
      note: 'Training five days a week',
    },
    {
      name: 'Mel',
      handle: '@mrslifeofmel',
      photo: voiceMel,
      quote: 'My skin looks like it did a decade ago and I have changed nothing else.',
      note: 'Wanted visible results without a clinic',
    },
    {
      name: 'Rolf',
      handle: '@peakwolf',
      photo: voiceRolf,
      quote: 'The numbers moved before I felt anything, which is exactly what I wanted.',
      note: 'Tracks HRV and sleep daily',
    },
    {
      name: 'Jenna',
      handle: '@jennamcinnes',
      photo: voiceJenna,
      quote: 'Easy to use, easy to keep up, and that is the whole battle.',
      note: 'Had tried and abandoned three routines',
    },
    {
      name: 'Sam',
      handle: '@inspiredwolrd',
      photo: voiceSam,
      quote: 'I use it while I read. It costs me nothing in time.',
      note: 'No room in the day for anything new',
    },
    {
      name: 'Carleigh',
      handle: '@bayarebrainspa',
      photo: voiceCarleigh,
      quote: 'Clients ask what we changed. This is what we changed.',
      note: 'Runs a recovery studio',
    },
  ],
};

export const EXPLORE = {
  title:
    'Learn how Ember light powers your health. Innovative, science-backed technology created to fuel cellular energy and longevity.',
  cta: 'Explore',
  image: ctaBg,
};

/**
 * The heading beside the questions is one sentence in three pieces, and the
 * emphasis runs opposite to the obvious: the sentence is set at 30% black and
 * only the offer inside it is at full strength. The reader's eye lands on
 * "a free 20-minute call" and picks up the sentence around it afterwards.
 */
export const FAQ = {
  lead: 'We believe in meaningful conversations. To answer yours, we offer',
  highlight: 'a free 20-minute call',
  tail: 'with someone who uses one.',
  cta: 'Book a free call',
  items: [
    {
      q: 'What is the difference between red and NIR light?',
      a: 'Red light is visible and is absorbed close to the surface, which is why it is associated with skin. Near-infrared is invisible and travels further, which is why it is associated with muscle and joint recovery. Every Ember panel emits both, in a fixed ratio, so a single session covers the two.',
    },
    {
      q: 'Is red light an alternative to sunlight?',
      a: 'No, and we would not claim it is. Sunlight carries the full spectrum, including the ultraviolet that red light therapy deliberately leaves out. Ember is a supplement to daylight, not a replacement for a walk outside.',
    },
    {
      q: 'When can I see or measure effects?',
      a: 'Most people report a change in sleep quality inside two weeks, and skin changes between six and twelve weeks. If you track HRV or resting heart rate, those are the numbers most likely to move first, which is why we suggest noting them before you start.',
    },
    {
      q: 'Why do the LEDs look switched off in NIR mode?',
      a: 'Because they are working as intended. Near-infrared sits outside the range the eye can see, so a panel running NIR alone looks dark apart from a faint glow. The panel will tell you it is running; your eyes will not.',
    },
    {
      q: 'How often should I use it?',
      a: 'Ten minutes a day, at a distance of about 30cm, is the routine we build every panel around. More is not better: consistency is what the research rewards, and a routine you keep for a year beats an hour you do twice.',
    },
  ],
};

export const FOOTER = {
  /**
   * Two link columns. The second is set at 50% in the reference, which is a
   * real piece of information architecture rather than a style: the first
   * column is where to go next, the second is what you are owed. Dimming the
   * legal half is how the footer stays navigable at a glance.
   */
  columns: [
    { links: ['Technology', 'Company', 'Shop', 'Commercial', 'Journal', 'Contact'] },
    {
      links: [
        'Shipping & Delivery',
        'Privacy Policy',
        'Revocation',
        'Terms & Conditions',
        'Imprint',
        'Cookies',
        'Press kit',
      ],
    },
  ],
  /** Three reassurances with an icon each, under the social tiles. */
  badges: [
    'Free UK delivery on orders over £50',
    'Two-year warranty on every panel',
    'Designed in Manchester, built in Germany',
  ],
  legal:
    'Ember panels are wellness devices. They are not intended to diagnose, treat, cure or prevent any disease. Ember is an invented brand built for a design study; nothing here is a medical claim, a real product or a real offer.',
};
