/**
 * One content deck. Both designs read it, so the comparison is of design and
 * nothing else (rule 1).
 *
 * The photographs and collage illustrations are the reference's own (rule 0).
 * The words are not: the brand name, the lesson list, the case study, the
 * quotations and the FAQ are invented for **crux**, an app for thinking
 * clearly.
 *
 * Three of the reference's own assets are *not* used, and the content deck is
 * where that shows. Its case-study card names a real company and a real data
 * breach; its lesson card is a screenshot of its own app; and one of its
 * nineteen lesson thumbnails is a pixelated photograph of a named living
 * person. All three are rebuilt here in the DOM with invented subjects, which
 * is why `caseStudy` and `lesson` below are data rather than image imports.
 */

import anchoringBias from '@/assets/img/lessons/anchoringbias.webp';
import astroturfing from '@/assets/img/lessons/astroturfing.webp';
import centralTendency from '@/assets/img/lessons/centraltendency.webp';
import cognitiveDissonance from '@/assets/img/lessons/cognitivedissonance.webp';
import falseAnalogy from '@/assets/img/lessons/falseanalogy.webp';
import gameTheory from '@/assets/img/lessons/gametheory.webp';
import illusionOfObjectivity from '@/assets/img/lessons/illusionofobjectivity.webp';
import interquartileRange from '@/assets/img/lessons/interquartilerange.webp';
import lawOfLargeNumbers from '@/assets/img/lessons/lawoflargenumbers.webp';
import mentalAccounting from '@/assets/img/lessons/mentalaccounting.webp';
import overfitting from '@/assets/img/lessons/overfitting.webp';
import paradoxOfChoice from '@/assets/img/lessons/paradoxofchoice.webp';
import presentBias from '@/assets/img/lessons/presentbias.webp';
import regretAversion from '@/assets/img/lessons/regretaversion.webp';
import scientificMethod from '@/assets/img/lessons/scientificmethod.webp';
import selectionBias from '@/assets/img/lessons/selectionbias.webp';
import simpsonsParadox from '@/assets/img/lessons/simpsonsparadox.webp';
import slipperySlope from '@/assets/img/lessons/slipperyslope.webp';
import statusQuoBias from '@/assets/img/lessons/statusquobias.webp';
import whyCalc from '@/assets/img/why/calc.webp';
import whyFace from '@/assets/img/why/face.webp';
import whyMic from '@/assets/img/why/mic.webp';
import whyPencil from '@/assets/img/why/pencilhand.webp';
import whyScales from '@/assets/img/why/scales.webp';
import whyTape from '@/assets/img/why/tape.webp';
import whyThinker from '@/assets/img/why/thinker.webp';

export const brand = {
  name: 'crux',
  legal: '© Copyright 2026. All rights reserved.',
  cta: 'Try now',
} as const;

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'IN SHORT',
  /*
   * Three lines, because the reference's headline is three lines and the
   * hero is one composition: 128px/140px over a 900px sky, so a two-line
   * version leaves 140px of empty gradient under it and reads as a page that
   * has not finished loading. The words are ours; the shape is the
   * reference's.
   */
  headingLines: ['Think clearly', 'when it', 'matters most'],
} as const;

/* --------------------------------------------------------------------- why */

export const why = {
  eyebrow: 'Why crux?',
  /** Three paragraphs, animated one character at a time on the reference. */
  lines: [
    'As discerning adults, we are expected to think clearly, evaluate sources, resist manipulation, and make good decisions.',
    'Oddly enough, almost nobody is taught how to do any of this systematically, the way we are taught reading or arithmetic.',
    'With crux, that changes.',
  ],
  /**
   * Seven objects scattered across the panel. The positions are the
   * reference's own, read off its DOM dump, as a percentage of the 1408×760
   * panel so they hold at other widths.
   */
  objects: [
    { src: whyScales, alt: 'A pair of scales', x: 4.7, y: 7.6, size: 120 },
    { src: whyThinker, alt: 'A seated thinking figure', x: 78.1, y: 10.3, size: 150 },
    { src: whyMic, alt: 'A microphone', x: 15.6, y: 50.0, size: 135 },
    { src: whyCalc, alt: 'A pocket calculator', x: 11.1, y: 65.0, size: 90 },
    { src: whyFace, alt: 'A shouting face', x: 67.8, y: 78.0, size: 75 },
    { src: whyPencil, alt: 'A hand holding a pencil', x: 34.3, y: 82.5, size: 105 },
    { src: whyTape, alt: 'A reel-to-reel tape machine', x: 83.4, y: 42.2, size: 105 },
  ],
} as const;

