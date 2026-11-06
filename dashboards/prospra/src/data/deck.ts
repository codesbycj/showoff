/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the firm, the reps, every account named. The
 * reference's own Top Deals table repeats one customer id three times with
 * the same date and the same amount, which is the placeholder tell this deck
 * exists to avoid.
 *
 * **One deal list, and every figure derives from it.** Pipeline value,
 * weighted pipeline, win rate, average deal size, cycle length, the stage
 * funnel, the quota rings, the revenue curve's actuals and the top-deals
 * table are all arithmetic over `DEALS`; the leads list is what feeds it.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';

export const ORG = { name: 'Prospra', quarter: 'Q1 2027', today: '2027-02-18' };

/* ------------------------------------------------------------------- team */

export interface Rep {
  id: string;
  name: string;
  role: string;
  face: string;
  /** The quarter's target, in dollars. */
  quota: number;
}

export const TEAM: Rep[] = [
  { id: 'r1', name: 'Marguerite Oyelaran', role: 'Account executive', face: face1, quota: 360_000 },
  { id: 'r2', name: 'Teodor Blum', role: 'Account executive', face: face2, quota: 300_000 },
  { id: 'r3', name: 'Imani Reyes', role: 'Senior AE', face: face3, quota: 520_000 },
  { id: 'r4', name: 'Soren Vikander', role: 'Account executive', face: face4, quota: 240_000 },
  { id: 'r5', name: 'Nadia Haddad', role: 'SDR lead', face: face5, quota: 0 },
];

export const repOf = (id: string) => TEAM.find((r) => r.id === id) ?? TEAM[0];

/* ------------------------------------------------------------------ deals */

export type StageId = 'qualified' | 'discovery' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface Stage {
  id: StageId;
  label: string;
  /** The stage's own win probability, as the pipeline settings would hold it. */
  probability: number;
  token: string;
}

/**
 * Five working stages and a lost bucket, with the probabilities a pipeline
 * carries. Weighted pipeline is Σ (value × probability), which is the figure
 * a raw pipeline total overstates every quarter.
 */
export const STAGES: Stage[] = [
  { id: 'qualified', label: 'Qualified', probability: 0.2, token: '--color-stage-0' },
  { id: 'discovery', label: 'Discovery', probability: 0.4, token: '--color-stage-1' },
  { id: 'proposal', label: 'Proposal', probability: 0.6, token: '--color-stage-2' },
  { id: 'negotiation', label: 'Negotiation', probability: 0.8, token: '--color-stage-3' },
  { id: 'won', label: 'Closed won', probability: 1, token: '--color-stage-4' },
  { id: 'lost', label: 'Closed lost', probability: 0, token: '--color-sunken-deep' },
];

export const stageOf = (id: StageId) => STAGES.find((s) => s.id === id) ?? STAGES[0];
export const OPEN_STAGES = STAGES.filter((s) => s.id !== 'won' && s.id !== 'lost');

export type Source = 'Inbound' | 'Outbound' | 'Partner' | 'Event' | 'Referral';

export interface Deal {
  id: string;
  account: string;
  value: number;
  stage: StageId;
  ownerId: string;
  source: Source;
  created: string;
  closeDate: string;
  /** Days since anyone touched it — the field that makes a deal "stalled". */
  idleDays: number;
  /** Set on a lost deal, so win-rate analysis has something to read. */
  lostReason?: string;
}

