/**
 * One content deck. Both designs read it, so the comparison is of design and
 * nothing else (rule 1).
 *
 * The photographs are the reference's own (rule 0 and rule 10). The words are
 * not: every name, headline, price, room, service and legal line below is
 * invented for **quay.**, a student house on Bristol's harbourside, so that
 * nothing here can be mistaken for the real company's live site.
 */

/* ------------------------------------------------------------------ photos */

import applyBanner from '@/assets/img/apply/banner.webp';
import applyStudent from '@/assets/img/apply/student.webp';
import extraBikes from '@/assets/img/extras/bikes.webp';
import extraCleaning from '@/assets/img/extras/cleaning.webp';
import extraEnglish1 from '@/assets/img/extras/english-1.webp';
import extraEnglish2 from '@/assets/img/extras/english-2.webp';
import extraSigning from '@/assets/img/extras/signing.webp';
import extraWeekend from '@/assets/img/extras/weekend.webp';
import heroBuilding from '@/assets/img/hero/building.webp';
import heroClip1 from '@/assets/img/hero/clip-1.mp4';
import heroClip2 from '@/assets/img/hero/clip-2.mp4';
import heroPoster1 from '@/assets/img/hero/poster-1.webp';
import heroPoster2 from '@/assets/img/hero/poster-2.webp';
import heroRoom from '@/assets/img/hero/room.webp';
import locationMap from '@/assets/img/location/map.webp';
import locationStreet from '@/assets/img/location/street.webp';
import doubleA1 from '@/assets/img/rooms/double-a-1.webp';
import doubleA2 from '@/assets/img/rooms/double-a-2.webp';
import doubleA3 from '@/assets/img/rooms/double-a-3.webp';
import doubleB1 from '@/assets/img/rooms/double-b-1.webp';
import doubleB2 from '@/assets/img/rooms/double-b-2.webp';
import doubleB3 from '@/assets/img/rooms/double-b-3.webp';
import doubleC1 from '@/assets/img/rooms/double-c-1.webp';
import doubleC2 from '@/assets/img/rooms/double-c-2.webp';
import doubleC3 from '@/assets/img/rooms/double-c-3.webp';
import planDoubleTop from '@/assets/img/rooms/plan-double-top.webp';
import planDouble from '@/assets/img/rooms/plan-double.webp';
import planSingleTop from '@/assets/img/rooms/plan-single-top.webp';
import planSingle from '@/assets/img/rooms/plan-single.webp';
import planStepFree from '@/assets/img/rooms/plan-step-free.webp';
import planTwin from '@/assets/img/rooms/plan-twin.webp';
import single1 from '@/assets/img/rooms/single-1.webp';
import single2 from '@/assets/img/rooms/single-2.webp';
import single3 from '@/assets/img/rooms/single-3.webp';
import single4 from '@/assets/img/rooms/single-4.webp';
import single5 from '@/assets/img/rooms/single-5.webp';
import single6 from '@/assets/img/rooms/single-6.webp';
import singleTop1 from '@/assets/img/rooms/single-top-1.webp';
import singleTop2 from '@/assets/img/rooms/single-top-2.webp';
import singleTop3 from '@/assets/img/rooms/single-top-3.webp';
import stepFree1 from '@/assets/img/rooms/step-free-1.webp';
import stepFree2 from '@/assets/img/rooms/step-free-2.webp';
import stepFree3 from '@/assets/img/rooms/step-free-3.webp';
import stepFree4 from '@/assets/img/rooms/step-free-4.webp';
import twinA1 from '@/assets/img/rooms/twin-a-1.webp';
import twinA2 from '@/assets/img/rooms/twin-a-2.webp';
import twinB1 from '@/assets/img/rooms/twin-b-1.webp';
import twinB2 from '@/assets/img/rooms/twin-b-2.webp';
import servicesTheirs from '@/assets/img/services/theirs.webp';
import servicesYours from '@/assets/img/services/yours.webp';
import sharedBikes1 from '@/assets/img/shared/bikes-1.webp';
import sharedCalm1 from '@/assets/img/shared/calm-1.webp';
import sharedCalm2 from '@/assets/img/shared/calm-2.webp';
import sharedCalm3 from '@/assets/img/shared/calm-3.webp';
import sharedCalm4 from '@/assets/img/shared/calm-4.webp';
import sharedGarden1 from '@/assets/img/shared/garden-1.webp';
import sharedGarden2 from '@/assets/img/shared/garden-2.webp';
import sharedKitchen1 from '@/assets/img/shared/kitchen-1.webp';
import sharedKitchen2 from '@/assets/img/shared/kitchen-2.webp';
import sharedKitchen3 from '@/assets/img/shared/kitchen-3.webp';
import sharedLaundry1 from '@/assets/img/shared/laundry-1.webp';
import sharedLounge1 from '@/assets/img/shared/lounge-1.webp';
import sharedLounge2 from '@/assets/img/shared/lounge-2.webp';
import sharedLounge3 from '@/assets/img/shared/lounge-3.webp';
import sharedLounge4 from '@/assets/img/shared/lounge-4.webp';
import marquee1 from '@/assets/img/shared/marquee-1.webp';
import marquee2 from '@/assets/img/shared/marquee-2.webp';
import sharedStudy1 from '@/assets/img/shared/study-1.webp';
import sharedStudy2 from '@/assets/img/shared/study-2.webp';
import sloganOne from '@/assets/img/slogan/one.webp';
import sloganTwo from '@/assets/img/slogan/two.webp';
import tilesCity1 from '@/assets/img/tiles/city-1.webp';
import tilesCity2 from '@/assets/img/tiles/city-2.webp';
import tilesCity3 from '@/assets/img/tiles/city-3.webp';
import tilesCity4 from '@/assets/img/tiles/city-4.webp';
import tilesCommunity1 from '@/assets/img/tiles/community-1.webp';
import tilesHome1 from '@/assets/img/tiles/home-1.webp';
import tilesHome2 from '@/assets/img/tiles/home-2.webp';
import tilesHome3 from '@/assets/img/tiles/home-3.webp';
import tilesHome4 from '@/assets/img/tiles/home-4.webp';
import tilesStudy1 from '@/assets/img/tiles/study-1.webp';
import tilesStudy2 from '@/assets/img/tiles/study-2.webp';
import tilesStudy3 from '@/assets/img/tiles/study-3.webp';

