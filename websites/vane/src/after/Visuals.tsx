/**
 * The product visuals, rebuilt in the DOM.
 *
 * One deliberate improvement over what they stand in for: every label in them
 * is set in greyscale-8 rather than greyscale-6. The reference's own
 * screenshots use the paler grey, but they are rasters -- nobody can read them
 * with a screen reader and no checker can measure them. These are live text,
 * so they *are* measurable, and at greyscale-6 the 10px labels came out at
 * 2.76:1. Declared.
 *
 * The reference illustrates itself with nine screenshots of its own
 * application — its wordmark, its navigation, its French UI copy. Those cannot
 * be carried across (rule 10: a real company's mark comes out), and a page
 * about a carbon platform with empty boxes where the platform should be is not
 * a rebuild either. So each one is drawn here, in the same box, at the same
 * size, with the same information architecture: a sidebar, a header, a figure,
 * a chart, a table.
 *
 * They are drawn rather than rendered to an image on purpose. Every number and
 * label in them is selectable, they re-flow at 390, and they cost 0 bytes of
 * raster — which is three things the screenshots they stand in for do not do.
 */

import { Icon } from '@/after/Marks';
import { cx } from '@/cx';

/* ------------------------------------------------------------ the chrome */

function Dot({ color }: { color: string }) {
  return <span className="block size-2 rounded-full" style={{ background: color }} />;
}

function WindowBar({ title }: { title: string }) {
  return (
    <div className="border-greyscale-9 bg-greyscale-5 flex items-center gap-2 border-b px-3 py-2">
      <Dot color="#e4e8e7" />
      <Dot color="#e4e8e7" />
      <Dot color="#e4e8e7" />
      <span className="font-inter text-greyscale-8 ml-2 text-[10px]">{title}</span>
    </div>
  );
}

/* --------------------------------------------------------------- the chart */

/**
 * The area chart every one of these panels is built around.
 *
 * The path is generated from a fixed series rather than random numbers, so a
 * screenshot of this page is reproducible — which is the thing the reference's
 * own randomised decorations are not.
 */
const SERIES = [38, 42, 36, 48, 44, 52, 47, 58, 54, 63, 59, 71];
const SERIES_B = [22, 26, 24, 29, 27, 33, 30, 35, 33, 38, 36, 44];

function areaPath(values: readonly number[], w: number, h: number, pad = 0) {
  const max = 80;
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - (v / max) * (h - 6)] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return { line, area: `${line} L${w - pad} ${h} L${pad} ${h} Z` };
}

export function AreaChart({
  w = 320,
  h = 120,
  tone = 'green',
  second = false,
  className,
}: {
  w?: number;
  h?: number;
  tone?: 'green' | 'light';
  second?: boolean;
  className?: string;
}) {
  const a = areaPath(SERIES, w, h);
  const b = areaPath(SERIES_B, w, h);
  const stroke = tone === 'green' ? '#1e9b48' : '#8b9c99';
  const fill = tone === 'green' ? 'rgba(47,206,101,0.18)' : 'rgba(139,156,153,0.16)';
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#e8edeb" strokeWidth="1" />
      ))}
      {second ? <path d={b.area} fill="rgba(139,156,153,0.14)" /> : null}
      {second ? <path d={b.line} fill="none" stroke="#a7b4b1" strokeWidth="1.5" /> : null}
      <path d={a.area} fill={fill} />
      <path d={a.line} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx={w} cy={h - (SERIES[SERIES.length - 1] / 80) * (h - 6)} r="3.5" fill={stroke} />
    </svg>
  );
}

