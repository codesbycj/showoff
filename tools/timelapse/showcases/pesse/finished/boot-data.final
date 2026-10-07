/**
 * The boot screen's copy and its loading sequence.
 *
 * The reference steps through these on a 700ms interval and then stops. Here
 * the last step hands over to the home screen instead — a splash that sits at
 * 100% forever is a splash the recording has to fake its way out of.
 */
export const BOOT = {
  mainnet: 'MAINNET ACTIVE',
  tls: 'TLS 1.3 SECURE',
  name: 'Pesse',
  tagline: 'The borderless financial ecosystem engineered for modern freelancers and creators.',
  assurances: [
    { key: 'fdic', icon: 'verifiedUser', label: 'FDIC Insured' },
    { key: 'fx', icon: 'currencyExchange', label: '0% FX Spread' },
    { key: 'payout', icon: 'speed', label: 'Instant Payout' },
  ],
  encryption: 'Protected by 256-Bit Bank Grade Encryption',
  version: 'v2.4.1 (Build 890)',
  issuer: 'Pesse Bank Global',
  /** 700ms per step, as the reference's own interval does. */
  stepMs: 700,
  sequence: [
    { progress: 24, status: 'Encrypting master ledger...' },
    { progress: 48, status: 'Handshaking multi-currency vault...' },
    { progress: 76, status: 'Verifying creator credentials...' },
    { progress: 92, status: 'Syncing real-time FX nodes...' },
    { progress: 100, status: 'Ready to launch' },
  ],
} as const;
