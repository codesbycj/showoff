import { useState } from 'react';

import { ScoreSpark } from '@/charts/ScoreSpark';
import { Badge, Card, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { FLAG_ICON } from '@/lib/flags';
import {
  BANDS,
  PATIENTS,
  bandCount,
  bandOf,
  nurseOf,
  score,
  type Band,
  type Patient,
} from '@/data/deck';
import { cx } from '@/lib/cx';

type SortKey = 'bed' | 'score' | 'due' | 'acuity';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'score', label: 'Highest score' },
  { id: 'due', label: 'Observations due' },
  { id: 'bed', label: 'Bed' },
  { id: 'acuity', label: 'Care hours' },
];

const BAND_CLASS: Record<Band, string> = {
  low: 'bg-band-low-wash text-band-low',
  medium: 'bg-band-mid-wash text-band-mid',
  high: 'bg-band-high-wash text-band-high',
};

/**
 * Patients — the ward list. Assembly only (rule 4).
 *
 * The columns are the ones a handover list carries: bed, patient, the
 * escalation score with the band it falls in, every observation behind that
 * score, when the last set was taken and when the next is due, the flags that
 * change what you may do, and who is looking after them.
 */
export function PatientsPane({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [sort, setSort] = useState<SortKey>('score');
  const [band, setBand] = useState<Band | 'all'>('all');

  const q = query.trim().toLowerCase();
  const rows = PATIENTS.filter((p) => (band === 'all' ? true : bandOf(score(p.obs)) === band))
    .filter((p) => (q ? (p.name + ' ' + p.bed + ' ' + p.reason).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'score'
        ? score(b.obs) - score(a.obs)
        : sort === 'due'
          ? a.nextObs.localeCompare(b.nextObs)
          : sort === 'acuity'
            ? b.acuity - a.acuity
            : a.bed.localeCompare(b.bed),
    );

  return (
    <div data-pane="patients" className="flex h-full flex-col">
      <PageHead
        title="Patients"
        note="Every bed on the ward, its last observations and what they score."
        action={
          <Segmented
            name="sort"
            value={sort}
            options={SORTS}
            onChange={(id) => setSort(id as SortKey)}
          />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <BandTile
          id="all"
          label="Whole ward"
          count={PATIENTS.length}
          note="every occupied bed"
          active={band === 'all'}
          onPick={() => setBand('all')}
        />
        {BANDS.map((b) => (
          <BandTile
            key={b.id}
            id={b.id}
            label={b.label}
            count={bandCount(b.id)}
            note={`${b.action} · ${b.every}`}
            active={band === b.id}
            onPick={() => setBand(band === b.id ? 'all' : b.id)}
          />
        ))}
      </ul>

      <Card pane="ward" className="min-h-0 flex-1 p-5">
        <div className="flex shrink-0 items-center justify-between gap-3 pb-2">
          <span className="text-ink text-[15px] font-bold">
            {band === 'all' ? 'Whole ward' : BANDS.find((b) => b.id === band)?.label}
          </span>
          <Badge>
            {rows.length} of {PATIENTS.length}
          </Badge>
        </div>

        <div data-scroller="ward" className="scroll-region min-h-0 flex-1 pr-1">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {rows.map((p) => (
                <li key={p.id}>
                  <Row
                    patient={p}
                    open={selected === p.id}
                    onToggle={() => onSelect(selected === p.id ? null : p.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="patient" query={query || band} />
          )}
        </div>
      </Card>
    </div>
  );
}

function BandTile({
  id,
  label,
  count,
  note,
  active,
  onPick,
}: {
  id: Band | 'all';
  label: string;
  count: number;
  note: string;
  active: boolean;
  onPick: () => void;
}) {
  const dot = id === 'all' ? 'accent' : id === 'medium' ? 'band-mid' : `band-${id}`;
  return (
    <li>
      <button
        type="button"
        data-band={id}
        aria-pressed={active}
        onClick={onPick}
        className={cx(
          'w-full rounded-[var(--radius-card)] border px-5 py-4 text-left transition-colors',
          active
            ? 'border-accent-deep bg-accent-faint'
            : 'border-line bg-surface hover:bg-sunken shadow-[var(--shadow-card)]',
        )}
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            style={{ background: `var(--color-${dot})` }}
            className="h-2.5 w-2.5 shrink-0 rounded-full"
          />
          <span className="text-muted truncate text-[12.5px]">{label}</span>
        </span>
        <span className="tnum text-ink mt-2 block text-[26px] leading-none font-extrabold tracking-[-0.03em]">
          {count}
        </span>
        <span className="text-muted mt-2 block truncate text-[11.5px]">{note}</span>
      </button>
    </li>
  );
}

function Row({
  patient: p,
  open,
  onToggle,
}: {
  patient: Patient;
  open: boolean;
  onToggle: () => void;
}) {
  const s = score(p.obs);
  const band = bandOf(s);
  const nurse = nurseOf(p.nurseId);

  return (
    <div
      className={cx(
        'rounded-[14px] border transition-colors',
        open ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-patient={p.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
      >
        <span className="tnum text-ink w-[56px] shrink-0 text-[12.5px] font-bold">{p.bed}</span>

        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13px] font-bold">
            {p.name}
            <span className="text-muted tnum font-normal"> · {p.age}</span>
          </span>
          <span className="text-muted block truncate text-[11.5px]">{p.reason}</span>
        </span>

        {/* Who holds the bed, and what it costs the shift. The row had a
            hand's width of nothing between the diagnosis and the flags. */}
        <span className="flex w-[150px] shrink-0 items-center gap-2">
          <img
            src={nurse.face}
            alt=""
            width={24}
            height={24}
            className="bg-sunken h-6 w-6 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[11.5px] font-semibold">
              {nurse.name.split(' ')[0]}
            </span>
            <span className="tnum text-muted block truncate text-[10.5px]">
              {p.acuity}h of care
            </span>
          </span>
        </span>

        <span className="flex w-[108px] shrink-0 items-center gap-1.5">
          {p.flags.length ? (
            p.flags.map((f) => (
              <span
                key={f}
                title={f}
                aria-label={f}
                className="border-line text-muted grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-white"
              >
                <Icon name={FLAG_ICON[f]} size={12} />
              </span>
            ))
          ) : (
            <span className="text-muted text-[11px]">no flags</span>
          )}
        </span>

        <span className="w-[64px] shrink-0">
          <ScoreSpark values={[...p.trend, s]} label={`${p.name}'s last six scores, now ${s}`} />
        </span>

        <span
          className={cx(
            'tnum grid h-9 w-9 shrink-0 place-items-center rounded-full text-[14px] font-extrabold',
            BAND_CLASS[band],
          )}
          title={`Score ${s}`}
        >
          {s}
        </span>

        <span className="w-[94px] shrink-0 text-right">
          <span className="tnum text-ink block text-[12px] font-semibold">{p.nextObs}</span>
          <span className="text-muted block text-[10.5px]">next obs</span>
        </span>

        <Icon
          name="chevron-down"
          size={14}
          strokeWidth={2.2}
          className={cx(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div className="border-line border-t px-4 py-3">
          <ul className="m-0 grid list-none grid-cols-6 gap-3 p-0">
            <Vital k="Resp. rate" v={`${p.obs.rr}`} unit="/min" icon="lungs" />
            <Vital k="Saturation" v={`${p.obs.spo2}`} unit="%" icon="drop" />
            <Vital k="Systolic BP" v={`${p.obs.sbp}`} unit="mmHg" icon="heart" />
            <Vital k="Heart rate" v={`${p.obs.hr}`} unit="bpm" icon="heart" />
            <Vital k="Temperature" v={p.obs.temp.toFixed(1)} unit="°C" icon="thermometer" />
            <Vital
              k="Oxygen"
              v={p.obs.oxygen ? 'Yes' : 'Air'}
              unit={p.obs.alert ? 'alert' : 'not alert'}
              icon="stethoscope"
            />
          </ul>
          <p className="text-muted m-0 mt-3 text-[11.5px]">
            Admitted {p.admitted} · last observations {p.lastObs} · {p.acuity}h of care today ·
            looked after by <span className="text-ink font-semibold">{nurse.name}</span>
            {p.discharge ? ' · for discharge today' : ''}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Vital({
  k,
  v,
  unit,
  icon,
}: {
  k: string;
  v: string;
  unit: string;
  icon: 'lungs' | 'drop' | 'heart' | 'thermometer' | 'stethoscope';
}) {
  return (
    <li className="border-line rounded-[11px] border bg-white px-3 py-2">
      <span className="text-muted flex items-center gap-1.5 text-[10.5px]">
        <Icon name={icon} size={12} />
        {k}
      </span>
      <span className="tnum text-ink mt-1 block text-[14px] font-bold">
        {v}
        <span className="text-muted ml-1 text-[10.5px] font-normal">{unit}</span>
      </span>
    </li>
  );
}