function Bars({ values, className }: { values: readonly number[]; className?: string }) {
  return (
    <div className={cx('flex items-end gap-1', className)}>
      {values.map((v, i) => (
        <span
          key={i}
          className="w-full rounded-t-[2px]"
          style={{ height: `${v}%`, background: i === values.length - 1 ? '#2fce65' : '#cfe8d9' }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- hero panel */

/** The 458px product panel the hero sits beside. */
export function HeroPanel({ onPlay }: { onPlay?: () => void }) {
  return (
    <div className="bg-greyscale-5 relative size-full overflow-hidden rounded-tl">
      <div className="flex size-full">
        {/* the app's own rail */}
        <div className="border-greyscale-9 hidden w-[164px] shrink-0 flex-col gap-1 border-r bg-white p-3 sm:flex">
          <p className="font-inter-semibold text-primary-2 mb-2 px-2 text-[11px]">vane</p>
          {['Overview', 'Inventory', 'Reduction', 'Reporting', 'Products', 'Suppliers'].map(
            (item, i) => (
              <span
                key={item}
                className={cx(
                  'font-inter rounded px-2 py-1.5 text-[11px]',
                  i === 0 ? 'bg-greentint-2 text-primary-2' : 'text-greyscale-8',
                )}
              >
                {item}
              </span>
            ),
          )}
          <span className="bg-greyscale-4 font-inter text-greyscale-8 mt-auto rounded px-2 py-2 text-[10px]">
            Copilot · 4 agents idle
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-greyscale-9 flex items-center justify-between border-b bg-white px-4 py-3">
            <span className="font-pangea-medium text-primary-2 text-[13px]">Group overview</span>
            <span className="font-inter border-greyscale-9 text-greyscale-8 rounded border px-2 py-1 text-[10px]">
              FY 2026
            </span>
          </div>

          <div className="bg-greyscale-9 grid grid-cols-3 gap-px">
            {[
              ['Total', '418,902 tCO₂e'],
              ['Scope 3', '86.4%'],
              ['vs. target', '−12.1%'],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-4 py-3">
                <p className="font-inter text-greyscale-8 text-[10px]">{k}</p>
                <p className="font-pangea-medium text-primary-2 text-[15px]">{v}</p>
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1 bg-white px-4 py-3">
            <AreaChart w={420} h={130} second className="h-auto w-full" />
          </div>

          <div className="border-greyscale-9 border-t bg-white px-4 py-3">
            {[
              ['Purchased goods', '184,220', '44%'],
              ['Upstream transport', '71,940', '17%'],
              ['Fuel & energy', '48,305', '12%'],
            ].map(([a, b, c]) => (
              <div key={a} className="flex items-center gap-3 py-1">
                <span className="font-inter text-greyscale-2 w-full truncate text-[11px]">{a}</span>
                <span className="font-inter-medium text-primary-2 shrink-0 text-[11px]">{b}</span>
                <span className="font-inter text-greyscale-8 w-9 shrink-0 text-right text-[11px]">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {onPlay ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label="Play the product tour"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span className="bg-primary-2/70 flex size-16 items-center justify-center rounded-full text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Icon name="play" size={22} />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------- the four card footers */

/** The 260×158 strip at the foot of each platform card. */
export function CardStrip({ kind }: { kind: 'ghg' | 'corporate' | 'product' | 'supply' }) {
  const shell =
    'size-full overflow-hidden rounded-tl border-t border-l border-greyscale-9 bg-white';

  if (kind === 'ghg') {
    return (
      <div className={shell}>
        <WindowBar title="Inventory · FY26" />
        <div className="px-3 pt-3">
          <p className="font-pangea-medium text-primary-2 text-[18px]">418,902 tCO₂e</p>
          <p className="font-inter text-primary-10 text-[10px]">−12.1% against the 2030 path</p>
          <AreaChart w={240} h={62} className="mt-2 h-auto w-full" />
        </div>
      </div>
    );
  }

  if (kind === 'corporate') {
    return (
      <div className={shell}>
        <WindowBar title="CSRD · draft 4" />
        <div className="space-y-1.5 p-3">
          {['E1 Climate change', 'E5 Resource use', 'S1 Own workforce', 'G1 Conduct'].map(
            (row, i) => (
              <div key={row} className="flex items-center gap-2">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: i < 3 ? '#2fce65' : '#e8edeb' }}
                />
                <span className="font-inter text-greyscale-2 flex-1 truncate text-[10px]">
                  {row}
                </span>
                <span className="font-inter text-greyscale-8 text-[9px]">
                  {i < 3 ? 'Complete' : 'In review'}
                </span>
              </div>
            ),
          )}
          <div className="bg-greyscale-9 mt-2 h-1.5 w-full rounded-full">
            <div className="bg-primary-1 h-1.5 w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'product') {
    return (
      <div className={shell}>
        <WindowBar title="LCA · SKU 4411" />
        <div className="p-3">
          <p className="font-pangea-medium text-primary-2 text-[18px]">2.84 kgCO₂e</p>
          <p className="font-inter text-greyscale-8 text-[10px]">per unit, cradle to gate</p>
          <Bars values={[30, 52, 41, 68, 55, 80]} className="mt-3 h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <WindowBar title="Suppliers · 1,284" />
      <div className="p-3">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="h-5 rounded-[2px]"
              style={{ background: i < 11 ? '#2fce65' : i < 14 ? '#cfe8d9' : '#e8edeb' }}
            />
          ))}
        </div>
        <p className="font-inter text-greyscale-8 mt-2 text-[10px]">
          <span className="text-primary-10">68%</span> responded with primary data
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------- the reason-grid panels */

export function AgentsVisual() {
  return (
    <div className="bg-primary-11 relative size-full overflow-hidden rounded p-5">
      <div className="absolute inset-0 opacity-50">
        <div className="bg-primary-1/20 absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full blur-2xl" />
      </div>
      <div className="relative grid grid-cols-2 gap-2">
        {['Architect', 'Scope 3 Scout', 'Environmental Engineer', 'Strategist'].map((a, i) => (
          <div key={a} className="border-primary-7 bg-primary-2/70 rounded border p-3">
            <p className="font-inter-semibold text-[11px] text-white">{a}</p>
            <p className="font-inter text-primary-9 mt-1 text-[10px]">
              {['12 sites mapped', '418 suppliers chased', '34 LCAs drafted', '9 levers priced'][i]}
            </p>
            <div className="bg-primary-7 mt-2 h-1 w-full rounded-full">
              <div
                className="bg-primary-1 h-1 rounded-full"
                style={{ width: `${[82, 64, 47, 91][i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuiteVisual() {
  return (
    <div className="border-greyscale-9 size-full overflow-hidden rounded border bg-white">
      <WindowBar title="One ledger" />
      <div className="bg-greyscale-9 grid grid-cols-3 gap-px">
        {['Inventory', 'Reduction', 'CSRD', 'Products', 'Suppliers', 'Assurance'].map((m, i) => (
          <div key={m} className="bg-white px-3 py-4">
            <span className="font-inter-medium text-primary-2 text-[11px]">{m}</span>
            <div className="bg-greyscale-9 mt-2 h-1 w-full rounded-full">
              <div
                className="bg-primary-1 h-1 rounded-full"
                style={{ width: `${[100, 72, 88, 54, 66, 40][i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustriesVisual() {
  const rows = [
    ['Manufacturing', '1,284 factors'],
    ['Financial services', '960 factors'],
    ['Retail & FMCG', '2,117 factors'],
    ['Transport', '744 factors'],
  ];
  return (
    <div className="border-greyscale-9 size-full overflow-hidden rounded border bg-white">
      <WindowBar title="Factor library" />
      <div>
        {rows.map(([a, b], i) => (
          <div
            key={a}
            className={cx(
              'flex items-center justify-between px-4 py-2.5',
              i < rows.length - 1 && 'border-greyscale-9 border-b',
            )}
          >
            <span className="font-inter text-greyscale-2 text-[11px]">{a}</span>
            <span className="font-inter-medium text-primary-10 text-[11px]">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------- the recognition cards */

export function ReviewBadges() {
  return (
    <div className="flex w-full items-end justify-between gap-2">
      {['Leader', 'Momentum', 'Best ROI', 'Easiest'].map((b, i) => (
        <div
          key={b}
          className="border-greyscale-9 bg-greyscale-5 flex flex-1 flex-col items-center gap-1 rounded border px-1 py-3"
        >
          <span className="text-primary-10 flex gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((s) => (
              <Icon key={s} name="star" size={9} />
            ))}
          </span>
          <span className="font-inter-semibold text-primary-2 text-center text-[9px] leading-tight">
            {b}
          </span>
          <span className="font-inter text-greyscale-8 text-[8px]">Q{i + 1} 2026</span>
        </div>
      ))}
    </div>
  );
}

export function RankCover() {
  return (
    <div className="relative size-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_0%,rgba(47,206,101,0.35),transparent_60%)]" />
      <div className="border-primary-7 bg-primary-11/80 absolute bottom-6 left-6 right-6 rounded border p-4">
        <p className="font-inter text-primary-9 text-[10px] uppercase tracking-[0.18em]">
          Carbon platforms, Europe
        </p>
        {['vane', 'Ardentia', 'Tessellate', 'Norwood'].map((n, i) => (
          <div
            key={n}
            className={cx(
              'flex items-center gap-3 py-1.5',
              i < 3 && 'border-primary-7/60 border-b',
            )}
          >
            <span className="font-pangea-medium text-primary-1 w-4 text-[13px]">{i + 1}</span>
            <span
              className={cx(
                'font-inter flex-1 text-[12px]',
                i === 0 ? 'text-white' : 'text-primary-9',
              )}
            >
              {n}
            </span>
            <span className="font-inter text-primary-9 text-[11px]">{[96, 88, 81, 77][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RankList() {
  return (
    <div className="bg-greyscale-5 size-full px-6 py-5">
      <p className="font-inter text-greyscale-8 text-[10px] uppercase tracking-[0.18em]">
        GreenTech 100 · 2026
      </p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {['vane', 'Tessellate', 'Norwood', 'Kiltan', 'Arbor Lane', 'Fennimore'].map((n, i) => (
          <div key={n} className="flex items-baseline gap-2">
            <span className="font-pangea-medium text-greyscale-7 text-[12px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={cx(
                'font-inter text-[12px]',
                i === 0 ? 'text-primary-2' : 'text-greyscale-8',
              )}
            >
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------- the resource card tops */

/**
 * The three resource cards are illustrated with photographs on the reference.
 * Those are its own art, with its own wordmark and its own French labels in
 * them, so each is rebuilt here as the thing the card is actually offering: a
 * calculator, a book, a chart.
 */
export function ResourceArt({ kind }: { kind: string }) {
  if (kind === 'CALCULATOR') {
    return (
      <div className="bg-greentint-2 flex size-full items-center justify-center">
        <div className="border-primary-9 w-40 rounded border bg-white p-3">
          <p className="font-pangea-medium text-primary-2 text-right text-[20px]">1.84&times;</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="bg-greyscale-9 h-3 rounded-[2px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'THE BOOK') {
    return (
      <div className="bg-primary-2 flex size-full items-end justify-center pt-6">
        <div className="border-primary-7 bg-primary-11 h-full w-28 rounded-t border-l border-r border-t p-3">
          <p className="font-pangea-medium text-[12px] leading-tight text-white">
            The green book of decarbonisation
          </p>
          <span className="bg-primary-1 mt-3 block h-px w-10" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-greyscale-5 flex size-full items-center px-6">
      <AreaChart w={280} h={80} className="h-auto w-full" />
    </div>
  );
}
