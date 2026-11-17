import { useMemo, useState } from 'react';

import { DataTable, type Sort, type SortKey } from '@/components/DataTable';
import { LevelTabs } from '@/components/LevelTabs';
import { Toolbar } from '@/components/Toolbar';
import { CAMPAIGNS, type Campaign } from '@/data/campaigns';
import { COLUMNS } from '@/data/columns';

/*
 * The page starts at the level tabs. The account header, the saved-view chips
 * and the filter box were cut by the brief: this is a clone of the Ads Manager
 * table with a lot taken out, not a clone of the whole screen.
 */

/** Delivery sorts by state, not alphabetically: drafts, live, broken, off. */
const TONE_RANK = { draft: 4, active: 3, error: 2, off: 1 } as const;

export function App() {
  /* The switch is the only thing that mutates the deck, so it is the only
     thing held as state over it. Everything else is a view of it. */
  const [power, setPower] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.on])),
  );
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<Sort>({ key: 'delivery', dir: 'desc' });

  /** The deck with the switches applied: turning a row off says so. */
  const deck: Campaign[] = useMemo(
    () =>
      CAMPAIGNS.map((c) => {
        const on = power[c.id];
        if (on === c.on) return c;
        return {
          ...c,
          on,
          delivery: on
            ? { label: 'Active', tone: 'active' as const }
            : { label: 'Off', tone: 'off' as const },
        };
      }),
    [power],
  );

  const rows = useMemo(() => {
    const col = COLUMNS.find((c) => c.key === sort.key);
    const value = (c: Campaign): number | string => {
      if (sort.key === 'name') return c.name.toLowerCase();
      if (sort.key === 'delivery') return TONE_RANK[c.delivery.tone];
      if (sort.key === 'on') return c.on ? 1 : 0;
      if (col?.sortBy) return col.sortBy(c);
      return c[col!.key].value ?? '';
    };

    const sign = sort.dir === 'asc' ? 1 : -1;
    return [...deck].sort((a, b) => {
      const x = value(a);
      const y = value(b);
      if (typeof x === 'number' && typeof y === 'number') return (x - y) * sign;
      return String(x).localeCompare(String(y)) * sign;
    });
  }, [deck, sort]);

  const onSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 'desc' ? 'asc' : 'desc' } : { key, dir: 'desc' },
    );

  const onPick = (id: string) =>
    setPicked((p) => {
      const next = new Set(p);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const onPickAll = () =>
    setPicked((p) => {
      const every = rows.length > 0 && rows.every((r) => p.has(r.id));
      if (every) return new Set();
      return new Set(rows.map((r) => r.id));
    });

  const onToggle = (id: string) => setPower((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div data-shell className="bg-ground flex h-screen w-screen flex-col overflow-hidden">
      <LevelTabs
        level="campaigns"
        selected={picked.size}
        onClearSelection={() => setPicked(new Set())}
      />

      <main
        data-region="table-card"
        className="border-line bg-surface mx-3 mb-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border"
      >
        <Toolbar selected={picked.size} />
        <DataTable
          rows={rows}
          sort={sort}
          onSort={onSort}
          picked={picked}
          onPick={onPick}
          onPickAll={onPickAll}
          onToggle={onToggle}
        />
      </main>
    </div>
  );
}
