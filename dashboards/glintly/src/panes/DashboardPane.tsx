import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Donut } from '@/charts/Donut';
import { Heatmap } from '@/charts/Heatmap';
import { Card, CardHead, Delta } from '@/components/Bits';
import { IconButton, Segmented } from '@/components/Controls';
import { Icon, type IconName } from '@/components/Icon';
import {
  DEVICES,
  KPIS,
  SLOTS,
  SPANS,
  WEEKDAYS,
  activeUsers,
  byTimeOfDay,
  deviceTotal,
  peakIndex,
  spanPointLabel,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short } from '@/lib/format';

const KPI_GLYPH: Record<string, IconName> = {
  users: 'user',
  revenue: 'coin',
  conv: 'target',
  session: 'clock',
};

const DEVICE_GLYPH: Record<string, IconName> = {
  desktop: 'desktop',
  mobile: 'mobile',
  tablet: 'tablet',
};

/** The heatmap's five bands, which are also its legend. */
const BANDS = [0, 1, 2, 3, 4];

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Two rows of `fr`, so the lower row takes whatever is left and the cards
 * reach the bottom of the shell at 900px and at 1080px alike.
 */
export function DashboardPane({ onNavigate }: { onNavigate: (tab: 'conversion') => void }) {
  const [spanId, setSpanId] = useState(SPANS[2].id);
  const [device, setDevice] = useState<string | null>(null);

  const grid = useMemo(() => byTimeOfDay(), []);
  const series = useMemo(() => activeUsers(spanId), [spanId]);
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[2];
  const peak = peakIndex(series);
  const heatMax = Math.max(...grid.flat());
  const total = deviceTotal();
  const current = DEVICES.find((d) => d.id === device);

  return (
    <div data-pane="dashboard" className="grid h-full grid-cols-[1fr_1.35fr] grid-rows-2 gap-4">
      <Card pane="kpis" className="min-h-0 p-4">
        <ul className="m-0 grid min-h-0 flex-1 list-none grid-cols-2 grid-rows-2 gap-3 p-0">
          {KPIS.map((k) => (
            <li key={k.id} className="min-w-0">
              <div
                data-kpi={k.id}
                className="border-line flex h-full flex-col justify-center rounded-[11px] border p-3.5"
              >
                <span className="bg-accent-faint text-accent grid h-9 w-9 place-items-center rounded-[10px]">
                  <Icon name={KPI_GLYPH[k.icon]} size={17} />
                </span>
                <span className="text-muted mt-3 block text-[12px]">{k.label}</span>
                <span className="tnum text-ink mt-1 block text-[26px] leading-none font-bold tracking-[-0.03em]">
                  {k.value}
                </span>
                <span className="mt-2 flex items-center gap-1.5">
                  <Delta value={k.delta} suffix="%" />
                  <span className="text-muted text-[11px]">from last week</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card pane="time-of-day" className="min-h-0 p-4">
        <CardHead
          title="User by time of day"
          action={<IconButton icon="dots" label="Time of day options" size={32} />}
        />
        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          <Heatmap
            grid={grid}
            days={WEEKDAYS}
            hours={SLOTS}
            format={(n) => `${num(n)} users`}
            label="Users by day of week and time of day, five bands from coldest to hottest"
          />
        </div>
        {/*
          The reference's scale: one strip, five bands, the figure each band
          starts at underneath it. The thresholds are the heatmap's own —
          `max / 5` per band — rather than the round numbers printed on the
          board, which do not line up with anything it draws.
        */}
        <div className="mt-2 flex shrink-0 items-center gap-3 pl-[46px]">
          <div className="min-w-0 flex-1">
            <div aria-hidden="true" className="flex h-2 gap-0.5">
              {BANDS.map((b) => (
                <span
                  key={b}
                  style={{ background: `var(--color-heat-${b})` }}
                  className="flex-1 rounded-[2px]"
                />
              ))}
            </div>
            <div className="mt-1 flex">
              {BANDS.map((b) => (
                <span key={b} className="tnum text-muted min-w-0 flex-1 text-[9.5px]">
                  {num(Math.round((b * heatMax) / BANDS.length))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card pane="active" className="min-h-0 p-4">
        <CardHead
          title="Active Users"
          action={<IconButton icon="dots" label="Active users options" size={32} />}
        />

        <p className="m-0 mt-2.5 flex flex-wrap items-baseline gap-2.5">
          <span className="tnum text-ink text-[24px] leading-none font-bold tracking-[-0.03em]">
            {num(series[peak])}
          </span>
          <span className="text-muted text-[11.5px]">
            peak active users · {spanPointLabel(spanId, peak)}
          </span>
        </p>

        <div className="mt-2 flex min-h-0 flex-1 flex-col">
          <AreaChart
            values={series}
            ticks={span.ticks}
            format={(n) => short(n)}
            pointLabel={(i) => spanPointLabel(spanId, i)}
            unit="active users"
            label={`Active users over the ${span.label.toLowerCase()}, peaking at ${num(series[peak])}`}
          />
        </div>

        <div className="mt-2 flex shrink-0 items-center justify-between gap-3">
          <Segmented
            name="span"
            size="sm"
            value={spanId}
            options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
            onChange={setSpanId}
          />
          <button
            type="button"
            data-action="view-report"
            onClick={() => onNavigate('conversion')}
            className="text-accent hover:bg-accent-faint flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12.5px] font-bold transition-colors"
          >
            View report
            <Icon name="arrow-right" size={14} strokeWidth={2.2} />
          </button>
        </div>
      </Card>

      <Card pane="devices" className="min-h-0 p-4">
        <CardHead
          title="Sessions by device"
          action={<IconButton icon="dots" label="Device options" size={32} />}
        />

        <div className="mt-3 grid min-h-0 flex-1 place-items-center">
          <Donut
            slices={DEVICES.map((d) => ({
              id: d.id,
              label: d.label,
              value: d.sessions,
              token: d.token,
            }))}
            size={168}
            thickness={22}
            sweep={360}
            from={-90}
            pad={3}
            active={device}
            onActive={setDevice}
            center={
              <div>
                <span className="text-accent grid place-items-center">
                  <Icon name="user" size={18} />
                </span>
                <p className="tnum text-ink m-0 mt-1.5 text-[20px] leading-none font-bold tracking-[-0.02em]">
                  {num(current ? current.sessions : total)}
                </p>
                <p className="text-muted m-0 mt-1 text-[11px]">
                  {current ? current.label : 'Total visitor'}
                </p>
              </div>
            }
          />
        </div>

        <ul className="m-0 mt-3 flex shrink-0 list-none flex-col gap-1 p-0">
          {DEVICES.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                data-legend={d.id}
                aria-pressed={device === d.id}
                onClick={() => setDevice(device === d.id ? null : d.id)}
                className={cx(
                  'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-opacity',
                  device !== null && device !== d.id ? 'opacity-45' : 'opacity-100',
                  device === d.id ? 'bg-sunken' : 'hover:bg-sunken',
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ background: `var(${d.token})` }}
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                />
                <Icon name={DEVICE_GLYPH[d.id]} size={15} className="text-muted shrink-0" />
                <span className="text-body min-w-0 flex-1 truncate text-left text-[12.5px]">
                  {d.label}
                </span>
                <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
                  {Math.round((d.sessions / total) * 1000) / 10}%
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