export const DEALS: Deal[] = [
  {
    id: 'd01',
    account: 'Northgate Analytics',
    value: 184_000,
    stage: 'negotiation',
    ownerId: 'r3',
    source: 'Inbound',
    created: '2026-11-04',
    closeDate: '2027-02-26',
    idleDays: 2,
  },
  {
    id: 'd02',
    account: 'Helvara Foods',
    value: 96_500,
    stage: 'proposal',
    ownerId: 'r1',
    source: 'Outbound',
    created: '2026-12-02',
    closeDate: '2027-03-11',
    idleDays: 5,
  },
  {
    id: 'd03',
    account: 'Brackwell Civil',
    value: 142_000,
    stage: 'discovery',
    ownerId: 'r2',
    source: 'Partner',
    created: '2027-01-08',
    closeDate: '2027-04-02',
    idleDays: 11,
  },
  {
    id: 'd04',
    account: 'Tessaly Retail',
    value: 68_400,
    stage: 'qualified',
    ownerId: 'r4',
    source: 'Event',
    created: '2027-01-21',
    closeDate: '2027-04-18',
    idleDays: 3,
  },
  {
    id: 'd05',
    account: 'Orrin Logistics',
    value: 212_000,
    stage: 'negotiation',
    ownerId: 'r3',
    source: 'Referral',
    created: '2026-10-19',
    closeDate: '2027-02-24',
    idleDays: 1,
  },
  {
    id: 'd06',
    account: 'Palmerin Works',
    value: 54_800,
    stage: 'proposal',
    ownerId: 'r1',
    source: 'Inbound',
    created: '2027-01-02',
    closeDate: '2027-03-19',
    idleDays: 17,
  },
  {
    id: 'd07',
    account: 'Vantor Freight',
    value: 128_600,
    stage: 'won',
    ownerId: 'r3',
    source: 'Outbound',
    created: '2026-09-12',
    closeDate: '2027-01-29',
    idleDays: 0,
  },
  {
    id: 'd08',
    account: 'Larkfield Dairy',
    value: 41_200,
    stage: 'won',
    ownerId: 'r1',
    source: 'Inbound',
    created: '2026-10-28',
    closeDate: '2027-01-14',
    idleDays: 0,
  },
  {
    id: 'd09',
    account: 'Caldwyn Legal',
    value: 88_000,
    stage: 'discovery',
    ownerId: 'r4',
    source: 'Referral',
    created: '2027-01-15',
    closeDate: '2027-04-09',
    idleDays: 6,
  },
  {
    id: 'd10',
    account: 'Brightpoint Media',
    value: 164_500,
    stage: 'proposal',
    ownerId: 'r2',
    source: 'Inbound',
    created: '2026-12-11',
    closeDate: '2027-03-05',
    idleDays: 9,
  },
  {
    id: 'd11',
    account: 'Sable & Roe',
    value: 32_400,
    stage: 'qualified',
    ownerId: 'r4',
    source: 'Event',
    created: '2027-02-02',
    closeDate: '2027-05-01',
    idleDays: 4,
  },
  {
    id: 'd12',
    account: 'Tideway Storage',
    value: 76_800,
    stage: 'won',
    ownerId: 'r2',
    source: 'Partner',
    created: '2026-10-06',
    closeDate: '2027-02-02',
    idleDays: 0,
  },
  {
    id: 'd13',
    account: 'Meridian Clinics',
    value: 198_000,
    stage: 'negotiation',
    ownerId: 'r1',
    source: 'Outbound',
    created: '2026-11-18',
    closeDate: '2027-03-01',
    idleDays: 8,
  },
  {
    id: 'd14',
    account: 'Aster Bioworks',
    value: 58_600,
    stage: 'lost',
    ownerId: 'r4',
    source: 'Outbound',
    created: '2026-11-02',
    closeDate: '2027-01-22',
    idleDays: 0,
    lostReason: 'Price',
  },
  {
    id: 'd15',
    account: 'Quenby Software',
    value: 112_000,
    stage: 'discovery',
    ownerId: 'r3',
    source: 'Inbound',
    created: '2027-01-26',
    closeDate: '2027-04-23',
    idleDays: 2,
  },
  {
    id: 'd16',
    account: 'Kelvo Energy',
    value: 246_000,
    stage: 'proposal',
    ownerId: 'r3',
    source: 'Partner',
    created: '2026-12-19',
    closeDate: '2027-03-14',
    idleDays: 13,
  },
  {
    id: 'd17',
    account: 'Hollowfield Press',
    value: 29_800,
    stage: 'qualified',
    ownerId: 'r1',
    source: 'Inbound',
    created: '2027-02-05',
    closeDate: '2027-05-08',
    idleDays: 1,
  },
  {
    id: 'd18',
    account: 'Marlow Hotels',
    value: 134_000,
    stage: 'won',
    ownerId: 'r1',
    source: 'Referral',
    created: '2026-09-29',
    closeDate: '2027-01-08',
    idleDays: 0,
  },
  {
    id: 'd19',
    account: 'Drayton Metals',
    value: 72_500,
    stage: 'lost',
    ownerId: 'r2',
    source: 'Event',
    created: '2026-10-14',
    closeDate: '2026-12-20',
    idleDays: 0,
    lostReason: 'No decision',
  },
  {
    id: 'd20',
    account: 'Ferrowind Energy',
    value: 158_000,
    stage: 'discovery',
    ownerId: 'r2',
    source: 'Outbound',
    created: '2027-01-12',
    closeDate: '2027-04-16',
    idleDays: 21,
  },
  {
    id: 'd21',
    account: 'Oakhurst Rail',
    value: 94_200,
    stage: 'negotiation',
    ownerId: 'r4',
    source: 'Inbound',
    created: '2026-12-04',
    closeDate: '2027-02-27',
    idleDays: 3,
  },
  {
    id: 'd22',
    account: 'Pell & Row',
    value: 46_000,
    stage: 'won',
    ownerId: 'r4',
    source: 'Inbound',
    created: '2026-11-11',
    closeDate: '2027-01-20',
    idleDays: 0,
  },
  {
    id: 'd23',
    account: 'Sunderwick Mills',
    value: 118_400,
    stage: 'proposal',
    ownerId: 'r2',
    source: 'Partner',
    created: '2027-01-05',
    closeDate: '2027-03-26',
    idleDays: 7,
  },
  {
    id: 'd24',
    account: 'Verity Foods',
    value: 63_200,
    stage: 'lost',
    ownerId: 'r3',
    source: 'Inbound',
    created: '2026-12-08',
    closeDate: '2027-02-06',
    idleDays: 0,
    lostReason: 'Lost to incumbent',
  },
];

