/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the hospital, the ward, the staff and every patient.
 * The reference names "St. Mary's Medical Center" and puts five portraits
 * under five doctors' names; a real institution over invented observations is
 * the one thing this series must not produce (rule 8).
 *
 * **One patient list feeds all three tabs.** The shift's counts, the
 * escalation bands, the task board, the ward list and the nurse assignments
 * all read `PATIENTS` and the observations inside them. Change one
 * respiratory rate and the score, the band, the ward list, the dashboard's
 * counts and the nurse's acuity load all move.
 */
import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const WARD = {
  hospital: 'Elmridge General',
  ward: 'Ward 4B · Acute medical',
  beds: 32,
  date: 'Thursday, 18 December 2026',
  /** The clock everything on the build reads. Frozen, so a take repeats. */
  now: '10:24',
};

/* --------------------------------------------------------------------- staff */

export interface Nurse {
  id: string;
  name: string;
  role: string;
  face: string;
  /** Hours of care this nurse can take this shift, from the roster. */
  capacity: number;
  state: 'on shift' | 'on break' | 'off at 12' | 'late start';
}

export const NURSES: Nurse[] = [
  {
    id: 'n1',
    name: 'Elisa Nillson',
    role: 'Nurse in charge',
    face: face1,
    capacity: 6,
    state: 'on shift',
  },
  {
    id: 'n2',
    name: 'Priya Raghunathan',
    role: 'Staff nurse',
    face: face2,
    capacity: 9,
    state: 'on shift',
  },
  {
    id: 'n3',
    name: 'Tobias Lindgren',
    role: 'Staff nurse',
    face: face3,
    capacity: 9,
    state: 'on break',
  },
  {
    id: 'n4',
    name: 'Awa Diallo',
    role: 'Staff nurse',
    face: face4,
    capacity: 9,
    state: 'on shift',
  },
  {
    id: 'n5',
    name: 'Rafael Benitez',
    role: 'Healthcare assistant',
    face: face5,
    capacity: 7,
    state: 'off at 12',
  },
  {
    id: 'n6',
    name: 'Hana Kowalczyk',
    role: 'Staff nurse',
    face: face6,
    capacity: 9,
    state: 'late start',
  },
];

export const nurseOf = (id: string) => NURSES.find((n) => n.id === id) ?? NURSES[0];

export const STATE_TONE: Record<Nurse['state'], 'positive' | 'warn' | 'quiet'> = {
  'on shift': 'positive',
  'on break': 'warn',
  'off at 12': 'quiet',
  'late start': 'warn',
};

/* ------------------------------------------------------------------ patients */

/** The flags a handover list carries, because they change what you may do. */
export type Flag = 'allergy' | 'isolation' | 'nil by mouth' | 'falls risk' | 'DNACPR';

export interface Obs {
  /** Respiratory rate, breaths per minute. */
  rr: number;
  /** Oxygen saturation, percent. */
  spo2: number;
  /** Systolic blood pressure, mmHg. */
  sbp: number;
  /** Heart rate, beats per minute. */
  hr: number;
  /** Temperature, degrees Celsius. */
  temp: number;
  /** On supplemental oxygen. Two points on its own in every scoring system. */
  oxygen: boolean;
  /** Alert, or not — the consciousness leg of the score. */
  alert: boolean;
}

export interface Patient {
  id: string;
  bed: string;
  name: string;
  age: number;
  admitted: string;
  reason: string;
  nurseId: string;
  obs: Obs;
  /** When the last set of observations was taken, and when the next is due. */
  lastObs: string;
  nextObs: string;
  flags: Flag[];
  /** Hours of care this patient needs this shift, from the acuity tool. */
  acuity: number;
  /** Planned discharge today. */
  discharge: boolean;
  /** Five earlier scores, oldest first, for the row's trend. */
  trend: number[];
}

const P = (
  id: string,
  bed: string,
  name: string,
  age: number,
  admitted: string,
  reason: string,
  nurseId: string,
  obs: Obs,
  lastObs: string,
  nextObs: string,
  flags: Flag[],
  acuity: number,
  discharge: boolean,
  trend: number[],
): Patient => ({
  id,
  bed,
  name,
  age,
  admitted,
  reason,
  nurseId,
  obs,
  lastObs,
  nextObs,
  flags,
  acuity,
  discharge,
  trend,
});

