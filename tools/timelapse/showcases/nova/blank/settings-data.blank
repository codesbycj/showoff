import type { IconName } from '../components/icon';

/** Everything the settings screen says. */
export const SETTINGS = {
  title: 'Settings',

  profile: {
    name: 'Alex Morgan',
    badge: 'Verified',
    address: '0x71C...4b92',
    account: 'Main Account • Primary',
    status: 'Active Multi-sig',
  },
} as const;

export type Row = {
  key: string;
  icon: IconName;
  title: string;
  subtitle?: string;
  /** A row is either a switch or a disclosure, never both. */
  kind: 'toggle' | 'link';
  on?: boolean;
  /** The trailing value on a disclosure row. */
  value?: string;
  /** Draws a small blue dot before the value, as the network row does. */
  dot?: boolean;
  /** Sets the value in a grey chip rather than as plain text. */
  pill?: boolean;
};

export type Group = { key: string; label: string; rows: Row[] };

export const GROUPS: Group[] = [
  // STEP 6.08 locking it down
  // {
  //   key: 'security',
  //   label: 'Account & Security',
  //   rows: [
  //     {
  //       key: 'face',
  //       icon: 'face',
  //       title: 'Face ID / Biometrics',
  //       subtitle: 'Enabled for transaction signs',
  //       kind: 'toggle',
  //       on: true,
  //     },
  //     {
  //       key: 'recovery',
  //       icon: 'key',
  //       title: 'Recovery Phrase & Backup',
  //       subtitle: 'Backed up to iCloud',
  //       kind: 'link',
  //     },
  //     {
  //       key: '2fa',
  //       icon: 'shield',
  //       title: 'Two-Factor Authentication',
  //       subtitle: 'Authenticator App',
  //       kind: 'link',
  //       value: 'Enabled',
  //       pill: true,
  //     },
  //   ],
  // },
  // STEP 6.09 and the preferences
  // {
  //   key: 'prefs',
  //   label: 'Preferences',
  //   rows: [
  //     {
  //       key: 'currency',
  //       icon: 'currency',
  //       title: 'Currency & Display',
  //       kind: 'link',
  //       value: 'USD ($)',
  //     },
  //     {
  //       key: 'alerts',
  //       icon: 'trend',
  //       title: 'Price Alert Notifications',
  //       subtitle: 'Significant market moves (>5%)',
  //       kind: 'toggle',
  //       on: true,
  //     },
  //     {
  //       key: 'network',
  //       icon: 'network',
  //       title: 'Network & Nodes',
  //       kind: 'link',
  //       value: 'Ethereum Mainnet',
  //       dot: true,
  //     },
  //   ],
  // },
];