export const openDeals = () => DEALS.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
export const wonDeals = () => DEALS.filter((d) => d.stage === 'won');
export const lostDeals = () => DEALS.filter((d) => d.stage === 'lost');

export const pipelineValue = () => openDeals().reduce((t, d) => t + d.value, 0);

/** Σ (value × the stage's own probability) — what the quarter is actually worth. */
export const weightedPipeline = () =>
  openDeals().reduce((t, d) => t + d.value * stageOf(d.stage).probability, 0);

export const closedWon = () => wonDeals().reduce((t, d) => t + d.value, 0);
export const quota = () => TEAM.reduce((t, r) => t + r.quota, 0);
export const attainment = () => (closedWon() / quota()) * 100;

export const winRate = () =>
  (wonDeals().length / Math.max(1, wonDeals().length + lostDeals().length)) * 100;

export const averageDeal = () => closedWon() / Math.max(1, wonDeals().length);

/** Mean days from created to closed, over the deals that closed won. */
export const cycleDays = () =>
  Math.round(
    wonDeals().reduce(
      (t, d) => t + (new Date(d.closeDate).getTime() - new Date(d.created).getTime()) / 86_400_000,
      0,
    ) / Math.max(1, wonDeals().length),
  );

/** Pipeline ÷ quota. Three to four times is the usual health bar. */
export const coverage = () => pipelineValue() / quota();

/** The quarter ends here, and a commit figure may only count deals that close
    inside it — weighting the whole book against one quarter's quota is how a
    board ends up claiming 181% committed. */
export const QUARTER_END = '2027-03-31';

export const weightedThisQuarter = () =>
  openDeals()
    .filter((d) => d.closeDate <= QUARTER_END)
    .reduce((t, d) => t + d.value * stageOf(d.stage).probability, 0);

export const repStats = () =>
  TEAM.filter((r) => r.quota > 0).map((r) => {
    const won = wonDeals().filter((d) => d.ownerId === r.id);
    const open = openDeals().filter((d) => d.ownerId === r.id);
    return {
      rep: r,
      won: won.reduce((t, d) => t + d.value, 0),
      pipeline: open.reduce((t, d) => t + d.value, 0),
      openCount: open.length,
      attainment: (won.reduce((t, d) => t + d.value, 0) / r.quota) * 100,
    };
  });

/** Deals nobody has touched in a fortnight — the dashboard's work queue. */
export const STALE_AFTER = 14;
export const stalled = () => openDeals().filter((d) => d.idleDays >= STALE_AFTER);
export const closingSoon = () => openDeals().filter((d) => d.closeDate <= '2027-03-05');

