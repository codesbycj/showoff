/**
 * The nineteen projects, their imagery and their copy.
 *
 * GENERATED from the reference's own CMS payload -- see
 * `tools/gen-projects.py` in the repository's scratchpad notes and the
 * provenance section of README.md. Not hand-typed: nineteen records of six
 * fields each is exactly the transcription that quietly pairs the wrong award
 * with the wrong project.
 *
 * ## Order
 *
 * This list is the **reverse** of the CMS order, and that is a reading of the
 * reference rather than a preference. Its index column, with FROMANOTHER
 * centred, reads DAFI / DISTRICT2 / FROMANOTHER / IVENTIONS / WON J. YOU top
 * to bottom -- which is CMS indices 1, 0, 18, 17, 16. Descending, and wrapping
 * past zero. Its counter reads `01 /19` at FROMANOTHER, so FROMANOTHER is the
 * first entry: newest first. The column is circular, so there is no end to
 * reach.
 *
 * ## Provenance of the content
 *
 * Unlike every other project in `websites/`, this one uses the reference
 * site's own imagery, project names and copy. That is a declared exception,
 * following `switchblade/`: the point of the exercise is motion, and matching
 * the motion to the frame means the plates passing the camera have to be the
 * plates the reference is actually moving. It is a private study and is not to
 * be deployed. See `src/assets/images/CREDITS.md`.
 */

import img0 from '@/assets/images/JK0FqSLxHpj1w22TtNIaAQwr2uc.jpg';
import img1 from '@/assets/images/75mCZ5SdSy2FaX0ameAhFh9ynE.jpg';
import img2 from '@/assets/images/OUq4sSIJXVqet1DGXpjpnXuC1qc.jpg';
import img3 from '@/assets/images/QqqJqinqeONnjCz1ncYlYpFRbs.jpg';
import img4 from '@/assets/images/kyZpWmBOPtk7QyAeSE9QB3HmS2I.jpg';
import img5 from '@/assets/images/BsJb1GV0DDjj2B5ELG33XfWmQ.jpg';
import img6 from '@/assets/images/bovi8JsQWnROEtE0WYyYwqPkiE.jpg';
import img7 from '@/assets/images/JXol5lZzzYBnMZSEp2JZHIhuuI.jpg';
import img8 from '@/assets/images/G6KRK08IYPVsspZ3za8etsb60.jpg';
import img9 from '@/assets/images/ZMZlhfAKVDPaWVzDIpnuU6HVRO4.jpg';
import img10 from '@/assets/images/e4NzJl004YbfnXuKnhQEuGgUPU.png';
import img11 from '@/assets/images/Ce5CMDqNJqwWN1TC3B0xbsBq47M.jpg';
import img12 from '@/assets/images/AHnUuCwiIe3u0k9N4az6316yTbU.jpg';
import img13 from '@/assets/images/FZyOyyrz0ZctFkAK2kROsql2w1A.jpg';
import img14 from '@/assets/images/Dr7ftrDUeUTFQY2afrDoalR8A.jpg';
import img15 from '@/assets/images/FP8bs8WqEOFTFST8L2YGqot9idA.jpg';
import img16 from '@/assets/images/F33bHKrCMVcgpBMdUPAEP579M.jpg';
import img17 from '@/assets/images/PbGu32LciyVQZHUuKJCNLLV2qZc.jpg';
import img18 from '@/assets/images/FoYPkj63CnTXaljvLBaCO9gL9dE.jpg';

