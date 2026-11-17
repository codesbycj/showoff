/**
 * The table.
 *
 * Three things here are load-bearing and all three are visible in the
 * reference:
 *
 *  - The first three columns are frozen. The vertical rule that runs through
 *    the body after the Campaign column is the freeze boundary, which is also
 *    why images 3 and 4 still show a name column after scrolling right.
 *  - The header is sticky to the top of the scroller and the summary row to
 *    its bottom. Neither is fixed to the viewport: this is a shell, the
 *    document never scrolls, and the only thing that moves is this region.
 *  - The row background is set on each cell rather than on the row, because a
 *    frozen cell has to be opaque or the metrics scroll through underneath it.
 */
import { useState } from 'react';

import type { Campaign, Metric, Tone } from '@/data/campaigns';
import { COLUMNS, LEAD, type MetricKey } from '@/data/columns';
import {
  BarChart,
  Caret,
  Dash,
  Dot,
  Duplicate,
  Info,
  Pencil,
  Plus,
  Ring,
  SortBoth,
  SortDown,
  SortUp,
} from '@/icons';
import { Tick, Toggle } from '@/components/ui';
import { cx } from '@/lib/cx';

export type SortKey = 'name' | 'delivery' | 'on' | MetricKey;
export interface Sort {
  key: SortKey;
  dir: 'asc' | 'desc';
}

interface Props {
  rows: Campaign[];
  sort: Sort;
  onSort: (key: SortKey) => void;
  picked: Set<string>;
  onPick: (id: string) => void;
  onPickAll: () => void;
  onToggle: (id: string) => void;
}

/* The frozen columns' left offsets, accumulated once. */
const LEFT_CHECK = 0;
const LEFT_SWITCH = LEAD.check;
const LEFT_NAME = LEAD.check + LEAD.switch;

const TONE_INK: Record<Tone, string> = {
  draft: 'text-go',
  active: 'text-go',
  error: 'text-dot',
  off: 'text-dot',
};

/** The sort affordance: paired arrows when idle, one solid arrow when active. */
function SortMark({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active) return <SortBoth className="text-ink/70 shrink-0" />;
  return dir === 'desc' ? (
    <SortDown className="text-accent shrink-0" />
  ) : (
    <SortUp className="text-accent shrink-0" />
  );
}

interface HeadProps {
  label: string;
  sub?: string;
  sortKey?: SortKey;
  sort: Sort;
  onSort: (k: SortKey) => void;
  menu?: boolean;
  align?: 'left' | 'right';
}

function HeadCell({ label, sub, sortKey, sort, onSort, menu, align = 'left' }: HeadProps) {
  const active = sortKey !== undefined && sort.key === sortKey;
  return (
    <div
      className={cx(
        'flex h-full w-full items-center gap-1',
        align === 'right' && 'justify-between',
      )}
    >
      {sortKey ? (
        <button
          type="button"
          data-sort={sortKey}
          onClick={() => onSort(sortKey)}
          className="hover:text-accent flex min-w-0 items-center gap-1 rounded py-1 text-left transition-colors"
        >
          <span className="min-w-0">
            <span
              className={cx('block leading-tight font-semibold', active && 'text-accent')}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {label}
            </span>
            {sub && (
              <span className="text-muted block text-[11px] leading-tight font-normal">{sub}</span>
            )}
          </span>
          <SortMark active={active} dir={sort.dir} />
        </button>
      ) : (
        <span className="min-w-0">
          <span className="block leading-tight font-semibold">{label}</span>
          {sub && (
            <span className="text-muted block text-[11px] leading-tight font-normal">{sub}</span>
          )}
        </span>
      )}
      {menu && (
        <button
          type="button"
          aria-label={`${label} column options`}
          className="text-muted hover:bg-hover hover:text-ink ml-auto shrink-0 rounded p-1 transition-colors"
        >
          <Caret />
        </button>
      )}
    </div>
  );
}