/* ------------------------------------------------------------------ leads */

export type Lifecycle = 'Subscriber' | 'Lead' | 'MQL' | 'SQL' | 'Opportunity' | 'Customer';

export interface Lead {
  id: string;
  name: string;
  company: string;
  lifecycle: Lifecycle;
  status: 'New' | 'Working' | 'Nurturing' | 'Open deal' | 'Unqualified';
  score: number;
  source: Source;
  ownerId: string;
  lastActivity: string;
}

export const LIFECYCLES: Lifecycle[] = [
  'Subscriber',
  'Lead',
  'MQL',
  'SQL',
  'Opportunity',
  'Customer',
];

export const LEADS: Lead[] = [
  {
    id: 'l01',
    name: 'Ada Fernsby',
    company: 'Northgate Analytics',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 92,
    source: 'Inbound',
    ownerId: 'r3',
    lastActivity: '2027-02-17',
  },
  {
    id: 'l02',
    name: 'Marcus Enfield',
    company: 'Helvara Foods',
    lifecycle: 'SQL',
    status: 'Working',
    score: 78,
    source: 'Outbound',
    ownerId: 'r1',
    lastActivity: '2027-02-16',
  },
  {
    id: 'l03',
    name: 'Priya Raman',
    company: 'Brackwell Civil',
    lifecycle: 'SQL',
    status: 'Working',
    score: 74,
    source: 'Partner',
    ownerId: 'r2',
    lastActivity: '2027-02-11',
  },
  {
    id: 'l04',
    name: 'Dele Okonkwo',
    company: 'Tessaly Retail',
    lifecycle: 'MQL',
    status: 'New',
    score: 61,
    source: 'Event',
    ownerId: 'r4',
    lastActivity: '2027-02-18',
  },
  {
    id: 'l05',
    name: 'Hana Suzuki',
    company: 'Orrin Logistics',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 95,
    source: 'Referral',
    ownerId: 'r3',
    lastActivity: '2027-02-18',
  },
  {
    id: 'l06',
    name: 'Teodora Munteanu',
    company: 'Palmerin Works',
    lifecycle: 'SQL',
    status: 'Nurturing',
    score: 58,
    source: 'Inbound',
    ownerId: 'r1',
    lastActivity: '2027-02-02',
  },
  {
    id: 'l07',
    name: 'Idris Mbeki',
    company: 'Caldwyn Legal',
    lifecycle: 'MQL',
    status: 'Working',
    score: 66,
    source: 'Referral',
    ownerId: 'r4',
    lastActivity: '2027-02-13',
  },
  {
    id: 'l08',
    name: 'Elena Marchetti',
    company: 'Brightpoint Media',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 88,
    source: 'Inbound',
    ownerId: 'r2',
    lastActivity: '2027-02-10',
  },
  {
    id: 'l09',
    name: 'Noor Hadid',
    company: 'Sable & Roe',
    lifecycle: 'MQL',
    status: 'New',
    score: 54,
    source: 'Event',
    ownerId: 'r4',
    lastActivity: '2027-02-17',
  },
  {
    id: 'l10',
    name: 'Grace Oyelaran',
    company: 'Meridian Clinics',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 90,
    source: 'Outbound',
    ownerId: 'r1',
    lastActivity: '2027-02-12',
  },
  {
    id: 'l11',
    name: 'Lucas Nelson',
    company: 'Quenby Software',
    lifecycle: 'SQL',
    status: 'Working',
    score: 71,
    source: 'Inbound',
    ownerId: 'r3',
    lastActivity: '2027-02-16',
  },
  {
    id: 'l12',
    name: 'Ingrid Sollner',
    company: 'Kelvo Energy',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 86,
    source: 'Partner',
    ownerId: 'r3',
    lastActivity: '2027-02-05',
  },
  {
    id: 'l13',
    name: 'Hugo Pereira',
    company: 'Hollowfield Press',
    lifecycle: 'MQL',
    status: 'New',
    score: 49,
    source: 'Inbound',
    ownerId: 'r1',
    lastActivity: '2027-02-17',
  },
  {
    id: 'l14',
    name: 'Farida Nasr',
    company: 'Ferrowind Energy',
    lifecycle: 'SQL',
    status: 'Nurturing',
    score: 63,
    source: 'Outbound',
    ownerId: 'r2',
    lastActivity: '2027-01-28',
  },
  {
    id: 'l15',
    name: 'Jonas Wexler',
    company: 'Oakhurst Rail',
    lifecycle: 'Opportunity',
    status: 'Open deal',
    score: 81,
    source: 'Inbound',
    ownerId: 'r4',
    lastActivity: '2027-02-15',
  },
  {
    id: 'l16',
    name: 'Clara Mendez',
    company: 'Sunderwick Mills',
    lifecycle: 'SQL',
    status: 'Working',
    score: 69,
    source: 'Partner',
    ownerId: 'r2',
    lastActivity: '2027-02-11',
  },
  {
    id: 'l17',
    name: 'Omar Lindqvist',
    company: 'Vantor Freight',
    lifecycle: 'Customer',
    status: 'Open deal',
    score: 97,
    source: 'Outbound',
    ownerId: 'r3',
    lastActivity: '2027-01-29',
  },
  {
    id: 'l18',
    name: 'Sophie Baptiste',
    company: 'Dunmore Partners',
    lifecycle: 'Lead',
    status: 'New',
    score: 34,
    source: 'Event',
    ownerId: 'r5',
    lastActivity: '2027-02-18',
  },
  {
    id: 'l19',
    name: 'Yusuf Demir',
    company: 'Ashgrove Studios',
    lifecycle: 'Lead',
    status: 'Working',
    score: 41,
    source: 'Inbound',
    ownerId: 'r5',
    lastActivity: '2027-02-14',
  },
  {
    id: 'l20',
    name: 'Rina Adeyemi',
    company: 'Tollwater Group',
    lifecycle: 'Subscriber',
    status: 'Nurturing',
    score: 18,
    source: 'Inbound',
    ownerId: 'r5',
    lastActivity: '2027-01-31',
  },
  {
    id: 'l21',
    name: 'Victor Halden',
    company: 'Keystone Civils',
    lifecycle: 'Lead',
    status: 'Unqualified',
    score: 12,
    source: 'Outbound',
    ownerId: 'r5',
    lastActivity: '2027-01-24',
  },
  {
    id: 'l22',
    name: 'Anneke Visser',
    company: 'Verity Foods',
    lifecycle: 'Lead',
    status: 'Unqualified',
    score: 22,
    source: 'Inbound',
    ownerId: 'r5',
    lastActivity: '2027-02-06',
  },
  {
    id: 'l23',
    name: 'Samir Haddadi',
    company: 'Larkfield Dairy',
    lifecycle: 'Customer',
    status: 'Open deal',
    score: 93,
    source: 'Inbound',
    ownerId: 'r1',
    lastActivity: '2027-01-14',
  },
  {
    id: 'l24',
    name: 'Beatrix Lowe',
    company: 'Pell & Row',
    lifecycle: 'Customer',
    status: 'Open deal',
    score: 89,
    source: 'Inbound',
    ownerId: 'r4',
    lastActivity: '2027-01-20',
  },
];