export type Project = {
  slug: string;
  name: string;
  image: string;
  /** Launch year, from the record's own date. Empty where the CMS had none. */
  year: string;
  /** The record's first swatch -- its dominant colour, used behind the plate. */
  tone: string;
  role: string[];
  recognition: string[];
  blurb: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'fromanother',
    name: 'FROMANOTHER',
    image: img0,
    year: '2026',
    tone: 'rgb(5, 18, 54)',
    role: ['Design Direction', 'Website Design'],
    recognition: [
      'Awwwards Site of the Day',
      'Awwwards Site of the Month Nominee',
      'CSS Design Awards Website of the Day',
      'FWA of the Day',
    ],
    blurb:
      'A fresh website for the creative agency fromanother, founded by two artists I’ve long admired, Vicki and Robin.',
  },
  {
    slug: 'iventions',
    name: 'IVENTIONS',
    image: img1,
    year: '',
    tone: 'rgb(156, 147, 232)',
    role: [],
    recognition: [
      'Awwwards Site of the Day',
      'Awwwards Site of the Month Nominee',
      'CSSDA Website of the Day',
      'CSSDA Website of the Month',
      'CSSDA Website of the Year Nominee',
    ],
    blurb:
      'Teamed up with the Serious Business agency to build a new website for Iventions, an event agency based in Barcelona.',
  },
  {
    slug: 'wonjyou',
    name: 'WON J. YOU STUDIOS',
    image: img2,
    year: '2025',
    tone: 'rgb(239, 81, 67)',
    role: [],
    recognition: [
      'Webby Nominee',
      'Awwwards Site of the Day',
      'FWA of the Day',
      'CSSDA Website of the Day',
      'CSSDA Website of the Month Nominee',
    ],
    blurb:
      'A website for Won J. You, a veteran designer and professor focused on training the next generation through coaching, education, and mentorship.',
  },
  {
    slug: 'miuxstudio',
    name: 'MIUX STUDIO',
    image: img3,
    year: '2025',
    tone: 'rgb(185, 189, 171)',
    role: ['Design Direction', 'Design Lead'],
    recognition: [
      'Awwwards Site of the Day',
      'FWA of the Day',
      'CSSDA Website of the Day',
      'Behance UI Gallery',
    ],
    blurb:
      'Translated Thai-born founder Nara’s vision for her young UX studio into a digital experience.',
  },
  {
    slug: 'markwoodland',
    name: 'MARK WOODLAND',
    image: img4,
    year: '2025',
    tone: 'rgb(0, 112, 255)',
    role: ['Uncommon Studio', 'Interaction'],
    recognition: ['FWA of the Day', 'CSSDA Website of the Day', 'Behance UI Gallery'],
    blurb:
      'Working with the talented team at Uncommon Studio to reshape entrepreneur Mark Woodland’s digital presence.',
  },
  {
    slug: 'eislab',
    name: 'EISLAB',
    image: img5,
    year: '2025',
    tone: 'rgb(199, 179, 255)',
    role: ['Art Director', 'Design Direction', 'Design Lead'],
    recognition: ['Awwwards Site of the Day', 'FWA of the Day', 'CSSDA Website of the Day'],
    blurb:
      'Refreshed the digital identity for this German ice cream brand, transforming a more colorful and tasteful website experience.',
  },
  {
    slug: 'mat-voyce',
    name: 'MAT VOYCE',
    image: img6,
    year: '2025',
    tone: 'rgb(0, 211, 255)',
    role: ['Uncommon', 'Design Direction', 'Website Design'],
    recognition: [
      'Awwwards Site of the Day',
      'Awwwards Typography Honors',
      'FWA of the Day',
      'CSSDA Website of the Day',
      'GSAP Site of the Year Nominee',
      'Good Design Award Green Tick',
      'AGDA Awards Merit',
    ],
    blurb:
      'A new home for the moving work of legendary type designer Mat Voyce, built to push the boundaries of creativity and performance.',
  },
  {
    slug: 'defiant',
    name: 'DEFIANT',
    image: img7,
    year: '2025',
    tone: 'rgb(60, 40, 227)',
    role: [],
    recognition: [],
    blurb:
      "A website designed to mirror the brand's minimal, clean identity and help them stand out from traditional VC firms.",
  },
  {
    slug: 'by-kin',
    name: "BY 'KIN",
    image: img8,
    year: '2024',
    tone: 'rgb(255, 101, 66)',
    role: [],
    recognition: [
      'Awwwards Site of the Day',
      'FWA of the Day',
      'CSSDA Website of the Day',
      'Behance UI Gallery',
    ],
    blurb:
      'Crafted a playful digital experience for Manchester-based interior and brand studio kin, featuring the layout switch that reflect the studio’s multifaceted personality.',
  },
  {
    slug: 'serious-business',
    name: 'SERIOUS BUSINESS',
    image: img9,
    year: '2024',
    tone: 'rgb(251, 193, 212)',
    role: [],
    recognition: [
      'Awwwards Site of the Day',
      'Awwwards Business & Services Honors',
      'FWA of the Day',
      'CSSDA Website of the Day',
    ],
    blurb:
      'Got a chance to help Serious Business transform their new brand into a website that is delicious and makes“people want to lick”.',
  },
  {
    slug: 'uncommon-studio',
    name: 'UNCOMMON STUDIO',
    image: img10,
    year: '2026',
    tone: 'rgb(18, 18, 18)',
    role: ['Design Direction', 'Website Design'],
    recognition: ['Awwwards Site of the Day', 'FWA of the Day'],
    blurb:
      'Designed a bespoke digital experience for Uncommon, a Melbourne-based studio serving clients worldwide.',
  },
  {
    slug: 'ascon-system',
    name: 'ASCON SYSTEMS',
    image: img11,
    year: '2023',
    tone: 'rgb(255, 90, 54)',
    role: [],
    recognition: [
      'Awwwards Site of the Day',
      'CSSDA Website of the Day',
      'Behance Graphic Gallery',
    ],
    blurb:
      'Working with Serious Business to build a website for ASCon that stands out from the typical corporate template while staying clean and professional.',
  },
  {
    slug: 'mathijs-hanenkamp',
    name: 'MATHIJS HANENKAMP',
    image: img12,
    year: '2023',
    tone: 'rgb(34, 34, 34)',
    role: [],
    recognition: [
      'FWA Site of the Day',
      'CSSDA Website of the Day',
      'Behance UI Gallery',
      'Webby Honoree',
    ],
    blurb:
      'Bringing the vision and personality of portrait and documentary photographer Mathijs Hanenkamp into pixels by using smooth transitions to highlight his imagery.',
  },
  {
    slug: 'rly-network',
    name: 'RLY NETWORK',
    image: img13,
    year: '2022',
    tone: 'rgb(206, 255, 69)',
    role: ['Serious Business', 'Website Design'],
    recognition: [
      'Webby Nominee',
      'Awwwards Site of the Day',
      'FWA of the Day',
      'CSSDA Website of the Day',
      'Behance UI Gallery',
    ],
    blurb:
      "Together with SB to create an outstanding website that showcases the RLY network's value and ecosystem and encourages developers to build with the RLY protocol.",
  },
  {
    slug: 'huyml-2022',
    name: 'HUYML VOL.1',
    image: img14,
    year: '2022',
    tone: 'rgb(26, 26, 26)',
    role: ['Art Director', 'Website Design'],
    recognition: [
      'Awwwards Site of the Day',
      'FWA of the Day',
      'CSSDA Website of the Month',
      'CSSDA Website of the Day',
      'CSSDA Website of the Year Nominee',
      'Behance UI Gallery',
    ],
    blurb: 'My first ever portfolio in 2022. The one that completely changed my whole career.',
  },
  {
    slug: 'bison-studio',
    name: 'BISON STUDIO',
    image: img15,
    year: '2022',
    tone: 'rgb(186, 55, 55)',
    role: ['Art Director', 'Website Design'],
    recognition: ['CSSDA Website of the Day', 'Behance UI Gallery'],
    blurb:
      'New look and feel for Bison to reflect their vision and position them as a creative and award-winning studio.',
  },
  {
    slug: 'est-populo',
    name: 'EST POPULO',
    image: img16,
    year: '2022',
    tone: 'rgb(229, 227, 219)',
    role: ['District2 Studio', 'Website Design'],
    recognition: ['Behance UI Gallery'],
    blurb:
      'A bold digital experience for Est Populo, a Swedish marketing agency, balancing clean Scandinavian aesthetics with editorial-style typography.',
  },
  {
    slug: 'dafi',
    name: 'DAFI TROPICDANE',
    image: img17,
    year: '2019',
    tone: 'rgb(227, 232, 236)',
    role: ['District2', 'Website Design'],
    recognition: ['Behance UI Gallery', 'Top 11 Vietnam Halo Dot Award'],
    blurb:
      'A minimal, Scandinavian-inspired website for DAFI, a Danish company specializing in high-quality indoor and outdoor furniture.',
  },
  {
    slug: 'district2-studio',
    name: 'DISTRICT2 STUDIO',
    image: img18,
    year: '',
    tone: 'rgb(255, 255, 255)',
    role: ['District2', 'Website Design'],
    recognition: [
      'Awwwards Site of the Day',
      'CSSDA Website of the Day',
      'Behance UI Gallery',
      'Top 40 Vietnam Halo Dot Award',
    ],
    blurb:
      'Designing the new website for District2, the first studio I ever worked at and my very first creative website project.',
  },
];

/** The studio, for the chrome round the edges. */
export const STUDIO = {
  mark: 'HUYML',
  copyright: 'copyright 2026',
  city: 'hcmc, vn',
  phone: '+84',
  email: 'hello@huyml.co',
  timezone: 'Asia/Ho_Chi_Minh',
  menu: ['Work', 'About', 'Playground', 'Contact'],
  /**
   * The two lines of the loading screen, set in red.
   *
   * Two words of equal length, because the reference's own block is 580x422 --
   * taller than it is wide. A long second line turns that upright block into a
   * band across the screen, and the wall then wipes it in a third of the time.
   */
  loadingWord: ['HOLD', 'FAST'],
  showreel: "'25 showreel",
} as const;