export const PATIENTS: Patient[] = [
  P(
    'p1',
    '4B-01',
    'Marguerite Oyelaran',
    71,
    '14 Dec',
    'Community pneumonia',
    'n2',
    { rr: 24, spo2: 92, sbp: 104, hr: 112, temp: 38.4, oxygen: true, alert: true },
    '10:00',
    '11:00',
    ['allergy', 'falls risk'],
    3.5,
    false,
    [4, 5, 6, 7, 8],
  ),
  P(
    'p2',
    '4B-02',
    'Tomas Lindqvist',
    64,
    '16 Dec',
    'Decompensated heart failure',
    'n2',
    { rr: 21, spo2: 94, sbp: 112, hr: 96, temp: 36.9, oxygen: true, alert: true },
    '10:00',
    '11:00',
    ['nil by mouth'],
    3,
    false,
    [3, 4, 4, 5, 5],
  ),
  P(
    'p3',
    '4B-04',
    'Nadia Haddad',
    58,
    '17 Dec',
    'Cellulitis, left leg',
    'n2',
    { rr: 18, spo2: 96, sbp: 124, hr: 88, temp: 37.6, oxygen: false, alert: true },
    '09:30',
    '13:30',
    ['allergy'],
    2,
    false,
    [4, 3, 3, 2, 2],
  ),
  P(
    'p4',
    '4B-05',
    'Henrik Sorensen',
    83,
    '11 Dec',
    'Fractured neck of femur',
    'n4',
    { rr: 17, spo2: 95, sbp: 118, hr: 74, temp: 36.6, oxygen: false, alert: true },
    '09:30',
    '13:30',
    ['falls risk', 'DNACPR'],
    2,
    false,
    [3, 2, 2, 1, 1],
  ),
  P(
    'p5',
    '4B-06',
    'Chidinma Obi',
    45,
    '17 Dec',
    'Acute pancreatitis',
    'n3',
    { rr: 20, spo2: 95, sbp: 108, hr: 104, temp: 37.9, oxygen: false, alert: true },
    '10:00',
    '12:00',
    ['nil by mouth', 'allergy'],
    2.5,
    false,
    [5, 5, 4, 4, 4],
  ),
  P(
    'p6',
    '4B-07',
    'Walter Brennan',
    77,
    '09 Dec',
    'COPD exacerbation',
    'n3',
    { rr: 22, spo2: 89, sbp: 132, hr: 98, temp: 37.2, oxygen: true, alert: true },
    '10:00',
    '11:00',
    ['DNACPR'],
    3,
    false,
    [6, 6, 7, 6, 7],
  ),
  P(
    'p7',
    '4B-09',
    'Ingrid Vasquez',
    52,
    '18 Dec',
    'Urinary sepsis',
    'n6',
    { rr: 25, spo2: 91, sbp: 96, hr: 124, temp: 39.1, oxygen: true, alert: false },
    '10:10',
    '10:40',
    ['isolation', 'allergy'],
    4,
    false,
    [5, 6, 8, 9, 11],
  ),
  P(
    'p8',
    '4B-10',
    'Oskar Melnyk',
    39,
    '16 Dec',
    'Diabetic ketoacidosis',
    'n5',
    { rr: 19, spo2: 97, sbp: 116, hr: 92, temp: 36.8, oxygen: false, alert: true },
    '09:30',
    '13:30',
    [],
    2,
    false,
    [6, 5, 4, 3, 2],
  ),
  P(
    'p9',
    '4B-11',
    'Beatriz Almeida',
    68,
    '13 Dec',
    'Stroke, rehabilitation',
    'n4',
    { rr: 16, spo2: 97, sbp: 126, hr: 70, temp: 36.5, oxygen: false, alert: true },
    '09:00',
    '13:00',
    ['falls risk'],
    2,
    true,
    [2, 2, 1, 1, 0],
  ),
  P(
    'p10',
    '4B-12',
    'Yusuf Abubakar',
    61,
    '15 Dec',
    'Lower GI bleed',
    'n5',
    { rr: 18, spo2: 96, sbp: 102, hr: 101, temp: 36.4, oxygen: false, alert: true },
    '10:00',
    '12:00',
    ['nil by mouth'],
    2.5,
    false,
    [4, 4, 3, 4, 4],
  ),
  P(
    'p11',
    '4B-14',
    'Carmen Ruiz',
    74,
    '12 Dec',
    'Delirium, under review',
    'n3',
    { rr: 17, spo2: 95, sbp: 138, hr: 82, temp: 36.7, oxygen: false, alert: false },
    '09:30',
    '13:30',
    ['falls risk', 'DNACPR'],
    2.5,
    false,
    [3, 3, 4, 3, 3],
  ),
  P(
    'p12',
    '4B-15',
    'Daniel Okonkwo',
    48,
    '17 Dec',
    'Post-operative, day 1',
    'n1',
    { rr: 16, spo2: 98, sbp: 122, hr: 76, temp: 36.6, oxygen: false, alert: true },
    '09:00',
    '13:00',
    [],
    1.5,
    true,
    [3, 2, 1, 1, 0],
  ),
  P(
    'p13',
    '4B-16',
    'Sofia Jankowski',
    56,
    '16 Dec',
    'Pulmonary embolism',
    'n4',
    { rr: 20, spo2: 93, sbp: 110, hr: 99, temp: 37.0, oxygen: true, alert: true },
    '10:00',
    '12:00',
    ['allergy'],
    2.5,
    false,
    [6, 5, 5, 5, 5],
  ),
  P(
    'p14',
    '4B-18',
    'Lars Pettersen',
    80,
    '10 Dec',
    'Aspiration pneumonia',
    'n6',
    { rr: 23, spo2: 92, sbp: 108, hr: 106, temp: 38.0, oxygen: true, alert: true },
    '10:10',
    '10:40',
    ['nil by mouth', 'isolation'],
    3.5,
    false,
    [7, 7, 8, 8, 9],
  ),
  P(
    'p15',
    '4B-19',
    'Aisha Rahman',
    34,
    '18 Dec',
    'Asthma, acute',
    'n5',
    { rr: 19, spo2: 96, sbp: 118, hr: 94, temp: 36.9, oxygen: false, alert: true },
    '09:30',
    '13:30',
    ['allergy'],
    2,
    false,
    [5, 4, 3, 3, 3],
  ),
  P(
    'p16',
    '4B-20',
    'Johan Mbeki',
    66,
    '14 Dec',
    'Alcohol withdrawal',
    'n4',
    { rr: 18, spo2: 96, sbp: 142, hr: 102, temp: 37.3, oxygen: false, alert: true },
    '09:30',
    '13:30',
    ['falls risk'],
    2,
    false,
    [4, 4, 4, 3, 3],
  ),
  P(
    'p17',
    '4B-21',
    'Petra Novak',
    59,
    '15 Dec',
    'Pyelonephritis',
    'n1',
    { rr: 17, spo2: 97, sbp: 120, hr: 86, temp: 37.4, oxygen: false, alert: true },
    '09:00',
    '13:00',
    [],
    1.5,
    true,
    [4, 3, 2, 2, 1],
  ),
  P(
    'p18',
    '4B-22',
    'Mateo Fernandez',
    70,
    '13 Dec',
    'Hyponatraemia',
    'n1',
    { rr: 16, spo2: 97, sbp: 114, hr: 78, temp: 36.5, oxygen: false, alert: true },
    '09:00',
    '13:00',
    [],
    1.5,
    false,
    [3, 2, 2, 1, 1],
  ),
];