export const countLifecycle = (stage: Lifecycle) =>
  LEADS.filter((l) => l.lifecycle === stage).length;

/** MQL → SQL, the one conversion a marketing team is judged on. */
export const mqlToSql = () => {
  const mql = LEADS.filter((l) =>
    ['MQL', 'SQL', 'Opportunity', 'Customer'].includes(l.lifecycle),
  ).length;
  const sql = LEADS.filter((l) => ['SQL', 'Opportunity', 'Customer'].includes(l.lifecycle)).length;
  return (sql / Math.max(1, mql)) * 100;
};

/* ---------------------------------------------------------------- revenue */

export interface Month {
  label: string;
  /** Booked revenue. Null for a month that has not happened yet. */
  actual: number | null;
  forecast: number;
  plan: number;
}

/**
 * The reference's best block: actual against forecast against plan, with the
 * boundary between what happened and what is projected drawn on the chart.
 */
export const MONTHS: Month[] = [
  { label: 'Sep', actual: 214_000, forecast: 220_000, plan: 240_000 },
  { label: 'Oct', actual: 268_000, forecast: 255_000, plan: 260_000 },
  { label: 'Nov', actual: 241_000, forecast: 272_000, plan: 280_000 },
  { label: 'Dec', actual: 318_000, forecast: 300_000, plan: 300_000 },
  { label: 'Jan', actual: 349_700, forecast: 326_000, plan: 320_000 },
  { label: 'Feb', actual: 186_400, forecast: 352_000, plan: 340_000 },
  { label: 'Mar', actual: null, forecast: 384_000, plan: 360_000 },
  { label: 'Apr', actual: null, forecast: 412_000, plan: 380_000 },
  { label: 'May', actual: null, forecast: 438_000, plan: 400_000 },
];

