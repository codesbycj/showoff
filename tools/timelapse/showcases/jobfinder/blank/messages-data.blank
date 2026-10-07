import { type BrandKey } from '../components/brand-mark';
import { jf } from '../theme';

/**
 * The conversation list.
 *
 * `unread` drives two things at once — the timestamp goes blue and bold, and a
 * dot appears at the right edge — so it is one flag rather than two, and the
 * card cannot end up showing one without the other.
 */
export type Conversation = {
  key: string;
  name: string;
  company: string;
  role: string;
  when: string;
  preview: string;
  unread: boolean;
  brand: BrandKey;
  brandBg: string;
  photo: number;
};

export const CONVERSATIONS: readonly Conversation[] = [
  {
    key: 'sarah',
    name: 'Sarah Jenkins',
    company: 'Dropbox',
    role: 'Middle UX/UI Designer',
    when: '10:24 AM',
    preview:
      'Hi George! We reviewed your portfolio for the Middle UX/UI Designer role and would love to schedule an interview.',
    unread: true,
    brand: 'dropbox',
    brandBg: jf.dropbox,
    photo: require('../../../../assets/images/jobfinder/msg-sarah.jpg'),
  },
  // STEP 5.09 a second recruiter
  // {
  //   key: 'marcus',
  //   name: 'Marcus Vance',
  //   company: 'Poker Stars Inc.',
  //   role: 'JavaScript Dev',
  //   when: 'Yesterday',
  //   preview:
  //     'Could you send over your GitHub profile or recent React projects for the lead engineer to review?',
  //   unread: true,
  //   brand: 'poker',
  //   brandBg: jf.alert,
  //   photo: require('../../../../assets/images/jobfinder/msg-marcus.jpg'),
  // },
  // STEP 5.10 a status update
  // {
  //   key: 'elena',
  //   name: 'Elena Rostova',
  //   company: 'Apple',
  //   role: 'Content Manager',
  //   when: 'May 12',
  //   preview:
  //     'Application status updated: Shortlisted for Content Manager (SMM). Our team will reach out soon.',
  //   unread: false,
  //   brand: 'apple',
  //   brandBg: jf.apple,
  //   photo: require('../../../../assets/images/jobfinder/msg-elena.jpg'),
  // },
  // STEP 5.11 and one more, read
  // {
  //   key: 'alex',
  //   name: 'Alex Nikitin',
  //   company: 'NIKITIN Agency',
  //   role: 'Art Director',
  //   when: 'May 10',
  //   preview:
  //     "Thank you for applying for the Art Director role. Let's connect next week to discuss potential collaboration.",
  //   unread: false,
  //   brand: 'nikitin',
  //   brandBg: jf.nikitin,
  //   photo: require('../../../../assets/images/jobfinder/msg-alex.jpg'),
  // },
];

export const MESSAGES = {
  title: 'Messages',
  subtitle: '3 recruiters waiting for reply',
  searchPlaceholder: 'Search conversations...',
  filters: [
    { label: 'All' },
    { label: 'Unread', count: 3 },
    { label: 'Recruiters' },
    { label: 'Archived' },
  ],
  activeFilter: 'All',
} as const;