export const patientOf = (id: string) => PATIENTS.find((p) => p.id === id) ?? PATIENTS[0];

/* ------------------------------------------------------- the escalation score */

/**
 * A NEWS-style aggregate score: each observation contributes 0–3 and the
 * total decides how often the patient is seen.
 *
 * Written out rather than imported, and computed from the observations rather
 * than stored beside them — a stored score and a changed observation drift
 * apart silently, which is the one failure a ward dashboard cannot have.
 */
export function score(o: Obs): number {
  const rr = o.rr <= 8 ? 3 : o.rr <= 11 ? 1 : o.rr <= 20 ? 0 : o.rr <= 24 ? 2 : 3;
  const spo2 = o.spo2 <= 91 ? 3 : o.spo2 <= 93 ? 2 : o.spo2 <= 95 ? 1 : 0;
  const air = o.oxygen ? 2 : 0;
  const sbp = o.sbp <= 90 ? 3 : o.sbp <= 100 ? 2 : o.sbp <= 110 ? 1 : o.sbp <= 219 ? 0 : 3;
  const hr =
    o.hr <= 40 ? 3 : o.hr <= 50 ? 1 : o.hr <= 90 ? 0 : o.hr <= 110 ? 1 : o.hr <= 130 ? 2 : 3;
  const temp = o.temp <= 35 ? 3 : o.temp <= 36 ? 1 : o.temp <= 38 ? 0 : o.temp <= 39 ? 1 : 2;
  const cns = o.alert ? 0 : 3;
  return rr + spo2 + air + sbp + hr + temp + cns;
}

