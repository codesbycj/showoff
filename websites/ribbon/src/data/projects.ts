import casaLumen from '@/assets/images/casa-lumen.webp';
import fieldnotes from '@/assets/images/fieldnotes.webp';
import halvar from '@/assets/images/halvar.webp';
import ninthHouse from '@/assets/images/ninth-house.webp';
import northbound from '@/assets/images/northbound.webp';
import paperRadio from '@/assets/images/paper-radio.webp';
import saltworks from '@/assets/images/saltworks.webp';
import tidewater from '@/assets/images/tidewater.webp';

/**
 * The strip's contents: a fictional designer and eight fictional projects.
 *
 * The covers are public-domain FSA/OWI Kodachromes from 1940–43, standing in for
 * work that would otherwise be someone's to own. See `assets/images/CREDITS.md`
 * — every file is credited, and every licence was read off the source rather
 * than assumed.
 */
export type Project = {
  title: string;
  kind: string;
  year: string;
  src: string;
  /** Ink for the overlay type, picked to sit on that photograph. */
  ink: string;
  /**
   * Tone lift, applied when the cover is composited.
   *
   * The sheen is an additive 0.35 at a gloss of 48, so it is legible on a
   * mid-tone and lost on anything very dark, and the depth haze then takes the
   * far half of every card most of the way to black on top of that. These
   * frames range from a mean luminance of 59 to 144 as shipped, and each `lift`
   * aims at about 150 — but capped at ~1.4, because a linear multiply past that
   * posterises: the two darkest frames went to flat bands of yellow and red
   * before they got anywhere near a useful mean. They stay moodier than the
   * rest, which suits them. 1 is the photograph untouched.
   */
  lift: number;
};

export const PROJECTS: Project[] = [
  {
    title: 'Casa Lumen',
    kind: 'Art Direction',
    year: '25',
    src: casaLumen,
    ink: '#f6ece0',
    lift: 1.45,
  },
  {
    title: 'Northbound',
    kind: 'Identity',
    year: '25',
    src: northbound,
    ink: '#f2f6f8',
    lift: 1.05,
  },
  {
    title: 'Fieldnotes',
    kind: 'Editorial',
    year: '24',
    src: fieldnotes,
    ink: '#f7f0e2',
    lift: 1.34,
  },
  { title: 'Halvar', kind: 'Type Design', year: '24', src: halvar, ink: '#fbf3ee', lift: 1.18 },
  {
    title: 'Tidewater',
    kind: 'Interactive',
    year: '24',
    src: tidewater,
    ink: '#f0f6f4',
    lift: 1.18,
  },
  {
    title: 'Paper Radio',
    kind: 'Sound & Motion',
    year: '23',
    src: paperRadio,
    ink: '#fdf1e6',
    lift: 1.38,
  },
  {
    title: 'Ninth House',
    kind: '3D Visualisation',
    year: '23',
    src: ninthHouse,
    ink: '#eef1f6',
    lift: 1.28,
  },
  {
    title: 'Saltworks',
    kind: 'Brand System',
    year: '23',
    src: saltworks,
    ink: '#fdf8e8',
    lift: 1.06,
  },
];

export const AUTHOR = 'ANNIKA VOSS';
