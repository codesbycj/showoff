import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Badge, Card, CardHead, Delta, Empty } from '@/components/Bits';
import { IconButton, SearchBox, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  LIVE_PAGES,
  LIVE_WINDOWS,
  SOURCES,
  liveTotal,
  liveTrail,
  sourceTotals,
  type SourceId,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short } from '@/lib/format';

type SortKey = 'active' | 'trend';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'trend', label: 'Trend' },
];

/**
 * Realtime. Assembly only (rule 4).
 *
 * Three cards, and they are wired to each other rather than sitting side by
 * side: picking a source filters the page list, and picking a page re-scales
 * the live trail to that page's share. A tab whose controls each move one
 * card and nothing else is a tab with nothing to film.
 */
export function RealtimePane() {
  const [windowId, setWindowId] = useState(LIVE_WINDOWS[0].id);
  const [source, setSource] = useState<SourceId | null>(null);
  const [pageId, setPageId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('active');
  const [descending, setDescending] = useState(true);

  const win = LIVE_WINDOWS.find((w) => w.id === windowId) ?? LIVE_WINDOWS[0];
  const total = liveTotal();
  const totals = sourceTotals();
  const trail = useMemo(() => liveTrail(windowId), [windowId]);
  const page = LIVE_PAGES.find((p) => p.id === pageId) ?? null;

  /* The selected page's share of each sample, rather than a second series:
     one set of figures, so the headline and the curve cannot disagree. */
  const series = page
    ? trail.map((v) => Math.max(1, Math.round((v * page.active) / total)))
    : trail;
  const peak = Math.max(...series);
  const low = Math.min(...series);
  const mean = Math.round(series.reduce((t, v) => t + v, 0) / series.length);

  const q = query.trim().toLowerCase();
  const rows = LIVE_PAGES.filter((p) => (source ? p.source === source : true))
    .filter((p) => (q ? (p.path + ' ' + p.title).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const by = sort === 'active' ? a.active - b.active : a.trend - b.trend;
      return descending ? -by : by;
    });

  const sourceOf = (id: SourceId) => SOURCES.find((s) => s.id === id) ?? SOURCES[0];

  return (
    <div data-pane="realtime" className="grid h-full grid-cols-[1fr_1.05fr] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="live-now" className="min-h-0 flex-[1.25] p-4">
          <CardHead
            title="Live right now"
            action={
              <Segmented
                name="window"
                size="sm"
                value={windowId}
                options={LIVE_WINDOWS.map((w) => ({ id: w.id, label: w.label }))}
                onChange={setWindowId}
              />
            }
          />

          <div className="mt-3 flex shrink-0 flex-wrap items-center gap-3">
            <span className="tnum text-ink text-[34px] leading-none font-bold tracking-[-0.03em]">
              {num(page ? page.active : total)}
            </span>
            <Badge tone="positive" dot>
              Live
            </Badge>
            {page ? (
              <button
                type="button"
                data-action="clear-page"
                onClick={() => setPageId(null)}
                className="border-line text-body hover:bg-sunken hover:text-ink flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-semibold transition-colors"
              >
                {page.path}
                <Icon name="close" size={13} strokeWidth={2.2} />
              </button>
            ) : (
              <span className="text-muted text-[12px]">
                across {LIVE_PAGES.length} pages, last {win.label.toLowerCase()}
              </span>
            )}
          </div>

          <div className="mt-2 flex min-h-0 flex-1 flex-col">
            <AreaChart
              values={series}
              ticks={win.ticks}
              format={(n) => short(n)}
              label={`Concurrent ${page ? 'users on ' + page.path : 'users'} over the last ${win.label}, peaking at ${num(peak)}`}
            />
          </div>

          <dl className="border-line m-0 mt-2 grid shrink-0 grid-cols-3 gap-3 border-t pt-3">
            {[
              { k: 'Peak', v: peak },
              { k: 'Average', v: mean },
              { k: 'Quietest', v: low },
            ].map((s) => (
              <div key={s.k} data-stat={s.k.toLowerCase()}>
                <dt className="text-muted m-0 text-[11px]">{s.k}</dt>
                <dd className="tnum text-ink m-0 mt-1 text-[16px] leading-none font-bold">
                  {num(s.v)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card pane="sources" className="min-h-0 flex-1 p-4">
          <CardHead
            title="Traffic sources"
            action={
              source ? (
                <button
                  type="button"
                  data-action="clear-source"
                  onClick={() => setSource(null)}
                  className="text-accent hover:bg-accent-faint flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-bold transition-colors"
                >
                  Clear filter
                  <Icon name="close" size={13} strokeWidth={2.2} />
                </button>
              ) : (
                <IconButton icon="dots" label="Source options" size={32} />
              )
            }
          />

          <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col p-0">
            {SOURCES.map((s) => {
              const count = totals[s.id];
              const share = Math.round((count / total) * 1000) / 10;
              return (
                <li key={s.id} className="flex min-h-0 flex-1 items-center">
                  <button
                    type="button"
                    data-source={s.id}
                    aria-pressed={source === s.id}
                    onClick={() => setSource(source === s.id ? null : s.id)}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors',
                      source === s.id ? 'bg-sunken' : 'hover:bg-sunken',
                    )}
                  >
                    <span
                      className={cx(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-[10px] transition-colors',
                        source === s.id
                          ? 'bg-accent text-accent-fg'
                          : 'bg-accent-faint text-accent',
                      )}
                    >
                      <Icon name={s.icon} size={16} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-ink text-[13px] font-semibold">{s.label}</span>
                        <span className="tnum text-muted text-[12px]">
                          {num(count)} · {share}%
                        </span>
                      </span>
                      <span className="bg-sunken-deep mt-2 block h-2 rounded-full">
                        <span
                          style={{ width: share + '%', background: `var(${s.token})` }}
                          className="block h-full rounded-full transition-[width] duration-500"
                        />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card pane="live-pages" className="min-h-0 p-4">
        <CardHead
          title="Live pages"
          action={
            <>
              <Segmented
                name="sort"
                size="sm"
                value={sort}
                options={SORTS}
                onChange={(id) => setSort(id)}
              />
              <IconButton
                icon={descending ? 'arrow-down' : 'arrow-up'}
                label={descending ? 'Sorted high to low' : 'Sorted low to high'}
                tone="outline"
                size={32}
                name="sort-dir"
                onClick={() => setDescending((v) => !v)}
              />
            </>
          }
        />

        <div className="mt-3 flex shrink-0 items-center gap-2.5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search live pages"
            className="min-w-0 flex-1"
          />
          {source ? <Badge tone="accent">{sourceOf(source).label}</Badge> : null}
          <Badge>
            {rows.length} of {LIVE_PAGES.length}
          </Badge>
        </div>

        <div data-scroller="pages" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {rows.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    data-row={p.id}
                    aria-pressed={pageId === p.id}
                    onClick={() => setPageId(pageId === p.id ? null : p.id)}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors',
                      pageId === p.id
                        ? 'border-accent bg-accent-faint'
                        : 'hover:bg-sunken border-transparent',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      style={{ background: `var(${sourceOf(p.source).token})` }}
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[13px] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-muted mt-0.5 block truncate text-[11.5px]">
                        {p.path} · {sourceOf(p.source).label}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="tnum text-ink block text-[15px] leading-none font-bold">
                        {num(p.active)}
                      </span>
                      <Delta value={p.trend} className="mt-1.5" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="page" query={query || sourceOf(source ?? 'search').label} />
          )}
        </div>
      </Card>
    </div>
  );
}