export type Band = 'low' | 'medium' | 'high';

export const bandOf = (s: number): Band => (s >= 7 ? 'high' : s >= 5 ? 'medium' : 'low');

export const BANDS: { id: Band; label: string; action: string; every: string }[] = [
  { id: 'low', label: 'Score 0–4', action: 'Routine ward care', every: '4-hourly' },
  { id: 'medium', label: 'Score 5–6', action: 'Nurse in charge to review', every: 'Hourly' },
  { id: 'high', label: 'Score 7+', action: 'Escalate to the medical team', every: '30 minutes' },
];

export const bandCount = (band: Band) =>
  PATIENTS.filter((p) => bandOf(score(p.obs)) === band).length;

/* ------------------------------------------------------------ the shift itself */

/**
 * The day shift, and the clock. The reference prints "60%" beside
 * "7:00 AM - 4:00PM" and "3h 12m remaining", which is three numbers that
 * cannot all be true: 60% of nine hours leaves 3h 36m. Here the percentage
 * and the remainder are both derived from `WARD.now`, so they cannot disagree.
 */
export const SHIFT = { name: 'Day shift', start: '07:00', end: '16:00' };

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const shiftElapsed = () => minutes(WARD.now) - minutes(SHIFT.start);
export const shiftLength = () => minutes(SHIFT.end) - minutes(SHIFT.start);
export const shiftProgress = () => (shiftElapsed() / shiftLength()) * 100;

export const shiftRemaining = () => {
  const left = shiftLength() - shiftElapsed();
  return `${Math.floor(left / 60)}h ${String(left % 60).padStart(2, '0')}m`;
};

/* --------------------------------------------------------------------- tasks */

export type TaskKind = 'medication' | 'observations' | 'assessment' | 'personal care';
export type TaskState = 'due' | 'overdue' | 'done';

export interface Task {
  id: string;
  at: string;
  patientId: string;
  kind: TaskKind;
  what: string;
  state: TaskState;
}

/**
 * Who does this task: whoever holds the bed. Derived rather than stored, so
 * moving a patient to another nurse moves their work with them.
 */
export const taskNurse = (t: Task) => patientOf(t.patientId).nurseId;

export const TASKS: Task[] = [
  {
    id: 't1',
    at: '10:00',
    patientId: 'p7',
    kind: 'observations',
    what: 'Full set, 30-minutely',
    state: 'overdue',
  },
  {
    id: 't2',
    at: '10:15',
    patientId: 'p1',
    kind: 'medication',
    what: 'Co-amoxiclav 1.2g IV',
    state: 'overdue',
  },
  {
    id: 't3',
    at: '10:30',
    patientId: 'p14',
    kind: 'observations',
    what: 'Full set, 30-minutely',
    state: 'due',
  },
  {
    id: 't4',
    at: '10:30',
    patientId: 'p6',
    kind: 'medication',
    what: 'Nebulised salbutamol 5mg',
    state: 'due',
  },
  {
    id: 't5',
    at: '10:45',
    patientId: 'p5',
    kind: 'assessment',
    what: 'Pain score and review',
    state: 'due',
  },
  {
    id: 't6',
    at: '11:00',
    patientId: 'p2',
    kind: 'medication',
    what: 'Furosemide 40mg IV',
    state: 'due',
  },
  {
    id: 't7',
    at: '11:00',
    patientId: 'p13',
    kind: 'observations',
    what: 'Full set, 2-hourly',
    state: 'due',
  },
  {
    id: 't8',
    at: '11:15',
    patientId: 'p11',
    kind: 'assessment',
    what: 'Delirium screen (4AT)',
    state: 'due',
  },
  {
    id: 't9',
    at: '11:30',
    patientId: 'p4',
    kind: 'personal care',
    what: 'Pressure area care',
    state: 'due',
  },
  {
    id: 't10',
    at: '11:30',
    patientId: 'p8',
    kind: 'medication',
    what: 'Insulin, variable rate review',
    state: 'due',
  },
  {
    id: 't11',
    at: '09:30',
    patientId: 'p3',
    kind: 'medication',
    what: 'Flucloxacillin 1g IV',
    state: 'done',
  },
  {
    id: 't12',
    at: '09:30',
    patientId: 'p10',
    kind: 'observations',
    what: 'Full set, 2-hourly',
    state: 'done',
  },
  {
    id: 't13',
    at: '09:45',
    patientId: 'p16',
    kind: 'assessment',
    what: 'Withdrawal score (CIWA)',
    state: 'done',
  },
  {
    id: 't14',
    at: '10:00',
    patientId: 'p15',
    kind: 'medication',
    what: 'Prednisolone 40mg oral',
    state: 'done',
  },
  {
    id: 't15',
    at: '10:00',
    patientId: 'p18',
    kind: 'observations',
    what: 'Full set, 4-hourly',
    state: 'done',
  },
  {
    id: 't16',
    at: '08:30',
    patientId: 'p9',
    kind: 'personal care',
    what: 'Mobilise with frame',
    state: 'done',
  },
  {
    id: 't17',
    at: '08:45',
    patientId: 'p12',
    kind: 'assessment',
    what: 'Wound check, day 1',
    state: 'done',
  },
  {
    id: 't18',
    at: '09:00',
    patientId: 'p17',
    kind: 'medication',
    what: 'Gentamicin 320mg IV',
    state: 'done',
  },
];