/* ---------------------------------------------------------- the four panels */

export const features = [
  {
    key: 'antidote',
    tone: 'sand',
    span: 5,
    heading: 'An antidote to the scroll',
    body: 'crux puts ideas in front of you that make your brain do something, instead of pre-chewed material for passive consumption.',
    art: 'phone-hand',
  },
  {
    key: 'daily',
    tone: 'lilac',
    span: 7,
    heading: 'Skills you will use every single day',
    body: 'Thinking well is not one trick. It is a set of them: spotting a bad argument, reading a statistic honestly, noticing when a price has been anchored, and knowing when your own certainty is the problem.',
    art: 'skills',
  },
  {
    key: 'lessons',
    tone: 'mist',
    span: 7,
    heading: 'Interactive, non-linear lessons',
    body: 'Lessons are built around notable studies and events, and you explore them by following the threads that interest you most rather than a track somebody else set.',
    art: 'lesson',
  },
  {
    key: 'cases',
    tone: 'sage',
    span: 5,
    heading: 'Real-life case studies',
    body: 'Practise the questions on situations that actually happened, and get a straight answer back on the ones you call wrong.',
    art: 'case',
  },
] as const;

/* --------------------------------------------------- the rebuilt app panels */

/**
 * The lesson card the reference illustrates with a screenshot of its own app.
 * Rebuilt here as live markup: the subject is a public experiment, the
 * interface is crux's own, and every word in it is selectable.
 */
export const lesson = {
  title: 'The Milgram experiment',
  body: [
    'In the early 1960s the psychologist Stanley Milgram ran one of the most argued-over experiments in the history of the subject.',
    'It took place at a university. Volunteers were told it was a study about learning and memory.',
    'They believed they had been randomly assigned the role of **teacher**. The other person, who they thought was just another volunteer, was the **learner**.',
  ],
  asides: [
    'What made the teachers obey the instructions?',
    'What kind of people volunteered?',
    'What happened when somebody refused?',
  ],
} as const;

/**
 * The case-study card. The reference's names a real company and a real breach;
 * this one is invented, and says so in the body rather than dressing it as
 * news about a company that exists.
 */
export const caseStudy = {
  masthead: 'THE UNENCRYPTED HERALD',
  body: 'Northvale Genomics stores DNA data for millions of customers. In 2026, attackers reached roughly 6.9 million accounts by reusing passwords leaked from other sites.',
  claims: [
    'This is not a security failure, since nobody broke into Northvale’s own systems.',
    'Northvale is not responsible, because its customers reused their passwords.',
    'What if somebody had refused to hand over the data?',
  ],
  note: 'An invented company, written for the lesson.',
} as const;

/* ---------------------------------------------------- made by humans panel */

export const humans = {
  heading: 'Made by humans, for humans',
  body: 'The internet is full of apps that can magically create reasons for you in seconds. Ours take weeks. We believe there is a certain quality to teaching that only comes from ideas you have sat enough time with. Good lessons are not generated — they are researched, drafted, fact-checked, argued about, abandoned, started again, rewritten, published, and revised.',
} as const;

/* ------------------------------------------------------------ what's inside */

export const inside = {
  eyebrow: 'What is inside',
  heading: 'Everything you need for better reasoning',
  body: 'Take the single lesson that catches your eye, or work through a whole course on one of the core topics.',
  /** Three marquee rows of lesson chips. */
  lessons: [
    { label: 'The Dunning-Kruger effect', art: 'drawn-dk' },
    { label: 'Heuristics', src: paradoxOfChoice },
    { label: 'Illusion of objectivity', src: illusionOfObjectivity },
    { label: 'Anchoring bias', src: anchoringBias },
    { label: 'Cognitive dissonance', src: cognitiveDissonance },
    { label: 'False analogy', src: falseAnalogy },
    { label: 'Slippery slope', src: slipperySlope },
    { label: 'Simpson’s paradox', src: simpsonsParadox },
    { label: 'Selection bias', src: selectionBias },
    { label: 'Scientific method', src: scientificMethod },
    { label: 'Interquartile range', src: interquartileRange },
    { label: 'Overfitting', src: overfitting },
    { label: 'Regret aversion', src: regretAversion },
    { label: 'Game theory', src: gameTheory },
    { label: 'Astroturfing', src: astroturfing },
    { label: 'Status quo bias', src: statusQuoBias },
    { label: 'Present bias', src: presentBias },
    { label: 'Mental accounting', src: mentalAccounting },
    { label: 'Central tendency', src: centralTendency },
    { label: 'Law of large numbers', src: lawOfLargeNumbers },
  ],
  /** The reference ships this as a raster. Here it is real, selectable chips. */
  topics: [
    'Data analysis',
    'Argument evaluation',
    'Problem solving',
    'Media literacy',
    'Decision making',
    'Logical reasoning',
    'Financial literacy',
    'Fact-checking',
  ],
} as const;