/* ------------------------------------------------------------------- brand */

export const brand = {
  name: 'quay.',
  plain: 'quay',
  operator: 'Moorside Group',
  street: '1 Brandon Yard',
  postcode: 'BS1 6QG, Bristol',
  email: 'home@quay.co.uk',
  phone: '0117 496 0188',
  city: 'Bristol',
  year: '26-27',
  /** The line the room copy ends on, the way the reference ends on its own. */
  promise: 'quay. really means all included.',
  legal: '© 2026 All rights reserved.',
} as const;

export const announcement = {
  text: 'STILL DECIDING? ONLY 2 SINGLE STUDIOS LEFT FOR THE SPRING TERM 2026/2027!',
} as const;

export const nav = {
  primary: [
    { label: 'Accommodation', href: '#rooms' },
    { label: 'Infopoint', href: '#infopoint' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact us', href: '#contact' },
  ],
  language: 'ES',
  cta: 'Apply now',
  social: [
    { label: 'Instagram', href: '#instagram' },
    { label: 'Facebook', href: '#facebook' },
  ],
} as const;

/* -------------------------------------------------------------------- hero */

export const hero = {
  lead: 'Drop anchor! It’s quay.:',
  /** Typed one after another, forever. The reference types five of its own. */
  words: ['Friends', 'Late nights', 'Study rooms', 'Harbour swims', 'Firsts'],
  description:
    'You can now secure your student studio on the Bristol harbourside for the 26-27 year! Get in quick — we’re filling up fast. Only 2 single studios left.',
  photo: heroBuilding,
  photoAlt: 'Two residents lying on a rug, laughing',
  room: heroRoom,
  roomAlt: 'Three residents outside together in the sun',
  /*
   * Both clips are HEVC in an MP4, which is what the reference serves -- and
   * which Chrome on Windows will not decode. The reference's answer is a
   * poster a clip, so the procession shows a photograph rather than a hole
   * wherever the codec is missing; both posters here are its own.
   */
  clips: [
    { src: heroClip1, poster: heroPoster1 },
    { src: heroClip2, poster: heroPoster2 },
  ],
} as const;

export const subnav = [
  { label: 'Welcome Home', href: '#welcome' },
  { label: 'Rooms & Prices', href: '#rooms' },
  { label: 'Shared spaces', href: '#shared' },
  { label: 'Services', href: '#services' },
  { label: 'Location', href: '#location' },
  { label: 'Extras', href: '#extras' },
] as const;

/* ------------------------------------------------------------------ slogan */

/**
 * Five lines, laid across the page at five different indents. The `wonk` index
 * is the letter the reference sets in its display face's alternate — one
 * letter a line, which is the whole joke of a face called *Labil*.
 */
export const slogan = {
  lines: [
    { text: 'New Home', wonk: -1 },
    { text: 'of Students', wonk: 9 },
    { text: 'in Bristol', wonk: -1 },
    { text: 'Get it all', wonk: 9 },
    { text: 'on one quay', wonk: 7 },
  ],
  photos: [
    { src: sloganOne, alt: 'A resident stretched out on her bed with her phone' },
    { src: sloganTwo, alt: 'A harbour crane over the water' },
  ],
} as const;

/* ------------------------------------------------------------------- tiles */

export const tiles = {
  label: 'Welcome Home',
  heading: 'Get a taste of life at quay.',
  items: [
    {
      key: 'community',
      title: 'quay. Community',
      body: 'Shared dinners, late-night board games, film nights or a quiet group study session — there’s space for all of it. With fewer residents than a university hall, it’s easy to make the kind of friends who go beyond small talk.',
      photos: [{ src: tilesCommunity1, alt: 'Three residents walking back with their folders' }],
    },
    {
      key: 'home',
      title: 'quay. Home',
      body: 'A warm building with a walled garden, a studio set up the way you need it, and every service you want within reach of the stairs. With windows over the water, old trees along the yard and a safe, well-lit street outside, it is an easy place to feel at home.',
      photos: [
        { src: tilesHome1, alt: 'The house from the lawn' },
        { src: tilesHome2, alt: 'The bike store entrance' },
        { src: tilesHome3, alt: 'A painted corridor with the post boxes' },
        { src: tilesHome4, alt: 'The house across the field' },
      ],
    },
    {
      key: 'study',
      title: 'quay. Study',
      body: 'With the University of Bristol and UWE’s Frenchay bus a few minutes away, quay. makes the term easier. Quiet study rooms, fast wi-fi and a mix of courses make a building where the learning carries on after the lecture.',
      photos: [
        { src: tilesStudy1, alt: 'A resident working at a library table' },
        { src: tilesStudy2, alt: 'A brick hall across the water' },
        { src: tilesStudy3, alt: 'Parkland and rooftops from the air' },
      ],
    },
    {
      key: 'city',
      title: 'quay. Bristol',
      body: 'The city mixes a working harbour with a stubborn creative streak. Whether you are here for the galleries, the nights out, or an hour sitting on the dock wall doing nothing, Bristol has it.',
      photos: [
        { src: tilesCity1, alt: 'Brick terraces above the water, from the air' },
        { src: tilesCity2, alt: 'Shipyard cranes in the morning mist' },
        { src: tilesCity3, alt: 'The sea at sunset' },
        { src: tilesCity4, alt: 'The old quays from the air' },
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------- rooms */

const FURNISHING =
  'The bed has storage built into it, a reading lamp, and a shelf for your own books and photographs. There is a proper desk under the window, a wardrobe and a run of bookshelves, your own bathroom, and a kitchenette with a fridge, a sink and a hob. The windows are tall enough to fill the room with light all afternoon and to give you something to look at while you are in it.';

const BRING_NOTHING =
  'You won’t need to think about pans, plates, cutlery, bedding, towels or even a broom – all of it is already waiting for you.';

const INCLUDED =
  'Rent is all-inclusive and covers every bill and service: fast wi-fi, a monthly room clean, someone on the desk 24/7, full maintenance cover, and unlimited use of every shared space in the building.';

const SINGLE_FEATURES = [
  { icon: 'window', text: 'Tall window over the yard' },
  { icon: 'size', text: 'Room size: 12.4m²', sup: '2' },
  { icon: 'bathroom', text: 'Private bathroom' },
  { icon: 'kitchenette', text: 'Kitchenette' },
  { icon: 'wifi', text: 'Fast wi-fi & wired internet' },
  { icon: 'furnished', text: 'Fully furnished' },
  { icon: 'towels', text: 'Bedding and towels provided' },
  { icon: 'kitchen', text: 'Kitchen essentials' },
  { icon: 'bed', text: 'Everything included in the price' },
] as const;

const DOUBLE_FEATURES = [
  { icon: 'window', text: 'Tall window over the water' },
  { icon: 'size', text: 'Room size: 18.6m²', sup: '2' },
  { icon: 'bathroom', text: 'Private bathroom' },
  { icon: 'kitchenette', text: 'Kitchenette' },
  { icon: 'wifi', text: 'Fast wi-fi & wired internet' },
  { icon: 'furnished', text: 'Fully furnished' },
  { icon: 'bed', text: 'Double bed' },
  { icon: 'towels', text: 'Bedding and towels provided' },
  { icon: 'kitchen', text: 'Kitchen essentials' },
] as const;

const TWIN_FEATURES = [
  { icon: 'window', text: 'Tall window over the yard' },
  { icon: 'size', text: 'Room size: 17.8m²', sup: '2' },
  { icon: 'bathroom', text: 'Private bathroom' },
  { icon: 'kitchenette', text: 'Kitchenette' },
  { icon: 'wifi', text: 'Fast wi-fi & wired internet' },
  { icon: 'furnished', text: 'Fully furnished' },
  { icon: 'towels', text: 'Bedding and towels provided' },
  { icon: 'kitchen', text: 'Kitchen essentials' },
] as const;

const STEP_FREE_FEATURES = [
  { icon: 'window', text: 'Two tall windows over the yard' },
  { icon: 'size', text: 'Room size: 16.5m²', sup: '2' },
  { icon: 'bathroom', text: 'Private step-free bathroom' },
  { icon: 'kitchenette', text: 'Kitchenette at seated height' },
  { icon: 'parking', text: 'Parking space included' },
  { icon: 'wifi', text: 'Fast wi-fi & wired internet' },
  { icon: 'furnished', text: 'Fully furnished' },
  { icon: 'towels', text: 'Bedding and towels provided' },
  { icon: 'kitchen', text: 'Kitchen essentials' },
] as const;

export const rooms = {
  label: 'Rooms & Prices',
  heading: 'Find your space',
  readMore: 'Read more',
  readLess: 'Read less',
  loadMore: 'Load more',
  loadLess: 'Show fewer',
  apply: 'Apply now',
  plan: 'View the floor plan',
  types: [
    {
      key: 'single',
      title: 'Single',
      price: 'from £949/month',
      variants: [
        {
          floor: '1st floor',
          lead: 'A studio built for one, with the yard outside the window and a door you can shut.',
          price: '£949/month all-in',
          photos: [
            { src: single1, alt: 'A quay. single studio from the door' },
            { src: single2, alt: 'The desk under the window' },
            { src: single3, alt: 'The bed with its storage drawers open' },
            { src: single4, alt: 'The kitchenette' },
            { src: single5, alt: 'The wardrobe wall' },
            { src: single6, alt: 'The private bathroom' },
          ],
          features: SINGLE_FEATURES,
          plan: planSingle,
        },
        {
          floor: '2nd floor',
          lead: 'A studio built for one, a floor further up and a little quieter for it.',
          price: '£989/month all-in',
          photos: [
            { src: single2, alt: 'The desk under the window' },
            { src: single1, alt: 'A quay. single studio from the door' },
            { src: single3, alt: 'The bed with its storage drawers open' },
            { src: single4, alt: 'The kitchenette' },
            { src: single5, alt: 'The wardrobe wall' },
            { src: single6, alt: 'The private bathroom' },
          ],
          features: SINGLE_FEATURES,
          plan: planSingle,
        },
        {
          floor: '3rd floor',
          lead: 'Green outside and quiet within — this studio is laid out for one person’s whole day.',
          price: '£1,029/month all-in',
          photos: [
            { src: single3, alt: 'The bed with its storage drawers open' },
            { src: single1, alt: 'A quay. single studio from the door' },
            { src: single2, alt: 'The desk under the window' },
            { src: single4, alt: 'The kitchenette' },
            { src: single5, alt: 'The wardrobe wall' },
            { src: single6, alt: 'The private bathroom' },
          ],
          features: SINGLE_FEATURES,
          plan: planSingle,
        },
        {
          floor: '4th floor',
          lead: 'A bright escape in the rooftops. Up in the eaves, with two windows and the whole harbour in them.',
          price: '£1,139/month all-in',
          photos: [
            { src: singleTop1, alt: 'The top-floor studio in the afternoon' },
            { src: singleTop2, alt: 'The eaves window over the harbour' },
            { src: singleTop3, alt: 'The desk in the top-floor studio' },
          ],
          features: [
            { icon: 'window', text: 'Two tall windows over the harbour' },
            { icon: 'size', text: 'Room size: 15.2m²', sup: '2' },
            ...SINGLE_FEATURES.slice(2),
          ],
          plan: planSingleTop,
        },
      ],
    },
    {
      key: 'double',
      title: 'Double',
      price: 'from £1,249/month',
      variants: [
        {
          floor: '2nd floor',
          lead: 'Want to live together without living on top of each other? This is the one.',
          price: '£1,249/month all-in',
          photos: [
            { src: doubleA1, alt: 'A quay. double apartment' },
            { src: doubleA2, alt: 'The two desks by the window' },
            { src: doubleA3, alt: 'The double bed behind its curtain' },
          ],
          features: DOUBLE_FEATURES,
          plan: planDouble,
        },
        {
          floor: '3rd floor',
          lead: 'Want to live together without living on top of each other? This is the one, one floor up.',
          price: '£1,319/month all-in',
          photos: [
            { src: doubleB1, alt: 'A quay. double apartment on the third floor' },
            { src: doubleB2, alt: 'The storage wall' },
            { src: doubleB3, alt: 'The kitchenette and the window' },
          ],
          features: DOUBLE_FEATURES,
          plan: planDouble,
        },
        {
          floor: '4th floor',
          lead: 'Light in, water outside, and the run of the top floor to yourselves.',
          price: '£1,409/month all-in',
          photos: [
            { src: doubleC1, alt: 'The top-floor double in the eaves' },
            { src: doubleC2, alt: 'Two desks under the roof window' },
            { src: doubleC3, alt: 'The double bed under the slope' },
          ],
          features: DOUBLE_FEATURES,
          plan: planDoubleTop,
        },
      ],
    },
    {
      key: 'twin',
      title: 'Twin',
      price: 'from £619/month',
      variants: [
        {
          floor: '2nd floor',
          lead: 'One room. Two stories. A friendship that outlasts the lease.',
          price: '£619/pp/month all-in',
          photos: [
            { src: twinA1, alt: 'A quay. twin apartment' },
            { src: twinA2, alt: 'The two beds, curtain drawn back' },
          ],
          features: TWIN_FEATURES,
          plan: planTwin,
        },
        {
          floor: '3rd floor',
          lead: 'One room. Two stories. A friendship that outlasts the lease — a floor higher.',
          price: '£659/pp/month all-in',
          photos: [
            { src: twinB1, alt: 'A quay. twin apartment on the third floor' },
            { src: twinB2, alt: 'The shared desks' },
          ],
          features: TWIN_FEATURES,
          plan: planTwin,
        },
      ],
    },
    {
      key: 'step-free',
      title: 'Single Step-free',
      price: 'ask for price',
      variants: [
        {
          floor: '1st floor',
          lead: 'Room to move. Freedom to live.',
          price: 'ask for price – home@quay.co.uk',
          photos: [
            { src: stepFree1, alt: 'The step-free studio from the door' },
            { src: stepFree2, alt: 'The seated-height kitchenette' },
            { src: stepFree3, alt: 'The step-free bathroom' },
            { src: stepFree4, alt: 'The desk and the two windows' },
          ],
          features: STEP_FREE_FEATURES,
          plan: planStepFree,
        },
      ],
    },
  ],
  /** Shared by every variant, as the reference shares its own. */
  body: [FURNISHING, BRING_NOTHING, INCLUDED],
} as const;

/* ----------------------------------------------------------- shared spaces */

export const shared = {
  label: 'Shared spaces',
  heading: 'Where shared spaces turn into shared stories.',
  items: [
    {
      key: 'lounge',
      title: 'Leisure Area',
      body: 'The lounge is where most of quay. actually happens – deep sofas, a big screen, and one long table for arguments and card games. Come down to switch off, or to find whoever else is up.',
      photos: [
        { src: sharedLounge1, alt: 'The lounge, looking through to the windows' },
        { src: sharedLounge2, alt: 'The long table and the low chairs' },
        { src: sharedLounge3, alt: 'The table football at the end of the lounge' },
        { src: sharedLounge4, alt: 'The bar stools along the counter' },
      ],
    },
    {
      key: 'kitchen',
      title: 'Community Kitchen',
      body: 'There is always a seat at the table and something on the hob – conversations that run long, pans carrying recipes from six countries, and friendships that get made between mouthfuls.',
      photos: [
        { src: sharedKitchen1, alt: 'The community kitchen and its island' },
        { src: sharedKitchen2, alt: 'The kitchen tables under the window' },
        { src: sharedKitchen3, alt: 'The far end of the kitchen' },
      ],
    },
    {
      key: 'garden',
      title: 'Garden',
      body: 'Step outside and slow down. The walled garden is your green bolt-hole – for reading, for doing nothing, or for a game with whoever is about. Fresh air and quiet, all on one quay.',
      photos: [
        { src: sharedGarden1, alt: 'Two residents in the hammock' },
        { src: sharedGarden2, alt: 'A resident reading on the grass' },
      ],
    },
    {
      key: 'study',
      title: 'Study Rooms',
      body: 'Two study rooms for group work, for a run at a deadline, or for an evening of nobody saying anything. Whether you are revising or just need to think, they make working together easy.',
      photos: [
        { src: sharedStudy1, alt: 'The study room, laid out for a group' },
        { src: sharedStudy2, alt: 'The second study room' },
      ],
    },
    {
      key: 'laundry',
      title: 'Laundry Room',
      body: 'Wash, dry, iron – repeat, whenever you need to. The laundry is fully kitted out with machines, dryers, a board and an iron. All free to use, with no limit on it.',
      photos: [{ src: sharedLaundry1, alt: 'A pile of folded laundry' }],
    },
    {
      key: 'bikes',
      title: 'Bike Store',
      body: 'Bristol is a city best taken by bike, hills and all. So quay. keeps a covered, locked store with a repair stand and a wash point, to keep whatever you ride in one piece.',
      photos: [{ src: sharedBikes1, alt: 'The bike store sign on the wall' }],
    },
    {
      key: 'calm',
      title: 'Body & Mind Corner',
      body: 'A quiet retreat for focus and flow — somewhere to stretch, to sit still, or to breathe. Whether you are coming down off a long day, finding your balance through movement, or after ten quiet minutes, this is the room for it.',
      photos: [
        { src: sharedCalm1, alt: 'The body and mind corner, with its sign' },
        { src: sharedCalm2, alt: 'Weights and balls along the wall' },
        { src: sharedCalm3, alt: 'Rolled mats on the shelves' },
        { src: sharedCalm4, alt: 'The stretching space and its mirror' },
      ],
    },
  ],
  marquee: {
    words: ['Live smarter', 'Study closer', 'Connect', 'Have fun'],
    photos: [
      { src: marquee1, alt: 'A resident reading over breakfast' },
      { src: marquee2, alt: 'A pier running out into the sunset' },
    ],
  },
} as const;

/* ---------------------------------------------------------------- services */

export const services = {
  label: 'Services',
  groups: [
    {
      key: 'yours',
      title: 'What you want',
      photo: servicesYours,
      photoAlt: 'Two residents reading on the grass',
      items: [
        'Unlimited access to every shared space',
        'Walled garden with a leisure area',
        'Wi-fi everywhere in the building',
        'Rooms for people with reduced mobility',
        'Self-service launderette',
        'Room and shared-space cleaning',
        'Maintenance service',
        'Bike store (free)',
        'Someone on the desk 24/7',
      ],
    },
    {
      key: 'theirs',
      title: 'What your parents want',
      photo: servicesTheirs,
      photoAlt: 'A graduation photograph being taken',
      items: [
        'Someone on the desk 24/7',
        'Maintenance service',
        'A safe, well-lit street',
        'A small building, not a tower',
        'Run by the Moorside Group',
        'Transparent contract – no hidden costs',
      ],
    },
  ],
  cta: 'PARENTS’ GUIDE',
} as const;

/* ---------------------------------------------------------------- location */

export const location = {
  label: 'Location',
  heading: 'You’ve got it all just steps away',
  items: [
    { time: '4 min', text: 'walk to the nearest shop' },
    { time: '5 min', text: 'walk to the nearest parcel lockers' },
    { time: '6 min', text: 'walk to Temple Meads station' },
    { time: '7 min', text: 'walk to the University of Bristol' },
    { time: '8 min', text: 'bike ride to the UWE city campus' },
    { time: '11 min', text: 'walk to the Students’ Union' },
    { time: '12 min', text: 'bike ride to the Old City' },
    { time: '15 min', text: 'bike ride to the Downs' },
  ],
  cta: 'Explore the map',
  address: '1 Brandon Yard, BS1 6QG Bristol',
  consent: 'Click to accept marketing cookies and enable this content',
  card: {
    title: 'quay.',
    address: '1 Brandon Yard, BS1 6QG Bristol',
    body: 'quay. puts you a few minutes from the University of Bristol and UWE’s city campus, with cafés, libraries and the whole harbour around you. Good buses, green space, and the Downs a ride away — everything you need, where you already are.',
  },
  map: locationMap,
  mapAlt: 'A simplified street map with quay. marked on it',
  street: locationStreet,
  streetAlt: 'The house among its trees',
} as const;

/* ------------------------------------------------------------------ extras */

export const extras = {
  label: 'Boost your quay. life.',
  heading: 'Add extra comfort, skills and experiences to your stay.',
  freeLabel: 'FREE',
  items: [
    {
      key: 'bikes',
      title: 'Free bikes',
      free: true,
      body: 'Take a quay. bike and move around Bristol your own way — to campus, to the Downs, to the city centre, or wherever the day goes. Free to use, free to leave.',
      photos: [{ src: extraBikes, alt: 'Two quay. bikes with their baskets' }],
    },
    {
      key: 'weekend',
      title: 'Welcome weekend',
      free: true,
      body: 'Meet. Help. Connect. At the end of September we take the whole house down the Severn to clear the foreshore, pull out what shouldn’t be there, and meet the people you will be living with. Free of charge.',
      photos: [{ src: extraWeekend, alt: 'A volunteer clearing the foreshore' }],
    },
    {
      key: 'cleaning',
      title: 'Extra cleaning',
      free: false,
      body: 'Fresh room, fresh head. Book an extra clean and keep the place fit for study, sleep and everything in between. Available as a paid add-on.',
      photos: [{ src: extraCleaning, alt: 'A gloved hand wiping down a worktop' }],
    },
    {
      key: 'english',
      title: 'Academic English course',
      free: false,
      body: 'Academic English, made easier. Build the vocabulary your seminars and your first essays actually need. Available as a paid add-on — ask the team for the details.',
      photos: [
        { src: extraEnglish1, alt: 'A class joining on a screen' },
        { src: extraEnglish2, alt: 'Four people working at a whiteboard' },
      ],
    },
    {
      key: 'signing',
      title: 'British Sign Language course',
      free: false,
      body: 'Say it without saying it. Six weeks of beginners’ BSL in the lounge, taught by a Deaf tutor from the city. Available as a paid add-on — ask the team for the details.',
      photos: [{ src: extraSigning, alt: 'Three people round a laptop in the lounge' }],
    },
  ],
} as const;

/* --------------------------------------------------------------- infopoint */

export const faq = {
  label: 'Infopoint',
  heading: 'Q&A / all you need to know',
  cta: 'View all FAQs',
  items: [
    {
      q: 'Do I need to be a full-time student to book?',
      a: ['Yes.'],
    },
    {
      q: 'What is included in the rent?',
      a: [
        'The rent on a quay. studio covers a fully furnished, fully equipped room and every utility bill – electricity, gas and water.',
        'On top of that you get:',
      ],
      list: [
        'Internet access',
        'Use of the laundry, washers and dryers, open 24/7',
        'Ongoing maintenance and technical support',
        'Access to every shared space – kitchen, lounge, study rooms, body and mind corner',
        'A room clean once a month',
      ],
      tail: ['No extra costs.', 'quay. really means all included.'],
    },
    {
      q: 'Do we get a cleaning service?',
      a: [
        'The shared spaces are cleaned every day, so that everyone comes down to a building in a decent state. Your own room is cleaned once a month. If you want it done more often, you can book that as an add-on.',
      ],
    },
    {
      q: 'Can I move in before my contract starts?',
      a: [
        'Usually, yes – we can take people early at a daily rate, but you will need to ask the residence team what is free and what it costs.',
      ],
    },
    {
      q: 'Are the social spaces always open?',
      a: [
        'The shared spaces are open 24 hours a day unless we have posted other hours on the door.',
      ],
    },
    {
      q: 'Can I stay over the summer?',
      a: ['Yes. Have a word with your resident support team.'],
    },
  ],
} as const;

/* ------------------------------------------------------------------- apply */

export const apply = {
  label: 'Apply now',
  heading: 'Tie up here',
  stamps: [
    { text: '26-27 year', tone: 'pink' },
    { text: 'Join us!', tone: 'blue' },
    { text: 'September 2026', tone: 'green' },
  ],
  body: 'We will be ready to welcome you in September 2026. Tell us a bit about yourself and what you are after, and the team will come back to you by email and walk you through booking the right place to live for the length of your course. No stress and no guesswork – just somebody who knows the building helping you settle in and start the year properly.',
  photo: applyStudent,
  photoAlt: 'A quay. resident with her bag over her shoulder',
  roles: ['Student', 'Parent / Legal Guardian'],
  fields: {
    name: { label: 'Name*', placeholder: 'Your name' },
    lastname: { label: 'Lastname*', placeholder: 'Your lastname' },
    email: { label: 'Email*', placeholder: 'Your email' },
    phone: { label: 'Phone', placeholder: 'Your phone number' },
    roomType: { label: 'Room type', placeholder: 'Select' },
    term: { label: 'Study term', placeholder: 'Your study term' },
    heard: { label: 'How did you hear about us', placeholder: 'Select' },
    extra: { label: 'Anything else', placeholder: 'What can we help you with' },
  },
  roomOptions: [
    'Select',
    'Single / 1-3 floor / 12.4 sqm',
    'Single / 4th floor / 15.2 sqm',
    'Single Step-free / 1st floor / 16.5 sqm / parking space',
    'Double / 2-4th floor / 18.6 sqm',
    'Twin / 2-3 floor / 17.8 sqm',
  ],
  heardOptions: [
    'Select',
    'Friends',
    'Social media',
    'An ad',
    'This website',
    'University welcome office',
  ],
  consent:
    'The personal data you have given above will be processed by the operator of our student house. The purpose of processing it is to contact you and to handle your request to “settle.inn”. To find out more about how long we keep it and who sees it, please check our ',
  privacy: 'Privacy Policy',
  submit: 'Send',
  thanksTitle: 'Thanks for getting in touch!',
  thanksBody: 'We have your message and somebody will come back to you shortly.',
  banner: {
    title: 'Still have questions?',
    body: 'You are not the only one with questions — and we have the answers written down. Have a look through the infopoint and see what everybody else wanted to know. Still stuck? We are one message away.',
    photo: applyBanner,
    photoAlt: 'Two residents outside with a laptop',
  },
} as const;

/* ------------------------------------------------------------------ footer */

export const footer = {
  columns: [
    {
      title: 'Address',
      lines: ['quay.', '1 Brandon Yard', 'BS1 6QG, Bristol'],
    },
    {
      title: 'Get in touch',
      links: [
        { label: 'Contact us', href: '#contact' },
        { label: 'Instagram', href: '#instagram' },
        { label: 'Facebook', href: '#facebook' },
      ],
    },
    {
      title: 'Menu',
      links: [
        { label: 'Accommodation', href: '#rooms' },
        { label: 'Infopoint', href: '#infopoint' },
        { label: 'Journal', href: '#journal' },
      ],
    },
    {
      title: 'Accommodation',
      links: [
        { label: 'Rooms & Prices', href: '#rooms' },
        { label: 'Shared spaces', href: '#shared' },
        { label: 'Services', href: '#services' },
        { label: 'Location', href: '#location' },
      ],
    },
    {
      title: 'Info',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Website Regulations', href: '#terms' },
        { label: 'Cookies', href: '#cookies' },
      ],
    },
  ],
  up: 'Up',
} as const;