export const TASK_TONE: Record<TaskState, 'danger' | 'warn' | 'positive'> = {
  overdue: 'danger',
  due: 'warn',
  done: 'positive',
};

export const tasksOf = (nurseId: string) => TASKS.filter((t) => taskNurse(t) === nurseId);

export const taskCount = (state: TaskState) => TASKS.filter((t) => t.state === state).length;

export const taskProgress = () => (taskCount('done') / TASKS.length) * 100;

/* --------------------------------------------------- counts that reconcile */

/**
 * The reference's four rings read 128 total, 86 stable, 12 critical and 24
 * discharges — which leaves thirty patients in no category at all. These four
 * are computed from one list and add up by construction.
 */
export const census = () => PATIENTS.length;
export const stable = () =>
  PATIENTS.filter((p) => bandOf(score(p.obs)) === 'low' && !p.discharge).length;
export const escalating = () => PATIENTS.filter((p) => bandOf(score(p.obs)) !== 'low').length;
export const discharges = () => PATIENTS.filter((p) => p.discharge).length;

/* --------------------------------------------------------------- assignment */

export const patientsOf = (nurseId: string) => PATIENTS.filter((p) => p.nurseId === nurseId);

export const assignedHours = (nurseId: string) =>
  patientsOf(nurseId).reduce((t, p) => t + p.acuity, 0);

export const loadOf = (nurseId: string) =>
  (assignedHours(nurseId) / nurseOf(nurseId).capacity) * 100;

export const unassignedHours = () =>
  NURSES.reduce((t, n) => t + Math.max(0, n.capacity - assignedHours(n.id)), 0);

/* ------------------------------------------------------------- the trend card */

/**
 * The share of the ward in the lowest band, hour by hour through the shift.
 * The reference's "86% Recovery / Target" has no stated denominator; this one
 * is a count over a count.
 */
export const RECOVERY_TARGET = 80;

export const recoveryTrend = (): { at: string; value: number }[] => {
  const hours = ['07:00', '08:00', '09:00', '10:00'];
  const walk = [70, 72, 67, (bandCount('low') / PATIENTS.length) * 100];
  return hours.map((at, i) => ({ at, value: walk[i] }));
};

/* ------------------------------------------------------------- handover notes */

export interface Note {
  id: string;
  at: string;
  nurseId: string;
  patientId: string;
  body: string;
}

/**
 * What goes in the slot the reference gives to an AI assistant selling
 * credits. A nursing dashboard's fourth panel is the handover, which is the
 * one artefact the next shift cannot start without.
 */
export const NOTES: Note[] = [
  {
    id: 'h1',
    at: '10:12',
    nurseId: 'n6',
    patientId: 'p7',
    body: 'Sepsis six started 09:50. Lactate 3.8, fluids running, medical team aware and reviewing at 11:00.',
  },
  {
    id: 'h2',
    at: '09:58',
    nurseId: 'n2',
    patientId: 'p14',
    body: 'Swallow assessment outstanding — nil by mouth until speech and language have seen him.',
  },
  {
    id: 'h3',
    at: '09:40',
    nurseId: 'n3',
    patientId: 'p6',
    body: 'Target saturations 88–92%. Do not increase oxygen without medical review.',
  },
  {
    id: 'h4',
    at: '09:05',
    nurseId: 'n4',
    patientId: 'p9',
    body: 'Discharge letter written, transport booked for 14:00, family informed.',
  },
];