/* ------------------------------------------------------------- the download */

export const download = {
  heading: 'Download crux',
  store: { kicker: 'Download on the', name: 'App Store' },
} as const;

export const misinformation = {
  eyebrow: 'YES, YOU',
  heading: 'Protect yourself from misinformation',
  body: 'Learn to recognise manipulation, and spot it before it has done its work.',
  cta: 'I did my own research',
} as const;

/* ----------------------------------------------------------- the community */

export const community = {
  eyebrow: 'Love from the community',
  heading: 'What learners are saying',
  quotes: [
    {
      text: '“I never write reviews but I loved this. Three lessons in and I am very engaged.”',
      who: 'MARIEL',
    },
    {
      text: '“Really thoughtful and well presented content. Easy to learn important concepts on the go when you have a few minutes of down time.”',
      who: 'PETER',
    },
    {
      text: '“Essential app for thinking logically and critically.”',
      who: 'LUKE',
    },
    {
      text: '“This is weirdly satisfying. It makes me feel like I am finally not wasting my time and doing something useful.”',
      who: 'SAM',
    },
  ],
} as const;

/* ------------------------------------------------------------------ the faq */

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Frequently asked questions',
  items: [
    {
      q: 'Who is crux for?',
      a: 'crux is for professionals, students, lifelong learners, and anybody who wants to think more clearly and protect themselves from disinformation and manipulation. If you are tired of clickbait headlines, rage-bait arguments and questionable studies shared on social media, this app is for you, and so is the free tier.',
    },
    {
      q: 'What can I learn on crux?',
      a: 'crux teaches critical thinking, logical reasoning, data literacy and media literacy through research-backed, non-linear lessons written by human experts. You can take a single lesson on the bus, or work through an entire course over a month, and nothing is locked until you have finished the thing before it. The library grows every week, the fundamentals course is free for as long as you want it, and no lesson assumes you have read any particular lesson before it.',
    },
    {
      q: 'What are non-linear lessons?',
      a: 'A lesson is a set of connected ideas rather than a track. You start where the subject is, and you follow whichever thread you are curious about — the method, the objections, the aftermath. Nothing is locked behind anything else, and you can leave in the middle and come back to the same place a week later.',
    },
    {
      q: 'Is the content AI-generated?',
      a: 'No. Every lesson is researched, written and fact-checked by people, and each one carries the name of whoever wrote it and the sources it stands on.',
    },
    {
      q: 'How is crux different from other learning apps?',
      a: 'Most learning apps teach you facts. crux teaches you what to do with them: how an argument is put together, where a statistic can mislead you, and how to tell the difference between being persuaded and being manipulated. The facts are the material; the method is the subject. That difference shows up everywhere else, too. There is no streak to protect, no daily target and no leaderboard, because none of those things make anybody a better thinker — they only make an app harder to leave. Every lesson names its author and lists its sources, so you can go and check whether we have been fair to them.',
    },
    {
      q: 'How much does crux cost?',
      a: 'A free account gives you one lesson a day and the whole of the fundamentals course. Full access is £4.99 a month or £39 a year, and a single payment of £129 buys it outright, with every lesson we publish after that included.',
    },
    {
      q: 'Do you offer free trials?',
      a: 'Yes — seven days, everything unlocked, and no card needed to start it.',
    },
    {
      q: 'How do I get a refund?',
      a: 'Subscriptions bought through the App Store are refunded by Apple rather than by us, which is Apple’s rule and not our preference; write to us at hello@crux.app and we will either walk you through the form or, if it is easier, raise the request on your behalf and tell you when it has gone through. Anything bought directly from us, we refund ourselves, within thirty days of the payment, no reason needed and no exit survey to sit through on the way out.',
    },
  ],
} as const;

/* --------------------------------------------------------------- the footer */

export const footer = {
  columns: [
    { title: 'Company', links: ['iOS app', 'Press'] },
    { title: 'Resources', links: ['About', 'Lessons', 'FAQ'] },
    { title: 'Support', links: ['Terms of service', 'Privacy policy', 'Contact us'] },
  ],
  social: ['Instagram', 'Threads', 'LinkedIn'],
} as const;