/** A figure with the small grey caption naming what it counts. */
function Cell({ m, align, drill }: { m: Metric; align: 'left' | 'right'; drill?: boolean }) {
  const box = align === 'right' ? 'items-end text-right' : 'items-start text-left';
  if (m.value === null) {
    return (
      <span className={cx('flex min-w-0 flex-col', box)}>
        <span className="text-dot">
          <Dash />
        </span>
        {m.caption && <span className="text-muted w-full truncate text-[11px]">{m.caption}</span>}
      </span>
    );
  }
  return (
    <span className={cx('flex min-w-0 flex-col', box)}>
      <span
        className={cx(
          'text-ink w-full truncate text-[13px]',
          drill &&
            'decoration-ink/55 cursor-pointer underline decoration-dotted underline-offset-[3px]',
        )}
      >
        {m.value}
      </span>
      {m.caption && <span className="text-muted w-full truncate text-[11px]">{m.caption}</span>}
    </span>
  );
}

export function DataTable({ rows, sort, onSort, picked, onPick, onPickAll, onToggle }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  const allPicked = rows.length > 0 && rows.every((r) => picked.has(r.id));
  const somePicked = rows.some((r) => picked.has(r.id));

  /* The summary is computed from the rows on screen, so filtering moves it. */
  const summaryRows = rows;

  const headCls =
    'border-line border-b-line-strong sticky top-0 z-30 h-[46px] border-r border-b bg-surface px-3 align-middle text-[13px] font-semibold';
  const footCls =
    'sticky bottom-0 z-30 h-[60px] border-t border-line bg-surface px-3 align-middle text-[13px] font-semibold';

  return (
    <div data-scroller="table" className="barred bg-surface min-h-0 flex-1 overflow-auto">
      <table
        className="border-separate border-spacing-0 text-[13px]"
        style={{ tableLayout: 'fixed', width: 'max-content', minWidth: '100%', height: '100%' }}
      >
        <colgroup>
          <col style={{ width: LEAD.check }} />
          <col style={{ width: LEAD.switch }} />
          <col style={{ width: LEAD.name }} />
          <col style={{ width: LEAD.delivery }} />
          <col style={{ width: LEAD.actions }} />
          {COLUMNS.map((c) => (
            <col key={c.key} style={{ width: c.width }} />
          ))}
          <col style={{ width: 48 }} />
        </colgroup>

        <thead>
          <tr>
            <th
              className={cx(headCls, 'sticky z-40 px-0 text-center')}
              style={{ left: LEFT_CHECK }}
            >
              <Tick
                checked={allPicked}
                indeterminate={somePicked && !allPicked}
                label="Select all campaigns"
                onChange={onPickAll}
              />
            </th>
            <th className={cx(headCls, 'sticky z-40')} style={{ left: LEFT_SWITCH }}>
              <HeadCell label="Off / On" sortKey="on" sort={sort} onSort={onSort} />
            </th>
            <th
              className={cx(headCls, 'border-line sticky z-40 border-r')}
              style={{ left: LEFT_NAME }}
            >
              <HeadCell label="Campaign" sortKey="name" sort={sort} onSort={onSort} menu />
            </th>
            <th className={headCls}>
              <HeadCell label="Delivery" sortKey="delivery" sort={sort} onSort={onSort} menu />
            </th>
            <th className={headCls}>
              <HeadCell label="Actions" sort={sort} onSort={onSort} menu />
            </th>
            {COLUMNS.map((c) => (
              <th key={c.key} className={headCls}>
                <HeadCell
                  label={c.label}
                  sub={c.sub}
                  sortKey={c.sortable ? c.key : undefined}
                  sort={sort}
                  onSort={onSort}
                  menu={c.menu}
                  align={c.align}
                />
              </th>
            ))}
            <th className={cx(headCls, 'px-0 text-center')}>
              <button
                type="button"
                aria-label="Add a column"
                className="text-accent hover:bg-accent-soft inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors"
              >
                <Plus size={18} />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => {
            const on = picked.has(r.id);
            const hot = hover === r.id;
            /* Set on the cell, not the row: a frozen cell must be opaque. */
            /* Zebra: the reference alternates white and #f6f5f8. A draft row
               keeps its green whatever its index, and selection beats both. */
            const bg = on
              ? 'bg-accent-soft'
              : r.draft
                ? hot
                  ? 'bg-[#dcefe7]'
                  : 'bg-go-soft'
                : hot
                  ? 'bg-hover'
                  : i % 2 === 1
                    ? 'bg-stripe'
                    : 'bg-surface';
            const cell = cx('h-[52px] px-3 align-middle', bg);

            return (
              <tr
                key={r.id}
                data-row={r.id}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover((h) => (h === r.id ? null : h))}
              >
                <td
                  className={cx(cell, 'sticky z-10 px-0 text-center')}
                  style={{
                    left: LEFT_CHECK,
                    boxShadow: r.draft ? 'inset 3px 0 0 var(--color-go-bar)' : undefined,
                  }}
                >
                  <Tick checked={on} label={`Select ${r.name}`} onChange={() => onPick(r.id)} />
                </td>

                <td className={cx(cell, 'sticky z-10')} style={{ left: LEFT_SWITCH }}>
                  <Toggle
                    on={r.on}
                    label={`Turn ${r.name} ${r.on ? 'off' : 'on'}`}
                    onChange={() => onToggle(r.id)}
                  />
                </td>

                <td
                  className={cx(cell, 'border-line sticky z-10 border-r')}
                  style={{ left: LEFT_NAME }}
                >
                  <span className="text-accent block cursor-pointer truncate font-medium hover:underline">
                    {r.name}
                  </span>
                </td>

                <td className={cell}>
                  <span className="flex items-center gap-2">
                    <span className={TONE_INK[r.delivery.tone]}>
                      {r.delivery.tone === 'draft' ? <Ring /> : <Dot />}
                    </span>
                    <span className="truncate">{r.delivery.label}</span>
                  </span>
                </td>

                {/* Meta reveals the row's actions on hover; so does this. */}
                <td className={cell}>
                  <span
                    className={cx(
                      'flex items-center gap-1 transition-opacity',
                      hot ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {[
                      { icon: <Duplicate size={16} />, label: 'Duplicate' },
                      { icon: <Pencil size={16} />, label: 'Edit' },
                      { icon: <BarChart size={16} />, label: 'View charts' },
                    ].map((a) => (
                      <button
                        key={a.label}
                        type="button"
                        aria-label={`${a.label} ${r.name}`}
                        tabIndex={hot ? 0 : -1}
                        className="border-line-strong bg-surface text-ink hover:bg-hover inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors"
                      >
                        {a.icon}
                      </button>
                    ))}
                  </span>
                </td>

                {COLUMNS.map((c) => (
                  <td key={c.key} className={cell}>
                    <Cell m={r[c.key]} align={c.align} drill={c.drill} />
                  </td>
                ))}

                <td className={cell} />
              </tr>
            );
          })}

          {/* Absorbs the slack so the summary row sits at the foot of the
              region. Without it a short table leaves a dead band of white. */}
          <tr aria-hidden="true" style={{ height: '100%' }}>
            <td className="bg-surface sticky z-10" style={{ left: LEFT_CHECK }} />
            <td className="bg-surface sticky z-10" style={{ left: LEFT_SWITCH }} />
            <td
              className="border-line bg-surface sticky z-10 border-r"
              style={{ left: LEFT_NAME }}
            />
            <td colSpan={COLUMNS.length + 3} className="bg-surface" />
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td className={cx(footCls, 'sticky z-40 px-0')} style={{ left: LEFT_CHECK }} />
            <td className={cx(footCls, 'sticky z-40')} style={{ left: LEFT_SWITCH }} />
            <td
              className={cx(footCls, 'border-line sticky z-40 border-r')}
              style={{ left: LEFT_NAME }}
            >
              <span className="flex items-center gap-1.5">
                Results from {summaryRows.length} campaign{summaryRows.length === 1 ? '' : 's'}
                <span className="text-muted">
                  <Info size={13} />
                </span>
              </span>
            </td>
            <td className={footCls} />
            <td className={footCls} />
            {COLUMNS.map((c) => (
              <td key={c.key} className={footCls}>
                {c.summary ? (
                  <Cell m={c.summary(summaryRows)} align={c.align} />
                ) : (
                  <span className="text-dot">
                    <Dash />
                  </span>
                )}
              </td>
            ))}
            <td className={footCls} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