/** February is in progress — the month the actual line stops on. */
export const PARTIAL_MONTH = 'Feb';

/* --------------------------------------------------------------- channels */

export interface Channel {
  id: string;
  label: string;
  spend: number;
  leads: number;
  /** Pipeline this channel is credited with sourcing. */
  sourced: number;
}

export const CHANNELS: Channel[] = [
  { id: 'inbound', label: 'Inbound content', spend: 18_400, leads: 142, sourced: 486_000 },
  { id: 'outbound', label: 'Outbound sequences', spend: 26_200, leads: 96, sourced: 604_000 },
  { id: 'partner', label: 'Partner referrals', spend: 11_800, leads: 38, sourced: 418_000 },
  { id: 'events', label: 'Events', spend: 34_600, leads: 54, sourced: 142_000 },
];

export const costPerLead = (c: Channel) => c.spend / c.leads;
/** Pipeline returned per dollar spent — the number that ranks the channels. */
export const channelReturn = (c: Channel) => c.sourced / c.spend;

/* -------------------------------------------------------------- countries */

export interface Country {
  id: string;
  label: string;
  customers: number;
  /** Bands for the drawn flag disc, outermost first. */
  bands: string[];
  dir: 'h' | 'v';
}

/**
 * Customers by country, as a list with drawn flag discs.
 *
 * **Not a map.** The reference puts a world map here carrying a single pin
 * reading "USA 50k" — the most expensive way to show one number, and a map is
 * a picture of a place rather than an idea, so drawing one is tracing (rule
 * 8). A flag disc is interface and is in range.
 */
export const COUNTRIES: Country[] = [
  {
    id: 'us',
    label: 'United States',
    customers: 184,
    bands: ['#b22234', '#ffffff', '#3c3b6e'],
    dir: 'h',
  },
  { id: 'de', label: 'Germany', customers: 96, bands: ['#161616', '#dd0000', '#ffce00'], dir: 'h' },
  {
    id: 'gb',
    label: 'United Kingdom',
    customers: 78,
    bands: ['#012169', '#ffffff', '#c8102e'],
    dir: 'v',
  },
  { id: 'fr', label: 'France', customers: 54, bands: ['#002395', '#ffffff', '#ed2939'], dir: 'v' },
  { id: 'jp', label: 'Japan', customers: 41, bands: ['#ffffff', '#bc002d'], dir: 'h' },
  { id: 'br', label: 'Brazil', customers: 33, bands: ['#009b3a', '#fedf00', '#002776'], dir: 'h' },
];

export const customerTotal = () => COUNTRIES.reduce((t, c) => t + c.customers, 0);

/* ------------------------------------------------------- platform metrics */

export const PLATFORM_SERIES = [
  { id: 'revenue', label: 'Revenue', unit: 'usd' as const },
  { id: 'leads', label: 'Leads', unit: 'count' as const },
  { id: 'deals', label: 'Deals', unit: 'count' as const },
];

/**
 * Three months of the selected measure, seeded — the reference's tabbed card.
 * Revenue reads the months above rather than inventing a second set.
 */
export function platformBars(seriesId: string): { label: string; value: number }[] {
  if (seriesId === 'revenue') {
    return MONTHS.slice(3, 6).map((m) => ({ label: m.label, value: m.actual ?? m.forecast }));
  }
  const next = rng(seriesId.length * 613);
  const base = seriesId === 'leads' ? 120 : 14;
  return MONTHS.slice(3, 6).map((m) => ({
    label: m.label,
    value: Math.round(base * (0.82 + next() * 0.5)),
  }));
}
